'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Square } from 'lucide-react';
import { api } from '@/app/shared/utils/api';

interface VoiceCaptureProps {
  onTranscript: (transcript: string, translated: string) => void;
  language: string;
  isListening: boolean;
  onListeningChange: (listening: boolean) => void;
}

export const VoiceCapture: React.FC<VoiceCaptureProps> = ({
  onTranscript,
  language,
  isListening,
  onListeningChange
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const analyzeAudio = () => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    analyserRef.current.getByteFrequencyData(dataArray);
    
    const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
    setAudioLevel(average / 255);

    animationFrameRef.current = requestAnimationFrame(analyzeAudio);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Set up audio analysis
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;

      // Start recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        
        try {
          onListeningChange(true);
          const sttResult = await api.speechToText(audioBlob, language);
          const translation = await api.translate(sttResult.transcript, 'en');
          onTranscript(sttResult.transcript, translation.translated);
        } catch (error) {
          console.error('Speech processing failed:', error);
        } finally {
          onListeningChange(false);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      analyzeAudio();
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      setAudioLevel(0);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Microphone Button */}
      <div className="relative">
        <Button
          onClick={handleToggleRecording}
          disabled={isListening}
          size="lg"
          className={`
            w-32 h-32 rounded-full text-white text-xl font-medium shadow-lg
            transition-all duration-200 transform hover:scale-105 active:scale-95
            ${isRecording 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-blue-600 hover:bg-blue-700'
            }
          `}
        >
          {isRecording ? (
            <Square className="h-12 w-12" />
          ) : (
            <Mic className="h-12 w-12" />
          )}
        </Button>

        {/* Audio Level Indicator */}
        {isRecording && (
          <div className="absolute inset-0 -m-2">
            <div 
              className="w-36 h-36 rounded-full border-4 border-red-400 opacity-60"
              style={{
                transform: `scale(${1 + audioLevel * 0.3})`,
                transition: 'transform 0.1s ease-out'
              }}
            />
          </div>
        )}
      </div>

      {/* Status Text */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          {isListening ? 'Processing...' : isRecording ? 'Listening...' : 'Tap to Speak'}
        </h2>
        <p className="text-lg text-gray-600">
          {isRecording 
            ? 'Speak clearly and tap stop when finished' 
            : 'Press and hold the microphone to record'
          }
        </p>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="flex items-center space-x-2 text-red-600">
          <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
          <span className="text-lg font-medium">Recording</span>
        </div>
      )}
    </div>
  );
};
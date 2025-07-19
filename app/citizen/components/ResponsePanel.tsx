'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Copy, RefreshCw, MessageSquare } from 'lucide-react';
import { api } from '@/app/shared/utils/api';

interface ResponsePanelProps {
  query: string;
  language: string;
}

export const ResponsePanel: React.FC<ResponsePanelProps> = ({ query, language }) => {
  const [response, setResponse] = useState('');
  const [translatedResponse, setTranslatedResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (query) {
      fetchResponse();
    }
  }, [query]);

  const fetchResponse = async () => {
    setIsLoading(true);
    try {
      const result = await api.queryAssistant(query, 'citizen');
      setResponse(result.answer);
      
      if (language !== 'en') {
        const translation = await api.translate(result.answer, language);
        setTranslatedResponse(translation.translated);
      }
    } catch (error) {
      console.error('Failed to get response:', error);
      setResponse('I apologize, but I encountered an error. Please try again or contact an officer for assistance.');
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = async (text: string) => {
    setIsPlaying(true);
    try {
      const audioResult = await api.textToSpeech(text, language);
      // In a real implementation, you would play the audio
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate playback
    } catch (error) {
      console.error('TTS failed:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!query) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Card className="border-l-4 border-l-purple-500">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-700 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Response:
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchResponse}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center space-x-3 py-6">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <span className="text-lg text-gray-600">Getting assistance...</span>
            </div>
          ) : (
            <>
              {/* English Response */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-600">English</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(response)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => playAudio(response)}
                      disabled={isPlaying}
                    >
                      <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                    </Button>
                  </div>
                </div>
                <p className="text-xl text-gray-900 leading-relaxed">{response}</p>
              </div>

              {/* Translated Response */}
              {translatedResponse && language !== 'en' && (
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-600">Your Language</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(translatedResponse)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => playAudio(translatedResponse)}
                        disabled={isPlaying}
                      >
                        <Volume2 className={`h-4 w-4 ${isPlaying ? 'animate-pulse' : ''}`} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xl text-gray-900 leading-relaxed">{translatedResponse}</p>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="outline" size="sm">
          Need More Help?
        </Button>
        <Button variant="outline" size="sm">
          File Complaint
        </Button>
        <Button variant="outline" size="sm">
          Contact Officer
        </Button>
      </div>
    </div>
  );
};
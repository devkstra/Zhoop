'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/app/shared/components/ProtectedRoute';
import { Header } from '@/app/shared/components/Header';
import { Footer } from '@/app/shared/components/Footer';
import { LanguageSelector } from '../components/LanguageSelector';
import { VoiceCapture } from '../components/VoiceCapture';
import { TranscriptDisplay } from '../components/TranscriptDisplay';
import { ResponsePanel } from '../components/ResponsePanel';
import { Language, supportedLanguages } from '@/app/shared/utils/i18n';
import { Button } from '@/components/ui/button';
import { Globe, HelpCircle, Phone } from 'lucide-react';

export default function CitizenDashboard() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(supportedLanguages[0]);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleLanguageSelect = (language?: Language) => {
    if (language) {
      setSelectedLanguage(language);
    }
    setShowLanguageSelector(false);
  };

  const handleTranscript = (original: string, translated: string) => {
    setOriginalText(original);
    setTranslatedText(translated);
  };

  const handleNewSession = () => {
    setOriginalText('');
    setTranslatedText('');
  };

  return (
    <ProtectedRoute allowedRoles={['citizen']}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 flex flex-col">
        <Header title="Citizen Assistant" />
        
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            {/* Language and Session Controls */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setShowLanguageSelector(true)}
                  className="h-12 px-6"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  <span className="text-lg">{selectedLanguage.flag} {selectedLanguage.nativeName}</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button variant="outline" onClick={handleNewSession}>
                  New Session
                </Button>
                <Button variant="ghost" size="sm">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </div>
            </div>

            {/* Voice Capture Section */}
            <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
              <VoiceCapture
                onTranscript={handleTranscript}
                language={selectedLanguage.code}
                isListening={isListening}
                onListeningChange={setIsListening}
              />
            </div>

            {/* Transcript Display */}
            {(originalText || translatedText) && (
              <div className="mb-8">
                <TranscriptDisplay
                  originalText={originalText}
                  translatedText={translatedText}
                  originalLanguage={selectedLanguage.name}
                />
              </div>
            )}

            {/* Response Panel */}
            {translatedText && (
              <ResponsePanel
                query={translatedText}
                language={selectedLanguage.code}
              />
            )}

            {/* Emergency Button */}
            <div className="fixed bottom-6 right-6">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white rounded-full h-16 w-16 shadow-lg"
              >
                <Phone className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </main>

        <Footer />

        {/* Language Selector Modal */}
        <LanguageSelector
          isOpen={showLanguageSelector}
          onClose={handleLanguageSelect}
          selectedLanguage={selectedLanguage}
        />
      </div>
    </ProtectedRoute>
  );
}
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supportedLanguages, Language } from '@/app/shared/utils/i18n';
import { Globe, Check } from 'lucide-react';

interface LanguageSelectorProps {
  isOpen: boolean;
  onClose: (selectedLanguage?: Language) => void;
  selectedLanguage?: Language;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  isOpen,
  onClose,
  selectedLanguage
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = supportedLanguages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lang.nativeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLanguageSelect = (language: Language) => {
    onClose(language);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <Globe className="h-6 w-6 text-blue-600" />
            <span>Select Your Language</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Search languages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          <ScrollArea className="h-96">
            <div className="space-y-2">
              {filteredLanguages.map((language) => (
                <Button
                  key={language.code}
                  variant={selectedLanguage?.code === language.code ? "default" : "ghost"}
                  onClick={() => handleLanguageSelect(language)}
                  className="w-full justify-start h-16 text-left p-4 hover:bg-blue-50"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium text-lg">{language.nativeName}</div>
                      <div className="text-sm text-gray-500">{language.name}</div>
                    </div>
                    {selectedLanguage?.code === language.code && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>

          <div className="text-center text-sm text-gray-500">
            <p>More languages available in the full version</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
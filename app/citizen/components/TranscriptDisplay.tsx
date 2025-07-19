'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Volume2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TranscriptDisplayProps {
  originalText: string;
  translatedText: string;
  originalLanguage: string;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({
  originalText,
  translatedText,
  originalLanguage
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (!originalText && !translatedText) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Original Text */}
      {originalText && (
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-700">You said:</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(originalText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xl text-gray-900 leading-relaxed">{originalText}</p>
            <p className="text-sm text-gray-500 mt-2">Language: {originalLanguage}</p>
          </CardContent>
        </Card>
      )}

      {/* Translated Text */}
      {translatedText && (
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-700">Translated:</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(translatedText)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Volume2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-xl text-gray-900 leading-relaxed">{translatedText}</p>
            <p className="text-sm text-gray-500 mt-2">Language: English</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
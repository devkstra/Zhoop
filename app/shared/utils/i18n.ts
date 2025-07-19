export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' }
];

export const translations = {
  en: {
    welcome: 'Welcome to Police Assistant',
    selectLanguage: 'Select Your Language',
    speak: 'Tap to Speak',
    listening: 'Listening...',
    processing: 'Processing...',
    youSaid: 'You said:',
    translated: 'Translated:',
    response: 'Response:',
    help: 'Need Help?',
    emergency: 'Emergency: 100',
    newSession: 'New Session',
    activeSessions: 'Active Sessions',
    completedSessions: 'Completed Sessions'
  },
  hi: {
    welcome: 'पुलिस सहायक में आपका स्वागत है',
    selectLanguage: 'अपनी भाषा चुनें',
    speak: 'बोलने के लिए टैप करें',
    listening: 'सुन रहा है...',
    processing: 'प्रोसेसिंग...',
    youSaid: 'आपने कहा:',
    translated: 'अनुवादित:',
    response: 'जवाब:',
    help: 'सहायता चाहिए?',
    emergency: 'आपातकाल: 100',
    newSession: 'नया सत्र',
    activeSessions: 'सक्रिय सत्र',
    completedSessions: 'पूर्ण सत्र'
  }
};

export const getTranslation = (key: string, language: string = 'en'): string => {
  const lang = language as keyof typeof translations;
  return translations[lang]?.[key as keyof typeof translations.en] || translations.en[key as keyof typeof translations.en] || key;
};
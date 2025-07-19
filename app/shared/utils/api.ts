export interface STTResponse {
  transcript: string;
  confidence: number;
  language: string;
}

export interface TranslationResponse {
  translated: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface QueryResponse {
  answer: string;
  confidence: number;
  sources?: string[];
}

export interface TTSResponse {
  audioUrl: string;
  duration: number;
}

export interface Session {
  id: string;
  timestamp: Date;
  citizenLanguage: string;
  status: 'active' | 'completed' | 'archived';
  transcript: string;
  summary?: string;
}

export const api = {
  async speechToText(audio: Blob, language: string = 'auto'): Promise<STTResponse> {
    // Simulate BHASHINI STT API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      transcript: "मुझे अपना शिकायत दर्ज करना है।",
      confidence: 0.92,
      language: 'hi'
    };
  },

  async translate(text: string, targetLanguage: string): Promise<TranslationResponse> {
    // Simulate BHASHINI Translation API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const translations: Record<string, string> = {
      'मुझे अपना शिकायत दर्ज करना है।': 'I want to file a complaint.',
      'Hello, how can I help you?': 'नमस्ते, मैं आपकी कैसे मदद कर सकता हूं?'
    };

    return {
      translated: translations[text] || `[Translated to ${targetLanguage}]: ${text}`,
      sourceLanguage: 'hi',
      targetLanguage
    };
  },

  async queryAssistant(text: string, role: 'citizen' | 'officer'): Promise<QueryResponse> {
    // Simulate LangChain/RAG backend
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses: Record<string, string> = {
      'complaint': 'To file a complaint, please provide your details and describe the incident. We will register your complaint and provide you with a reference number.',
      'theft': 'For theft cases, please provide details about what was stolen, when it happened, and any witness information. We will initiate an investigation immediately.',
      'default': 'I understand your concern. Let me connect you with the appropriate department to assist you further.'
    };

    const key = Object.keys(responses).find(k => text.toLowerCase().includes(k)) || 'default';
    
    return {
      answer: responses[key],
      confidence: 0.85,
      sources: ['BNS Section 303', 'Police Manual Chapter 4']
    };
  },

  async textToSpeech(text: string, language: string = 'en'): Promise<TTSResponse> {
    // Simulate TTS API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      audioUrl: 'data:audio/wav;base64,mock-audio-data',
      duration: 3.5
    };
  },

  async getSessions(): Promise<Session[]> {
    // Simulate session retrieval
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000),
        citizenLanguage: 'Hindi',
        status: 'active',
        transcript: 'मुझे अपना शिकायत दर्ज करना है।',
        summary: 'Citizen wants to file a complaint'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 7200000),
        citizenLanguage: 'Tamil',
        status: 'completed',
        transcript: 'எனக்கு உதவி தேவை',
        summary: 'General assistance request'
      }
    ];
  },

  async createSession(session: Partial<Session>): Promise<Session> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      citizenLanguage: session.citizenLanguage || 'English',
      status: 'active',
      transcript: session.transcript || '',
      ...session
    } as Session;
  }
};
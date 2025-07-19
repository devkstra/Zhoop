'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Session, api } from '@/app/shared/utils/api';
import { Send, Volume2, RefreshCw, CheckCircle } from 'lucide-react';

interface ResponseTabProps {
  session: Session;
}

export const ResponseTab: React.FC<ResponseTabProps> = ({ session }) => {
  const [response, setResponse] = useState('');
  const [responseType, setResponseType] = useState<string>('standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sentResponses, setSentResponses] = useState<Array<{
    id: string;
    text: string;
    type: string;
    timestamp: Date;
  }>>([]);

  const responseTemplates = {
    standard: 'Thank you for contacting us. We have received your query and will assist you accordingly.',
    complaint: 'We have registered your complaint. A reference number will be provided for tracking purposes.',
    emergency: 'Your emergency request has been escalated to the appropriate department. Help is on the way.',
    information: 'Based on your inquiry, here is the information you requested.',
    redirect: 'For this matter, please visit the appropriate department or contact the specialized unit.'
  };

  const generateResponse = async () => {
    setIsGenerating(true);
    try {
      const result = await api.queryAssistant(session.transcript, 'officer');
      setResponse(result.answer);
    } catch (error) {
      console.error('Failed to generate response:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const sendResponse = async () => {
    if (!response.trim()) return;

    setIsSending(true);
    try {
      // Simulate sending response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newResponse = {
        id: Math.random().toString(36).substr(2, 9),
        text: response,
        type: responseType,
        timestamp: new Date()
      };

      setSentResponses(prev => [newResponse, ...prev]);
      setResponse('');
    } catch (error) {
      console.error('Failed to send response:', error);
    } finally {
      setIsSending(false);
    }
  };

  const playResponse = async (text: string) => {
    try {
      const audioResult = await api.textToSpeech(text, session.citizenLanguage);
      // In a real implementation, you would play the audio
    } catch (error) {
      console.error('TTS failed:', error);
    }
  };

  const loadTemplate = (template: string) => {
    setResponse(responseTemplates[template as keyof typeof responseTemplates] || '');
  };

  return (
    <div className="space-y-6">
      {/* Response Composition */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Compose Response</span>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateResponse}
                disabled={isGenerating}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                AI Assist
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => playResponse(response)}
                disabled={!response}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Response Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Response Type
              </label>
              <Select value={responseType} onValueChange={setResponseType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Response</SelectItem>
                  <SelectItem value="complaint">Complaint Registration</SelectItem>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                  <SelectItem value="information">Information Request</SelectItem>
                  <SelectItem value="redirect">Department Redirect</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Quick Templates
              </label>
              <Select onValueChange={loadTemplate}>
                <SelectTrigger>
                  <SelectValue placeholder="Load template" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(responseTemplates).map((key) => (
                    <SelectItem key={key} value={key}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Response Text */}
          <div>
            <label className="text-sm font-medium text-gray-600 mb-2 block">
              Response Message
            </label>
            <Textarea
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Type your response here..."
              className="h-32 resize-none"
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-end">
            <Button 
              onClick={sendResponse}
              disabled={!response.trim() || isSending}
              className="px-6"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending ? 'Sending...' : 'Send Response'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sent Responses History */}
      <Card>
        <CardHeader>
          <CardTitle>Response History</CardTitle>
        </CardHeader>
        <CardContent>
          {sentResponses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Send className="h-8 w-8 mx-auto mb-2" />
              <p>No responses sent yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sentResponses.map((sentResponse) => (
                <div key={sentResponse.id} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <Badge variant="outline" className="capitalize">
                        {sentResponse.type}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {sentResponse.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-900">{sentResponse.text}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Translation Preview */}
      {session.citizenLanguage !== 'English' && (
        <Card>
          <CardHeader>
            <CardTitle>Translation Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600 mb-2">
                Translated to {session.citizenLanguage}:
              </p>
              <p className="text-gray-900">
                {response ? `[Auto-translated]: ${response}` : 'Enter a response to see translation'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Session } from '@/app/shared/utils/api';
import { Copy, Download, Globe, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TranscriptTabProps {
  session: Session;
}

export const TranscriptTab: React.FC<TranscriptTabProps> = ({ session }) => {
  const copyTranscript = () => {
    navigator.clipboard.writeText(session.transcript);
  };

  const downloadTranscript = () => {
    const blob = new Blob([session.transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${session.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Session Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Session Information</span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={copyTranscript}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline" size="sm" onClick={downloadTranscript}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-600">Session ID</label>
              <p className="font-mono">{session.id}</p>
            </div>
            <div>
              <label className="font-medium text-gray-600">Language</label>
              <p className="flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                {session.citizenLanguage}
              </p>
            </div>
            <div>
              <label className="font-medium text-gray-600">Status</label>
              <p className="capitalize">{session.status}</p>
            </div>
            <div>
              <label className="font-medium text-gray-600">Time</label>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {formatDistanceToNow(session.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transcript */}
      <Card className="flex-1">
        <CardHeader>
          <CardTitle>Conversation Transcript</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-64">
            <div className="space-y-4">
              {session.transcript ? (
                <div className="prose max-w-none">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">
                      Citizen ({session.citizenLanguage})
                    </h4>
                    <p className="text-gray-900 whitespace-pre-wrap">{session.transcript}</p>
                  </div>

                  {session.summary && (
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                      <h4 className="text-sm font-medium text-green-800 mb-2">
                        System Summary
                      </h4>
                      <p className="text-gray-900">{session.summary}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No transcript available for this session</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Conversation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Session Started</p>
                <p className="text-xs text-gray-500">
                  {new Date(session.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div>
                <p className="text-sm font-medium">Voice Input Received</p>
                <p className="text-xs text-gray-500">Language: {session.citizenLanguage}</p>
              </div>
            </div>

            {session.status === 'completed' && (
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Session Completed</p>
                  <p className="text-xs text-gray-500">Assistance provided</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
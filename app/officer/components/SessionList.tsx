'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Session, api } from '@/app/shared/utils/api';
import { Clock, User, Globe, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface SessionListProps {
  onSessionSelect: (session: Session) => void;
  selectedSessionId?: string;
}

export const SessionList: React.FC<SessionListProps> = ({ onSessionSelect, selectedSessionId }) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      const result = await api.getSessions();
      setSessions(result);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => {
    if (filter === 'all') return true;
    return session.status === filter;
  });

  const getStatusColor = (status: Session['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Sessions</span>
          <Button variant="outline" size="sm" onClick={loadSessions}>
            Refresh
          </Button>
        </CardTitle>
        
        {/* Filter Buttons */}
        <div className="flex space-x-2">
          {(['all', 'active', 'completed'] as const).map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption)}
              className="capitalize"
            >
              {filterOption}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <ScrollArea className="h-96">
          <div className="space-y-2 p-4">
            {filteredSessions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <MessageSquare className="h-8 w-8 mx-auto mb-2" />
                <p>No sessions found</p>
              </div>
            ) : (
              filteredSessions.map((session) => (
                <Card
                  key={session.id}
                  className={`cursor-pointer transition-colors hover:bg-gray-50 ${
                    selectedSessionId === session.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => onSessionSelect(session)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDistanceToNow(session.timestamp, { addSuffix: true })}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Globe className="h-4 w-4 text-gray-400" />
                        <span>{session.citizenLanguage}</span>
                      </div>

                      <div className="flex items-start space-x-2 text-sm">
                        <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                        <p className="text-gray-600 line-clamp-2">
                          {session.transcript || 'No transcript available'}
                        </p>
                      </div>

                      {session.summary && (
                        <div className="flex items-start space-x-2 text-sm">
                          <User className="h-4 w-4 text-gray-400 mt-0.5" />
                          <p className="text-gray-500 line-clamp-1 italic">
                            {session.summary}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
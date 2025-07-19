'use client';

import { useState, useEffect } from 'react';
import { ProtectedRoute } from '@/app/shared/components/ProtectedRoute';
import { Header } from '@/app/shared/components/Header';
import { SessionList } from '../components/SessionList';
import { TranscriptTab } from '../components/TranscriptTab';
import { ResponseTab } from '../components/ResponseTab';
import { ChecklistTab } from '../components/ChecklistTab';
import { Session, api } from '@/app/shared/utils/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  Plus, 
  FileText, 
  Download, 
  ChevronDown,
  Activity,
  Users,
  Clock
} from 'lucide-react';

export default function OfficerDashboard() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('transcript');

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session);
  };

  const createNewSession = async () => {
    try {
      const newSession = await api.createSession({
        citizenLanguage: 'English',
        transcript: '',
        status: 'active'
      });
      setSelectedSession(newSession);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  const exportSessionLog = () => {
    // Implement session export functionality
    console.log('Exporting session logs...');
  };

  return (
    <ProtectedRoute allowedRoles={['officer']}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header title="Officer Dashboard" />
        
        {/* Main Navigation */}
        <div className="bg-white border-b border-gray-200 px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex items-center space-x-4 flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search judgments, BNS sections, cases..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Live Sessions Dropdown */}
            <div className="flex items-center space-x-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2">
                    <Activity className="h-4 w-4" />
                    <span>Live Sessions</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64">
                  <DropdownMenuItem className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Session #001</span>
                    </div>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Session #002</span>
                    </div>
                    <span className="text-xs text-gray-500">5 min ago</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Quick Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button onClick={createNewSession} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Query
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={exportSessionLog}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Log
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Sidebar - Session List */}
          <div className={`${sidebarCollapsed ? 'w-16' : 'w-80'} bg-white border-r border-gray-200 transition-all duration-300`}>
            {!sidebarCollapsed && (
              <div className="h-full p-4">
                <SessionList 
                  onSessionSelect={handleSessionSelect}
                  selectedSessionId={selectedSession?.id}
                />
              </div>
            )}
          </div>

          {/* Main Panel */}
          <div className="flex-1 p-6">
            {selectedSession ? (
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h1 className="text-2xl font-semibold text-gray-900">
                      Session #{selectedSession.id}
                    </h1>
                    <p className="text-gray-600">
                      {selectedSession.citizenLanguage} • {selectedSession.status}
                    </p>
                  </div>
                  
                  <TabsList className="grid w-full max-w-md grid-cols-3">
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="response">Response</TabsTrigger>
                    <TabsTrigger value="checklist">Checklist</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="transcript">
                  <TranscriptTab session={selectedSession} />
                </TabsContent>

                <TabsContent value="response">
                  <ResponseTab session={selectedSession} />
                </TabsContent>

                <TabsContent value="checklist">
                  <ChecklistTab session={selectedSession} />
                </TabsContent>
              </Tabs>
            ) : (
              // Welcome Screen
              <div className="flex items-center justify-center h-full">
                <div className="text-center max-w-md">
                  <Users className="h-16 w-16 text-gray-400 mx-auto mb-6" />
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Welcome to Officer Dashboard
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Select a session from the sidebar to view details, manage responses, and track progress.
                  </p>
                  <div className="space-y-3">
                    <Button onClick={createNewSession} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Start New Session
                    </Button>
                    <p className="text-sm text-gray-500">
                      Or select an existing session from the list
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
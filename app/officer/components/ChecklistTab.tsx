'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Session } from '@/app/shared/utils/api';
import { CheckCircle, AlertTriangle, FileText, Save } from 'lucide-react';

interface ChecklistTabProps {
  session: Session;
}

interface ChecklistItem {
  id: string;
  category: string;
  text: string;
  completed: boolean;
  required: boolean;
}

export const ChecklistTab: React.FC<ChecklistTabProps> = ({ session }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    // Verification Items
    { id: '1', category: 'Verification', text: 'Citizen identity verified', completed: false, required: true },
    { id: '2', category: 'Verification', text: 'Language preference confirmed', completed: true, required: true },
    { id: '3', category: 'Verification', text: 'Contact information obtained', completed: false, required: false },
    
    // Documentation Items
    { id: '4', category: 'Documentation', text: 'Incident details recorded', completed: false, required: true },
    { id: '5', category: 'Documentation', text: 'Transcript reviewed for accuracy', completed: false, required: true },
    { id: '6', category: 'Documentation', text: 'Supporting documents collected', completed: false, required: false },
    
    // Follow-up Items
    { id: '7', category: 'Follow-up', text: 'Response provided to citizen', completed: false, required: true },
    { id: '8', category: 'Follow-up', text: 'Reference number assigned', completed: false, required: false },
    { id: '9', category: 'Follow-up', text: 'Next steps communicated', completed: false, required: true },
    
    // Compliance Items
    { id: '10', category: 'Compliance', text: 'BNS sections reviewed', completed: false, required: false },
    { id: '11', category: 'Compliance', text: 'Department protocols followed', completed: false, required: true },
    { id: '12', category: 'Compliance', text: 'Data privacy maintained', completed: true, required: true }
  ]);

  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const toggleChecklistItem = (id: string) => {
    setChecklist(prev => prev.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const saveProgress = async () => {
    setIsSaving(true);
    try {
      // Simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Failed to save progress:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const getCompletionStats = () => {
    const total = checklist.length;
    const completed = checklist.filter(item => item.completed).length;
    const requiredTotal = checklist.filter(item => item.required).length;
    const requiredCompleted = checklist.filter(item => item.required && item.completed).length;
    
    return { total, completed, requiredTotal, requiredCompleted };
  };

  const stats = getCompletionStats();
  const categories = Array.from(new Set(checklist.map(item => item.category)));

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Session Completion Progress</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={saveProgress}
              disabled={isSaving}
            >
              <Save className={`h-4 w-4 mr-2 ${isSaving ? 'animate-spin' : ''}`} />
              {isSaving ? 'Saving...' : 'Save Progress'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Total Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.requiredCompleted}</div>
              <div className="text-sm text-gray-600">Required Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.requiredTotal}</div>
              <div className="text-sm text-gray-600">Required Total</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round((stats.completed / stats.total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist by Category */}
      {categories.map(category => {
        const categoryItems = checklist.filter(item => item.category === category);
        const categoryCompleted = categoryItems.filter(item => item.completed).length;
        
        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{category}</span>
                <Badge variant="outline">
                  {categoryCompleted}/{categoryItems.length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryItems.map(item => (
                  <div key={item.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleChecklistItem(item.id)}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {item.text}
                        </span>
                        {item.required && (
                          <Badge variant="secondary" className="text-xs">
                            Required
                          </Badge>
                        )}
                      </div>
                    </div>
                    {item.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : item.required ? (
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                    ) : (
                      <div className="h-5 w-5" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Session Notes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Session Notes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any additional notes about this session..."
            className="h-32 resize-none"
          />
          <div className="text-xs text-gray-500 mt-2">
            These notes will be included in the session report
          </div>
        </CardContent>
      </Card>

      {/* Action Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Session Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Ready to Complete Session?</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>✓ {stats.completed} of {stats.total} items completed</p>
              <p>
                {stats.requiredCompleted === stats.requiredTotal ? '✓' : '⚠'} 
                {' '}{stats.requiredCompleted} of {stats.requiredTotal} required items completed
              </p>
              <p>✓ Session documented and tracked</p>
            </div>
            
            <div className="mt-4 flex space-x-3">
              <Button 
                className="flex-1"
                disabled={stats.requiredCompleted < stats.requiredTotal}
              >
                Complete Session
              </Button>
              <Button variant="outline" className="flex-1">
                Mark as Pending
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from './shared/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Mic } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'citizen') {
        router.push('/citizen/dashboard');
      } else if (user.role === 'officer') {
        router.push('/officer/dashboard');
      }
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="flex items-center justify-between mb-12 px-4">
          <div className="flex items-center">
            <Shield className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-4xl font-bold text-gray-900">Multilingual Police Assistant</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Image
              src="/Bhashini_new_en (1).png"
              alt="Bhashini Logo"
              width={120}
              height={60}
              className="object-contain"
            />
            <Image
              src="/NCRB_Logo.png"
              alt="NCRB Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <Image
              src="/SVP-National-Police-Academy.jpg"
              alt="Police Academy Logo"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
        </div>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Multilingual support system bridging communication between citizens and law enforcement
        </p>

        <div className="flex flex-col items-center mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer w-full max-w-2xl" onClick={() => router.push('/citizen/login')}>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-16 w-16 text-blue-600" />
              </div>
              <CardTitle className="text-3xl">Citizen Access</CardTitle>
              <CardDescription className="text-xl">
                Get assistance in your preferred language
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-3/4" size="lg">
                Continue as Citizen
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end mt-8">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-blue-600"
            onClick={() => router.push('/officer/login')}
          >
            <Shield className="h-4 w-4 mr-2" />
            Officer Login
          </Button>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span className="flex items-center">
              <Mic className="h-4 w-4 mr-2" />
              Voice Recognition
            </span>
            <span>•</span>
            <span>Real-time Translation</span>
            <span>•</span>
            <span>WCAG AA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
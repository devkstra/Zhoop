'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/shared/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, User, Lock, ArrowLeft, Key } from 'lucide-react';
import { Header } from '@/app/shared/components/Header';
import { Footer } from '@/app/shared/components/Footer';

export default function OfficerLogin() {
  const [step, setStep] = useState<'credentials' | '2fa'>('credentials');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleCredentialsSubmit = async () => {
    if (!username || !password) return;
    
    setIsLoading(true);
    try {
      // Simulate credential verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('2fa');
    } catch (error) {
      console.error('Credential verification failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSubmit = async () => {
    if (!twoFactorCode) return;
    
    setIsLoading(true);
    try {
      await login({ username, password, twoFactorCode }, 'officer');
      router.push('/officer/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === '2fa') {
      setStep('credentials');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Officer Portal" showUserMenu={false} />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardHeader className="text-center space-y-4">
              <Button variant="ghost" onClick={handleBack} className="self-start p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-blue-600" />
              </div>
              <CardTitle className="text-2xl">
                {step === 'credentials' ? 'Officer Login' : 'Two-Factor Authentication'}
              </CardTitle>
              <CardDescription className="text-base">
                {step === 'credentials' 
                  ? 'Enter your credentials to access the officer portal'
                  : 'Enter the 6-digit code from your authenticator app'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 'credentials' ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="username">Badge Number / Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="username"
                        type="text"
                        placeholder="OFF001 or username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-12 pl-10"
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCredentialsSubmit} 
                    disabled={!username || !password || isLoading}
                    className="w-full h-12 text-lg"
                  >
                    {isLoading ? 'Verifying...' : 'Continue'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <Key className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Authentication code sent to your registered device
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="2fa">6-Digit Authentication Code</Label>
                    <Input
                      id="2fa"
                      type="text"
                      placeholder="123456"
                      value={twoFactorCode}
                      onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="h-12 text-lg text-center tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button 
                    onClick={handleTwoFactorSubmit} 
                    disabled={twoFactorCode.length !== 6 || isLoading}
                    className="w-full h-12 text-lg"
                  >
                    {isLoading ? 'Authenticating...' : 'Login'}
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={() => setStep('credentials')}
                    disabled={isLoading}
                    className="w-full"
                  >
                    Use Different Credentials
                  </Button>
                </>
              )}

              <div className="text-center text-sm text-gray-500 space-y-2">
                <p>Demo: Username: OFF001, Password: demo123, 2FA: 123456</p>
                <p>Secure access for authorized personnel only</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
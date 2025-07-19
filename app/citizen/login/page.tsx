'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/shared/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Shield, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Header } from '@/app/shared/components/Header';
import { Footer } from '@/app/shared/components/Footer';

export default function CitizenLogin() {
  const [step, setStep] = useState<'method' | 'otp'>('method');
  const [method, setMethod] = useState<'phone' | 'email'>('phone');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSendOTP = async () => {
    if (!identifier) return;
    
    setIsLoading(true);
    try {
      // Simulate OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (error) {
      console.error('Failed to send OTP:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) return;
    
    setIsLoading(true);
    try {
      await login({ [method]: identifier, otp }, 'citizen');
      router.push('/citizen/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (step === 'otp') {
      setStep('method');
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header title="Citizen Access" showUserMenu={false} />
      
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
                {step === 'method' ? 'Citizen Login' : 'Verify OTP'}
              </CardTitle>
              <CardDescription className="text-base">
                {step === 'method' 
                  ? 'Enter your phone number or email to get started'
                  : `Enter the 4-digit code sent to your ${method}`
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 'method' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={method === 'phone' ? 'default' : 'outline'}
                      onClick={() => setMethod('phone')}
                      className="h-12"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                    <Button
                      variant={method === 'email' ? 'default' : 'outline'}
                      onClick={() => setMethod('email')}
                      className="h-12"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="identifier">
                      {method === 'phone' ? 'Phone Number' : 'Email Address'}
                    </Label>
                    <Input
                      id="identifier"
                      type={method === 'phone' ? 'tel' : 'email'}
                      placeholder={method === 'phone' ? '+91 XXXXX XXXXX' : 'your@email.com'}
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      className="h-12 text-lg"
                    />
                  </div>

                  <Button 
                    onClick={handleSendOTP} 
                    disabled={!identifier || isLoading}
                    className="w-full h-12 text-lg"
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-4">
                      Code sent to: <span className="font-medium">{identifier}</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="otp">4-Digit OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      placeholder="1234"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      className="h-12 text-lg text-center tracking-widest"
                      maxLength={4}
                    />
                  </div>

                  <Button 
                    onClick={handleVerifyOTP} 
                    disabled={otp.length !== 4 || isLoading}
                    className="w-full h-12 text-lg"
                  >
                    {isLoading ? 'Verifying...' : 'Verify & Continue'}
                  </Button>

                  <Button 
                    variant="ghost" 
                    onClick={handleSendOTP}
                    disabled={isLoading}
                    className="w-full"
                  >
                    Resend OTP
                  </Button>
                </>
              )}

              <div className="text-center text-sm text-gray-500 space-y-2">
                <p>Demo credentials: Use any {method} and OTP: 1234</p>
                <p>By continuing, you agree to our Terms of Service</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
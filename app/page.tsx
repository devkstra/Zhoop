'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from './shared/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Users, Mic, CreditCard, Phone, HelpCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col">
      {/* News Ticker */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-4 overflow-hidden shadow-md">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm font-medium tracking-wider inline-block">
            🏛️ Police Station Kiosk &nbsp;&nbsp;•&nbsp;&nbsp; Press the Start Button to proceed &nbsp;&nbsp;•&nbsp;&nbsp; Available in Multilingual &nbsp;&nbsp;•&nbsp;&nbsp; 🏛️ पुलिस स्टेशन कियोस्क &nbsp;&nbsp;•&nbsp;&nbsp; आरंभ करने के लिए स्टार्ट बटन दबाएं &nbsp;&nbsp;•&nbsp;&nbsp; बहुभाषी में उपलब्ध &nbsp;&nbsp;•&nbsp;&nbsp; 🏛️ Police Station Kiosk &nbsp;&nbsp;•&nbsp;&nbsp; Press the Start Button to proceed &nbsp;&nbsp;•&nbsp;&nbsp; Available in Multilingual &nbsp;&nbsp;•&nbsp;&nbsp; 🏛️ पुलिस स्टेशन कियोस्क &nbsp;&nbsp;•&nbsp;&nbsp; आरंभ करने के लिए स्टार्ट बटन दबाएं &nbsp;&nbsp;•&nbsp;&nbsp; बहुभाषी में उपलब्ध &nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Discrete Officer Login - Top Right Corner */}
      <div className="absolute top-14 right-6 z-10">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-gray-500 hover:text-gray-700 text-xs opacity-60 hover:opacity-100 transition-all duration-300 hover:bg-gray-100 rounded-lg px-3 py-2"
          onClick={() => router.push('/officer/login')}
        >
          <Shield className="h-3 w-3 mr-1" />
          Admin
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Large Police Officer Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-orange-50 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Image
                  src="/model2.png"
                  alt="Police Officer"
                  width={400}
                  height={600}
                  className="relative h-96 lg:h-[520px] w-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Right Side - Main Interface */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              {/* Title */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 leading-tight">
                  Police Station Kiosk
                </h1>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
                  पुलिस स्टेशन कियोस्क
                </h2>
                <p className="text-xl lg:text-2xl text-gray-600 font-medium tracking-wide">
                  Multilingual Citizen Services | बहुभाषी नागरिक सेवाएं
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mx-auto lg:mx-0"></div>
              </div>

              {/* Start Button */}
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-20 blur-lg"></div>
                  <button 
                    className="relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-8 px-16 rounded-full text-2xl lg:text-3xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl hover:shadow-orange-500/25"
                    onClick={() => router.push('/citizen/login')}
                  >
                    <span className="flex items-center space-x-3">
                      <span>Start Here | यहाँ शुरू करें</span>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </span>
                  </button>
                </div>
                
                {/* Additional Instructions */}
                <div className="text-center space-y-2">
                  <p className="text-lg text-gray-600 font-medium">
                    Touch the button above to begin
                  </p>
                  <p className="text-lg text-gray-600 font-medium">
                    शुरू करने के लिए ऊपर का बटन दबाएं
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                <div className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <Mic className="h-6 w-6 text-orange-600" />
                  <span className="text-xs text-gray-600 text-center">Voice Support<br />आवाज़ सहायता</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">24</span>
                  </div>
                  <span className="text-xs text-gray-600 text-center">24/7 Available<br />24/7 उपलब्ध</span>
                </div>
                <div className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <div className="h-6 w-6 bg-orange-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">अ</span>
                  </div>
                  <span className="text-xs text-gray-600 text-center">Multi-Language<br />बहुभाषी</span>
                </div>
              </div>

              {/* Logos */}
              <div className="flex items-center space-x-6 p-4 bg-white rounded-xl shadow-md">
                <Image
                  src="/Bhashini_new_en (1).png"
                  alt="Bhashini Logo"
                  width={100}
                  height={50}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
                <div className="w-px h-8 bg-gray-300"></div>
                <Image
                  src="/NCRB_Logo.png"
                  alt="NCRB Logo"
                  width={50}
                  height={50}
                  className="object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 py-4 px-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600 max-w-7xl mx-auto">
          <span className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
            <span className="font-medium">System Online</span>
          </span>
          <span className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="font-medium">Secure Connection</span>
          </span>
          <span className="font-mono text-xs bg-gray-200 px-3 py-1 rounded-full">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
export interface LoginCredentials {
  email?: string;
  phone?: string;
  password?: string;
  otp?: string;
  username?: string;
  twoFactorCode?: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    role: 'citizen' | 'officer';
    name: string;
    badgeNumber?: string;
  };
  token: string;
}

export const authApi = {
  async loginCitizen(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      user: {
        id: '1',
        email: credentials.email || credentials.phone || '',
        role: 'citizen',
        name: 'Citizen User'
      },
      token: 'mock-citizen-token'
    };
  },

  async loginOfficer(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      user: {
        id: '2',
        email: credentials.email || '',
        role: 'officer',
        name: 'Officer Smith',
        badgeNumber: 'OFF001'
      },
      token: 'mock-officer-token'
    };
  },

  async sendOTP(identifier: string): Promise<void> {
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  async verifyOTP(identifier: string, otp: string): Promise<boolean> {
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 800));
    return otp === '1234'; // Mock verification
  }
};
// Mock authentication service
// In a real-world scenario, this would make an actual API call to a backend

import { LoginCredentials } from '@/types/auth';

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: { username: string };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Comprehensive environment variable logging
    console.log('🌐 Environment Context:', {
      mode: import.meta.env.MODE,
      isProd: import.meta.env.PROD,
      isDev: import.meta.env.DEV,
      nodeEnv: process.env.NODE_ENV
    });

    // Log all Vite environment variables
    const viteEnvVars = Object.keys(import.meta.env)
      .filter(key => key.startsWith('VITE_'))
      .reduce((acc, key) => {
        acc[key] = import.meta.env[key] ? '***' : 'UNDEFINED';
        return acc;
      }, {} as Record<string, string>);
    
    console.log('🔑 Vite Environment Variables:', viteEnvVars);

    // In a real-world scenario, this would be an API call
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    // Detailed logging for credentials
    console.log('👤 Stored Admin Username:', ADMIN_USERNAME);
    console.log('🔐 Stored Admin Password:', ADMIN_PASSWORD ? 'Password is set' : 'Password is NOT set');
    console.log('🚪 Attempted Login Username:', credentials.username);
    console.log('🔑 Attempted Login Password:', credentials.password ? 'Password provided' : 'No password');

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('❌ Admin credentials not configured');
      return { 
        success: false, 
        message: 'Authentication not configured: Missing environment variables' 
      };
    }

    // Strict comparison to catch any whitespace or case issues
    const isUsernameMatch = credentials.username.trim() === ADMIN_USERNAME.trim();
    const isPasswordMatch = credentials.password.trim() === ADMIN_PASSWORD.trim();

    if (isUsernameMatch && isPasswordMatch) {
      console.log('✅ Login Successful');
      return { 
        success: true, 
        message: 'Login successful',
        user: { username: credentials.username }
      };
    }

    console.warn('❌ Invalid credentials', {
      usernameMatch: isUsernameMatch,
      passwordMatch: isPasswordMatch
    });

    return { 
      success: false, 
      message: 'Invalid credentials' 
    };
  },

  logout() {
    // In a real app, this might invalidate the token on the server
    // Clear any authentication state
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('authToken');
  },

  // Method to check if the current token is valid
  isTokenValid(): boolean {
    const token = localStorage.getItem('authToken');
    if (!token) return false;

    // Add more robust token validation logic here
    return true;
  }
};

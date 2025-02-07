// Mock authentication service
// In a real-world scenario, this would make an actual API call to a backend

import { LoginCredentials } from '@/types/auth';
import { authConfig, validateCredentials } from '@/config/auth';

interface AuthResponse {
  success: boolean;
  message?: string;
  user?: { username: string };
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate credentials in production environment
    validateCredentials();

    // Log environment context
    console.log('🌐 Environment Context:', {
      mode: import.meta.env.MODE,
      isProd: import.meta.env.PROD,
      isDev: import.meta.env.DEV,
      isDevConfig: authConfig.isDevelopment
    });

    // Get admin credentials from config
    const { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } = authConfig.adminCredentials;

    // Detailed logging for credentials
    console.log('👤 Stored Admin Username:', ADMIN_USERNAME);
    console.log('🔐 Admin Password Status:', ADMIN_PASSWORD ? 'Password is set' : 'Password is NOT set');
    console.log('🚪 Attempted Login Username:', credentials.username);
    console.log('🔑 Login Attempt Status:', credentials.password ? 'Password provided' : 'No password');

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.error('❌ Admin credentials not configured');
      return { 
        success: false, 
        message: 'Authentication not configured: Missing credentials' 
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
      passwordMatch: isPasswordMatch,
      environment: authConfig.isDevelopment ? 'development' : 'production'
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

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

    // In a real-world scenario, this would be an API call
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
      console.warn('Admin credentials not configured');
      return { success: false, message: 'Authentication not configured' };
    }

    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      return { 
        success: true, 
        message: 'Login successful',
        user: { username: credentials.username }
      };
    }

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

    try {
      const decoded = JSON.parse(atob(token));
      return decoded.exp > Date.now();
    } catch {
      return false;
    }
  }
};

// Mock authentication service
// In a real-world scenario, this would make an actual API call to a backend

interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  error?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Use environment variables for credentials
    const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

    if (
      credentials.username === ADMIN_USERNAME && 
      credentials.password === ADMIN_PASSWORD
    ) {
      // Generate a mock JWT token
      const token = btoa(JSON.stringify({
        username: credentials.username,
        exp: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
      }));

      return {
        success: true,
        token: token
      };
    }

    return {
      success: false,
      error: 'Invalid username or password'
    };
  },

  logout() {
    // In a real app, this might invalidate the token on the server
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

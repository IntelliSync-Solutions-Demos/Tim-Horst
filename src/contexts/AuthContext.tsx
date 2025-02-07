import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { authService } from '@/services/authService';

// Define the shape of the authentication context
export interface AuthContextType {
  isAdmin: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginError: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  adminUsername: null,
  login: async () => false,
  logout: () => {},
  loginError: null,
});

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsername, setAdminUsername] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Load initial state from localStorage
  useEffect(() => {
    console.log(' AuthProvider: Initializing');
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedAdminUsername = localStorage.getItem('adminUsername');

    console.log(' Initial State:', {
      storedIsAdmin,
      storedAdminUsername
    });

    if (storedIsAdmin && storedAdminUsername) {
      setIsAdmin(true);
      setAdminUsername(storedAdminUsername);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log(' Login Attempt:', { username });

    try {
      const response = await authService.login({ username, password });

      console.log(' Login Response:', {
        success: response.success,
        message: response.message
      });

      if (response.success) {
        // Set admin state
        setIsAdmin(true);
        setAdminUsername(username);
        setLoginError(null);

        // Persist login state
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUsername', username);

        console.log(' Login Successful: State Updated');
        return true;
      } else {
        // Handle login failure
        console.warn(' Login Failed:', response.message);
        setLoginError(response.message || 'Login failed');
        return false;
      }
    } catch (error) {
      console.error(' Login Error:', error);
      setLoginError('An unexpected error occurred');
      return false;
    }
  };

  const logout = () => {
    console.log(' Logout Initiated');

    // Clear admin state
    setIsAdmin(false);
    setAdminUsername(null);
    setLoginError(null);

    // Remove persisted login state
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('authToken');

    // Call service logout (for potential token invalidation)
    authService.logout();

    console.log(' Logout Completed');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminUsername, login, logout, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

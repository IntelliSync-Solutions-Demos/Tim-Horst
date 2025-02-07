import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { authService } from '@/services/authService';

// Define the shape of the authentication context
interface AuthContextType {
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
    const storedIsAdmin = localStorage.getItem('isAdmin') === 'true';
    const storedAdminUsername = localStorage.getItem('adminUsername');

    if (storedIsAdmin && storedAdminUsername) {
      setIsAdmin(true);
      setAdminUsername(storedAdminUsername);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login({ username, password });

      if (response.success) {
        // Set admin state
        setIsAdmin(true);
        setAdminUsername(username);
        setLoginError(null);

        // Persist login state
        localStorage.setItem('isAdmin', 'true');
        localStorage.setItem('adminUsername', username);

        return true;
      } else {
        // Handle login failure
        setLoginError(response.message || 'Login failed');
        return false;
      }
    } catch  {
      setLoginError('An unexpected error occurred');
      return false;
    }
  };

  const logout = () => {
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
  };

  return (
    <AuthContext.Provider value={{ isAdmin, adminUsername, login, logout, loginError }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

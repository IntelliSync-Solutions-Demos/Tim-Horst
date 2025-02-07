import { createContext } from 'react';
import { AuthContextType } from './auth-types';

// Create the context with a default value
export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  adminUsername: null,
  login: async () => false,
  logout: () => {},
  loginError: null,
});

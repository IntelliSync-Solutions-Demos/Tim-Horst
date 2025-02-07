// Define the shape of the authentication context
export interface AuthContextType {
  isAdmin: boolean;
  adminUsername: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginError: string | null;
}

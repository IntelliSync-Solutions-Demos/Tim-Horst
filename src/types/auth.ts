export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  error?: string;
  // Add other properties as needed
}

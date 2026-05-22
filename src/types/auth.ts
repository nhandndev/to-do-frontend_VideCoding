export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  enabled: boolean;
}

export interface AuthResponse {
  token: string;
  authenticated: boolean;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface ProfileResponse {
  data: User,
  success: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string;
  lastLoginIP: string;
  createdAt: string;
  updatedAt: string;
}


export interface RegisterResponse {
  success: boolean;
  message: string;
  data: RegisteredUser;
}

export interface RegisteredUser {
  id: string;
  fullName: string;
  email: string;
}

export interface RefreshToken {
  accessToken: string
}

export interface RefreshTokenResponse {
  data: RefreshToken
  success: boolean
}
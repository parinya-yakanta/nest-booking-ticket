export interface registerUser {
  status: boolean;
  message: string;
  user: UserResponse;
  token: string;
  expiresAt: Date;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export interface validateUser {
  user: UserResponse;
  accessToken: string;
  expiresAt: Date;
}

export interface loginUser {
  accessToken: string;
  expiresAt: Date;
}

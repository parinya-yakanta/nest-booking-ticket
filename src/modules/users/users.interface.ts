export interface registerUser {
  status: boolean;
  message: string;
  user: UserResponse;
  token: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
}

export interface IUser {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUserRequest {
  email: string;
  password: string;
} 

export interface IUserAuthResponse {
  token: string;
}

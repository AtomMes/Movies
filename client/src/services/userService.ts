import { apiClient } from "../lib/axios";
import type {
  ILoginUserRequest,
  IRegisterUserRequest,
  IUserAuthResponse,
  IUser,
} from "../types/user";

export const userService = {
  register: async (
    userData: IRegisterUserRequest,
  ): Promise<IUserAuthResponse> => {
    const response = await apiClient.post(
      "/users/register",
      userData,
    );
    return response.data;
  },

  login: async (userData: ILoginUserRequest): Promise<IUserAuthResponse> => {
    const response = await apiClient.post(
      "/users/login", 
      userData,
    );
    return response.data;
  },

  getMe: async (): Promise<IUser> => {
    const response = await apiClient.get("/users/me");
    return response.data.user;
  },
};

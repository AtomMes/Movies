import { ROUTES } from "@/constants";
import { userService } from "@/services/userService";
import type { ILoginUserRequest, IRegisterUserRequest } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, type NavigateFunction } from "react-router-dom";

export const userKeys = {
  me: ["me"] as const,
};

const handleSuccessfulAuth = async (
  navigate: NavigateFunction,
  token: string,
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  localStorage.setItem("authToken", token);
  await queryClient.invalidateQueries({ queryKey: userKeys.me });
  navigate(ROUTES.home);
};

export const useRegisterUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: IRegisterUserRequest) =>
      userService.register(userData),
    onSuccess: ({ token }) => {
      handleSuccessfulAuth(navigate, token, queryClient);
    },
  });
};

export const useLoginUser = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: ILoginUserRequest) => userService.login(userData),
    onSuccess: ({ token }) => {
      handleSuccessfulAuth(navigate, token, queryClient);
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: userKeys.me,
    queryFn: userService.getMe,
    retry: false,
  });
};

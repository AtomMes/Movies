import { useLoginUser } from "@/hooks/api/useUsersApi";
import { useState } from "react";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutateAsync: login, error, isPending, reset } = useLoginUser();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({
      email: email,
      password: password,
    });
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error) reset();
      setter(e.target.value);
    };

  return {
    email,
    setEmail: handleInputChange(setEmail),
    password,
    setPassword: handleInputChange(setPassword),
    showPassword,
    setShowPassword,
    handleLogin,
    isPending,
    error
  };
};

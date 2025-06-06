import { useRegisterUser } from "@/hooks/api/useUsersApi";
import { useState } from "react";

export const useRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { mutateAsync: register, error, isPending, reset } = useRegisterUser();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({
      name,
      email,
      password,
    });
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error) reset();
      setter(e.target.value);
    };

  return {
    showPassword,
    setShowPassword,
    name,
    setName: handleInputChange(setName),
    password,
    setPassword: handleInputChange(setPassword),
    email,
    setEmail: handleInputChange(setEmail),
    handleRegister,
    isPending,
    error,
    reset,
  };
};

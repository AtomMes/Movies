import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/constants";
import { useRegister } from "@/pages/register/hooks/useRegister";
import { Label } from "@radix-ui/react-label";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const {
    showPassword,
    setShowPassword,
    name,
    setName,
    password,
    setPassword,
    email,
    setEmail,
    handleRegister,
    isPending,
    error,
  } = useRegister();

  return (
    <div className="flex h-dvh w-full items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md gap-2">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-email">Email</Label>
              <Input
                id="register-email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">Username</Label>
              <Input
                id="register-username"
                name="username"
                type="username"
                placeholder="Enter your username"
                value={name}
                onChange={setName}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">Password</Label>
              <div className="relative">
                <Input
                  id="register-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={setPassword}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Hide password" : "Show password"}
                  </span>
                </Button>
              </div>
            </div>
            {error && (
              <p className="text-destructive color-red-500 text-sm">
                {error.message}
              </p>
            )}
            <div className="flex items-center gap-1">
              Already have an account?
              <Link
                to={ROUTES.login}
                className="px-0 font-normal text-blue-700"
              >
                Sign in
              </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Signing up..." : "Sign up"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;

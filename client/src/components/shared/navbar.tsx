import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants";
import { useGetMe, userKeys } from "@/hooks/api/useUsersApi";
import { useQueryClient } from "@tanstack/react-query";
import { Film, UserCircle } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const queryClient = useQueryClient();
  const { data: user } = useGetMe();

  const onLogout = () => {
    localStorage.removeItem("authToken");
    queryClient.resetQueries({ queryKey: userKeys.me });
  };

  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to={ROUTES.home} className="flex items-center gap-2">
          <Film className="h-6 w-6" />
          <span className="text-xl font-bold">MovieDB</span>
        </Link>

        <nav className="flex items-center gap-4">
          {user?.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <UserCircle />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account - {user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={onLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to={ROUTES.login}>Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

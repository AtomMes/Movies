import { ROUTES } from "@/constants";
import HomePage from "@/pages/home";
import LoginPage from "@/pages/login";
import MoviePage from "@/pages/movie";
import RegisterPage from "@/pages/register";
import { Route, Routes as RouterRoutes } from "react-router-dom";

const routeConfig = [
  {
    path: ROUTES.home,
    element: <HomePage />,
  },
  {
    path: ROUTES.login,
    element: <LoginPage />,
  },
  {
    path: ROUTES.register,
    element: <RegisterPage />,
  },
  {
    path: ROUTES.movie,
    element: <MoviePage />,
  },
];

const AppRoutes = () => {
  return (
    <RouterRoutes>
      {routeConfig.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </RouterRoutes>
  );
};

export default AppRoutes;

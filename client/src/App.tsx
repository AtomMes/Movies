import { useGetMe } from "@/hooks/api/useUsersApi";
import AppRoutes from "@/routes";

const App = () => {
  useGetMe()
  return <AppRoutes />;
};

export default App;

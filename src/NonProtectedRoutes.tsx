import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "./stores/user";

const NonProtectedRoute = () => {
  const { user } = useUserAuth();

  return user ? <Navigate to="/admin/dashboard" /> : <Outlet />;
};

export default NonProtectedRoute;

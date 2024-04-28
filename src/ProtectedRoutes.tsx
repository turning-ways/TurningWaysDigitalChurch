import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuthorize";
import { notify } from "./hooks/useLogin";

const ProtectedRoutes = () => {
  const { isError } = useAuth();

  useEffect(() => {
    if (isError) notify("Sorry, you've been logged out");
  }, [isError]);

  const isAuth = isError;

  return !isAuth ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;

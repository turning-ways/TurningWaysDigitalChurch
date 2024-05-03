import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuthorize";
import { notify } from "./hooks/useLogin";
import { useUserAuth } from "./stores/user";

const ProtectedRoutes = () => {
  const { isError, isPending, data: admin } = useAuth();

  const [authChecked, setAuthChecked] = useState(false);

  const { setUser, user } = useUserAuth();

  useEffect(() => {
    if (!isPending) {
      setAuthChecked(true);
      if (isError) notify("Sorry, you've not been signed in");
    }
    admin ? setUser(admin.data.user) : setUser(null);
    console.log(admin);
  }, [isPending, isError, admin, setUser]);

  // Render nothing until the authentication check is complete
  if (!authChecked) return null;

  return user ? <Outlet /> : <Navigate to={"/"} />;
};

export default ProtectedRoutes;

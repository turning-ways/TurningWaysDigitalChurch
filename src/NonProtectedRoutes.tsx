import { Navigate, Outlet } from "react-router-dom";

const NonProtectedRoute = () => {
	const user = localStorage.getItem("user");

	return user ? <Navigate to="/admin/dashboard" /> : <Outlet />;
};

export default NonProtectedRoute;

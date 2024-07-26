import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { notify } from "./hooks/useAuthData";
import { useAuth } from "./hooks/useAuthData"; // Import useAuth hook
import { useChurchIdStore } from "./stores/churchId";

interface userData {
	data: {
		member: {
			_id: string;
			firstName: string;
			lastName: string;
			email: string;
			role: string;
			churchId: string;
		};
	};
}

const ProtectedRoutes = () => {
	const { data: userData, isLoading, isError } = useAuth(); // Use the useAuth hook
	const { setChurchId } = useChurchIdStore();

	useEffect(() => {
		if (!isLoading) {
			if (isError || !userData) {
				// If an error occurred or no user data, consider the user not authenticated
				notify("Please login to access this page");
			} else {
				// If we have user data and no error, authentication is successful
				localStorage.setItem("user", JSON.stringify((userData as userData).data.member)); // Save user data to local storage
				setChurchId((userData as userData).data.member.churchId);
			}
		}
	}, [isLoading, isError, userData]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<img
					src="/assets/images/turningwayslogo.svg"
					alt="TurningWays Logo"
					className="antialiased transition-all duration-700 ease-in-out loadingLogo"
				/>
			</div>
		); // Or any other loading indicator
	}

	if (isError || !userData) {
		return <Navigate to="/" />; // Redirect to login if not authenticated
	}

	return <Outlet />; // Render children routes if authenticated
};

export default ProtectedRoutes;

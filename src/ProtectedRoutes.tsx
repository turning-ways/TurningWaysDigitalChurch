import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { notify } from "./hooks/useAuthData";
import { useAuth } from "./hooks/useAuthData"; // Import useAuth hook
import { useChurchIdStore } from "./stores/churchId";

interface UserData {
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
        // Redirect to home or login page as needed
      } else {
        // If we have user data and no error, authentication is successful
        localStorage.setItem(
          "user",
          JSON.stringify((userData as UserData).data.member)
        ); // Save user data to local storage
        setChurchId((userData as UserData).data.member.churchId);
      }
    }
  }, [isLoading, isError, userData, setChurchId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/assets/images/turningwayslogo.svg"
          alt="TurningWays Logo"
          className="antialiased transition-all duration-700 ease-in-out loadingLogo"
        />
      </div>
    ); // Display a loading spinner or other indicator
  }

  if (isError || !userData) {
    return <Navigate to="/" replace />; // Redirect to home if not authenticated, `replace` avoids adding a new entry to history
  }

  return <Outlet />; // Render child routes if authenticated
};

export default ProtectedRoutes;

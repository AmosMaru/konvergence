import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  const verifyAuth = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    try {
      // Decode token to get user ID
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      const decodedToken = JSON.parse(jsonPayload);

      // Check if token is expired
      // const currentTime = Math.floor(Date.now() / 1000);
      // if (decodedToken.exp && decodedToken.exp < currentTime) {
      //   localStorage.removeItem("accessToken");
      //   localStorage.removeItem("refreshToken");
      //   return false;
      // }

      // If we have a user in context, verify the IDs match
      if (user) {
        return decodedToken.user_id === user.id;
      }

      // If no user in context but valid token, allow access
      // The auth context will handle fetching user data
      return true;
    } catch (error) {
      console.error("Error verifying token:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return false;
    }
  };

  if (!verifyAuth()) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

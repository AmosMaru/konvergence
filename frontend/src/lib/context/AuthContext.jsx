import { createContext, useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const hasFetchedUser = useRef(false);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };


  const getUserFromAPI = useCallback(async () => {
    if (hasFetchedUser.current) return;

    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = decodeToken(token);
      const userId = decoded?.user_id;

      try {
        const res = await fetch(
          `https://gynocare.kilush.com/auth/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch user");
        }

        const userData = await res.json();
        setUser(userData.response?.[0].details?.[0].data);
        hasFetchedUser.current = true;
        // console.log("userData", JSON.stringify(userData.response?.[0].details?.[0].data));
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && !hasFetchedUser.current) {
      getUserFromAPI();
    }
  }, [getUserFromAPI]);

  const signup = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      hasFetchedUser.current = false; // Reset the flag before signup

      const response = await axios.post(
        "https://gynocare.kilush.com/auth/v1/signup",
        {
          email: formData.email,
          first_name: formData.firstName,
          last_name: formData.lastName,
          password: formData.password,
          confirm_psd: formData.confirmPassword,
        }
      );

      if (response.data?.success) {
        const tokens = response.data.response[0].details[0].token;
        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);
        await getUserFromAPI();
        return response.data.success;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.details?.message ||
        "An error occurred during signup";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const signin = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      hasFetchedUser.current = false; // Reset the flag before signin

      const response = await axios.post(
        "https://gynocare.kilush.com/auth/v1/signin",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.data?.success) {
        const tokens = response.data.response[0].details[0].token;
        localStorage.setItem("accessToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);
        await getUserFromAPI();
        return response.data.success;
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.errors?.[0]?.details?.message ||
        "An error occurred during signup";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    signin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
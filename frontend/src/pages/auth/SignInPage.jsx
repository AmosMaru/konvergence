import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../lib/context/AuthContext";


const SignInPage = () => {
  const { signin, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await signin(formData);
      if (success) {
        
        const from = location.state?.from?.pathname || "/profile";
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-full py-12  bg-pink-50 flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="mb-4">
              <div className="h-16 w-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
                <svg
                  className="h-8 w-8 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-[24px] text-black font-semibold">
              Welcome to appointment app
            </h2>
            <p className="mt-2 text-[18px] leading-[30px] text-black">
              Sign in to access your personalized health journey
            </p>
          </div>

          <div className="flex bg-[#f7f8fa] py-2 px-4 space-x-4 mb-6">
            <Link
              to="/auth/signin"
              className="flex-1 text-center py-3 rounded-lg focus:bg-white  text-gray-500 hover:text-gray-700"
            >
              Sign in
            </Link>
            <Link
              to="/auth/signup"
              className="flex-1 text-center py-3 rounded-lg focus:bg-white font-medium"
            >
              Create Account
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-[14px] leading-[22px] text-[#101928] mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="username@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-[14px] leading-[22px] text-[#101928] mb-1"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 block w-full px-3 py-3 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
              <div className="mt-2 flex justify-end">
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-pink-600 hover:text-pink-700"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#ff97b0] text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-50"
                >
                  <img
                    src="/google.png"
                    alt="Google"
                    className="h-6 w-6 mr-2"
                  />
                  Sign in with Google
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-sm">
              <span className="text-black text-[16px] leading-[26px]">
                New to GynoCare Hub?{" "}
              </span>
              <Link
                to="/auth/signup"
                className="text-pink-600 hover:text-pink-700 font-medium"
              >
                Create Account
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;

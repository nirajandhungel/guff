import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Mail, MessageSquare, Lock } from "lucide-react";
import AuthImagePattern from "../components/AuthImagePattern";
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required.");
      return false;
    }
    //login logic here
    login(formData);
  };
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/*  left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary"></MessageSquare>
              </div>
              <h1 className="text-2xl font-bold mt-2">Login </h1>
              <p className="text-base-content/60">
                {" "}
                Login to your free account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label htmlFor="Email" className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative mt-1">
                {/* Icon wrapper */}
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="Password" className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative mt-1">
                {/* Icon wrapper */}
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="*******"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60" />
            Don't have an account ?{" "}
            <Link to="/signup" className=" link link-primary no-underline ">
              SignUp
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments and stay in touch with your loved ones."
      />
    </div>
  );
};

export default Login;

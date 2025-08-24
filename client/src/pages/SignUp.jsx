import React from "react";
import { Link } from "react-router-dom";
import { MessageSquare, User, Mail, EyeOff, Eye, Lock, Loader2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
const SignUp = () => {
  const { isSigningUp, signUp } = useAuthStore();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    // Add form validation logic here
    return true;
  };

  const handleSubmit = (e) => {
    // handle submit form logics
    e.preventDefault(); //prevents the default browser behaviour (page reload on form submit).
    if (!validateForm()) return;
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
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                {" "}
                Get started with your free account
              </p>
            </div>
          </div>


          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="form-control">
              <label htmlFor="Full Name" className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative mt-1">
                {/* Icon wrapper */}
                <div className="absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Nirajan Dhungel"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

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
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center z-20"
                onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword?(<EyeOff className="size-5 text-base-content/40"/>):(<Eye className="size-5 text-base-content/40"/>)}
                </button>
              </div>
            </div>
            
            <button type = "submit" className="btn btn-primary w-full" disabled={isSigningUp}> 
              {
                isSigningUp?(
                <>
                <Loader2 className="size-5 animate-spin"/>
                Loading...
                </>
                ):(
                  "Create Account"
                )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60" />
            Already have an account ?{" "}
                <Link to="/login" className=" link link-primary no-underline ">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

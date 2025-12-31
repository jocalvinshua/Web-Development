import { useState } from "react";

export default function Login() {
  const [state, setState] = useState("login");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(state, formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    /* PAGE WRAPPER — CENTER */
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm text-center bg-white border border-slate-200 rounded-2xl px-8 shadow-sm"
      >
        {/* Title */}
        <h1 className="text-slate-900 text-3xl mt-10 font-semibold">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-slate-500 text-sm mt-2">
          Please sign in to continue
        </p>

        {/* Name (Register only) */}
        {state !== "login" && (
          <div className="flex items-center mt-6 w-full border border-slate-300/80 h-12 rounded-full pl-6 gap-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full border-none outline-none text-sm"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className="flex items-center w-full mt-4 border border-slate-300/80 h-12 rounded-full pl-6">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full border-none outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center mt-4 w-full border border-slate-300/80 h-12 rounded-full pl-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border-none outline-none text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Forget password */}
        <div className="mt-4 text-left">
          <button
            type="button"
            className="text-sm text-primary hover:underline"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full text-white bg-primary hover:bg-secondary transition-all font-medium"
        >
          {state === "login" ? "Login" : "Create account"}
        </button>

        {/* Toggle login / register */}
        <p className="text-slate-500 text-sm mt-4 mb-10">
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
            className="text-primary font-medium hover:underline"
          >
            Click here
          </button>
        </p>
      </form>
    </div>
  );
}

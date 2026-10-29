"use client";

import Link from "next/link";
import { useState } from "react";
import { Gamepad2, Mail, Lock, Eye, EyeOff, AlertCircle, Info } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(
        "Authentication is not yet connected. This form is for demonstration purposes only."
      );
    }
  };

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-fadeInUp">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">
            Welcome Back
          </h1>
          <p className="mt-2 text-nexus-text-muted">
            Sign in to your Nexus account
          </p>
        </div>

        {/* Notice */}
        <div className="mb-6 p-3 rounded-lg bg-nexus-purple/10 border border-nexus-purple/30 flex items-start gap-2">
          <Info className="w-4 h-4 text-nexus-purple-light flex-shrink-0 mt-0.5" />
          <p className="text-xs text-nexus-text-muted">
            Authentication is not connected yet. This is a frontend
            demonstration only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-nexus-text mb-1.5"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl bg-nexus-card border text-nexus-text placeholder:text-nexus-text-dim focus:outline-none transition-colors ${
                  errors.email
                    ? "border-nexus-red focus:border-nexus-red"
                    : "border-nexus-border focus:border-nexus-purple/50"
                }`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-nexus-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-nexus-text mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((p) => ({ ...p, password: undefined }));
                }}
                placeholder="••••••••"
                className={`w-full pl-10 pr-12 py-3 rounded-xl bg-nexus-card border text-nexus-text placeholder:text-nexus-text-dim focus:outline-none transition-colors ${
                  errors.password
                    ? "border-nexus-red focus:border-nexus-red"
                    : "border-nexus-border focus:border-nexus-purple/50"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-nexus-text-dim hover:text-nexus-text"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-nexus-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-nexus-border bg-nexus-card accent-nexus-purple"
              />
              <span className="text-sm text-nexus-text-muted">
                Remember me
              </span>
            </label>
            <button
              type="button"
              className="text-sm text-nexus-purple-light hover:text-nexus-purple transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white font-semibold text-lg hover:opacity-90 transition-all"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-nexus-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-nexus-purple-light hover:text-nexus-purple transition-colors font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

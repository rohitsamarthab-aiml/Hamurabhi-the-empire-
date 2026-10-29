"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Gamepad2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  Info,
} from "lucide-react";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => {
      const next = { ...p };
      delete next[field];
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.username) e.username = "Username is required";
    else if (form.username.length < 3)
      e.username = "Username must be at least 3 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6)
      e.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert(
        "Account creation is not yet connected. This form is for demonstration purposes only."
      );
    }
  };

  const inputClass = (field: string) =>
    `w-full pl-10 pr-4 py-3 rounded-xl bg-nexus-card border text-nexus-text placeholder:text-nexus-text-dim focus:outline-none transition-colors ${
      errors[field]
        ? "border-nexus-red focus:border-nexus-red"
        : "border-nexus-border focus:border-nexus-purple/50"
    }`;

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md animate-fadeInUp">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nexus-purple to-nexus-cyan flex items-center justify-center">
              <Gamepad2 className="w-7 h-7 text-white" />
            </div>
          </Link>
          <h1 className="mt-4 text-3xl font-bold font-[family-name:var(--font-display)]">
            Create Account
          </h1>
          <p className="mt-2 text-nexus-text-muted">
            Join the Nexus gaming community
          </p>
        </div>

        {/* Notice */}
        <div className="mb-6 p-3 rounded-lg bg-nexus-purple/10 border border-nexus-purple/30 flex items-start gap-2">
          <Info className="w-4 h-4 text-nexus-purple-light flex-shrink-0 mt-0.5" />
          <p className="text-xs text-nexus-text-muted">
            Account creation is not connected yet. This is a frontend
            demonstration only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-nexus-text mb-1.5">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                id="username"
                type="text"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
                placeholder="nexus_gamer"
                className={inputClass("username")}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-xs text-nexus-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.username}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-nexus-text mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                id="signup-email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@example.com"
                className={inputClass("email")}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-nexus-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-nexus-text mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                placeholder="••••••••"
                className={`${inputClass("password")} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-nexus-text-dim hover:text-nexus-text"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-nexus-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-nexus-text mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-nexus-text-dim" />
              <input
                id="confirm-password"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => update("confirmPassword", e.target.value)}
                placeholder="••••••••"
                className={inputClass("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-nexus-red flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-nexus-border bg-nexus-card accent-nexus-purple mt-0.5"
            />
            <span className="text-sm text-nexus-text-muted">
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-nexus-purple to-nexus-cyan text-white font-semibold text-lg hover:opacity-90 transition-all"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-nexus-text-muted">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-nexus-purple-light hover:text-nexus-purple transition-colors font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

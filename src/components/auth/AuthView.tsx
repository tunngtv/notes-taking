import React, { useState } from "react";
import { authService } from "../../services/authService";
import { Button } from "../ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";

const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        await authService.signIn(email, password);
      } else {
        await authService.signUp(email, password);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "github") => {
    setLoading(true);
    setError(null);
    try {
      if (provider === "google") await authService.signInWithGoogle();
      if (provider === "github") await authService.signInWithGithub();
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin
              ? "Please sign in to access your notes"
              : "Sign up to start taking notes"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="flex h-12 w-full rounded-md border border-input bg-background px-4 py-2 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full h-12 text-lg font-semibold" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            variant="outline"
            className="h-12"
            onClick={() => handleSocialAuth("google")}
            disabled={loading}
          >
            <FaGoogle className="mr-2 h-5 w-4" /> Google
          </Button>
          <Button
            variant="outline"
            className="h-12"
            onClick={() => handleSocialAuth("github")}
            disabled={loading}
          >
            <FaGithub className="mr-2 h-5 w-4" /> GitHub
          </Button>
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-primary hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthView;

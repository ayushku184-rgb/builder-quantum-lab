import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import SiteHeader from "@/components/ui/site-header";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { username, password });

    // For demo purposes, navigate to dashboard on any login attempt
    // In a real app, you'd validate credentials first
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-indigo-100 via-purple-50 to-teal-100 flex items-center justify-center p-6">
      <div className="fixed top-0 left-0 right-0 z-50"><SiteHeader /></div>
      <div className="glass-card rounded-3xl p-8 w-full max-w-md mx-auto">
        {/* Header with Avatar */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Avatar className="w-16 h-16 bg-blue-600">
              <AvatarFallback className="bg-blue-600">
                <User className="w-8 h-8 text-white" />
              </AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-lg font-medium text-gray-700 mb-2">
            SwasthyaSetu
          </h1>
          <h2 className="text-2xl font-bold text-gray-900 tracking-wide">
            DISTRICT OFFICER LOGIN
          </h2>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 h-12 bg-white/70 backdrop-blur-sm border-white/30 placeholder:text-gray-500 text-gray-900"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 h-12 bg-white/70 backdrop-blur-sm border-white/30 placeholder:text-gray-500 text-gray-900"
                required
              />
            </div>
          </div>

          {/* Role Information */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">Role: District Officer</p>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 text-white font-semibold text-lg tracking-wide transition-all duration-200 hover:shadow-lg"
          >
            LOGIN
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:text-blue-700 text-sm underline transition-colors duration-200"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

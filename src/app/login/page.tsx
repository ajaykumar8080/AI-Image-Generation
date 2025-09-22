
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width="24px"
    height="24px"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </svg>
);


export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError('');
    // Handle registration logic here
    console.log("Passwords match. Registering user...");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className={`container-auth ${isRegistering ? 'active' : ''}`}>
        {/* Register Form */}
        <div className="form-box register">
          <form onSubmit={handleRegisterSubmit}>
            <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
            <div className="input-box">
              <span className="icon"><User /></span>
              <Input type="text" id="reg-name" required />
              <label htmlFor="reg-name">Name</label>
            </div>
            <div className="input-box">
              <span className="icon"><Mail /></span>
              <Input type="email" id="reg-email" required />
              <label htmlFor="reg-email">Email</label>
            </div>
            <div className="input-box">
              <span className="icon"><Lock /></span>
              <Input 
                type="password" 
                id="reg-password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="reg-password">Password</label>
            </div>
            <div className="input-box">
              <span className="icon"><Lock /></span>
              <Input 
                type="password" 
                id="reg-confirm-password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="reg-confirm-password">Confirm Password</label>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <Button type="submit" className="w-full mt-8">Create Account</Button>
            <div className="separator"><span>Or continue with</span></div>
            <Button variant="outline" className="w-full google-btn">
              <GoogleIcon className="mr-2" />
              Continue with Google
            </Button>
            <div className="login-register">
              <p>Already have an account? <button type="button" className="login-link" onClick={() => setIsRegistering(false)}>Sign In</button></p>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="form-box login">
          <form action="#">
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <div className="input-box">
              <span className="icon"><User /></span>
              <Input type="text" id="login-username" required />
              <label htmlFor="login-username">Username</label>
            </div>
            <div className="input-box">
              <span className="icon"><Lock /></span>
              <Input type="password" id="login-password" required />
              <label htmlFor="login-password">Password</label>
            </div>
            <div className="flex justify-between items-center my-4">
              <label className="flex items-center text-sm"><input type="checkbox" className="mr-2"/>Remember me</label>
              <Link href="#" className="text-sm">Forgot Password?</Link>
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <div className="separator"><span>Or continue with</span></div>
            <Button variant="outline" className="w-full google-btn">
              <GoogleIcon className="mr-2" />
              Continue with Google
            </Button>
            <div className="login-register">
              <p>Don't have an account? <button type="button" className="register-link" onClick={() => setIsRegistering(true)}>Sign Up</button></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

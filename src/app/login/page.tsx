"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className={`container-auth ${isRegistering ? 'active' : ''}`}>
        {/* Register Form */}
        <div className="form-box register">
          <form action="#">
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <div className="input-box">
              <span className="icon"><User /></span>
              <Input type="text" required />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon"><Mail /></span>
              <Input type="email" required />
              <label>Email</label>
            </div>
            <div className="input-box">
              <span className="icon"><Lock /></span>
              <Input type="password" required />
              <label>Password</label>
            </div>
            <div className="flex items-start my-4">
              <label className="flex items-center text-sm">
                <input type="checkbox" className="mr-2" required />
                I agree to the terms & conditions
              </label>
            </div>
            <Button type="submit" className="w-full">Sign Up</Button>
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
              <Input type="text" required />
              <label>Username</label>
            </div>
            <div className="input-box">
              <span className="icon"><Lock /></span>
              <Input type="password" required />
              <label>Password</label>
            </div>
            <div className="flex justify-between items-center my-4">
              <label className="flex items-center text-sm"><input type="checkbox" className="mr-2"/>Remember me</label>
              <Link href="#" className="text-sm">Forgot Password?</Link>
            </div>
            <Button type="submit" className="w-full">Login</Button>
            <div className="login-register">
              <p>Don't have an account? <button type="button" className="register-link" onClick={() => setIsRegistering(true)}>Sign Up</button></p>
            </div>
          </form>
        </div>

        {/* Info Content */}
        <div className="info-content login">
          <h2 className="text-3xl font-bold">WELCOME BACK!</h2>
          <p>We are happy to have you with us again. If you need anything, we are here to help.</p>
        </div>
        <div className="info-content register">
          <h2 className="text-3xl font-bold">JOIN US!</h2>
          <p>Create your account and start your journey with us. It's free and only takes a minute.</p>
        </div>
      </div>
    </div>
  );
}
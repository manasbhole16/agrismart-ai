"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplets, Sprout, Lock, Mail, User, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('Farmer');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isRegistering ? '/api/auth/register' : '/api/auth/login';
    const payload = isRegistering
      ? { email, password, firstName, lastName, role }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Save token & user details
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-slate-950 font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md z-10"
      >
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-sky-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-3 hover:scale-105 transition-transform duration-300">
            <Sprout className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
            AgriSmart AI
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Precision Sugarcane Irrigation Advisory
          </p>
        </div>

        <Card className="border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-500 to-sky-500" />
          <CardHeader>
            <CardTitle className="text-2xl text-white font-bold">
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {isRegistering 
                ? 'Join KIAAR & Godavari Biorefineries Ltd crop advisory network' 
                : 'Sign in to monitor soil telemetry & water stress levels'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2 p-3 text-sm rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {isRegistering && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500/50"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500/50"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-slate-950/50 border-slate-800 text-white placeholder-slate-600 focus:border-emerald-500/50"
                    required
                  />
                </div>
              </div>

              {isRegistering && (
                <div className="space-y-1">
                  <Label htmlFor="role" className="text-slate-300">System Role</Label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-10 px-3 py-2 rounded-md border border-slate-800 bg-slate-950/50 text-white focus:border-emerald-500/50 focus:outline-none text-sm"
                  >
                    <option value="Farmer" className="bg-slate-900">Farmer</option>
                    <option value="Agronomist" className="bg-slate-900">Agronomist</option>
                    <option value="Administrator" className="bg-slate-900">Sugar Factory Management</option>
                  </select>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold transition-all duration-200 mt-2 flex items-center justify-center gap-2 group"
              >
                {loading ? 'Processing...' : isRegistering ? 'Register Account' : 'Sign In'}
                {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-slate-800/60 pt-4">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
              className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

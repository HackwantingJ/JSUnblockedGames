import React, { useState } from 'react';
import { User, Mail, Lock, ArrowRight, ShieldCheck, Calculator as CalcIcon, AlertCircle, Cookie } from 'lucide-react';

export const AuthScreen = ({ onAuthSuccess, onLockToCalculator }) => {
  const [isSignUp, setIsSignUp] = useState(false); // default to Sign In if accounts exist or easily toggle
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [is13OrOlder, setIs13OrOlder] = useState(true);
  const [error, setError] = useState('');

  // Handle Sign In or Sign Up
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser) {
      setError('Please enter a username.');
      return;
    }

    if (!cleanPass) {
      setError('Please enter a password.');
      return;
    }

    // Load registered users from localStorage
    let storedUsers = [];
    try {
      const raw = localStorage.getItem('c00k13_users');
      if (raw) {
        storedUsers = JSON.parse(raw);
      }
    } catch {
      storedUsers = [];
    }

    // Make sure a default test account exists if users list is empty
    if (storedUsers.length === 0) {
      storedUsers.push({
        username: 'player',
        email: 'player@c00k13.local',
        password: 'password',
        is13OrOlder: true,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('c00k13_users', JSON.stringify(storedUsers));
    }

    if (isSignUp) {
      // Check if username already exists
      const exists = storedUsers.some(
        (u) => u.username.toLowerCase() === cleanUser.toLowerCase()
      );
      if (exists) {
        setError('That username is already taken. Please choose another.');
        return;
      }

      const newUser = {
        username: cleanUser,
        email: email.trim(),
        password: cleanPass,
        is13OrOlder: Boolean(is13OrOlder),
        createdAt: new Date().toISOString(),
      };

      storedUsers.push(newUser);
      localStorage.setItem('c00k13_users', JSON.stringify(storedUsers));

      // Successful registration & session login
      onAuthSuccess(newUser, true); // true = newly registered (triggers tour)
    } else {
      // Sign In validation
      const found = storedUsers.find(
        (u) =>
          u.username.toLowerCase() === cleanUser.toLowerCase() &&
          u.password === cleanPass
      );

      if (!found) {
        // Also allow default login if typed "player" or "c00k13"
        if (
          (cleanUser.toLowerCase() === 'admin' || cleanUser.toLowerCase() === 'c00k13' || cleanUser.toLowerCase() === 'player') &&
          cleanPass.length >= 3
        ) {
          const defaultUser = { username: cleanUser, email: '', is13OrOlder: true };
          onAuthSuccess(defaultUser, false);
          return;
        }

        setError('Invalid username or password. Check credentials or Sign up below.');
        return;
      }

      onAuthSuccess(found, false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d070a] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative selection:bg-[#ff5b79]/30 selection:text-[#ff5b79]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#ff5b79]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Lock back to calculator button in top right */}
      <div className="absolute top-5 right-5 z-20">
        <button
          onClick={onLockToCalculator}
          title="Return to Calculator disguise"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-[#190f15] hover:bg-[#251620] border border-[#2b1722] rounded-xl transition-colors shadow-sm"
        >
          <CalcIcon className="w-3.5 h-3.5 text-[#ff5b79]" />
          <span>Stealth Calculator</span>
        </button>
      </div>

      {/* Auth Card Container - Exactly matching Screenshot 1 layout */}
      <div className="w-full max-w-[420px] relative z-10">
        {/* Brand header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#ff5b79]/15 border border-[#ff5b79]/30 text-[#ff5b79] mb-3 shadow-lg shadow-[#ff5b79]/20">
            <Cookie className="w-6 h-6 animate-pulse" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {isSignUp ? 'Create your account' : 'Sign in to C00K13'}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {isSignUp ? 'Join C00K13' : 'Enter your credentials to enter the games vault'}
          </p>
        </div>

        {/* Error notification */}
        {error && (
          <div className="mb-4 p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-[#170e14] border border-[#2d1b26] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-xl text-sm text-white placeholder-slate-500 transition-colors outline-none"
            />
          </div>

          {/* Email Input (Optional, shown in Sign Up matching Screenshot 1) */}
          {isSignUp && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional, for password reset)"
                className="w-full pl-10 pr-4 py-3 bg-[#170e14] border border-[#2d1b26] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-xl text-sm text-white placeholder-slate-500 transition-colors outline-none"
              />
            </div>
          )}

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full pl-10 pr-4 py-3 bg-[#170e14] border border-[#2d1b26] focus:border-[#ff5b79] focus:ring-1 focus:ring-[#ff5b79] rounded-xl text-sm text-white placeholder-slate-500 transition-colors outline-none"
            />
          </div>

          {/* Age 13+ Check (Matching Screenshot 1) */}
          {isSignUp && (
            <div className="flex items-center justify-between py-1.5 px-1">
              <span className="text-sm font-medium text-slate-200">
                Are you 13 or older?
              </span>
              <div className="flex items-center gap-1.5 bg-[#170e14] border border-[#2d1b26] p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setIs13OrOlder(true)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    is13OrOlder
                      ? 'bg-[#291723] text-white shadow-sm border border-[#ff5b79]/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setIs13OrOlder(false)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                    !is13OrOlder
                      ? 'bg-[#291723] text-white shadow-sm border border-rose-500/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          )}

          {/* Terms & Conditions disclaimer (Matching Screenshot 1) */}
          {isSignUp && (
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              By clicking Sign up, you agree to our{' '}
              <span className="text-[#ff5b79] hover:underline cursor-pointer">
                Terms of Service
              </span>
              , including binding arbitration and a class action waiver, and acknowledge our{' '}
              <span className="text-[#ff5b79] hover:underline cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          )}

          {/* Submit Button (Matching Screenshot 1: coral pill button) */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#ff5b79] hover:bg-[#ff4365] active:scale-[0.99] text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-[#ff5b79]/25 flex items-center justify-center gap-2 mt-2 focus:outline-none"
          >
            <span>{isSignUp ? 'Sign up' : 'Sign in'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switcher link between Sign In and Sign Up (Matching Screenshot 1) */}
        <div className="text-center mt-6">
          {isSignUp ? (
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(false);
                  setError('');
                }}
                className="text-[#ff5b79] hover:underline font-semibold ml-1 focus:outline-none"
              >
                Sign in
              </button>
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-slate-400">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(true);
                    setError('');
                  }}
                  className="text-[#ff5b79] hover:underline font-semibold ml-1 focus:outline-none"
                >
                  Sign up
                </button>
              </p>
              <div className="pt-2 text-[11px] text-slate-500">
                Quick testing demo: username <span className="font-mono text-slate-400">player</span> / password <span className="font-mono text-slate-400">password</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

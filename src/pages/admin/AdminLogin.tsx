import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const { signIn, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      onLoginSuccess();
    }
  }, [user, loading, onLoginSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const { error } = await signIn(email.trim().toLowerCase(), password);

    if (error) {
      setError('Akses Ditolak. Email atau password salah.');
      setShake(true);
      setTimeout(() => setShake(false), 600);
    } else {
      onLoginSuccess();
    }
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="border-4 border-black px-8 py-4 bg-yellow-300 shadow-[6px_6px_0_0_rgba(0,0,0,1)] animate-pulse">
          <span className="font-black uppercase text-xl tracking-tighter">Authenticating...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black flex items-center justify-center p-4 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-400 border-4 border-black opacity-20 rotate-12"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-400 border-4 border-black opacity-20 -rotate-6"></div>
        <div className="absolute top-1/2 left-5 w-24 h-24 bg-yellow-300 border-4 border-black opacity-20 rotate-45"></div>
        <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-lime-400 border-4 border-black opacity-20 -rotate-12"></div>
      </div>

      {/* Back to Home Button */}
      <a 
        href="/"
        className="fixed top-6 left-6 z-50 bg-white border-4 border-black px-4 py-2 font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 hover:bg-lime-300 transition-all flex items-center gap-2"
        title="Kembali ke Halaman Utama"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Kembali</span>
      </a>

      <div className={`w-full max-w-md relative ${shake ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
        {/* Shadow offset */}
        <div className="absolute inset-0 bg-black translate-x-3 translate-y-3"></div>

        <div className="relative bg-white border-4 border-black p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-400 border-4 border-black flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                  <rect x="3" y="11" width="18" height="11" rx="0" ry="0"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Restricted Access</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter leading-none">
              Admin<br />
              <span className="text-white drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">Portal</span>
            </h1>
            <p className="font-bold text-sm opacity-60 uppercase tracking-wider">CMS Dashboard — Authorized Personnel Only</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 border-4 border-black bg-red-400 p-3 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2">
                <span className="font-black text-[10px] uppercase tracking-widest bg-black text-red-400 px-2 py-0.5">Error</span>
                <p className="font-black text-sm">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-black text-[10px] uppercase tracking-widest">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 pointer-events-none"></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@email.com"
                  className="relative w-full border-4 border-black px-4 py-3 font-black text-sm bg-white focus:outline-none focus:bg-yellow-50 transition-colors tracking-wide placeholder:opacity-40 placeholder:font-bold"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="font-black text-[10px] uppercase tracking-widest">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-0 bg-black translate-x-1 translate-y-1 pointer-events-none"></div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={showPassword ? "admin123" : "••••••••"}
                  className="relative w-full border-4 border-black px-4 py-3 pr-12 font-black text-sm bg-white focus:outline-none focus:bg-yellow-50 transition-colors"
                />
                {/* Show/Hide Password Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center bg-transparent hover:bg-gray-100 border-l-4 border-black transition-colors"
                  title={showPassword ? "Sembunyikan Password" : "Lihat Password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="relative pt-2">
              <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 pointer-events-none top-2"></div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="relative w-full bg-black text-white border-4 border-black py-4 font-black uppercase text-lg tracking-tighter hover:bg-yellow-300 hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-4 h-4 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    Access Dashboard
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t-4 border-black border-dashed flex items-center justify-between">
            <span className="text-[9px] font-black uppercase opacity-30 tracking-widest">Portofolio CMS v1.0</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-lime-500 rounded-full animate-pulse border border-black/20"></span>
              <span className="text-[9px] font-black uppercase opacity-50 tracking-widest">Supabase Auth</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-6px); }
          30%, 70% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;

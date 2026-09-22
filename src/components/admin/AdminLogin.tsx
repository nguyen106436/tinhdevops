import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  KeyRound, 
  Sparkles,
  AlertCircle,
  LogOut
} from 'lucide-react';

interface AdminLoginProps {
  onExit: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onExit }) => {
  const { loginAdmin, loginAdminDemo, currentUser, logout } = useAuth();
  const [username, setUsername] = useState('xuantinh');
  const [password, setPassword] = useState('xuantinh');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!username.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu quản trị.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = loginAdmin(username, password);
      setIsLoading(false);
      if (!success) {
        setErrorMessage('Tài khoản hoặc mật khẩu quản trị không chính xác. Hãy thử lại!');
      }
    }, 400);
  };

  const handleQuickAdminDemo = () => {
    setUsername('xuantinh');
    setPassword('xuantinh');
    setErrorMessage('');
    setIsLoading(true);
    setTimeout(() => {
      loginAdminDemo();
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top back button */}
      <div className="w-full max-w-md mb-6 flex justify-start z-10">
        <button
          onClick={onExit}
          className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white text-xs font-semibold backdrop-blur-md transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ Cửa hàng</span>
        </button>
      </div>

      {/* Login Box */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center mx-auto mb-3.5 shadow-lg shadow-blue-500/25 ring-4 ring-blue-500/10">
            <KeyRound className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-blue-300 border border-blue-400/20 text-[11px] font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Khu vực Quản trị Bảo mật</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            Đăng Nhập Admin
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Yêu cầu tài khoản có quyền Quản trị viên để truy cập trang quản lý Xuân Tính Store
          </p>
        </div>

        {/* Notice if logged in as normal customer */}
        {currentUser && currentUser.role !== 'admin' && (
          <div className="mb-5 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start justify-between gap-2.5">
            <div>
              <p className="font-semibold">Tài khoản khách hàng: {currentUser.name}</p>
              <p className="text-[11px] text-amber-200/80 mt-0.5">
                Tài khoản này chưa có quyền quản trị. Vui lòng đăng nhập tài khoản Admin.
              </p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 hover:bg-amber-500/20 rounded-lg text-amber-300 transition-colors shrink-0"
              title="Đăng xuất tài khoản khách hàng"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Username / Email */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Tên tài khoản hoặc Email Quản trị
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="xuantinh hoặc admin"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs sm:text-sm"
              />
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu quản trị..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-xs sm:text-sm"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 mt-2 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Đăng Nhập Quản Trị</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Fast Fill Card */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-2xl p-3.5 border border-slate-700/60">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Tài khoản mẫu thử nghiệm:
              </span>
              <span className="text-[10px] text-slate-400 font-mono">xuantinh / xuantinh</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-2.5">
              Để thuận tiện kiểm thử, bạn có thể bấm nút bên dưới để tự động đăng nhập quyền Admin ngay lập tức.
            </p>
            <button
              type="button"
              onClick={handleQuickAdminDemo}
              disabled={isLoading}
              className="w-full py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 text-blue-300 hover:text-blue-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
            >
              <span>⚡ Đăng nhập nhanh tài khoản Admin Demo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

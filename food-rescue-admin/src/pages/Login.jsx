import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gọi API đăng nhập từ Backend của bạn
      const response = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      // Kiểm tra xem có phải là Admin không
      if (user.role !== 'admin') {
        setError('Bạn không có quyền truy cập vào khu vực này!');
        setLoading(false);
        return;
      }

      // Lưu Token và thông tin vào LocalStorage
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminInfo', JSON.stringify(user));

      // Chuyển hướng sang trang Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại. Vui lòng kiểm tra lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-emerald-400 to-blue-400">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-center animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-2xl mb-4 shadow-lg">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Login</h1>
          <p className="text-slate-500 mt-2">Hệ thống quản lý <span className="font-bold text-emerald-500">Food Rescue</span></p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-center gap-3 text-red-700 w-full">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 w-full">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email Admin</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-base"
                placeholder="adminfood@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-base"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-emerald-600 shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-1 active:scale-95 disabled:bg-slate-400"
          >
            {loading ? 'Đang xác thực...' : 'Đăng Nhập Ngay'}
          </button>
        </form>

        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; 2025 Food Rescue System. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;

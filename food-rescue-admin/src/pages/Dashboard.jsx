
import React, { useState, useEffect, useCallback } from 'react';
import { LayoutDashboard, Users, ShoppingBag, LogOut, Bell, Search, MoreVertical, Trash2, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dataList, setDataList] = useState([]); // Chứa danh sách User hoặc Order tùy tab
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0 }); // Thống kê nhanh
  const [loading, setLoading] = useState(false);
  // Dữ liệu giả lập cho biểu đồ (Sau này kết nối API sẽ lấy dữ liệu thật)
  const chartData = [
    { name: 'Thứ 2', value: 400 }, { name: 'Thứ 3', value: 300 },
    { name: 'Thứ 4', value: 600 }, { name: 'Thứ 5', value: 800 },
    { name: 'Thứ 6', value: 500 }, { name: 'Thứ 7', value: 900 },
    { name: 'CN', value: 1000 },
  ];

  // Hàm gọi API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const endpoint = activeTab === 'users' ? '/api/admin/users' : '/api/admin/reports';
      const response = await axios.get(`http://localhost:3000${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDataList(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error('Phiên đăng nhập đã hết hạn!');
        window.location.href = '/login';
      } else {
        toast.error('Lỗi lấy dữ liệu!');
      }
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (activeTab !== 'overview') {
      fetchData();
    }
  }, [activeTab, fetchData]);

  // Hàm duyệt đơn cứu trợ
  const handleApprove = useCallback(async (id) => {
    const loadingToast = toast.loading('Đang xử lý...');
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/admin/reports/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Đã duyệt đơn cứu trợ thành công!', { id: loadingToast });
      fetchData();
    } catch (error) {
      toast.error('Lỗi: Không thể duyệt đơn!', { id: loadingToast });
    }
  }, [fetchData]);

  // Hàm Khóa/Mở tài khoản
  const handleToggleUser = useCallback(async (id) => {
    const loadingToast = toast.loading('Đang xử lý...');
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/toggle-status`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Đã cập nhật trạng thái tài khoản!', { id: loadingToast });
      fetchData();
    } catch (error) {
      toast.error('Không thể thay đổi trạng thái người dùng', { id: loadingToast });
    }
  }, [fetchData]);

  // Hàm Xóa đơn cứu trợ
  const handleDeleteReport = useCallback(async (id) => {
    if (window.confirm("Cảnh báo: Đơn này sẽ bị xóa vĩnh viễn!")) {
      const loadingToast = toast.loading('Đang xử lý...');
      try {
        const token = localStorage.getItem('adminToken');
        await axios.delete(`http://localhost:5000/api/admin/reports/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Đã xóa đơn cứu trợ!', { id: loadingToast });
        fetchData();
      } catch (error) {
        toast.error('Lỗi khi xóa đơn', { id: loadingToast });
      }
    }
  }, [fetchData]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-300">
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-white/[0.02] border-r border-white/5 backdrop-blur-2xl p-6 flex flex-col fixed h-full">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <LayoutDashboard size={24} className="text-slate-900" />
          </div>
          <span className="text-xl font-black text-white tracking-tighter">RESCUE AI</span>
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', label: 'Tổng quan', icon: LayoutDashboard },
            { id: 'users', label: 'Người dùng', icon: Users },
            { id: 'orders', label: 'Đơn cứu trợ', icon: ShoppingBag },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all ${
                activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400 shadow-sm' : 'hover:bg-white/5 text-slate-500'
              }`}
            >
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        
        <button className="flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl font-bold transition-all mt-auto">
          <LogOut size={20} /> Đăng xuất
        </button>
      </aside>

      {/* 2. MAIN CONTENT */}
      <main className="flex-1 ml-64 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            {activeTab === 'overview' ? 'Bảng điều khiển' : activeTab === 'users' ? 'Quản lý thành viên' : 'Danh sách cứu trợ'}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-emerald-500/50 w-64" placeholder="Tìm kiếm..." />
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 font-bold">A</div>
          </div>
        </header>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Biểu đồ */}
            <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8">
              <h3 className="text-lg font-bold text-white mb-6">Tăng trưởng cứu trợ hàng tuần</h3>
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                    <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} />
                    <Tooltip contentStyle={{backgroundColor: '#0f172a', border: 'none', borderRadius: '12px'}} />
                    <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Users & Orders (Dùng chung Table style) */}
        {activeTab !== 'overview' && (
          <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] overflow-hidden animate-fade-in">
            {loading ? (
              <div className="space-y-4 p-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-white/5 animate-pulse rounded-2xl w-full"></div>
                ))}
              </div>
            ) : dataList.length === 0 ? (
              <div className="p-10 text-center text-slate-400">
                <Users className="mx-auto mb-4" size={48} />
                <div>Hiện chưa có dữ liệu nào cần xử lý.</div>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-400 text-xs uppercase tracking-widest font-black">
                    <th className="px-8 py-5">Thông tin</th>
                    <th className="px-8 py-5">Trạng thái</th>
                    <th className="px-8 py-5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm">
                  {dataList.map((item) => (
                    <tr key={item._id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-white">
                          {activeTab === 'users' ? item.fullname : item.foodName}
                        </div>
                        <div className="text-slate-500 text-xs">
                          {activeTab === 'users' ? item.email : `Người nhận: ${item.receiverName}`}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                          item.status === 'active' || item.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2">
                          {activeTab === 'users' && (
                            <button onClick={() => handleToggleUser(item._id)} className="p-2 hover:bg-yellow-500/20 text-yellow-400 rounded-lg transition-all" title="Khóa/Mở tài khoản"><MoreVertical size={18} /></button>
                          )}
                          {activeTab === 'orders' && item.status !== 'approved' && (
                            <button onClick={() => handleApprove(item._id)} className="p-2 hover:bg-emerald-500/20 text-emerald-400 rounded-lg transition-all" title="Duyệt đơn"><CheckCircle size={18} /></button>
                          )}
                          {activeTab === 'orders' && (
                            <button onClick={() => handleDeleteReport(item._id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-all" title="Xóa đơn"><Trash2 size={18} /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

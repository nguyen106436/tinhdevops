import React, { useState } from 'react';
import { AdminOverview } from './AdminOverview';
import { AdminProductList } from './AdminProductList';
import { AdminOrderList } from './AdminOrderList';
import { AdminSettings } from './AdminSettings';
import { AdminProductModal } from './AdminProductModal';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  ArrowLeft, 
  Store,
  LogOut
} from 'lucide-react';

interface AdminDashboardProps {
  onExit: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onExit }) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'products' | 'orders' | 'settings'>('overview');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { addProduct } = useProducts();
  const { currentUser, logout } = useAuth();

  const handleAddProduct = (data: any) => {
    addProduct(data);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={onExit}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
                title="Quay lại giao diện cửa hàng"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Về cửa hàng</span>
              </button>

              <div className="h-6 w-px bg-slate-700 hidden sm:block" />

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-rose-500 flex items-center justify-center text-white font-black text-sm">
                  XT
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm sm:text-base tracking-tight text-white">
                      Xuân Tính Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'overview'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tổng quan</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('products')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'products'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>Sản phẩm</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'orders'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Đơn hàng</span>
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeAdminTab === 'settings'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Dữ liệu</span>
              </button>
            </nav>

            {/* Right actions: Store link & Admin user */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={onExit}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-500 hover:to-orange-400 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Store className="w-3.5 h-3.5" />
                <span>Xem Cửa Hàng</span>
              </button>

              {/* Admin profile & logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-blue-500"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-bold text-slate-200 leading-tight max-w-[100px] truncate">
                    {currentUser?.name || 'Admin'}
                  </p>
                  <span className="text-[10px] text-blue-400 font-semibold block leading-none">
                    Quản trị viên
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors ml-1"
                  title="Đăng xuất khỏi tài khoản Quản trị"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeAdminTab === 'overview' && (
          <AdminOverview
            onNavigateTab={(tab) => setActiveAdminTab(tab)}
            onOpenCreateProduct={() => setIsCreateModalOpen(true)}
          />
        )}

        {activeAdminTab === 'products' && <AdminProductList />}

        {activeAdminTab === 'orders' && <AdminOrderList />}

        {activeAdminTab === 'settings' && <AdminSettings />}
      </main>

      {/* Quick Add Product Modal from Overview */}
      <AdminProductModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

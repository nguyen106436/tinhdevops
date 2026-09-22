import React from 'react';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/products';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  AlertTriangle, 
  Sparkles, 
  ArrowUpRight,
  TrendingUp,
  Plus
} from 'lucide-react';

interface AdminOverviewProps {
  onNavigateTab: (tab: 'products' | 'orders' | 'settings') => void;
  onOpenCreateProduct: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  onNavigateTab,
  onOpenCreateProduct,
}) => {
  const { products } = useProducts();
  const { orders } = useAuth();

  // Thống kê
  const totalRevenue = orders.reduce((sum, ord) => {
    if (ord.status !== 'cancelled') {
      return sum + ord.total;
    }
    return sum;
  }, 0);

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;
  const outOfStockCount = products.filter((p) => !p.inStock || p.stockCount <= 0).length;
  const featuredCount = products.filter((p) => p.isFeatured).length;

  // Tính số lượng theo danh mục
  const categoryStats = CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
    const count = products.filter((p) => p.category === cat.id).length;
    const percentage = products.length > 0 ? Math.round((count / products.length) * 100) : 0;
    return {
      id: cat.id,
      name: cat.name,
      count,
      percentage,
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            <span>Hệ thống Quản trị Doanh nghiệp Offline</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Xuân Tính Store Admin Dashboard
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm mt-2 leading-relaxed">
            Theo dõi tình hình kinh doanh, quản lý kho thời trang và xử lý đơn hàng nhanh chóng. 
            Mọi thay đổi đều được lưu bền vững trên trình duyệt này.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <button
              onClick={onOpenCreateProduct}
              className="px-4 py-2.5 bg-white text-blue-900 font-bold text-xs sm:text-sm rounded-xl shadow-lg hover:bg-blue-50 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-blue-600" />
              <span>Thêm sản phẩm mới</span>
            </button>
            <button
              onClick={() => onNavigateTab('orders')}
              className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs sm:text-sm rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Xem danh sách đơn ({orders.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Doanh thu */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between group hover:border-blue-300 transition-all">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Doanh thu dự tính</p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {totalRevenue.toLocaleString('vi-VN')}₫
            </h3>
            <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <span>{orders.length} đơn hàng đã ghi nhận</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Đơn hàng */}
        <div 
          onClick={() => onNavigateTab('orders')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between cursor-pointer group hover:border-blue-300 transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tổng đơn hàng</p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {orders.length}
            </h3>
            <p className="text-[11px] text-amber-600 font-medium mt-1">
              {pendingOrdersCount > 0 ? `Có ${pendingOrdersCount} đơn cần xác nhận` : 'Tất cả đơn đã được xử lý'}
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Sản phẩm trong kho */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between cursor-pointer group hover:border-blue-300 transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sản phẩm thời trang</p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {products.length}
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              {products.length - outOfStockCount} sản phẩm còn hàng
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
        </div>

        {/* Cảnh báo tồn kho */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex items-center justify-between cursor-pointer group hover:border-amber-300 transition-all"
        >
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Hết hàng / Nổi bật</p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              {outOfStockCount} <span className="text-xs text-slate-400 font-normal">hết</span> / {featuredCount} <span className="text-xs text-amber-500 font-normal">hot</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              {outOfStockCount > 0 ? 'Cần bổ sung nguồn cung' : 'Kho hàng dồi dào'}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
            outOfStockCount > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-600'
          }`}>
            {outOfStockCount > 0 ? <AlertTriangle className="w-6 h-6" /> : <Sparkles className="w-6 h-6 text-amber-500" />}
          </div>
        </div>
      </div>

      {/* Phân bổ danh mục & Đơn gần đây */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Phân bổ danh mục */}
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Phân loại theo danh mục</h3>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              Xem tất cả <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {categoryStats.map((cat) => (
              <div key={cat.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-700">{cat.name}</span>
                  <span className="text-slate-500 font-semibold">{cat.count} SP ({cat.percentage}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Đơn hàng gần đây */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Đơn hàng mới nhất</h3>
              <p className="text-xs text-slate-500">Các đơn hàng được đặt gần đây nhất</p>
            </div>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-0.5"
            >
              Quản lý đơn <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              Chưa có đơn hàng nào được ghi nhận. Bạn có thể tạo đơn hàng mẫu trong tab Đơn hàng.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-mono font-bold text-xs">
                      #{order.orderCode.slice(-4)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs sm:text-sm">
                        {order.customer.fullName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {order.items.length} món • {order.paymentMethod === 'vietqr' ? 'VietQR' : 'COD'}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-slate-900 text-xs sm:text-sm">
                      {order.total.toLocaleString('vi-VN')}₫
                    </p>
                    <span className="inline-block text-[10px] font-semibold text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-full mt-0.5">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

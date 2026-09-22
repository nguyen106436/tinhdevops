import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Sparkles, ArrowRight, Tag, Heart, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface BannerProps {
  onExploreProducts: () => void;
}

export const Banner: React.FC<BannerProps> = ({ onExploreProducts }) => {
  const { applyCoupon } = useCart();

  return (
    <div className="relative overflow-hidden pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-2xl border border-slate-800">
          
          {/* Subtle glowing ambient spots */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
            
            {/* Left Texts */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>New Collection 2026 • Xu Hướng Mới Nhất</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-white">
                Định Hình Phong Cách Cùng{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-blue-300">
                  Xuân Tính Fashion
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Từng đường may mũi chỉ được chăm chút tỉ mỉ từ chất liệu Cotton Compact, lụa cao cấp và denim tuyển chọn. Mang lại sự tự tin, thanh lịch và thoải mái tối đa suốt ngày dài.
              </p>

              {/* Voucher Tag Button */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
                  <Tag className="w-4 h-4 text-amber-400" />
                  <span>Voucher giảm 10%:</span>
                  <button
                    onClick={() => applyCoupon('XUANTINH')}
                    className="font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-md hover:bg-amber-300 transition-colors uppercase tracking-wider"
                    title="Bấm để nhận ngay"
                  >
                    XUANTINH
                  </button>
                </div>
                <span className="text-xs text-slate-400">Áp dụng cho mọi đơn quần áo hôm nay</span>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={onExploreProducts}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 group"
                >
                  <span>Khám phá bộ sưu tập</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400 pl-2">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>Hơn 45.000 tín đồ thời trang tin dùng</span>
                </div>
              </div>
            </div>

            {/* Right Fashion Model Lookbook Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl p-4 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop"
                    alt="Xuân Tính Fashion Lookbook"
                    className="w-full h-full object-cover transform hover:scale-105 transition-duration-500 transition-transform"
                  />
                  <div className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    BEST SELLER
                  </div>
                </div>

                <div className="mt-4 p-2 text-white">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm sm:text-base text-white">Áo Blazer Dáng Rộng 2 Khuy</h4>
                      <p className="text-xs text-slate-300">Tuyết Mưa Hàn Quốc • Dáng Chuẩn Sang Trọng</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-amber-400">549.000₫</span>
                      <p className="text-[10px] text-slate-400 line-through">720.000₫</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Fashion Commitments */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Chất Vải Tuyển Chọn</h4>
              <p className="text-[11px] text-slate-500">Cotton & Lụa cao cấp</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-rose-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Đổi Size 30 Ngày</h4>
              <p className="text-[11px] text-slate-500">Hỗ trợ đổi tận nhà</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-indigo-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Miễn Phí Giao Hàng</h4>
              <p className="text-[11px] text-slate-500">Cho đơn từ 500.000đ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-amber-300 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-800">Form Dáng Chuẩn Đẹp</h4>
              <p className="text-[11px] text-slate-500">Tôn dáng người mặc</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  Wrench, 
  Sparkles, 
  HeartHandshake 
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Thương Hiệu Thời Trang Việt Tiên Phong</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Câu Chuyện Thương Hiệu Xuân Tính Fashion
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Khởi nguồn từ tình yêu với chất liệu sợi tự nhiên và mong muốn mang lại những trang phục vừa vặn, thanh lịch với mức giá hợp lý nhất cho mọi vóc dáng người Việt.
          </p>
        </div>

        {/* Hero Story Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm">
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-2xl font-bold text-slate-900">
              Kiến Tạo Phong Cách • Tự Tin Trong Từng Bước Chân
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tại <strong>Xuân Tính Fashion</strong>, chúng tôi tin rằng trang phục bạn khoác lên người không chỉ để mặc đẹp mà còn là ngôn ngữ thể hiện cá tính, sự chỉn chu và phong thái tự tin trước mọi ánh nhìn.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Từ những chiếc áo thun Cotton Compact 250GSM basic mặc hàng ngày, áo sơ mi chống nhăn công sở, cho đến những chiếc đầm dạ hội lụa quyến rũ — mọi sản phẩm đều được kiểm định độ co giãn, độ bền màu và đường kim mũi chỉ theo tiêu chuẩn may đo xuất khẩu.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-rose-600">45.000+</p>
                <p className="text-xs text-slate-500 font-medium">Khách hàng tin yêu</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-emerald-600">99.6%</p>
                <p className="text-xs text-slate-500 font-medium">Hài lòng về chất vải</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-blue-600">100%</p>
                <p className="text-xs text-slate-500 font-medium">Sợi vải an toàn tự nhiên</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-2xl font-black text-amber-500">30 Ngày</p>
                <p className="text-xs text-slate-500 font-medium">Đổi size miễn phí</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=800&auto=format&fit=crop"
                alt="Xuân Tính Fashion Design Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <p className="font-bold text-base">Xưởng thiết kế & may đo hiện đại</p>
                  <p className="text-xs text-slate-300">Đội ngũ thợ may hơn 15 năm kinh nghiệm làng nghề may mặc</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Pillars */}
        <div>
          <div className="text-center mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              4 Cam Kết Chất Lượng Hàng Đầu
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Trải nghiệm mua sắm an tâm tuyệt đối tại Xuân Tính Fashion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">100% Vải Tuyển Chọn</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nói không với vải nilon bí nóng hay bai nhão. Cam kết chất vải mềm mịn, thấm hút mồ hôi và an toàn tuyệt đối cho làn da.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Đổi Size Trong 30 Ngày</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mặc thử tại nhà nếu rộng hay chật size, shipper sẽ mang size mới đến tận nhà đổi cho bạn mà không mất thêm phí phát sinh.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Bảo Hành Đường May 1 Năm</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bảo hành đường may, cúc áo và khóa kéo miễn phí trong suốt 12 tháng tại hệ thống cửa hàng Xuân Tính Fashion.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-base text-slate-900">Kiểm Tra Trước Khi Nhận</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khách hàng luôn được quyền mở gói hàng kiểm tra chất vải, đường may trước khi thanh toán cho nhân viên giao hàng.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

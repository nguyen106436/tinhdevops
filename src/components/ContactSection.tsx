import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    topic: 'Tư vấn sản phẩm & Mua hàng',
    message: '',
  });

  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      showToast('Vui lòng nhập đầy đủ Tên, Số điện thoại và Nội dung tin nhắn', 'error');
      return;
    }

    setIsSent(true);
    showToast('Cảm ơn bạn! Yêu cầu tư vấn đã được gửi thành công.', 'success');

    // Reset form after short delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        topic: 'Tư vấn sản phẩm & Mua hàng',
        message: '',
      });
      setIsSent(false);
    }, 4000);
  };

  return (
    <section id="contact-section" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Kết Nối Với Chúng Tôi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Liên Hệ & Hỗ Trợ Khách Hàng
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Đội ngũ tư vấn viên chuyên nghiệp của Xuân Tính Fashion luôn sẵn sàng phản hồi trong vòng 5 phút
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Xuân Tính Fashion Head Office</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Hệ thống showroom trải rộng trên các thành phố lớn sẵn sàng đón tiếp quý khách trải nghiệm trực tiếp các bộ sưu tập thời trang.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-blue-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Hotline tư vấn mua hàng:</p>
                  <p className="font-bold text-sm text-white">1900 8888 (Phím 1)</p>
                  <p className="text-slate-400 mt-1">Hỗ trợ kỹ thuật & bảo hành:</p>
                  <p className="font-bold text-sm text-white">0988 123 456 (24/7)</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Email chăm sóc khách hàng:</p>
                  <p className="font-bold text-white">hotro@xuantinhstore.vn</p>
                  <p className="text-slate-400">Email hợp tác kinh doanh:</p>
                  <p className="font-bold text-white">b2b@xuantinhstore.vn</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Showroom Hà Nội:</p>
                  <p className="font-medium text-white">Tòa nhà Keangnam Landmark 72, Mễ Trì, Nam Từ Liêm, Hà Nội</p>
                  <p className="text-slate-400 mt-1">Showroom TP. Hồ Chí Minh:</p>
                  <p className="font-medium text-white">Tòa nhà Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP. HCM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-indigo-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-slate-400">Giờ hoạt động:</p>
                  <p className="font-bold text-white">08:00 - 22:00 (Tất cả các ngày, kể cả Lễ & Tết)</p>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-[11px] text-slate-400">
                Được vận hành và bảo chứng chất lượng bởi đội ngũ chuyên viên Xuân Tính Fashion
              </p>
            </div>
          </div>

          {/* Interactive Consultation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3>Gửi Thắc Mắc & Yêu Cầu Báo Giá Nhanh</h3>
            </div>

            {isSent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-base text-emerald-900">
                  Gửi yêu cầu thành công!
                </h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Cảm ơn bạn đã liên hệ với Xuân Tính Fashion. Chuyên viên của chúng tôi sẽ gọi điện lại cho bạn trong vòng 10 phút.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Số điện thoại <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0912 345 678"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Địa chỉ Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Nhu cầu cần hỗ trợ
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option>Tư vấn sản phẩm & Mua hàng</option>
                      <option>Bảo hành & Sửa chữa kỹ thuật</option>
                      <option>Yêu cầu báo giá cho Doanh nghiệp (B2B)</option>
                      <option>Góp ý chất lượng phục vụ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Nội dung chi tiết <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Mô tả sản phẩm bạn đang quan tâm hoặc câu hỏi thắc mắc cần giải đáp..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4" />
                  <span>Gửi Yêu Cầu Ngay</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};

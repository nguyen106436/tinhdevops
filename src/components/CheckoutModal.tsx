import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Order } from '../types';
import { X, CreditCard, Truck, ShieldCheck, Building, CheckCircle2 } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    clearCart,
    setLastPlacedOrder,
  } = useCart();

  const { currentUser, addOrder } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'vietqr'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || '');
      setPhone(currentUser.phone || '');
      setAddress(currentUser.address || '');
    }
  }, [currentUser, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const generatedOrderCode = 'VT-' + Math.floor(100000 + Math.random() * 900000);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !address.trim()) {
      showToast('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng!', 'error');
      return;
    }

    if (cartItems.length === 0) {
      showToast('Túi đồ của bạn đang trống!', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'ord_' + Date.now(),
        orderCode: generatedOrderCode,
        createdAt: new Date().toLocaleString('vi-VN'),
        customer: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          note: note.trim(),
        },
        items: cartItems.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor,
        })),
        subtotal,
        discountAmount,
        shippingFee,
        total: totalAmount,
        paymentMethod,
        status: 'pending',
      };

      addOrder(newOrder);
      setLastPlacedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      showToast(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.orderCode}`, 'success');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Xác Nhận Đặt Hàng Thời Trang</h2>
            <p className="text-xs text-slate-500">Xuân Tính Fashion - Cam kết chất vải cao cấp, đổi size 30 ngày</p>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <div className="overflow-y-auto p-6 flex-1">
          <form onSubmit={handleSubmitOrder} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Customer Details */}
              <div className="md:col-span-7 space-y-4">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span>1. Thông tin giao đồ</span>
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Họ và tên người nhận <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ví dụ: Nguyễn Văn Thắng"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Số điện thoại liên hệ <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ví dụ: 0988 123 456"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Địa chỉ giao hàng chi tiết <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/TP"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Ghi chú thêm (chiều cao, cân nặng để shop check size)
                    </label>
                    <textarea
                      rows={2}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Ví dụ: Cao 1m72 nặng 65kg lấy size L..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>
                </div>

                {/* Payment method section */}
                <div className="pt-2">
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span>2. Phương thức thanh toán</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => setPaymentMethod('cod')}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        paymentMethod === 'cod'
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900">COD (Kiểm tra đồ rồi thanh toán)</span>
                        {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Được kiểm tra chất vải, thử đồ trước khi thanh toán tiền mặt
                      </p>
                    </div>

                    <div
                      onClick={() => setPaymentMethod('vietqr')}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                        paymentMethod === 'vietqr'
                          ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-xs text-slate-900">Chuyển khoản VietQR</span>
                        {paymentMethod === 'vietqr' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Quét mã QR qua ứng dụng ngân hàng hoặc ví điện tử
                      </p>
                    </div>
                  </div>

                  {/* VietQR Bank Info Box if selected */}
                  {paymentMethod === 'vietqr' && (
                    <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-bold">Vietcombank - Chi nhánh Hà Nội</span>
                        </div>
                        <span className="text-[10px] bg-blue-500/30 text-blue-300 px-2 py-0.5 rounded font-mono">
                          VietQR 24/7
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-slate-400 text-[10px]">Số tài khoản:</p>
                          <p className="font-mono font-bold text-amber-400">1029 888 999</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">Chủ tài khoản:</p>
                          <p className="font-bold text-white uppercase">XUAN TINH FASHION</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">Số tiền:</p>
                          <p className="font-bold text-emerald-400">{totalAmount.toLocaleString('vi-VN')}₫</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-[10px]">Nội dung CK:</p>
                          <p className="font-mono font-bold text-blue-300">{generatedOrderCode}</p>
                        </div>
                      </div>

                      <div className="pt-2 text-center bg-white p-3 rounded-xl">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                            `2|99|0988123456|XUAN TINH FASHION|info@xuantinhstore.vn|0|0|${totalAmount}|${generatedOrderCode}|transfer_myqr`
                          )}`}
                          alt="VietQR Code"
                          className="w-36 h-36 mx-auto rounded-lg"
                        />
                        <p className="text-[10px] text-slate-600 mt-1 font-medium">
                          Mở app Ngân hàng để quét mã thanh toán tự động
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary */}
              <div className="md:col-span-5 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                    Túi đồ ({cartItems.length} mẫu)
                  </h3>

                  {/* Items mini list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-12 rounded-lg object-cover object-top bg-white border border-slate-200 shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                          <p className="text-slate-500 text-[10px]">
                            Size: <span className="font-semibold text-slate-700">{item.selectedSize}</span> | Màu: <span className="font-semibold text-slate-700">{item.selectedColor}</span>
                          </p>
                          <p className="text-slate-400 text-[10px]">SL: x{item.quantity}</p>
                        </div>
                        <span className="font-bold text-slate-700 shrink-0">
                          {(item.product.price * item.quantity).toLocaleString('vi-VN')}₫
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="pt-4 border-t border-slate-200 space-y-2 text-xs text-slate-600 mt-4">
                    <div className="flex justify-between">
                      <span>Tạm tính tiền đồ:</span>
                      <span className="font-semibold text-slate-800">
                        {subtotal.toLocaleString('vi-VN')}₫
                      </span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Giảm giá voucher:</span>
                        <span>-{discountAmount.toLocaleString('vi-VN')}₫</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Phí giao hàng:</span>
                      <span className="font-semibold text-slate-800">
                        {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                      <span className="text-sm font-bold text-slate-900">Tổng thanh toán:</span>
                      <span className="text-lg font-black text-blue-600">
                        {totalAmount.toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Đang đóng gói đơn hàng...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Hoàn tất đặt hàng</span>
                      </>
                    )}
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    Đổi size miễn phí trong 30 ngày nếu mặc không vừa vặn
                  </p>
                </div>

              </div>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

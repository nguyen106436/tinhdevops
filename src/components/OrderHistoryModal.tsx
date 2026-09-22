import React from 'react';
import { useAuth } from '../context/AuthContext';
import { X, PackageCheck, Clock, CheckCircle2, ShoppingBag } from 'lucide-react';

export const OrderHistoryModal: React.FC = () => {
  const { isHistoryModalOpen, closeHistoryModal, orders, currentUser } = useAuth();

  if (!isHistoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-blue-600" />
            <div>
              <h2 className="text-base font-bold text-slate-900">Lịch Sử Đơn Hàng Của Bạn</h2>
              <p className="text-xs text-slate-500">
                {currentUser?.email || 'Tài khoản thành viên'}
              </p>
            </div>
          </div>
          <button
            onClick={closeHistoryModal}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List Content */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-sm hover:border-blue-300 transition-colors space-y-3"
              >
                {/* Order Top Summary */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-lg">
                      {order.orderCode}
                    </span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.createdAt}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Đang đóng gói
                  </span>
                </div>

                {/* Items in this order */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-12 h-14 rounded-xl object-cover object-top bg-slate-100 border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-900 truncate">{item.productName}</p>
                        <p className="text-slate-500 text-[11px]">
                          {item.selectedSize ? `Size: ${item.selectedSize}` : ''} {item.selectedColor ? `| Màu: ${item.selectedColor}` : ''}
                        </p>
                        <p className="text-slate-400 text-[10px]">
                          Số lượng: {item.quantity} x {item.price.toLocaleString('vi-VN')}₫
                        </p>
                      </div>
                      <span className="font-extrabold text-slate-800">
                        {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                      </span>
                    </div>
                  ))}
                </div>

                {/* Receiver Info & Total */}
                <div className="border-t border-slate-100 pt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="text-slate-500 text-[11px]">
                    Giao tới: <strong className="text-slate-700">{order.customer.fullName}</strong> - {order.customer.address}
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-slate-500 font-medium">Tổng thanh toán:</span>
                    <span className="text-sm font-black text-blue-600">
                      {order.total.toLocaleString('vi-VN')}₫
                    </span>
                  </div>
                </div>

              </div>
            ))
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 mb-1">Chưa có đơn hàng nào</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto mb-4">
                Khi bạn đặt mua trang phục tại Xuân Tính Fashion, toàn bộ đơn hàng và kích thước size sẽ hiển thị tại đây.
              </p>
              <button
                onClick={closeHistoryModal}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Khám phá bộ sưu tập
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

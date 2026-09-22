import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Product, CartItem, Order } from '../types';
import { VOUCHERS } from '../data/products';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, size?: string, color?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  totalAmount: number;
  totalItems: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastPlacedOrder: Order | null;
  setLastPlacedOrder: (order: Order | null) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (product: Product | null) => void;
}

const STORAGE_KEY_CART = 'xuantinh_fashion_cart';
const LEGACY_STORAGE_KEY_CART = 'vietthang_fashion_cart';
const STORAGE_KEY_COUPON = 'xuantinh_applied_coupon';
const LEGACY_STORAGE_KEY_COUPON = 'vietthang_applied_coupon';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART) || localStorage.getItem(LEGACY_STORAGE_KEY_CART);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEY_COUPON) || localStorage.getItem(LEGACY_STORAGE_KEY_COUPON) || null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem(STORAGE_KEY_COUPON, appliedCoupon);
    } else {
      localStorage.removeItem(STORAGE_KEY_COUPON);
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, selectedColor?: string) => {
    const chosenSize = selectedSize || product.sizes[0] || 'M';
    const chosenColor = selectedColor || product.colors[0] || 'Tiêu chuẩn';

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        return next;
      }

      return [...prev, { product, quantity, selectedSize: chosenSize, selectedColor: chosenColor }];
    });

    showToast(`Đã thêm "${product.name.slice(0, 25)}..." (Size ${chosenSize}) vào giỏ`, 'success');
  };

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.filter((item) => {
        if (item.product.id !== productId) return true;
        if (size && item.selectedSize !== size) return true;
        if (color && item.selectedColor !== color) return true;
        return false;
      })
    );
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        const matchProduct = item.product.id === productId;
        const matchSize = !size || item.selectedSize === size;
        const matchColor = !color || item.selectedColor === color;
        if (matchProduct && matchSize && matchColor) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedCoupon) return 0;
    const upperCode = appliedCoupon.toUpperCase().trim();
    if (upperCode === 'XUANTINH' || upperCode === 'XUANTINH10' || upperCode === 'VIETTHANG10') {
      return Math.round(subtotal * 0.1);
    }
    if (upperCode === 'FASHION50' && subtotal >= 600000) {
      return 50000;
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    const upperCode = appliedCoupon ? appliedCoupon.toUpperCase().trim() : '';
    if (upperCode === 'FREESHIP' && subtotal >= 500000) {
      return 0;
    }
    // Miễn phí vận chuyển từ 500.000đ trở lên
    if (subtotal >= 500000) {
      return 0;
    }
    return 30000; // 30k VNĐ standard shipping
  }, [subtotal, appliedCoupon]);

  const totalAmount = useMemo(() => {
    const total = subtotal - discountAmount + shippingFee;
    return total > 0 ? total : 0;
  }, [subtotal, discountAmount, shippingFee]);

  const applyCoupon = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    const found = VOUCHERS.find((v) => v.code === upper);
    if (!found) {
      showToast(`Mã giảm giá "${code}" không hợp lệ hoặc đã hết hạn`, 'error');
      return false;
    }
    if (found.minSpend && subtotal < found.minSpend) {
      showToast(
        `Đơn hàng cần tối thiểu ${found.minSpend.toLocaleString('vi-VN')}đ để áp dụng mã "${upper}"`,
        'warning'
      );
      return false;
    }
    setAppliedCoupon(upper);
    showToast(`Áp dụng thành công mã "${upper}": ${found.description}`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Đã gỡ mã giảm giá', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        shippingFee,
        totalAmount,
        totalItems,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastPlacedOrder,
        setLastPlacedOrder,
        selectedProductForDetail,
        setSelectedProductForDetail,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

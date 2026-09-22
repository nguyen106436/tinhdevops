import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Order } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (usernameOrEmail: string, pass: string) => boolean;
  loginDemo: () => void;
  loginAdmin: (usernameOrEmail: string, pass: string) => boolean;
  loginAdminDemo: () => void;
  register: (name: string, email: string, pass: string, phone?: string, address?: string) => boolean;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  generateDemoOrder: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (defaultTab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalTab: 'login' | 'register';
  isHistoryModalOpen: boolean;
  openHistoryModal: () => void;
  closeHistoryModal: () => void;
}

const STORAGE_KEY_USER = 'xuantinh_auth_user';
const LEGACY_STORAGE_KEY_USER = 'vietthang_auth_user';
const STORAGE_KEY_ORDERS = 'xuantinh_user_orders';
const LEGACY_STORAGE_KEY_ORDERS = 'vietthang_user_orders';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER) || localStorage.getItem(LEGACY_STORAGE_KEY_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_ORDERS) || localStorage.getItem(LEGACY_STORAGE_KEY_ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  const isAdmin = !!currentUser && currentUser.role === 'admin';

  const login = (usernameOrEmail: string, pass: string): boolean => {
    if (!usernameOrEmail || !pass) {
      showToast('Vui lòng nhập đầy đủ thông tin đăng nhập', 'error');
      return false;
    }

    const trimmed = usernameOrEmail.trim().toLowerCase();
    const isAttemptAdmin =
      trimmed === 'xuantinh' ||
      trimmed === 'admin' ||
      trimmed === 'xuantinh@xuantinhstore.vn' ||
      trimmed === 'admin@xuantinhstore.vn' ||
      trimmed === 'admin@xuantinh.vn' ||
      trimmed === 'quantri';

    if (isAttemptAdmin) {
      const validAdminPasswords = ['xuantinh', 'admin', 'admin123', '123456', 'xuantinh123'];
      if (validAdminPasswords.includes(pass)) {
        return loginAdmin(usernameOrEmail, pass);
      } else {
        showToast('Mật khẩu quản trị không chính xác!', 'error');
        return false;
      }
    }

    // Khách hàng đăng nhập bằng tên hoặc email
    const displayName = usernameOrEmail.includes('@')
      ? usernameOrEmail.split('@')[0]
      : usernameOrEmail.trim();

    const emailValue = usernameOrEmail.includes('@')
      ? usernameOrEmail.trim()
      : `${usernameOrEmail.trim().toLowerCase()}@xuantinhstore.vn`;

    const user: User = {
      id: 'usr_' + Date.now(),
      name: displayName,
      email: emailValue,
      phone: '0988 123 456',
      address: 'Số 88 Cầu Giấy, Hà Nội',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(usernameOrEmail)}`,
      role: 'customer',
    };
    setCurrentUser(user);
    setIsAuthModalOpen(false);
    showToast(`Xin chào, ${user.name}! Đăng nhập thành công`, 'success');
    return true;
  };

  const loginAdmin = (usernameOrEmail: string, pass: string): boolean => {
    if (!usernameOrEmail || !pass) {
      showToast('Vui lòng nhập tài khoản và mật khẩu quản trị', 'error');
      return false;
    }

    const u = usernameOrEmail.trim().toLowerCase();
    const validUsernames = [
      'xuantinh',
      'admin', 
      'xuantinh@xuantinhstore.vn',
      'admin@xuantinhstore.vn', 
      'admin@xuantinh.vn', 
      'quantri'
    ];
    const validPasswords = ['xuantinh', 'admin', 'admin123', '123456', 'xuantinh123'];

    if (!validUsernames.includes(u) || !validPasswords.includes(pass)) {
      showToast('Tài khoản hoặc mật khẩu quản trị không chính xác!', 'error');
      return false;
    }

    const adminUser: User = {
      id: 'usr_admin_xuantinh',
      name: 'Xuân Tính (Admin)',
      email: 'xuantinh@xuantinhstore.vn',
      phone: '0988 888 999',
      address: 'Trụ sở Xuân Tính Fashion, Hà Nội',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    };
    setCurrentUser(adminUser);
    setIsAuthModalOpen(false);
    showToast('Xác thực quyền Quản trị viên thành công!', 'success');
    return true;
  };

  const loginAdminDemo = () => {
    loginAdmin('xuantinh', 'xuantinh');
  };

  const loginDemo = () => {
    const demoUser: User = {
      id: 'usr_demo_xuantinh',
      name: 'Nguyễn Xuân Tính (Khách hàng)',
      email: 'demo@xuantinhstore.vn',
      phone: '0912 345 678',
      address: 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, TP. Hồ Chí Minh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      role: 'customer',
    };
    setCurrentUser(demoUser);
    setIsAuthModalOpen(false);
    showToast('Đã đăng nhập tài khoản Khách hàng (Demo)!', 'success');
  };

  const register = (name: string, email: string, _pass: string, phone?: string, address?: string): boolean => {
    if (!name || !email) {
      showToast('Vui lòng điền họ tên và email', 'error');
      return false;
    }
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      phone: phone || '0988 666 888',
      address: address || 'Việt Nam',
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      role: 'customer',
    };
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    showToast(`Đăng ký tài khoản thành công! Chào mừng ${name}`, 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi tài khoản', 'info');
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          return { ...order, status };
        }
        return order;
      })
    );
    showToast(`Đã cập nhật trạng thái đơn hàng #${orderId.slice(-6)}`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
    showToast(`Đã xóa đơn hàng #${orderId.slice(-6)}`, 'info');
  };

  const generateDemoOrder = () => {
    const demoId = 'ord_' + Date.now();
    const demoCode = 'DH' + Math.floor(100000 + Math.random() * 900000);
    const demoOrder: Order = {
      id: demoId,
      orderCode: demoCode,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: 'Trần Thị Thu Thảo',
        phone: '0987 654 321',
        address: '123 Nguyễn Trãi, Phường 2, Quận 5, TP. Hồ Chí Minh',
        note: 'Giao giờ hành chính, gọi trước khi giao',
      },
      items: [
        {
          productId: 'women-1',
          productName: 'Đầm Dự Tiệc Dáng Xòe Lụa Satin Cao Cấp',
          price: 589000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
          selectedSize: 'M',
          selectedColor: 'Đỏ Ruby',
        },
        {
          productId: 'men-1',
          productName: 'Áo Thun Nam Cotton Compact 250GSM',
          price: 249000,
          quantity: 2,
          image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
          selectedSize: 'L',
          selectedColor: 'Đen',
        },
      ],
      subtotal: 1087000,
      discountAmount: 108700,
      shippingFee: 0,
      total: 978300,
      paymentMethod: 'cod',
      status: 'pending',
    };
    setOrders((prev) => [demoOrder, ...prev]);
    showToast(`Đã tạo đơn hàng thử nghiệm ${demoCode}!`, 'success');
  };

  const openAuthModal = (defaultTab: 'login' | 'register' = 'login') => {
    setAuthModalTab(defaultTab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openHistoryModal = () => {
    setIsHistoryModalOpen(true);
  };

  const closeHistoryModal = () => {
    setIsHistoryModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isAdmin,
        login,
        loginDemo,
        loginAdmin,
        loginAdminDemo,
        register,
        logout,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        generateDemoOrder,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalTab,
        isHistoryModalOpen,
        openHistoryModal,
        closeHistoryModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

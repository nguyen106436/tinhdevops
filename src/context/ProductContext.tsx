import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

interface ProductContextType {
  products: Product[];
  addProduct: (data: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleStock: (id: string) => void;
  toggleFeatured: (id: string) => void;
  resetToDefault: () => void;
  importProducts: (newProducts: Product[]) => boolean;
  getProductById: (id: string) => Product | undefined;
}

const STORAGE_KEY_PRODUCTS = 'xuantinh_products_data';
const LEGACY_STORAGE_KEY_PRODUCTS = 'vietthang_products_data';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS) || localStorage.getItem(LEGACY_STORAGE_KEY_PRODUCTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (err) {
        console.error('Lỗi khi đọc dữ liệu sản phẩm từ localStorage:', err);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
    } catch (err) {
      console.error('Lỗi khi lưu sản phẩm vào localStorage:', err);
    }
  }, [products]);

  const addProduct = (data: Omit<Product, 'id'>): Product => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      ...data,
      id: newId,
      rating: data.rating || 5.0,
      reviewsCount: data.reviewsCount || 0,
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Đã thêm sản phẩm "${newProduct.name}" thành công!`, 'success');
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      })
    );
    showToast('Đã cập nhật thông tin sản phẩm!', 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast(`Đã xóa sản phẩm "${target ? target.name : id}"`, 'info');
  };

  const toggleStock = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newInStock = !item.inStock;
          showToast(
            `Đã chuyển trạng thái: ${item.name} (${newInStock ? 'Còn hàng' : 'Hết hàng'})`,
            newInStock ? 'success' : 'warning'
          );
          return {
            ...item,
            inStock: newInStock,
            stockCount: newInStock ? (item.stockCount > 0 ? item.stockCount : 10) : 0,
          };
        }
        return item;
      })
    );
  };

  const toggleFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextVal = !item.isFeatured;
          showToast(
            nextVal ? `Đã gắn nổi bật cho "${item.name}"` : `Đã bỏ nổi bật "${item.name}"`,
            'info'
          );
          return { ...item, isFeatured: nextVal };
        }
        return item;
      })
    );
  };

  const resetToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
    showToast('Đã khôi phục toàn bộ danh sách sản phẩm về mặc định!', 'info');
  };

  const importProducts = (newProducts: Product[]): boolean => {
    if (!Array.isArray(newProducts) || newProducts.length === 0) {
      showToast('Dữ liệu nhập vào không hợp lệ!', 'error');
      return false;
    }
    setProducts(newProducts);
    showToast(`Đã nạp thành công ${newProducts.length} sản phẩm!`, 'success');
    return true;
  };

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStock,
        toggleFeatured,
        resetToDefault,
        importProducts,
        getProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

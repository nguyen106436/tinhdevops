import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { useToast } from './ToastContext';

async function request<T>(path = '', method = 'GET', data?: unknown): Promise<T> {
  const response = await fetch(`/api/products${path}`, {
    method, headers: { 'Content-Type': 'application/json' },
    body: data === undefined ? undefined : JSON.stringify(data),
  });
  const result = await response.json().catch(() => ({ message: 'Backend chưa sẵn sàng. Hãy chạy npm run server.' }));
  if (!response.ok) throw new Error(result.message || 'Không lưu được sản phẩm.');
  return result;
}
interface ProductContextType {
  products: Product[];
  addProduct: (data: Omit<Product, 'id'>) => Promise<boolean>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  toggleStock: (id: string) => Promise<boolean>;
  toggleFeatured: (id: string) => Promise<boolean>;
  resetToDefault: () => Promise<boolean>;
  importProducts: (products: Product[]) => Promise<boolean>;
  getProductById: (id: string) => Product | undefined;
}
const ProductContext = createContext<ProductContextType | undefined>(undefined);
export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { showToast } = useToast();
  useEffect(() => {
    let active = true;
    request<Product[]>().then(data => { if (active) setProducts(data); }).catch(error => {
      if (active) showToast(error.message || 'Không tải được sản phẩm từ database.', 'error');
    });
    return () => { active = false; };
  }, []);
  const save = async (action: () => Promise<void>): Promise<boolean> => {
    try { await action(); showToast('Đã lưu sản phẩm vào SQL Server.', 'success'); return true; }
    catch (error) { showToast(error instanceof Error ? error.message : 'Không lưu được sản phẩm.', 'error'); return false; }
  };
  const addProduct = (data: Omit<Product, 'id'>) => save(async () => {
    const product = await request<Product>('', 'POST', data);
    setProducts(previous => [product, ...previous]);
  });
  const updateProduct = (id: string, updates: Partial<Product>) => save(async () => {
    const product = await request<Product>(`/${encodeURIComponent(id)}`, 'PATCH', updates);
    setProducts(previous => previous.map(p => p.id === id ? product : p));
  });
  const deleteProduct = (id: string) => save(async () => {
    await request(`/${encodeURIComponent(id)}`, 'DELETE');
    setProducts(previous => previous.filter(p => p.id !== id));
  });
  const importProducts = (data: Product[]) => save(async () => {
    const result = await request<Product[]>('', 'PUT', data);
    setProducts(result);
  });
  const toggleStock = async (id: string) => {
    const p = products.find(p => p.id === id);
    return p ? updateProduct(id, { inStock: !p.inStock, stockCount: p.inStock ? 0 : Math.max(10, p.stockCount) }) : false;
  };
  const toggleFeatured = async (id: string) => {
    const p = products.find(p => p.id === id);
    return p ? updateProduct(id, { isFeatured: !p.isFeatured }) : false;
  };
  return <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct, toggleStock, toggleFeatured,
    resetToDefault: () => importProducts(PRODUCTS), importProducts, getProductById: id => products.find(p => p.id === id) }}>{children}</ProductContext.Provider>;
};
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};

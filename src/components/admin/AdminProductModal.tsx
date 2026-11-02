import React, { useState, useEffect } from 'react';
import { Product, ProductCategory } from '../../types';
import { CATEGORIES } from '../../data/products';
import { X, Sparkles, Image as ImageIcon, Plus, Trash2, Check } from 'lucide-react';

interface AdminProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Product, 'id'>) => Promise<boolean>;
  initialProduct?: Product | null;
}

// Bộ ảnh mẫu thời trang chuẩn HD để người dùng chọn nhanh không cần tìm link
const PRESET_IMAGES = [
  {
    name: 'Áo thun đen basic',
    url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop',
    category: 'men'
  },
  {
    name: 'Sơ mi trắng Oxford',
    url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
    category: 'men'
  },
  {
    name: 'Áo Polo thể thao',
    url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop',
    category: 'sport'
  },
  {
    name: 'Đầm xòe lụa đỏ',
    url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800&auto=format&fit=crop',
    category: 'women'
  },
  {
    name: 'Áo blazer Hàn Quốc',
    url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    category: 'women'
  },
  {
    name: 'Quần âu Slimfit',
    url: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
    category: 'pants'
  },
  {
    name: 'Thắt lưng da cao cấp',
    url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',
    category: 'accessories'
  },
  {
    name: 'Áo khoác gió thể thao',
    url: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
    category: 'sport'
  }
];

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL', 'Freesize'];
const AVAILABLE_COLORS = ['Đen', 'Trắng', 'Xám Tiêu', 'Xanh Navy', 'Be', 'Đỏ Ruby', 'Nâu Tây', 'Rêu Pastel'];

export const AdminProductModal: React.FC<AdminProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialProduct,
}) => {
  const isEditing = !!initialProduct;
  const [isSaving, setIsSaving] = useState(false);

  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('men');
  const [price, setPrice] = useState<number>(199000);
  const [originalPrice, setOriginalPrice] = useState<number>(299000);
  const [stockCount, setStockCount] = useState<number>(50);
  const [inStock, setInStock] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [material, setMaterial] = useState<string>('Cotton 100% thoáng khí');
  const [description, setDescription] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['M', 'L']);
  const [selectedColors, setSelectedColors] = useState<string[]>(['Đen', 'Trắng']);
  const [highlightInput, setHighlightInput] = useState<string>('');
  const [highlights, setHighlights] = useState<string[]>([
    'Chất liệu cao cấp co giãn 4 chiều',
    'Thấm hút mồ hôi tối ưu',
    'Chuẩn form dáng trẻ trung'
  ]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice || initialProduct.price);
      setStockCount(initialProduct.stockCount ?? 50);
      setInStock(initialProduct.inStock);
      setIsFeatured(!!initialProduct.isFeatured);
      setImage(initialProduct.image);
      setMaterial(initialProduct.material || 'Cotton cao cấp');
      setDescription(initialProduct.description || '');
      setSelectedSizes(initialProduct.sizes?.length ? initialProduct.sizes : ['M', 'L']);
      setSelectedColors(initialProduct.colors?.length ? initialProduct.colors : ['Đen']);
      setHighlights(initialProduct.highlights?.length ? initialProduct.highlights : []);
    } else {
      setName('');
      setCategory('men');
      setPrice(250000);
      setOriginalPrice(350000);
      setStockCount(50);
      setInStock(true);
      setIsFeatured(false);
      setImage(PRESET_IMAGES[0].url);
      setMaterial('Cotton Compact 100%');
      setDescription('Thiết kế thời trang mới nhất, phong cách trẻ trung năng động.');
      setSelectedSizes(['S', 'M', 'L', 'XL']);
      setSelectedColors(['Đen', 'Trắng', 'Xám Tiêu']);
      setHighlights([
        'Chất liệu bền đẹp chống nhăn',
        'Co giãn thoải mái vận động',
        'Sản xuất tiêu chuẩn Việt Nam'
      ]);
    }
    setErrors({});
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  // Tính discount tự động
  const discountPercent =
    originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0;

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length > 1) {
        setSelectedSizes(selectedSizes.filter((s) => s !== size));
      }
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      if (selectedColors.length > 1) {
        setSelectedColors(selectedColors.filter((c) => c !== color));
      }
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setHighlights([...highlights, highlightInput.trim()]);
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setHighlights(highlights.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSaving) return;
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Vui lòng nhập tên sản phẩm';
    }
    if (price <= 0) {
      newErrors.price = 'Giá bán phải lớn hơn 0';
    }
    if (!image.trim()) {
      newErrors.image = 'Vui lòng nhập link ảnh hoặc chọn ảnh mẫu';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const catObj = CATEGORIES.find((c) => c.id === category);
    const categoryName = catObj ? catObj.name : 'Thời trang';

    const productPayload: Omit<Product, 'id'> = {
      name: name.trim(),
      category,
      categoryName,
      price: Number(price),
      originalPrice: Number(originalPrice) || Number(price),
      discount: discountPercent,
      rating: initialProduct ? initialProduct.rating : 5.0,
      reviewsCount: initialProduct ? initialProduct.reviewsCount : 12,
      image: image.trim(),
      inStock,
      stockCount: Number(stockCount),
      isFeatured,
      material: material.trim(),
      description: description.trim(),
      highlights: highlights.length > 0 ? highlights : ['Chất liệu cao cấp', 'Form dáng chuẩn'],
      sizes: selectedSizes,
      colors: selectedColors,
      specs: {
        'Chất liệu': material.trim(),
        'Danh mục': categoryName,
        'Tồn kho': `${stockCount} sản phẩm`,
        'Bảo quản': 'Giặt máy chế độ nhẹ, tránh phơi nắng gắt',
      },
    };

    setIsSaving(true);
    try { if (await onSubmit(productPayload)) onClose(); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-fade-in max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isEditing ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
              </h3>
              <p className="text-xs text-slate-500">
                {isEditing ? `Mã: ${initialProduct.id}` : 'Điền thông tin và lưu vào SQL Server'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {/* Tên & Danh mục */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Tên sản phẩm <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Áo Polo Phối Bo Cổ Dệt Thể Thao..."
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.name ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Danh mục</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Giá bán, Giá gốc, Tồn kho */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Giá bán (VNĐ) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className={`w-full px-3.5 py-2.5 rounded-xl border ${
                  errors.price ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Giá gốc niêm yết (VNĐ)
              </label>
              <input
                type="number"
                min="0"
                step="1000"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              {discountPercent > 0 && (
                <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">
                  Giảm giá: -{discountPercent}%
                </span>
              )}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Số lượng kho</label>
              <input
                type="number"
                min="0"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Tùy chọn trạng thái */}
          <div className="flex flex-wrap items-center gap-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
              />
              <span className="font-medium text-slate-800">Còn hàng trong kho</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-300"
              />
              <span className="font-medium text-amber-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Gắn mác Nổi bật (Hot)
              </span>
            </label>
          </div>

          {/* Hình ảnh */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Link hình ảnh (URL) <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className={`flex-1 px-3.5 py-2.5 rounded-xl border ${
                  errors.image ? 'border-rose-500 bg-rose-50/30' : 'border-slate-200 focus:border-blue-500'
                } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
              />
              {image && (
                <div className="w-11 h-11 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            {errors.image && <p className="text-xs text-rose-500 mt-1">{errors.image}</p>}

            {/* Quick preset selector */}
            <div className="mt-2.5">
              <p className="text-xs text-slate-500 mb-1.5 flex items-center gap-1">
                <ImageIcon className="w-3.5 h-3.5" /> Hoặc chọn nhanh ảnh mẫu thời trang có sẵn:
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {PRESET_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                      image === preset.url ? 'border-blue-600 ring-2 ring-blue-500/30 scale-105' : 'border-transparent hover:border-slate-300'
                    }`}
                    title={preset.name}
                  >
                    <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    {image === preset.url && (
                      <div className="absolute inset-0 bg-blue-600/30 flex items-center justify-center text-white">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Kích thước & Màu sắc */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Kích thước hỗ trợ</label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_SIZES.map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1.5">Màu sắc có sẵn</label>
              <div className="flex flex-wrap gap-1.5">
                {AVAILABLE_COLORS.map((color) => {
                  const active = selectedColors.includes(color);
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => toggleColor(color)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all border ${
                        active
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {color}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chất liệu & Mô tả */}
          <div className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Chất liệu vải</label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="VD: 100% Cotton Compact 250GSM"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mô tả sản phẩm</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Nhập mô tả chi tiết về kiểu dáng, cảm nhận khi mặc..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Điểm nổi bật (Highlights)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
    if (isSaving) return;
                      handleAddHighlight();
                    }
                  }}
                  placeholder="Thêm điểm nổi bật..."
                  className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 focus:border-blue-500 focus:outline-none text-xs"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium text-xs flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm
                </button>
              </div>

              <div className="space-y-1.5">
                {highlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-lg text-xs"
                  >
                    <span className="text-slate-700">• {item}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveHighlight(idx)}
                      className="text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit" disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isEditing ? 'Lưu cập nhật' : 'Thêm sản phẩm'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



import { Product } from '../types';

export const CATEGORIES = [
  { id: 'all', name: 'Tất cả sản phẩm' },
  { id: 'men', name: 'Thời trang Nam' },
  { id: 'women', name: 'Thời trang Nữ' },
  { id: 'pants', name: 'Quần & Chân Váy' },
  { id: 'sport', name: 'Đồ Thể Thao' },
  { id: 'accessories', name: 'Phụ kiện' },
] as const;

export const PRODUCTS: Product[] = [
  // 1. Thời trang Nam
  
  {
    id: 'men-2',
    name: 'Áo Sơ Mi Nam Dài Tay Oxford Chống Nhăn Kháng Khuẩn',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 429000,
    originalPrice: 550000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 195,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 42,
    isFeatured: true,
    material: '70% Cotton Oxford + 30% Nano Poly chống nhăn',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Trắng', 'Xanh Nhạt', 'Kẻ Sọc Xanh'],
    description: 'Áo sơ mi Oxford phom dáng hiện đại dành cho quý ông công sở hiện đại. Chất vải dệt đan rọ thoáng khí, dễ ủi và hạn chế tối đa nếp gấp trong suốt ngày dài làm việc.',
    highlights: [
      'Vải dệt Oxford cao cấp tạo vân vải sang trọng',
      'Công nghệ hoàn tất Easy-Care ít nhăn, dễ ủi',
      'Khuy áo xà cừ khắc laser sắc nét bền bỉ',
      'Cổ áo đệm lót giữ đứng phom chuẩn thanh lịch'
    ],
    specs: {
      'Chất liệu': 'Cotton Oxford dệt hạt tổ ong thoáng mát',
      'Form dáng': 'Slim fit ôm vừa vặn thanh lịch',
      'Đặc tính': 'Kháng khuẩn khử mùi, chống tĩnh điện',
      'Xuất xứ': 'Việt Nam',
      'Bảo quản': 'Ủi ở nhiệt độ trung bình dưới 150°C'
    }
  },
  {
    id: 'men-3',
    name: 'Áo Khoác Bomber Kaki Nam 2 Lớp Chống Gió Hàn Quốc',
    category: 'men',
    categoryName: 'Thời trang Nam',
    price: 589000,
    originalPrice: 750000,
    discount: 21,
    rating: 4.9,
    reviewsCount: 140,
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 28,
    isFeatured: false,
    material: 'Kaki Cotton Twill + Lớp lót dù lụa bên trong',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Đen', 'Xanh Rêu', 'Be Sữa'],
    description: 'Chiếc áo khoác bomber mang đậm phong cách đường phố Hàn Quốc. Thiết kế 2 lớp dày dặn vừa cản gió giữ ấm mùa lạnh vừa cực kỳ thời thượng khi phối cùng áo thun hay hoodie.',
    highlights: [
      'Chất vải Kaki cotton bề mặt đanh mịn, không bám bụi',
      'Khóa kéo kim loại YKK trơn tru chuẩn độ bền',
      'Túi áo có khóa kéo bảo vệ đồ đạc cá nhân',
      'Bo chun cổ tay và gấu áo dệt dày dặn ôm nhẹ nhàng'
    ],
    specs: {
      'Lớp ngoài': 'Kaki Twill mật độ sợi dệt cao',
      'Lớp trong': 'Vải dù lụa Polyester mềm mịn chống dính',
      'Khóa kéo': 'Hợp kim phủ nano chống rỉ',
      'Xuất xứ': 'Việt Nam',
      'Phong cách': 'Streetwear / Casual năng động'
    }
  },

  // 2. Thời trang Nữ
  {
    id: 'women-1',
    name: 'Đầm Dự Tiệc Cổ Chữ V Dáng Xòe Lụa Mango Cao Cấp',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 499000,
    originalPrice: 680000,
    discount: 26,
    rating: 4.9,
    reviewsCount: 260,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 35,
    isFeatured: true,
    material: 'Lụa Mango mềm mại rủ sóng tự nhiên',
    sizes: ['S', 'M', 'L'],
    colors: ['Đỏ Ruby', 'Đen Quyến Rũ', 'Trắng Kem'],
    description: 'Mẫu đầm liền thân thiết kế tôn dáng với đường chiết eo tinh tế, tùng váy xòe bồng bềnh nữ tính cùng chất liệu lụa Mango cao cấp óng ả sang trọng.',
    highlights: [
      'Chất liệu lụa Mango rủ nhẹ bay bổng, không nhăn xù',
      'Thiết kế cổ chữ V khoe khéo xương quai xanh quyến rũ',
      'Đường chiết eo tạo hiệu ứng thon gọn vòng 2',
      'Phù hợp diện đi tiệc, đám cưới, hẹn hò lãng mạn'
    ],
    specs: {
      'Chất liệu': 'Lụa Mango loại 1 mềm mịn mát tay',
      'Chiều dài': 'Dáng midi ngang bắp chân',
      'Lót trong': 'Có lớp lót lụa habutai kín đáo',
      'Xuất xứ': 'Thiết kế & sản xuất độc quyền Xuân Tính'
    }
  },
  {
    id: 'women-2',
    name: 'Áo Blazer Nữ Tay Dài Phom Rộng 2 Hàng Khuy Chuẩn Hàn',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 549000,
    originalPrice: 720000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 178,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 24,
    isFeatured: true,
    material: 'Tuyết mưa Hàn Quốc đanh sợi chống nhăn',
    sizes: ['S', 'M', 'L'],
    colors: ['Be Nude', 'Đen Tuyền', 'Xám Khói'],
    description: 'Áo khoác blazer nữ dáng suông phóng khoáng mang lại vẻ đẹp thanh lịch hiện đại cho quý cô văn phòng. Dễ dàng mix-match từ quần âu, chân váy đến quần jeans trẻ trung.',
    highlights: [
      'Vải tuyết mưa loại 1 đứng form áo sang xịn',
      'Độn vai mỏng nhẹ tạo dáng vai thẳng quyền lực',
      '2 hàng khuy giả sừng phong cách châu Âu',
      'Túi mổ 2 bên tiện lợi đính nắp gập thời trang'
    ],
    specs: {
      'Chất liệu': 'Vải tuyết mưa cao cấp 2 lớp',
      'Kiểu dáng': 'Oversized dáng suông hiện đại',
      'Cầu vai': 'Đệm mút sinh học êm nhẹ',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'women-3',
    name: 'Áo Croptop Nữ Tay Ngắn Dệt Kim Gân Cổ Tròn Năng Động',
    category: 'women',
    categoryName: 'Thời trang Nữ',
    price: 189000,
    originalPrice: 260000,
    discount: 27,
    rating: 4.7,
    reviewsCount: 145,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 60,
    isFeatured: false,
    material: 'Len dệt kim Cotton mềm mát co giãn tốt',
    sizes: ['Freesize (40-58kg)', 'S', 'M'],
    colors: ['Trắng', 'Hồng Pastel', 'Đen', 'Xanh Bơ'],
    description: 'Áo croptop dệt kim trẻ trung khoe eo thon, chất vải mềm mịn co giãn ôm nhẹ tôn đường cong cơ thể, thích hợp diện mùa hè cùng chân váy hoặc quần cạp cao.',
    highlights: [
      'Dệt kim sọc tăm co giãn đàn hồi cực tốt',
      'Độ dài vừa phải ngang rốn dễ phối đồ',
      'Thấm hút mồ hôi, thoáng khí không gây bí bách'
    ],
    specs: {
      'Chất liệu': 'Cotton Viscose dệt kim gân',
      'Độ co giãn': 'Co giãn 4 chiều đa hướng',
      'Chiều dài': '40 cm',
      'Xuất xứ': 'Việt Nam'
    }
  },

  // 3. Quần & Chân Váy
  {
    id: 'pants-1',
    name: 'Quần Jeans Nam Dáng Suông Ống Đứng Denim Raw Vintage',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 459000,
    originalPrice: 590000,
    discount: 22,
    rating: 4.8,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 50,
    isFeatured: true,
    material: 'Denim Cotton 12.5 Oz không phai màu',
    sizes: ['29', '30', '31', '32', '34'],
    colors: ['Xanh Đậm Indigo', 'Xanh Nhạt Rách Nhẹ', 'Đen Khói'],
    description: 'Quần jeans nam ống đứng Regular Straight kinh điển với chất vải denim dệt thoi 12.5 Oz đứng dáng, màu nhuộm wash sinh học bền màu theo năm tháng.',
    highlights: [
      'Vải denim 100% cotton dày dặn giữ form ống đứng',
      'Kỹ thuật wash enzyme tạo độ sờn vintage tự nhiên',
      'Đinh tán đồng và khóa kéo kim loại bền bỉ',
      'Dễ dàng kết hợp cùng sneaker và áo thun'
    ],
    specs: {
      'Độ dày vải': '12.5 Oz Denim chuẩn quốc tế',
      'Form dáng': 'Straight Leg (Ống đứng suông 19-21cm)',
      'Khóa kéo': 'Khóa kéo kim loại chốt tự động',
      'Xuất xứ': 'Việt Nam'
    }
  },
  {
    id: 'pants-2',
    name: 'Quần Tây Nam Co Giãn 4 Chiều Công Sở Dáng Trẻ Trung',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 399000,
    originalPrice: 520000,
    discount: 23,
    rating: 4.9,
    reviewsCount: 160,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 45,
    isFeatured: false,
    material: 'Vải Kaki Spandex co giãn đàn hồi',
    sizes: ['29', '30', '31', '32', '34'],
    colors: ['Đen', 'Xám Tro', 'Xanh Đen', 'Be'],
    description: 'Quần âu nam hiện đại với cạp chun ẩn bên trong tăng giảm co giãn thoải mái khi ngồi làm việc hay lái xe, ống suông nhẹ không nhăn không xù.',
    highlights: [
      'Lưng quần thông minh có dải thun ẩn co giãn đến 4cm',
      'Chất vải không nhăn gãy nếp dù giặt máy',
      'Túi xẻ sâu để vừa điện thoại màn hình lớn an toàn'
    ],
    specs: {
      'Chất liệu': 'Cotton Poly Spandex cao cấp',
      'Form dáng': 'Slim-Straight gọn gàng hiện đại',
      'Đặc tính': 'Chống nhăn, co giãn 4 chiều'
    }
  },
  {
    id: 'pants-3',
    name: 'Chân Váy Xếp Ly Dáng Chữ A Cạp Cao Kèm Quần Bảo Hộ',
    category: 'pants',
    categoryName: 'Quần & Chân Váy',
    price: 269000,
    originalPrice: 350000,
    discount: 23,
    rating: 4.8,
    reviewsCount: 188,
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 38,
    isFeatured: false,
    material: 'Vải tuyết mưa ép ly nhiệt công nghệ cao',
    sizes: ['S', 'M', 'L'],
    colors: ['Đen', 'Xám', 'Trắng Kem'],
    description: 'Chân váy ngắn xếp ly tennis năng động dáng chữ A che khuyết điểm đùi to, cạp cao tôn dáng chân dài, bên trong may liền quần bảo hộ an toàn tuyệt đối.',
    highlights: [
      'Xếp ly dập nhiệt công nghệ cao không bị mất nếp sau giặt',
      'Tích hợp quần bảo hộ cùng màu co giãn kín đáo bên trong',
      'Cạp cao giấu bụng, kéo dài đôi chân thon thả'
    ],
    specs: {
      'Chất liệu': 'Vải tuyết mưa đanh lì',
      'Chiều dài': '39 - 41 cm',
      'Bên trong': 'Có quần lót bảo hộ thun cotton co giãn'
    }
  },

  // 4. Đồ Thể Thao
  {
    id: 'sport-1',
    name: 'Bộ Đồ Thể Thao Nam Thun Lạnh Pro-Dry Thoáng Khí',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 389000,
    originalPrice: 499000,
    discount: 22,
    rating: 4.9,
    reviewsCount: 220,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 65,
    isFeatured: true,
    material: 'Thun lạnh hạt mè dệt công nghệ Pro-Dry',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Xanh Dương Đậm', 'Xám Ghi', 'Đen Carbon'],
    description: 'Set đồ tập gym, chạy bộ, đá bóng gồm áo thun thể thao và quần short có túi khóa kéo. Chất vải siêu nhẹ, công nghệ thoát ẩm Pro-Dry giúp cơ thể luôn khô ráo.',
    highlights: [
      'Vải thun lạnh siêu nhẹ chỉ 120g/bộ, bay hơi mồ hôi siêu tốc',
      'Quần short có 2 túi khóa kéo để điện thoại và chìa khóa an toàn',
      'Logo phản quang nổi bật khi chạy bộ ban đêm',
      'Kháng khuẩn nano ngăn mùi mồ hôi khó chịu'
    ],
    specs: {
      'Chất liệu': '90% Polyester Pro-Dry + 10% Spandex',
      'Độ co giãn': 'Co giãn 4 chiều đàn hồi cao',
      'Bộ sản phẩm': 'Gồm 1 áo cộc tay + 1 quần short có khóa'
    }
  },
  {
    id: 'sport-2',
    name: 'Áo Bra Thể Thao Nữ Nâng Đỡ Tối Đa Chống Rung Khi Vận Động',
    category: 'sport',
    categoryName: 'Đồ Thể Thao',
    price: 289000,
    originalPrice: 380000,
    discount: 24,
    rating: 4.9,
    reviewsCount: 165,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 40,
    isFeatured: false,
    material: 'Nylon Spandex đan chéo trợ lực lưng',
    sizes: ['S', 'M', 'L'],
    colors: ['Đen', 'Hồng Đỗ', 'Xanh Bơ'],
    description: 'Áo ngực thể thao chuyên dụng cho yoga, gym, chạy bộ với thiết kế lưng đan dây trợ lực thông minh, đệm mút liền định hình nâng đỡ vòng 1 hoàn hảo.',
    highlights: [
      'Thiết kế đan dây sau lưng giảm áp lực lên vai và gáy',
      'Đệm ngực có lỗ thở thoáng khí, nâng đỡ chống xô lệch',
      'Vải mềm mại như làn da thứ hai không gây cấn đau'
    ],
    specs: {
      'Chất liệu': '75% Nylon + 25% Spandex cao cấp',
      'Mức nâng đỡ': 'High Support (Chạy bộ, HIIT, Gym nặng)',
      'Đệm ngực': 'Đệm mút liền thông hơi thoáng khí'
    }
  },

  // 5. Phụ kiện
  {
    id: 'acc-1',
    name: 'Thắt Lưng Nam Da Bò Thật 100% Khóa Tự Động Hợp Kim',
    category: 'accessories',
    categoryName: 'Phụ kiện',
    price: 299000,
    originalPrice: 450000,
    discount: 33,
    rating: 4.9,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?q=80&w=800&auto=format&fit=crop',
    inStock: true,
    stockCount: 75,
    isFeatured: false,
    material: 'Da bò nguyên tấm lớp 1 (Top Grain Leather)',
    sizes: ['Bản rộng 3.5cm - Dài 120cm'],
    colors: ['Đen Nam Tính', 'Nâu Cafe'],
    description: 'Dây nịt nam da bò thật nhập khẩu dẻo dai nguyên tấm, mặt khóa tự động trượt mượt mà không cần đục lỗ, hộp đựng sang trọng thích hợp làm quà tặng.',
    highlights: [
      'Da bò nguyên miếng càng dùng càng bóng đẹp mềm mại',
      'Đầu khóa hợp kim phủ titan chống trầy xước và hoen gỉ',
      'Cơ chế ray trượt tự động tinh chỉnh kích thước chuẩn xác',
      'Tặng kèm hộp quà và túi giấy sang trọng'
    ],
    specs: {
      'Chất liệu dây': '100% Da bò thật tự nhiên nhập khẩu',
      'Chất liệu khóa': 'Hợp kim nguyên khối mạ điện phân',
      'Bản rộng': '3.5 cm chuẩn công sở',
      'Bảo hành': '12 tháng lỗi nổ da 1 đổi 1'
    }
  }
];

export const VOUCHERS = [
  {
    code: 'XUANTINH',
    description: 'Giảm ngay 10% trên tổng giá trị đơn hàng',
    discountPercent: 10,
    minSpend: 0,
  },
  {
    code: 'FREESHIP',
    description: 'Miễn phí vận chuyển toàn quốc cho đơn từ 500.000đ',
    freeShip: true,
    minSpend: 500000,
  },
  {
    code: 'FASHION50',
    description: 'Giảm 50.000đ cho đơn hàng thời trang từ 600.000đ',
    fixedDiscount: 50000,
    minSpend: 600000,
  }
];

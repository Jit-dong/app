
export interface Chip {
  id: string;
  model: string;
  description: string;
  manufacturer: string;
  datasheetUrl?: string;
  imageUrl?: string;
  lifecycleStatus?: 'Active' | 'EOL' | 'NRND' | 'Preliminary' | 'Obsolete'; // Not Recommended for New Designs
  packageTypes?: string[];
  distributors?: { name: string; url: string }[];
  parameters?: Record<string, string | number | undefined>; // Allow undefined for flexibility
  tags?: string[];
  // New fields for advanced filtering
  category?: string; // e.g., "MCU > 32-bit MCU", "Power Management > LDO"
  rohsCompliant?: boolean;
  lowPower?: boolean;
  internalOscillator?: boolean;
  automotiveGrade?: boolean; // Can also be a tag, but explicit field is clearer for filtering
  // Fields for new list item display
  applications?: string[];
  series?: boolean; // To indicate if it's part of a "series" and show badge
  // 订购信息相关字段
  status?: string; // 产品状态：量产、停产等
  package?: string; // 封装类型
  price?: string; // 参考价格
  // 图片相关字段
  applicationImageUrl?: string; // 应用图片URL
}

export interface AlternativeChip extends Chip {
  alternativeLevel: 'Direct Drop-in' | 'Similar Functionality' | 'Potential Alternative';
  keyDifferences?: string[];
  similarityScore?: number; // 0-1
}

// 参考设计接口
export interface ReferenceDesign {
  id: string;
  title: string;
  description: string;
  chipModel?: string;
  manufacturer?: string;
  documentUrl?: string;
  imageUrl?: string;
  category: string;
  tags?: string[];
  downloadCount?: number;
  lastUpdated?: string;
}

// 技术文档接口
export interface TechnicalDocument {
  id: string;
  title: string;
  description: string;
  type: 'datasheet' | 'application_note' | 'user_guide' | 'programming_guide' | 'errata';
  chipModel?: string;
  manufacturer?: string;
  documentUrl?: string;
  category: string;
  tags?: string[];
  pageCount?: number;
  lastUpdated?: string;
}

// 应用指南接口
export interface ApplicationGuide {
  id: string;
  title: string;
  description: string;
  chipModel?: string;
  manufacturer?: string;
  applicationField: string; // 如：'汽车电子', '工业控制', '消费电子'
  documentUrl?: string;
  imageUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
  lastUpdated?: string;
}

// 行业资讯接口
export interface IndustryNews {
  id: string;
  title: string;
  description: string;
  content?: string;
  author?: string;
  publishDate: string;
  category: string;
  tags?: string[];
  imageUrl?: string;
  sourceUrl?: string;
  readTime?: number; // 阅读时间（分钟）
}

// 订购详情数据类型
export interface OrderDetail {
  id: string;
  model: string; // 订购型号，如 TPS563201DDCR
  chipId: string; // 对应的芯片ID
  package: string; // 封装类型
  pins?: number; // 管脚数
  silkscreen?: string; // 丝印
  packagingQuantity?: string; // 包装数量
  carrier?: string; // 承运商
  workTemp: string; // 工作温度
  lifecycle: string; // 生命周期状态
  rohs?: string; // 环保等级
  suppliers: {
    name: string;
    price: string;
    stock: string;
    delivery: string;
    moq: string;
    rating: number;
  }[];
}

// 丝印反查数据类型
export interface SilkscreenData {
  id: string;
  silkscreen: string; // 丝印内容
  partNumber: string; // 订购型号
  package: string; // 封装
  manufacturer: string; // 品牌
  category: string; // 分类
  description: string; // 产品描述
  pins: number; // 管脚数
  imageUrl?: string; // 产品图片
  datasheetUrl?: string; // 数据手册链接
  alternativeSilkscreens?: string[]; // 可能的其他丝印变体
}


import React from 'react';
import { Package, Truck, ShoppingCart, FileText } from 'lucide-react';

interface OrderDetailsCardProps {
  model: string;
  package: string;
  pins: number;
  workTemp: string;
  packagingQuantity?: string;
  carrier?: string;
  lifecycle: string;
}

export default function OrderDetailsCard({
  model,
  package: packageType,
  pins,
  workTemp,
  packagingQuantity,
  carrier,
  lifecycle
}: OrderDetailsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 overflow-hidden">
      {/* 卡片头部：包含图片/图标和主要信息 */}
      <div className="p-3 pb-2">
        <div className="flex items-start gap-2 mb-2">
          {/* 图片/图标占位符 */}
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden">
              {/* 尝试加载图片，失败则显示图标 */}
              <img
                src={`/brands/image_cp/${model}.png`} // 使用型号作为图片文件名
                alt={model} // 使用型号作为 alt 文本
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  // 显示 fallback 图标
                  const fallbackIcon = target.parentElement?.querySelector('svg');
                  if (fallbackIcon) {
                    fallbackIcon.classList.remove('hidden');
                  }
                }}
              />
              {/* Fallback 图标，默认隐藏 */}
              <Package className="hidden h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* 主要信息：型号和生命周期 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="font-semibold text-blue-600 dark:text-blue-400 text-sm truncate">{model}</span>
                <div className="flex items-center gap-0.5 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded-full flex-shrink-0">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">{lifecycle}</span>
                </div>
              </div>
              {/* 这里可以添加其他操作按钮，如数据手册 */}
              {/* <button
                className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded transition-colors flex-shrink-0"
                title="下载数据手册PDF"
              >
                <FileText className="h-3 w-3" />
                <span>PDF</span>
              </button> */}
            </div>
            {/* 这里可以添加简要描述，如果 OrderDetailsCardProps 包含 description */}
            {/* <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-tight">简要描述...</p> */}
          </div>
        </div>
      </div>

      {/* 详细信息：封装、引脚、温度、包装、承运商 - 更紧凑的布局 */}
      <div className="px-3 pb-3 text-xs text-gray-600 dark:text-gray-400 space-y-1.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="font-medium text-gray-900 dark:text-gray-100">封装:</span>
            <span className="text-gray-600 dark:text-gray-400">{packageType}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="font-medium text-gray-900 dark:text-gray-100">引脚:</span>
            <span className="text-gray-600 dark:text-gray-400">{pins}</span>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="font-medium text-gray-900 dark:text-gray-100">温度:</span>
            <span className="text-gray-600 dark:text-gray-400">{workTemp}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {packagingQuantity ? (
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="font-medium text-gray-900 dark:text-gray-100">包装数量:</span>
              <span className="text-gray-600 dark:text-gray-400">{packagingQuantity}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="font-medium text-gray-900 dark:text-gray-100">包装:</span>
              <span className="text-gray-600 dark:text-gray-400">2500/T&R</span>
            </div>
          )}
          {carrier && (
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="font-medium text-gray-900 dark:text-gray-100">承运商:</span>
              <span className="text-gray-600 dark:text-gray-400">{carrier}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 
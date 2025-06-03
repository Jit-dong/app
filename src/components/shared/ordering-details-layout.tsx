import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Cpu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OrderDetail } from '@/lib/types';

// 状态颜色配置
const getLifecycleColor = (lifecycle: string) => {
  switch (lifecycle) {
    case '量产':
      return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    case '立即供货':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
    case '停产':
      return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
    case '样品':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
    case '预生产':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
  }
};

// 状态图标配置
const getLifecycleIcon = (lifecycle: string) => {
  switch (lifecycle) {
    case '量产':
      return '✅';
    case '立即供货':
      return '🚀';
    case '停产':
      return '❌';
    case '样品':
      return '🧪';
    case '预生产':
      return '⏳';
    default:
      return '📦';
  }
};

interface OrderingDetailsLayoutProps {
  orderDetails: OrderDetail[];
  title?: string;
  showImage?: boolean; // 是否显示图片
}

export default function OrderingDetailsLayout({
  orderDetails,
  title = "订购详情",
  showImage = false
}: OrderingDetailsLayoutProps) {
  const router = useRouter();

  // 处理查替代按钮点击
  const handleSearchAlternatives = (orderModel: string) => {
    router.push(`/alternatives/results?q=${encodeURIComponent(orderModel)}`);
  };

  if (!orderDetails || orderDetails.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>暂无订购信息</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orderDetails.map((orderDetail) => (
        <div
          key={orderDetail.id}
          className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10 backdrop-blur-sm rounded-xl border border-orange-200/60 dark:border-orange-700/50 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20 overflow-hidden"
        >
          {/* 头部：型号名称、状态和查替代按钮 - 移动端优化 */}
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-950/30 dark:to-orange-900/20 border-b border-orange-200/60 dark:border-orange-700/50">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {/* 图片 - 仅在单个订购详情且showImage为true时显示 */}
              {showImage && orderDetails.length === 1 && (
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  <Image
                    src={`/brands/image_td/${orderDetail.model}.png`}
                    alt={orderDetail.model}
                    width={40}
                    height={40}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      const parent = target.parentElement;
                      if (parent) {
                        target.style.display = 'none';
                        const icon = parent.querySelector('.fallback-icon');
                        if (icon) {
                          (icon as HTMLElement).style.display = 'block';
                        }
                      }
                    }}
                  />
                  <Cpu className="h-5 w-5 text-gray-400 fallback-icon" style={{ display: 'none' }} />
                </div>
              )}
              <span className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                {orderDetail.model}
              </span>
            </div>

            {/* 右侧：状态和查替代按钮 */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSearchAlternatives(orderDetail.model)}
                className="flex items-center gap-1 h-7 px-2 text-xs bg-blue-50/80 dark:bg-blue-950/20 border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200"
                title={`查找 ${orderDetail.model} 的替代料`}
              >
                <Search className="h-3 w-3" />
                查替代
              </Button>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getLifecycleColor(orderDetail.lifecycle)}`}>
                {getLifecycleIcon(orderDetail.lifecycle)} {orderDetail.lifecycle}
              </span>
            </div>
          </div>

          {/* 详细信息：移动端优化的紧密布局 */}
          <div className="p-3">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                <span className="text-gray-600 dark:text-gray-400 text-xs">封装</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
                  {orderDetail.package}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                <span className="text-gray-600 dark:text-gray-400 text-xs">管脚</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs">
                  {orderDetail.pins}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                <span className="text-gray-600 dark:text-gray-400 text-xs">丝印</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
                  {orderDetail.silkscreen || '未知'}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                <span className="text-gray-600 dark:text-gray-400 text-xs">包装</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
                  {orderDetail.packagingQuantity || '未知'}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                <span className="text-gray-600 dark:text-gray-400 text-xs">温度</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs">
                  {orderDetail.workTemp}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                <span className="text-gray-600 dark:text-gray-400 text-xs">承运商</span>
                <span className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
                  {orderDetail.carrier || '未知'}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

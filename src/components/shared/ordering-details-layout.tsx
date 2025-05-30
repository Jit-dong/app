import React from 'react';
import Image from 'next/image';
import { Cpu } from 'lucide-react';
import type { OrderDetail } from '@/lib/types';

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
          {/* 头部：型号名称和状态 - 移动端优化 */}
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
            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full flex-shrink-0">
              量产
            </span>
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

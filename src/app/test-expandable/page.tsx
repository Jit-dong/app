"use client";

import ExpandableAlternatives from "@/components/shared/expandable-alternatives";
import OrderingDetailsLayout from "@/components/shared/ordering-details-layout";
import { placeholderOrderDetails } from "@/lib/placeholder-data";

export default function TestExpandablePage() {
  // 获取 TPS563201 的订购详情
  const tps563201Orders = placeholderOrderDetails.filter(order => 
    order.chipId === 'TPS563201'
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🎯 伸缩替代料功能测试
        </h1>
        
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              TPS563201 订购详情 (集成伸缩替代料)
            </h2>
            
            {/* 使用现有的订购详情布局组件 */}
            <OrderingDetailsLayout 
              orderDetails={tps563201Orders}
              title="订购详情"
              showImage={true}
            />
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-md font-semibold mb-3 text-blue-800 dark:text-blue-200">
              ✨ 功能特点
            </h3>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                点击"查看替代料"按钮展开替代料列表
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                复用现有替代料卡片设计，保持一致性
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                显示兼容度评分、品牌分类和操作按钮
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                支持数据手册查看和详细对比功能
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                提供"查看全部"链接跳转到完整替代料页面
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-md font-semibold mb-3 text-green-800 dark:text-green-200">
              🎨 设计一致性
            </h3>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                使用与现有替代料页面相同的卡片组件
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                保持相同的颜色方案和视觉风格
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                复用现有的动画和交互效果
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                统一的按钮样式和图标使用
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

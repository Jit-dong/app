import Link from 'next/link';
import Image from 'next/image';
import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Replace, ShieldCheck, ExternalLink, Package, ChevronDown, ChevronUp } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { findAlternativesByChipId } from '@/lib/placeholder-data'; // To get alternative count
import { useState } from 'react';

interface ChipListItemProps {
  chip: Chip;
}

export default function ChipListItem({ chip }: ChipListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const alternativeCount = findAlternativesByChipId(chip.id).length;
  const displayAlternativeText = alternativeCount > 0 ? (alternativeCount > 99 ? '99+' : alternativeCount.toString()) : '0';

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
      {/* 产品信息框架 */}
      <div className="px-6 pt-6 pb-6 border-b border-gray-100 dark:border-gray-700">
        {/* 产品标题 */}
        <div className="mb-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-600">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">产品</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-blue-200 dark:border-blue-700/50 shadow-sm">
          {/* 分类路径 */}
          <div className="mb-4">
            <div className="text-sm font-medium text-blue-700 dark:text-blue-300">
              电源管理芯片 › 直流直流交换器 › 降压型稳压器
            </div>
          </div>

        {/* 产品标题区域 */}
        <div className="flex items-start gap-6">
          {/* 产品图片 */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-sm overflow-hidden">
              <Image
                src={`/brands/image_cp/${chip.model}.png`}
                alt={`${chip.model} 产品图片`}
                width={128}
                height={128}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  // 如果图片加载失败，显示默认占位符
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                      </svg>
                    </div>
                  `;
                }}
              />
            </div>
          </div>

          {/* 产品信息 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                {chip.model}
              </h3>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-700 dark:text-green-400">量产</span>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">品牌</span>
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{chip.manufacturer || 'TI(德州仪器)'}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {chip.description}
              </p>
            </div>

            {/* 功能标签 */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {chip.datasheetUrl && chip.datasheetUrl !== '#' && (
                <button
                  onClick={(e) => {
                    stopPropagation(e);
                    window.open(chip.datasheetUrl, '_blank');
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 text-orange-700 dark:text-orange-300 rounded-lg transition-all duration-200 text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  数据手册
                </button>
              )}

              {chip.automotiveGrade && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  车规级
                </div>
              )}

              {/* 替代料信息 */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Replace className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">替代料: 1</span>
              </div>
            </div>

            {/* 订购信息按钮 */}
            <div className="flex justify-end">
              <button
                onClick={toggleExpanded}
                className="group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white rounded-xl transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">订购信息</span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 relative z-10 transition-transform duration-200" />
                ) : (
                  <ChevronDown className="h-4 w-4 relative z-10 transition-transform duration-200 group-hover:translate-y-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>

            {/* 折叠展开的订购信息 - 在产品框架内 */}
            {isExpanded && (
              <div className="border-t border-white/20 dark:border-gray-600/50 pt-6 mt-6 animate-in slide-in-from-top-2 duration-300">
                {/* 顶部标签栏 */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg border border-orange-200 dark:border-orange-700/50">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm font-medium text-orange-700 dark:text-orange-300">数据手册</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">替代料: {displayAlternativeText}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-lg border border-purple-200 dark:border-purple-700/50">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">替代料列表: 2</span>
                  </div>
                </div>

                {/* 替代料列表 */}
                <div className="space-y-4">
                  {/* 第一个替代料 */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {chip.model}DOCT
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">量产</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">封装</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">SOT23-6</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">替代料</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">6</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">数量</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">3,201</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">包装</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">3000/T&R</span>
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">工作温度</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">-40°至125°</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">替代料</span>
                          <span className="text-lg font-bold text-blue-800 dark:text-blue-200">3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 第二个替代料 */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {chip.model}DDCR
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">量产</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">封装</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">SOT23-6</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">替代料</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">6</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">数量</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">3,201</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">包装</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">3000/T&R</span>
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">工作温度</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">-40°至125°</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">替代料</span>
                          <span className="text-lg font-bold text-blue-800 dark:text-blue-200">3</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 第三个替代料 */}
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                            {chip.model}XDCR
                          </span>
                          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 rounded-full">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-green-700 dark:text-green-400">量产</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">封装</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">SOT23-6</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">替代料</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">6</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">数量</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">3,201</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">包装</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">3000/T&R</span>
                          </div>
                          <div className="col-span-2 flex items-center gap-2">
                            <span className="text-gray-500 dark:text-gray-400">工作温度</span>
                            <span className="font-medium text-gray-800 dark:text-gray-200">-40°至125°</span>
                          </div>
                        </div>
                      </div>

                      <div className="ml-4 text-right">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">替代料</span>
                          <span className="text-lg font-bold text-blue-800 dark:text-blue-200">3</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 参考设计 */}
      <div className="px-6 pt-6 pb-6 border-b border-gray-100 dark:border-gray-700">
        {/* 参考设计标题 */}
        <div className="mb-3">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-600">
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">参考设计</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border border-indigo-200 dark:border-indigo-700/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {chip.model}EVM-715
              </h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">品牌</span>
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{chip.manufacturer || 'TI(德州仪器)'}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  3A SWIFT 降压转换器评估模块
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>





      {/* 技术资源 */}
      <div className="px-6 space-y-4">
        {/* 技术文档 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <FileText className="h-4 w-4 text-orange-600 dark:text-orange-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">技术文档</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Keeping DC/DC solutions (super) simple for cost-sensitive applications
          </p>
        </div>

        {/* 应用指南 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
              <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">应用指南</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Keeping DC/DC solutions (super) simple for cost-sensitive applications
          </p>
        </div>

        {/* 行业资讯 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">行业资讯</h4>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Keeping DC/DC solutions (super) simple for cost-sensitive applications
          </p>
        </div>
      </div>
    </div>
  );
}

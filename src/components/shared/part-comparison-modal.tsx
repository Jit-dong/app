"use client";

import { Button } from '@/components/ui/button';
import { X, CheckCircle, AlertTriangle, FileText, Cpu } from 'lucide-react';
import type { AlternativePart } from '@/lib/types';

interface PartComparisonModalProps {
  originalPart: string;
  alternativePart: AlternativePart;
  isOpen: boolean;
  onClose: () => void;
}

// 替代等级配置
const alternativeLevelConfig = {
  'BOM2BOM': {
    label: '完全替代 (BOM2BOM)',
    icon: '🥇',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: '封装、管脚、电气特性完全相同，可直接替换'
  },
  'P2P': {
    label: '管脚相同 (P2P)',
    icon: '🥈',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: '管脚定义相同，封装可能不同，需确认电气参数'
  },
  'FUNCTIONAL': {
    label: '功能相近',
    icon: '🥉',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    description: '功能类似但参数可能不同，需要重新设计验证'
  },
  'PACKAGE': {
    label: '封装相同',
    icon: '📦',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    description: '仅封装尺寸相同，功能可能完全不同'
  }
};

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

export default function PartComparisonModal({
  originalPart,
  alternativePart,
  isOpen,
  onClose
}: PartComparisonModalProps) {
  if (!isOpen) return null;

  const levelConfig = alternativeLevelConfig[alternativePart.alternativeLevel];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Cpu className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold">详细对比</h2>
                <p className="text-sm opacity-90">
                  {originalPart} vs {alternativePart.partNumber}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* 替代等级信息 */}
          <div className={`rounded-xl p-4 mb-6 ${levelConfig.bgColor}`}>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{levelConfig.icon}</span>
              <div>
                <h3 className={`font-bold ${levelConfig.color}`}>
                  {levelConfig.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  兼容性评分: {alternativePart.compatibilityScore}%
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {levelConfig.description}
            </p>
          </div>

          {/* 基本信息对比 */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {/* 原器件 */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                原器件
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">型号:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{originalPart}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">品牌:</span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">TI(德州仪器)</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">封装:</span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">SOT-23-6 (DDC)</span>
                </div>
              </div>
            </div>

            {/* 替代器件 */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                替代器件
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400">型号:</span>
                  <span className="ml-2 font-medium text-gray-900 dark:text-gray-100">{alternativePart.partNumber}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">品牌:</span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">{alternativePart.manufacturer}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">封装:</span>
                  <span className="ml-2 text-gray-900 dark:text-gray-100">{alternativePart.package}</span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400">状态:</span>
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${getLifecycleColor(alternativePart.lifecycle)}`}>
                    {getLifecycleIcon(alternativePart.lifecycle)} {alternativePart.lifecycle}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 相同点 */}
          {alternativePart.similarities && alternativePart.similarities.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                相同点
              </h4>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                <ul className="space-y-2">
                  {alternativePart.similarities.map((similarity, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{similarity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 差异点 */}
          {alternativePart.keyDifferences && alternativePart.keyDifferences.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                主要差异
              </h4>
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4">
                <ul className="space-y-2">
                  {alternativePart.keyDifferences.map((difference, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-orange-500 mt-0.5">⚠</span>
                      <span className="text-gray-700 dark:text-gray-300">{difference}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 产品描述 */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">产品描述</h4>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                {alternativePart.description}
              </p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                if (alternativePart.datasheetUrl) {
                  window.open(alternativePart.datasheetUrl, '_blank');
                }
              }}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              查看数据手册
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              关闭对比
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

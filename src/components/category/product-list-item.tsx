"use client";

import { Chip } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { FileText, ShieldCheck } from 'lucide-react';

interface ProductListItemProps {
  chip: Chip;
}

export default function ProductListItem({ chip }: ProductListItemProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/chip/${chip.id}`);
  };

  // 格式化参数显示
  const formatParameter = (key: string, value: string | number | undefined) => {
    if (value === undefined) return null;
    return `${key}: ${value}`;
  };

  // 获取关键参数
  const getKeyParameters = () => {
    const params = [];

    if (chip.parameters?.['Input Voltage Min'] && chip.parameters?.['Input Voltage Max']) {
      params.push(`输入电压: ${chip.parameters['Input Voltage Min']}V-${chip.parameters['Input Voltage Max']}V`);
    }

    if (chip.parameters?.['Output Current Max']) {
      params.push(`输出电流: ${chip.parameters['Output Current Max']}A`);
    }

    if (chip.parameters?.['Switching Frequency']) {
      params.push(`开关频率: ${chip.parameters['Switching Frequency']}`);
    }

    if (chip.packageTypes && chip.packageTypes.length > 0) {
      params.push(`封装: ${chip.packageTypes.join(', ')}`);
    }

    return params;
  };

  const keyParameters = getKeyParameters();

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="space-y-2">
        {/* 产品型号和状态 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleClick}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-lg hover:underline transition-colors"
            >
              {chip.model}
            </button>

            {chip.series && (
              <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded-md font-medium">
                系列
              </span>
            )}

            {chip.automotiveGrade && (
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-md font-medium">
                <ShieldCheck className="h-3 w-3" />
                车规级
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {chip.status && (
              <span className={`px-2 py-1 text-xs rounded-md font-medium ${
                chip.status === '量产'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {chip.status}
              </span>
            )}
          </div>
        </div>

        {/* 产品描述 */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          {chip.description}
        </p>

        {/* 关键参数 */}
        {keyParameters.length > 0 && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
            {keyParameters.map((param, index) => (
              <span key={index} className="flex items-center">
                {param}
              </span>
            ))}
          </div>
        )}

        {/* 应用领域和操作按钮 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {chip.applications && chip.applications.length > 0 && (
              <div className="flex flex-wrap gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">应用:</span>
                {chip.applications.slice(0, 3).map((app, index) => (
                  <span key={index} className="text-xs text-gray-600 dark:text-gray-400">
                    {app}{index < Math.min(chip.applications!.length, 3) - 1 ? '、' : ''}
                  </span>
                ))}
                {chip.applications.length > 3 && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">等</span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {chip.datasheetUrl && chip.datasheetUrl !== '#' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(chip.datasheetUrl, '_blank');
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-md text-xs font-medium transition-colors"
              >
                <FileText className="h-3 w-3" />
                数据手册
              </button>
            )}

            <button
              onClick={handleClick}
              className="px-3 py-1.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/50 rounded-md text-xs font-medium transition-colors"
            >
              查看详情
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

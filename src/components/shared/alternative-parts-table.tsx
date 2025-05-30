import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { FileText, Download, Mail, Cpu, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import type { AlternativePart } from '@/lib/types';

interface AlternativePartsTableProps {
  parts: AlternativePart[];
  originalPart: string;
}

export default function AlternativePartsTable({ parts, originalPart }: AlternativePartsTableProps) {
  const { toast } = useToast();

  // 数据手册处理函数
  const handleDatasheetOpen = (part: AlternativePart) => {
    if (part.datasheetUrl) {
      window.open(part.datasheetUrl, '_blank');
      toast({
        title: "数据手册打开",
        description: `正在新窗口中打开 ${part.partNumber} 数据手册...`,
      });
    } else {
      toast({
        title: "数据手册不可用",
        description: "该替代料的数据手册暂时无法访问。",
        variant: "destructive",
      });
    }
  };

  // 获取生命周期状态的颜色和图标
  const getLifecycleStatus = (lifecycle: string) => {
    switch (lifecycle) {
      case '量产':
        return {
          color: 'text-green-600 dark:text-green-400',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-700',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case '立即供货':
        return {
          color: 'text-blue-600 dark:text-blue-400',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-700',
          icon: <CheckCircle className="h-3 w-3" />
        };
      case '停产':
        return {
          color: 'text-red-600 dark:text-red-400',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-700',
          icon: <XCircle className="h-3 w-3" />
        };
      default:
        return {
          color: 'text-gray-600 dark:text-gray-400',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-700',
          icon: <AlertCircle className="h-3 w-3" />
        };
    }
  };

  // 获取替代类型的颜色和图标
  const getAvailabilityStatus = (availability: string, pinToPin: boolean) => {
    if (pinToPin) {
      return {
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-50 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-700',
        text: 'pin to pin'
      };
    } else {
      return {
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-50 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-700',
        text: availability
      };
    }
  };

  if (parts.length === 0) {
    return (
      <div className="text-center py-8">
        <Cpu className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          暂无替代料信息
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          该订购型号暂时没有可用的替代料数据
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl border border-orange-200/60 dark:border-gray-700/50 shadow-lg shadow-orange-100/50 dark:shadow-gray-900/20">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Cpu className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {originalPart} 替代料信息
            </h2>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              共找到 {parts.length} 个替代料选择
            </p>
          </div>
        </div>

        {/* 移动端卡片布局 */}
        <div className="space-y-3">
          {parts.map((part, index) => {
            const lifecycleStatus = getLifecycleStatus(part.lifecycle);
            const availabilityStatus = getAvailabilityStatus(part.availability, part.pinToPin);

            return (
              <div key={part.id} className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl border border-gray-200/60 dark:border-gray-600/50 p-3 hover:shadow-md transition-all duration-200">
                {/* 头部：图片、型号、选择框 */}
                <div className="flex items-center gap-3 mb-3">
                  {/* 选择框 */}
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 dark:focus:ring-orange-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 flex-shrink-0"
                  />

                  {/* 图片 */}
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                    {part.imageUrl ? (
                      <Image
                        src={part.imageUrl}
                        alt={part.partNumber}
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
                    ) : null}
                    <Cpu className="h-5 w-5 text-gray-400 fallback-icon" style={{ display: part.imageUrl ? 'none' : 'block' }} />
                  </div>

                  {/* 型号和品牌 */}
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100 text-sm truncate">
                      {part.partNumber}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {part.manufacturer}
                    </div>
                  </div>

                  {/* 数据手册按钮 */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-700 bg-red-50/50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 transition-all duration-300 px-2 py-1 h-auto text-xs flex-shrink-0"
                    onClick={() => handleDatasheetOpen(part)}
                    title="查看数据手册"
                  >
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>

                {/* 详细信息网格 */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-3">
                  <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                    <span className="text-gray-600 dark:text-gray-400">替代类型</span>
                    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${availabilityStatus.color} ${availabilityStatus.bgColor} border ${availabilityStatus.borderColor}`}>
                      {availabilityStatus.text}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                    <span className="text-gray-600 dark:text-gray-400">封装</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
                      {part.package}
                    </span>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                    <span className="text-gray-600 dark:text-gray-400">生命周期</span>
                    <div className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-xs font-medium ${lifecycleStatus.color} ${lifecycleStatus.bgColor} border ${lifecycleStatus.borderColor}`}>
                      {lifecycleStatus.icon}
                      {part.lifecycle}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] gap-1.5 text-xs">
                    <span className="text-gray-600 dark:text-gray-400">国家/地区</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100 text-xs truncate">
                      {part.notes}
                    </span>
                  </div>
                </div>

                {/* 描述 */}
                <div className="text-xs text-gray-700 dark:text-gray-300 line-clamp-2" title={part.description}>
                  {part.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

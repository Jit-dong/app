"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { findAlternativePartsByOrderModel } from "@/lib/placeholder-data";
import type { AlternativePart } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { GitCompare, FileText, Download, Mail } from "lucide-react";

// 复用现有的替代料卡片组件样式
function AlternativePartCard({
  part,
  onDatasheetOpen,
  onCompare
}: {
  part: AlternativePart;
  onDatasheetOpen: (part: AlternativePart) => void;
  onCompare?: (part: AlternativePart) => void;
}) {
  // 兼容度配置 - 与现有系统保持一致
  const alternativeLevelConfig = {
    'BOM2BOM': {
      label: '完全兼容',
      color: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30',
      score: 95
    },
    'P2P': {
      label: 'P2P兼容',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30',
      score: 88
    },
    'FUNCTIONAL': {
      label: '功能相近',
      color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30',
      score: 75
    },
    'PACKAGE': {
      label: '封装相同',
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/30',
      score: 65
    }
  };

  const brandCategoryConfig = {
    'DOMESTIC': { label: '国内品牌', color: 'text-red-600' },
    'FOREIGN': { label: '国外品牌', color: 'text-blue-600' },
    'SAME_BRAND': { label: '相同品牌', color: 'text-green-600' }
  };

  const levelConfig = alternativeLevelConfig[part.alternativeLevel] || {
    label: '功能相近',
    color: 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/30',
    score: part.compatibilityScore || 70
  };
  const brandConfig = brandCategoryConfig[part.brandCategory] || { label: '其他品牌', color: 'text-gray-600' };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-lg border border-gray-200/60 dark:border-gray-600/50 p-2 hover:shadow-md transition-all duration-200">
      {/* 头部：图片、型号、评分 - 单行布局 */}
      <div className="flex items-center gap-2 mb-1">
        {/* 产品图片 - 更小 */}
        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-600 rounded-md flex items-center justify-center flex-shrink-0 overflow-hidden">
          {part.imageUrl ? (
            <img
              src={part.imageUrl}
              alt={part.partNumber}
              className="w-full h-full object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : (
            <Cpu className="h-4 w-4 text-gray-400" />
          )}
          <Cpu className="hidden h-4 w-4 text-gray-400" />
        </div>

        {/* 型号和品牌 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-xs truncate">
              {part.partNumber}
            </h4>
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${levelConfig.color} font-medium`}>
              {levelConfig.score}%
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
            {part.manufacturer} • {levelConfig.label}
          </p>
        </div>

        {/* 操作按钮 - 更小 */}
        <div className="flex gap-1 flex-shrink-0">
          {/* 对比按钮 */}
          {onCompare && (
            <Button
              variant="outline"
              size="sm"
              className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 px-1 py-0.5 h-auto text-xs"
              onClick={() => onCompare(part)}
              title="详细对比"
            >
              <GitCompare className="h-3 w-3" />
            </Button>
          )}

          {/* 数据手册按钮 */}
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 dark:text-green-400 border-green-200 dark:border-green-700 bg-green-50/50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 px-1 py-0.5 h-auto text-xs"
            onClick={() => onDatasheetOpen(part)}
            title="数据手册"
          >
            <FileText className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* 底部：关键参数 - 极致紧凑 */}
      <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 dark:text-gray-400">
        <div className="truncate">
          <span className="text-gray-500">封装:</span> {part.package}
        </div>
        <div className="truncate">
          <span className="text-gray-500">状态:</span>
          <span className="text-green-600 dark:text-green-400 ml-1">量产</span>
        </div>
      </div>
    </div>
  );
}

interface ExpandableAlternativesProps {
  orderPartNumber: string;
  maxPreviewItems?: number;
}

export default function ExpandableAlternatives({
  orderPartNumber,
  maxPreviewItems = 3
}: ExpandableAlternativesProps) {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [alternatives, setAlternatives] = useState<AlternativePart[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 获取替代料数据
  const loadAlternatives = async () => {
    if (alternatives.length > 0) return; // 已加载过

    setIsLoading(true);
    try {
      const result = await findAlternativePartsByOrderModel(orderPartNumber);
      setAlternatives(result);
    } catch (error) {
      toast({
        title: "加载失败",
        description: "无法获取替代料信息，请稍后重试",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // 展开/收起处理
  const handleToggle = async () => {
    if (!isExpanded) {
      await loadAlternatives();
    }
    setIsExpanded(!isExpanded);
  };

  // 数据手册处理
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

  // 对比处理
  const handleCompare = (part: AlternativePart) => {
    toast({
      title: "对比功能",
      description: `正在准备 ${part.partNumber} 的详细对比信息...`,
    });
  };

  const previewAlternatives = alternatives.slice(0, maxPreviewItems);
  const hasMore = alternatives.length > maxPreviewItems;

  return (
    <div className="mt-2">
      {/* 展开/收起按钮 */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleToggle}
        disabled={isLoading}
        className="w-full text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 py-1.5 text-xs"
      >
        <Search className="h-3 w-3 mr-1" />
        {isLoading ? (
          "加载中..."
        ) : isExpanded ? (
          <>收起替代料 <ChevronUp className="h-3 w-3 ml-1" /></>
        ) : (
          <>查看替代料 {alternatives.length > 0 && `(${alternatives.length}个)`} <ChevronDown className="h-3 w-3 ml-1" /></>
        )}
      </Button>

      {/* 替代料展示区域 */}
      {isExpanded && (
        <div className="mt-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg border border-orange-200/60 dark:border-gray-700/50 shadow-lg shadow-orange-100/50 dark:shadow-gray-900/20 p-2 animate-in slide-in-from-top-2 duration-300">
          {/* 标题 */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-purple-600 rounded-md flex items-center justify-center">
              <Cpu className="h-3 w-3 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                {orderPartNumber} 替代料
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                共 {alternatives.length} 个替代方案
              </p>
            </div>
          </div>

          {/* 替代料列表 */}
          <div className="space-y-1.5">
            {alternatives.length === 0 ? (
              <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                <Search className="h-6 w-6 mx-auto mb-1 opacity-50" />
                <p className="text-xs">暂无替代料信息</p>
              </div>
            ) : (
              <>
                {/* 显示预览或全部 */}
                {(isExpanded ? alternatives : previewAlternatives).map(part => (
                  <AlternativePartCard
                    key={part.id}
                    part={part}
                    onDatasheetOpen={handleDatasheetOpen}
                    onCompare={handleCompare}
                  />
                ))}

                {/* 查看更多按钮 */}
                {hasMore && (
                  <div className="pt-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 text-xs py-1"
                      onClick={() => {
                        // 跳转到完整的替代料页面
                        window.open(`/alternatives/results?query=${orderPartNumber}`, '_blank');
                      }}
                    >
                      查看全部 {alternatives.length} 个替代料 →
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

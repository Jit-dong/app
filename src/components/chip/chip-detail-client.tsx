'use client';

import type { Chip } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  Share2,
  FileText,
  Phone,
  ChevronRight,
  Square,
  Download,
  Mail,
  Info,
  Cpu,
  Zap,
  Package,
  BookOpen,
  FileImage,
  Users,
  Settings,
  Code,
  ShoppingCart,
  Star,
  Heart,
  Eye,
  Layers,
  Shield,
  Award,
  Target,
  Briefcase,
  Database,
  GitBranch,
  BarChart3,
  Wrench
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';

interface ProcessedChip extends Chip {
  displayManufacturer: string;
  displayCategory: string;
  displayDescription: string;
}

interface ChipDetailClientProps {
  chip: ProcessedChip;
  featuresList: { text: string; subItems?: string[] }[];
}

export default function ChipDetailClient({ chip, featuresList }: ChipDetailClientProps) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    // Ensure window object is available before accessing location
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);


  const handleShare = async () => {
    if (navigator.share && currentUrl) {
      try {
        await navigator.share({
          title: `芯片: ${chip.model}`,
          text: `查看 ${chip.model} (${chip.manufacturer}) 的详细信息。`,
          url: currentUrl,
        });
      } catch (error) {
        console.error('分享失败:', error);
        toast({
          title: "分享失败",
          description: "无法完成分享操作。",
          variant: "destructive",
        });
      }
    } else if (currentUrl) {
      try {
        await navigator.clipboard.writeText(currentUrl);
        toast({
          title: "分享链接已复制",
          description: "链接已复制到剪贴板。",
        });
      } catch (error) {
        console.error('复制失败:', error);
        toast({
          title: "复制失败",
          description: "无法复制链接到剪贴板。",
          variant: "destructive",
        });
      }
    } else {
       toast({
        title: "无法分享",
        description: "当前页面链接不可用。",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 页面顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between py-3 px-4">
          <Link href="/" passHref legacyBehavior>
            <Button variant="ghost" size="icon" aria-label="返回">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">芯片详情</h1>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" aria-label="收藏">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="分享" onClick={handleShare}>
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* 芯片基本信息 - 紧凑布局 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    {chip.model}
                  </h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {chip.displayManufacturer}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {chip.lifecycleStatus || 'Active'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                {chip.displayDescription}
              </p>
            </div>
          </div>
        </div>

        {/* 芯片产品功能模块 - 严格按照层级图设计 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">芯片产品</h3>
            </div>
          </div>

          <div className="p-4 space-y-3">
            {/* 基本信息 */}
            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <Info className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">基本信息</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">产品描述、厂商、生命周期、封装信息、规格书</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 产品详情 */}
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">产品详情</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">特性、说明、典型应用、典型应用电路图、封装引脚图、功能框图</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 功能参数 */}
            <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Settings className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">功能参数</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">拓扑架构、参数指标、保护功能、辅助功能</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 相似产品 */}
            <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <GitBranch className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">相似产品</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">完全兼容、p2p兼容、功能相似、封装相同、国产品牌、国外品牌、相同品牌</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 技术文章 */}
            <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-950/20 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                  <FileImage className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">技术文章</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">应用指南、产品介绍、测试报告等</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 参考设计 */}
            <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <Code className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">参考设计</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">参考设计名称、介绍、SCH、PCB、BOM、测试报告等</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 设计开发 */}
            <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-950/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">设计开发</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">CAD符号、封装、仿真模型</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>

            {/* 产品订购 */}
            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">产品订购</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">器件网络号、生命周期、工作温度、应用等级、环保等级、湿敏等级、采购渠道、价格、库存、交期</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* 详细信息切换标签区 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg m-4 mb-0">
              <TabsTrigger value="features" className="text-sm">
                特性
              </TabsTrigger>
              <TabsTrigger value="applications" className="text-sm">
                典型应用
              </TabsTrigger>
              <TabsTrigger value="parameters" className="text-sm">
                关键参数
              </TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="p-4">
              <div className="space-y-2">
                {featuresList.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </p>
                      {feature.subItems && feature.subItems.length > 0 && (
                        <div className="mt-1 ml-3 space-y-1">
                          {feature.subItems.map((subItem, subIndex) => (
                            <div key={subIndex} className="flex items-start gap-1">
                              <div className="w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0"></div>
                              <p className="text-xs text-gray-600 dark:text-gray-400">{subItem}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="applications" className="p-4">
              <div className="space-y-4">
                {/* 典型应用电路图 */}
                {chip.model === 'TPS563201' && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 text-sm">典型应用电路</h4>
                    <div className="flex justify-center">
                      <Image
                        src="/brands/dxyy.png"
                        alt="TPS563201典型应用电路图"
                        width={300}
                        height={200}
                        className="rounded-lg bg-white p-2"
                      />
                    </div>
                  </div>
                )}

                {/* 应用领域列表 */}
                {chip.applications && chip.applications.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm">应用领域</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {chip.applications.map((app, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-700/50 rounded text-sm">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">{app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(!chip.applications || chip.applications.length === 0) && chip.model !== 'TPS563201' && (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">此部分内容正在准备中</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="parameters" className="p-4">
              <div className="space-y-2">
                {chip.parameters && Object.keys(chip.parameters).length > 0 ? (
                  Object.entries(chip.parameters).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{key}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {value !== undefined ? String(value) : '-'}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">此部分内容正在准备中或无可用参数</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

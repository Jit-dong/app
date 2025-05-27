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
        {/* 芯片标题和基本信息 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {chip.model}
                </h1>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 dark:text-green-400">正在供货</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {chip.displayDescription}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <span>制造商: {chip.displayManufacturer}</span>
                <span>分类: {chip.displayCategory}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                <FileText className="h-4 w-4 mr-1" />
                数据表
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                立即订购
              </Button>
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
            {/* 产品详情 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 hover:bg-green-100 dark:hover:bg-green-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">产品详情</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div>• 特性、说明、典型应用</div>
                  <div>• 典型应用电路图、封装引脚图、功能框图</div>
                </div>
              </div>
            </div>

            {/* 功能参数 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <Settings className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">功能参数</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  • 拓扑架构、参数指标、保护功能、辅助功能
                </div>
              </div>
            </div>

            {/* 相似产品 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-950/20 hover:bg-orange-100 dark:hover:bg-orange-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                    <GitBranch className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">相似产品</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div>• 完全兼容、p2p兼容、功能相似、封装相同</div>
                  <div>• 国产品牌、国外品牌、相同品牌</div>
                </div>
              </div>
            </div>

            {/* 技术文章 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-teal-50 dark:bg-teal-950/20 hover:bg-teal-100 dark:hover:bg-teal-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                    <FileImage className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">技术文章</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  • 应用指南、产品介绍、测试报告等
                </div>
              </div>
            </div>

            {/* 参考设计 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-indigo-50 dark:bg-indigo-950/20 hover:bg-indigo-100 dark:hover:bg-indigo-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <Code className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">参考设计</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  • 参考设计名称、介绍、SCH、PCB、BOM、测试报告等
                </div>
              </div>
            </div>

            {/* 设计开发 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-pink-50 dark:bg-pink-950/20 hover:bg-pink-100 dark:hover:bg-pink-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">设计开发</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  • CAD符号、封装、仿真模型
                </div>
              </div>
            </div>

            {/* 产品订购 */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">产品订购</h4>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <div>• 器件网络号、生命周期、工作温度、应用等级、环保等级</div>
                  <div>• 采购渠道、价格、库存、交期</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 详细信息展示区域 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">详细信息</h2>

            {/* 详细信息标签页 */}
            <Tabs defaultValue="parameters" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg mb-4">
                <TabsTrigger value="parameters" className="text-sm">
                  参数
                </TabsTrigger>
                <TabsTrigger value="package" className="text-sm">
                  封装 | 引脚 | 尺寸
                </TabsTrigger>
                <TabsTrigger value="features" className="text-sm">
                  特性
                </TabsTrigger>
                <TabsTrigger value="description" className="text-sm">
                  说明
                </TabsTrigger>
              </TabsList>

              {/* 参数标签页 */}
              <TabsContent value="parameters" className="mt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Rating</span>
                      <span className="font-medium">Catalog</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Topology</span>
                      <span className="font-medium">Buck</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Iout (max) (A)</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Vin (max) (V)</span>
                      <span className="font-medium">17</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Vin (min) (V)</span>
                      <span className="font-medium">4.5</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Vout (max) (V)</span>
                      <span className="font-medium">7</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Vout (min) (V)</span>
                      <span className="font-medium">0.76</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Features</span>
                      <span className="font-medium text-right">Enable, Light Load Efficiency, Soft Start Fixed, Synchronous Rectification</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Operating temperature range (°C)</span>
                      <span className="font-medium">-40 to 125</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Switching frequency (min) (kHz)</span>
                      <span className="font-medium">580</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Switching frequency (max) (kHz)</span>
                      <span className="font-medium">580</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Iq (typ) (μA)</span>
                      <span className="font-medium">400</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Control mode</span>
                      <span className="font-medium">D-CAP2</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Duty cycle (max) (%)</span>
                      <span className="font-medium">80</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-600 dark:text-gray-400">Type</span>
                      <span className="font-medium">Converter</span>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 封装标签页 */}
              <TabsContent value="package" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="font-medium text-blue-600">SOT-23-THIN (DDC)</div>
                    <div className="text-center">6</div>
                    <div className="text-right">8.12 mm² 2.9 x 2.8</div>
                  </div>
                  <div className="flex items-center gap-2 text-blue-600">
                    <GitBranch className="h-4 w-4" />
                    <Link href="#" className="hover:underline">
                      查找其他 AC/DC 和 DC/DC 转换器（集成 FET）
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* 特性标签页 */}
              <TabsContent value="features" className="mt-0">
                <div className="space-y-2">
                  {featuresList.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </p>
                    </div>
                  ))}
                  <div className="mt-4 flex items-center gap-2 text-blue-600">
                    <GitBranch className="h-4 w-4" />
                    <Link href="#" className="hover:underline">
                      查找其他 AC/DC 和 DC/DC 转换器（集成 FET）
                    </Link>
                  </div>
                </div>
              </TabsContent>

              {/* 说明标签页 */}
              <TabsContent value="description" className="mt-0">
                <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  <p>
                    TPS563201 和 TPS563208 是采用小外形尺寸晶体管 (SOT)-23 封装的简单易用型 3A 同步降压转换器。
                  </p>
                  <p>
                    这些器件的设计初衷是使用尽可能少的外部元件即可运行，还可以实现低待机电流。
                  </p>
                  <p>
                    这些开关模式电源 (SMPS) 器件采用 D-CAP2 控制拓扑，从而提供快速瞬态响应，并且在无需外部补偿元件的情况下支持专用聚合物等低效串联电阻 (ESR) 输出电容器以及超低 ESR 陶瓷电容器。
                  </p>
                  <p>
                    TPS563201 可在脉冲跳跃模式下运行，从而能在轻载运行期间保持高效率。TPS563201 和 TPS563208 采用 6 引脚 1.6mm x 2.9mm SOT (DDC) 封装，额定结温范围为 –40°C 至 125°C。
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-blue-600">
                    <GitBranch className="h-4 w-4" />
                    <Link href="#" className="hover:underline">
                      查找其他 AC/DC 和 DC/DC 转换器（集成 FET）
                    </Link>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

      </div>
    </div>
  );
}

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
          <div className="flex items-start gap-4 mb-4">
            {/* 产品图片 */}
            {chip.imageUrl && (
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={chip.imageUrl}
                    alt={chip.model}
                    width={80}
                    height={80}
                    className="object-contain"
                    onError={(e) => {
                      // 如果图片加载失败，显示默认图标
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <Cpu className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {chip.model}
                </h1>
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-600 dark:text-green-400">量产</span>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {chip.displayDescription}
              </p>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <div>封装: <span className="font-medium text-gray-900 dark:text-gray-100">SOT-23-THN</span></div>
                <div>分类: <span className="font-medium text-gray-900 dark:text-gray-100">电源管理芯片\直流直流变换器\降压型稳压器</span></div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={() => {
                if (chip.datasheetUrl) {
                  // 创建一个临时的下载链接
                  const link = document.createElement('a');
                  link.href = chip.datasheetUrl;
                  link.download = `${chip.model}_datasheet.pdf`;
                  link.target = '_blank';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);

                  // 显示下载提示
                  toast({
                    title: "数据手册下载",
                    description: `正在下载 ${chip.model} 数据手册...`,
                  });
                }
              }}
            >
              <Download className="h-4 w-4 mr-1" />
              数据手册
            </Button>
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
                <div className="space-y-3">
                  {/* 基本参数 */}
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-3">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">基本参数</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">拓扑架构 (Topology)</span>
                        <span className="font-medium">{chip.parameters?.['Topology'] || 'Buck'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">输入电压范围 (Vin)</span>
                        <span className="font-medium">{chip.parameters?.['Input Voltage Min']}V - {chip.parameters?.['Input Voltage Max']}V</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">输出电压范围 (Vout)</span>
                        <span className="font-medium">{chip.parameters?.['Output Voltage Min']}V - {chip.parameters?.['Output Voltage Max']}V</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">输出电流 (Iout max)</span>
                        <span className="font-medium">{chip.parameters?.['Output Current Max']}A</span>
                      </div>
                    </div>
                  </div>

                  {/* 控制参数 */}
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-3">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">控制参数</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">控制模式</span>
                        <span className="font-medium">{chip.parameters?.['Control Mode'] || 'D-CAP2™'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">开关频率</span>
                        <span className="font-medium">{chip.parameters?.['Switching Frequency'] || '580 kHz'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">最大占空比</span>
                        <span className="font-medium">{chip.parameters?.['Duty Cycle Max'] || '80%'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">关断电流</span>
                        <span className="font-medium">{chip.parameters?.['Shutdown Current'] || '< 10µA'}</span>
                      </div>
                    </div>
                  </div>

                  {/* 工作条件 */}
                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">工作条件</h4>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">工作温度范围</span>
                        <span className="font-medium">{chip.parameters?.['Operating Temperature Min']}°C 至 {chip.parameters?.['Operating Temperature Max']}°C</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">效率</span>
                        <span className="font-medium">{chip.parameters?.['Efficiency'] || '95%'}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-gray-600 dark:text-gray-400">封装类型</span>
                        <span className="font-medium">{chip.packageTypes?.join(', ') || 'SOT-23 (DDC)'}</span>
                      </div>
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
                  <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">产品概述</h4>
                    <p>
                      TPS563201 是一款易于使用、具有成本效益的同步降压转换器。采用 D-CAP2™ 控制模式，提供快速的瞬态响应，并支持低 ESR 输出电容器（如 POSCAP 或 SP-CAP），无需外部补偿组件。
                    </p>
                  </div>

                  {/* 典型应用电路图 */}
                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-3">典型应用电路图</h4>
                    <div className="flex justify-center">
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                        <Image
                          src="/brands/image_cp/TPS563201_.png"
                          alt="TPS563201典型应用电路图"
                          width={400}
                          height={300}
                          className="object-contain max-w-full h-auto"
                          onError={(e) => {
                            // 如果图片加载失败，显示占位符
                            e.currentTarget.style.display = 'none';
                            const placeholder = e.currentTarget.nextElementSibling as HTMLElement;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                        <div className="hidden items-center justify-center h-48 bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                          <div className="text-center">
                            <FileImage className="h-12 w-12 mx-auto mb-2" />
                            <p>典型应用电路图</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4">
                    <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">主要特性</h4>
                    <ul className="space-y-1">
                      <li>• D-CAP2™ 控制模式，实现快速瞬态响应</li>
                      <li>• 输入电压范围: 4.5V 至 17V</li>
                      <li>• 输出电压范围: 0.76V 至 7V (可调)</li>
                      <li>• 3A 持续输出电流</li>
                      <li>• 集成 FETs (65mΩ 高侧, 36mΩ 低侧)</li>
                      <li>• Eco-mode™ 轻载高效工作模式</li>
                      <li>• 固定开关频率: 580 kHz</li>
                      <li>• 低关断电流: &lt; 10µA (典型值)</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
                    <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">典型应用</h4>
                    <ul className="space-y-1">
                      {chip.applications?.map((app, index) => (
                        <li key={index}>• {app}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4">
                    <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">保护功能</h4>
                    <ul className="space-y-1">
                      <li>• 过流保护 (OCP): 逐周期谷值电流限制</li>
                      <li>• 欠压保护 (UVP): Hiccup mode</li>
                      <li>• 热关断 (TSD): Non-latch</li>
                      <li>• 支持预偏置启动</li>
                      <li>• 可调软启动时间</li>
                    </ul>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-blue-600">
                    <GitBranch className="h-4 w-4" />
                    <Link href="#" className="hover:underline">
                      查看更多 TI 降压转换器产品
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

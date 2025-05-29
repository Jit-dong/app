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

  Square,
  Download,
  Mail,
  Info,
  Cpu,
  Zap,
  Package,
  BookOpen,
  FileImage,


  ShoppingCart,
  Heart,
  Eye
} from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

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

  const [showAllArticles, setShowAllArticles] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 折叠区域状态管理
  const [expandedSections, setExpandedSections] = useState({
    features: false,
    description: false,
    applications: false,
    parameters: false,
    package: false
  });

  // 设计开发标签页折叠区域状态管理
  const [designDevSections, setDesignDevSections] = useState({
    designTools: false,      // 设计工具的资源
    referenceDesign: false,  // 参考设计
    cadModels: true,         // CAD 符号、封装和 3D 模型 (默认展开)
  });

  // 切换折叠区域
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 切换设计开发折叠区域
  const toggleDesignDevSection = (section: keyof typeof designDevSections) => {
    setDesignDevSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // 产品详情图片数据
  const productImages = [
    {
      src: "/brands/image_cp/TPS563201_.png",
      title: "典型应用电路图",
      alt: "TPS563201典型应用电路图"
    },
    {
      src: "/brands/image_cp/TPS563201.png",
      title: "引脚图",
      alt: "TPS563201引脚图"
    }
  ];

  // 切换到下一张图片
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    setIsAutoPlaying(false); // 手动操作时暂停自动播放
    setTimeout(() => setIsAutoPlaying(true), 8000); // 8秒后恢复自动播放
  };

  // 切换到上一张图片
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
    setIsAutoPlaying(false); // 手动操作时暂停自动播放
    setTimeout(() => setIsAutoPlaying(true), 8000); // 8秒后恢复自动播放
  };

  // 切换到指定图片
  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsAutoPlaying(false); // 手动操作时暂停自动播放
    setTimeout(() => setIsAutoPlaying(true), 8000); // 8秒后恢复自动播放
  };

  useEffect(() => {
    // Ensure window object is available before accessing location
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // 自动轮播效果
  useEffect(() => {
    if (!isAutoPlaying || productImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
    }, 4000); // 每4秒切换一次

    return () => clearInterval(interval);
  }, [isAutoPlaying, productImages.length]);


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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* 页面顶部导航栏 */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between py-3 px-4 animate-fade-in">
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

      <div className="px-4 py-4 space-y-4 animate-fade-in-up">
        {/* 芯片标题和基本信息 */}
        <div className="card-enhanced bg-white dark:bg-gray-800 p-4 animate-delay-100">
          <div className="flex items-start gap-4 mb-4">
            {/* 产品图片 */}
            {chip.imageUrl && (
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden mb-2">
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
                {/* 品牌标识 */}
                <div className="text-center">
                  <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    德州仪器-TI
                  </div>
                </div>
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {chip.model}
                    </h1>
                    <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-full border border-green-200 dark:border-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-medium text-green-700 dark:text-green-400">量产</span>
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

                {/* 数据手册按钮 - 右上角 */}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-primary-600 border-primary-200 hover:bg-primary-50 dark:hover:bg-primary-950/20 flex-shrink-0 ml-4 transition-all duration-300 hover:shadow-primary hover:-translate-y-0.5"
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
          </div>


        </div>

        {/* 详细信息展示区域 */}
        <div className="card-enhanced bg-white dark:bg-gray-800 animate-delay-200">
          <div className="p-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 animate-slide-in-right animate-delay-300">详细信息</h2>

            {/* 详细信息标签页 */}
            <Tabs defaultValue="product-details" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-600 dark:to-gray-700 p-1 rounded-lg mb-4 shadow-sm">
                <TabsTrigger value="product-details" className="text-xs font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-200 dark:data-[state=active]:text-gray-900 transition-all duration-300">
                  产品详情
                </TabsTrigger>
                <TabsTrigger value="technical-articles" className="text-xs font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-200 dark:data-[state=active]:text-gray-900 transition-all duration-300">
                  技术文章
                </TabsTrigger>
                <TabsTrigger value="design-development" className="text-xs font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-200 dark:data-[state=active]:text-gray-900 transition-all duration-300">
                  设计开发
                </TabsTrigger>
                <TabsTrigger value="product-ordering" className="text-xs font-medium text-gray-700 dark:text-gray-300 data-[state=active]:bg-gray-800 data-[state=active]:text-white dark:data-[state=active]:bg-gray-200 dark:data-[state=active]:text-gray-900 transition-all duration-300">
                  产品订购
                </TabsTrigger>
              </TabsList>

              {/* 产品详情标签页 */}
              <TabsContent value="product-details" className="mt-0">
                <div className="space-y-4">
                  {/* 图片轮播区域 */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/20 dark:to-primary-900/10 rounded-lg p-4 border border-primary-200/50 dark:border-primary-800/30">
                    <h4 className="font-medium text-primary-900 dark:text-primary-100 mb-3 transition-all duration-300 animate-count-up">
                      {productImages[currentImageIndex].title}
                    </h4>
                    <div className="relative">
                      <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden">
                          {/* 固定尺寸的图片容器 */}
                          <div className="w-[500px] h-[400px] flex items-center justify-center relative">
                            <Image
                              src={productImages[currentImageIndex].src}
                              alt={productImages[currentImageIndex].alt}
                              width={500}
                              height={400}
                              className="object-contain max-w-full max-h-full transition-all duration-500 ease-in-out animate-fade-in"
                              onError={(e) => {
                                // 如果图片加载失败，显示占位符
                                e.currentTarget.style.display = 'none';
                                const placeholder = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                                if (placeholder) placeholder.style.display = 'flex';
                              }}
                            />
                          </div>
                          <div className="hidden items-center justify-center w-[500px] h-[400px] bg-gray-100 dark:bg-gray-700 rounded text-gray-500 dark:text-gray-400">
                            <div className="text-center">
                              <FileImage className="h-16 w-16 mx-auto mb-3" />
                              <p className="text-lg font-medium">{productImages[currentImageIndex].title}</p>
                              <p className="text-sm">{productImages[currentImageIndex].src.split('/').pop()}</p>
                            </div>
                          </div>

                          {/* 左右切换按钮 */}
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full p-2 shadow-lg border border-primary-200 dark:border-primary-700 transition-all duration-300 hover:scale-110 hover:shadow-primary"
                            aria-label="上一张图片"
                          >
                            <ChevronLeft className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-full p-2 shadow-lg border border-primary-200 dark:border-primary-700 transition-all duration-300 hover:scale-110 hover:shadow-primary"
                            aria-label="下一张图片"
                          >
                            <ChevronRight className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                          </button>
                        </div>
                      </div>

                      {/* 指示器圆点 */}
                      <div className="flex justify-center mt-6 space-x-3">
                        {productImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => goToImage(index)}
                            className={`relative transition-all duration-300 hover:scale-110 ${
                              index === currentImageIndex
                                ? 'w-8 h-3 bg-orange-500 dark:bg-orange-400 rounded-full shadow-lg'
                                : 'w-3 h-3 bg-gray-400 dark:bg-gray-500 rounded-full hover:bg-orange-300 dark:hover:bg-orange-600 shadow-md'
                            }`}
                            aria-label={`切换到第${index + 1}张图片`}
                          >
                            {/* 激活状态的内部高亮 */}
                            {index === currentImageIndex && (
                              <div className="absolute inset-0 bg-white/30 rounded-full animate-pulse"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 折叠区域 */}
                  <div className="space-y-3">
                    {/* 特性 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleSection('features')}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">特性</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.features ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedSections.features && (
                        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-3 space-y-2">
                            {featuresList.map((feature, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {feature.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 说明 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleSection('description')}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">说明</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.description ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedSections.description && (
                        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-3 space-y-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4">
                              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">产品概述</h4>
                              <p>
                                TPS563201 是一款易于使用、具有成本效益的同步降压转换器。采用 D-CAP2™ 控制模式，提供快速的瞬态响应，并支持低 ESR 输出电容器（如 POSCAP 或 SP-CAP），无需外部补偿组件。
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 应用 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleSection('applications')}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">应用</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.applications ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedSections.applications && (
                        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-3">
                            <div className="bg-orange-50 dark:bg-orange-950/20 rounded-lg p-4">
                              <h4 className="font-medium text-orange-900 dark:text-orange-100 mb-2">典型应用</h4>
                              <ul className="space-y-1 text-sm">
                                {chip.applications?.map((app, index) => (
                                  <li key={index}>• {app}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 参数 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleSection('parameters')}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">参数</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.parameters ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedSections.parameters && (
                        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-3 space-y-3">
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
                          </div>
                        </div>
                      )}
                    </div>

                    {/* 封装|引脚|尺寸 */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                      <button
                        onClick={() => toggleSection('package')}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <span className="font-medium text-gray-900 dark:text-gray-100">封装|引脚|尺寸</span>
                        <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${expandedSections.package ? 'rotate-180' : ''}`} />
                      </button>
                      {expandedSections.package && (
                        <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                          <div className="pt-3">
                            <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-200 dark:border-gray-700">
                              <div className="font-medium text-blue-600">SOT-23-THIN (DDC)</div>
                              <div className="text-center">6</div>
                              <div className="text-right">8.12 mm² 2.9 x 2.8</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 技术文章标签页 */}
              <TabsContent value="technical-articles" className="mt-0">
                <div className="space-y-4 text-sm">
                  {chip.technicalArticles && chip.technicalArticles.length > 0 ? (
                    chip.technicalArticles.slice(0, showAllArticles ? undefined : 5).map((article, index) => (
                      <div key={article.id} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-2 flex-1">
                            <span className="text-gray-500 dark:text-gray-400 font-mono text-xs mt-1">
                              [{index + 1}]
                            </span>
                            <div className="flex-1">
                              <div className="text-gray-900 dark:text-gray-100 leading-relaxed">
                                <span className="font-medium">{article.author}.</span>{' '}
                                <span className="italic">"{article.title}"</span>{' '}
                                <span className="text-blue-600 dark:text-blue-400">{article.type}</span>,{' '}
                                <span className="text-gray-600 dark:text-gray-400">{article.date}</span>.
                              </div>
                            </div>
                          </div>

                          {/* PDF下载图标 */}
                          <button
                            onClick={() => {
                              if (article.pdfUrl && article.pdfUrl !== '#') {
                                window.open(article.pdfUrl, '_blank');
                              } else {
                                toast({
                                  title: "PDF暂不可用",
                                  description: "该文档的PDF版本暂时无法下载",
                                  variant: "destructive",
                                });
                              }
                            }}
                            className="flex-shrink-0 p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="下载PDF"
                          >
                            <FileText className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>暂无技术文章</p>
                      <p className="text-sm mt-1">技术文章内容正在准备中...</p>
                    </div>
                  )}

                  {chip.technicalArticles && chip.technicalArticles.length > 5 && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => setShowAllArticles(!showAllArticles)}
                        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      >
                        {showAllArticles ? (
                          <>
                            <ChevronUp className="h-4 w-4" />
                            显示较少文章
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4" />
                            显示更多文章 ({chip.technicalArticles.length - 5}篇)
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* 设计开发标签页 */}
              <TabsContent value="design-development" className="mt-0">
                <div className="space-y-4">
                  {/* 设计工具的资源 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleDesignDevSection('designTools')}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">设计工具的资源</span>
                      <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${designDevSections.designTools ? 'rotate-180' : ''}`} />
                    </button>
                    {designDevSections.designTools && (
                      <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="pt-3 text-sm text-gray-600 dark:text-gray-400">
                          <p>设计工具资源内容正在准备中...</p>
                          <ul className="mt-2 space-y-1 text-xs">
                            <li>• 功率损耗计算器</li>
                            <li>• 效率计算器</li>
                            <li>• 热阻计算器</li>
                            <li>• 设计指南文档</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 参考设计 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleDesignDevSection('referenceDesign')}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">参考设计</span>
                      <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${designDevSections.referenceDesign ? 'rotate-180' : ''}`} />
                    </button>
                    {designDevSections.referenceDesign && (
                      <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="pt-3 text-sm text-gray-600 dark:text-gray-400">
                          <p>参考设计内容正在准备中...</p>
                          <ul className="mt-2 space-y-1 text-xs">
                            <li>• TPS563201 评估板</li>
                            <li>• 典型应用电路</li>
                            <li>• PCB 布局指南</li>
                            <li>• 物料清单 (BOM)</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CAD 符号、封装和 3D 模型 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <button
                      onClick={() => toggleDesignDevSection('cadModels')}
                      className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <span className="font-medium text-gray-900 dark:text-gray-100">CAD 符号、封装和 3D 模型</span>
                      <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform ${designDevSections.cadModels ? 'rotate-180' : ''}`} />
                    </button>
                    {designDevSections.cadModels && (
                      <div className="px-3 pb-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="pt-3">
                          {/* CAD 资源表格 */}
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                            {/* 表头 */}
                            <div className="grid grid-cols-3 gap-4 p-3 bg-gray-100 dark:bg-gray-700 text-sm font-medium text-gray-900 dark:text-gray-100">
                              <div>封装</div>
                              <div>引脚</div>
                              <div>CAD 符号、封装和 3D 模型</div>
                            </div>

                            {/* 表格内容 */}
                            <div className="grid grid-cols-3 gap-4 p-3 text-sm">
                              <div className="text-blue-600 dark:text-blue-400">
                                SOT-23-THIN<br/>
                                <span className="text-gray-500 dark:text-gray-400 text-xs">(DDC)</span>
                              </div>
                              <div className="text-gray-900 dark:text-gray-100">6</div>
                              <div>
                                <Link href="#" className="text-blue-600 dark:text-blue-400 hover:underline text-sm">
                                  Ultra Librarian
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 订购和质量 */}
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">订购和质量</h4>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden">
                      {/* 表头 */}
                      <div className="grid grid-cols-5 gap-2 p-3 bg-gray-100 dark:bg-gray-700 text-xs font-medium text-gray-900 dark:text-gray-100">
                        <div>产品订购型号</div>
                        <div>封装</div>
                        <div>工作温度</div>
                        <div>封装</div>
                        <div>包装</div>
                      </div>

                      {/* 产品行 */}
                      <div className="divide-y divide-gray-200 dark:divide-gray-600">
                        <div className="grid grid-cols-5 gap-2 p-3 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-900 dark:text-gray-100">TPS563201DDCR</span>
                          </div>
                          <div className="text-gray-700 dark:text-gray-300">SOT23-6</div>
                          <div className="text-gray-700 dark:text-gray-300">-40° TO 125°</div>
                          <div className="text-gray-700 dark:text-gray-300">3201</div>
                          <div className="text-gray-700 dark:text-gray-300">3000/T&R</div>
                        </div>

                        <div className="grid grid-cols-5 gap-2 p-3 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-gray-900 dark:text-gray-100">TPS563201DDA</span>
                          </div>
                          <div className="text-gray-700 dark:text-gray-300">HSOIC-8</div>
                          <div className="text-gray-700 dark:text-gray-300">-40° TO 125°</div>
                          <div className="text-gray-700 dark:text-gray-300">3201</div>
                          <div className="text-gray-700 dark:text-gray-300">2500/T&R</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* 产品订购标签页 */}
              <TabsContent value="product-ordering" className="mt-0">
                <div className="space-y-4">
                  {chip.model === 'TPS563201' ? (
                    <div>
                      <h5 className="font-medium text-orange-900 dark:text-orange-100 mb-3">产品订购型号 (Orderable Part Numbers):</h5>
                      <div className="space-y-3">
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-orange-200 dark:border-orange-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-gray-100">TPS563201DDCR</span>
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">量产</span>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <div>封装: SOT-23-6 (DDC)</div>
                            <div>包装: 3000/Tape and Reel</div>
                            <div>工作温度: -40°C to 125°C</div>
                            <div>应用等级: Industrial</div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-orange-200 dark:border-orange-700">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-gray-100">TPS563201DDA</span>
                            <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded">量产</span>
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                            <div>封装: HSOIC-8 (DDA)</div>
                            <div>包装: 2500/Tape and Reel</div>
                            <div>工作温度: -40°C to 125°C</div>
                            <div>应用等级: Industrial</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>产品订购信息</p>
                      <p className="text-sm mt-1">订购信息正在准备中...</p>
                    </div>
                  )}
                </div>
              </TabsContent>


            </Tabs>
          </div>
        </div>



      </div>
    </div>
  );
}

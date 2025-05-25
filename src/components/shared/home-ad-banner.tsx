"use client";

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Play, Clock, Gift, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  className?: string;
  type?: 'live' | 'product' | 'promotion';
  closable?: boolean;
  onClose?: () => void;
}

// 模拟广告数据 - 学习参考页面的设计
const adData = {
  live: {
    id: 'live-001',
    title: 'AI玩具芯片厂商新金矿？',
    subtitle: '直播间',
    time: '06.12 14:30',
    avatar: '🤖',
    background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%)',
    textColor: '#ffffff',
    type: 'live' as const
  },
  product: {
    id: 'product-001',
    title: '小米发布自研3nm SoC',
    subtitle: '产品',
    description: '全新架构设计，性能提升40%',
    image: '/api/placeholder/120/80',
    background: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
    textColor: '#ffffff',
    type: 'product' as const
  },
  promotion: {
    id: 'promotion-001',
    title: '新人登录礼',
    subtitle: '+100积分',
    description: '立即领取',
    icon: '🎁',
    background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    textColor: '#ffffff',
    type: 'promotion' as const
  }
};

export default function HomeAdBanner({ 
  className, 
  type = 'live',
  closable = false,
  onClose 
}: AdBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const currentAd = adData[type];

  // 模拟广告加载
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  const handleClick = () => {
    console.log('广告被点击:', currentAd.id);
    // 实际应用中会跳转到相应页面
  };

  if (!isVisible) return null;

  if (isLoading) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700",
        type === 'promotion' ? "h-16" : "h-20 sm:h-24",
        className
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse">
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-gray-500 dark:text-gray-400">广告加载中...</div>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-gray-400/80 text-white text-xs px-2 py-0.5 rounded">
          广告
        </div>
      </div>
    );
  }

  // 直播广告样式 - 学习参考页面
  if (type === 'live') {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg",
        className
      )}>
        <div 
          className="p-4 flex items-center space-x-4"
          style={{ background: currentAd.background }}
          onClick={handleClick}
        >
          {/* 左侧头像和内容 */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="text-3xl">{currentAd.avatar}</div>
            <div className="space-y-1">
              <h3 
                className="font-semibold text-base"
                style={{ color: currentAd.textColor }}
              >
                {currentAd.title}
              </h3>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-white/20 text-white border-0">
                  <Play className="h-3 w-3 mr-1" />
                  {currentAd.subtitle}
                </Badge>
                <div className="flex items-center space-x-1 text-white/90">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{currentAd.time}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧箭头 */}
          <ChevronRight className="h-5 w-5 text-white/80" />
        </div>

        {/* 广告标识 */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
          广告
        </div>

        {/* 关闭按钮 */}
        {closable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  // 产品广告样式
  if (type === 'product') {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg",
        className
      )}>
        <div 
          className="p-4 flex items-center space-x-4"
          style={{ background: currentAd.background }}
          onClick={handleClick}
        >
          {/* 左侧内容 */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-white/30 text-white">
                {currentAd.subtitle}
              </Badge>
            </div>
            <h3 
              className="font-semibold text-base"
              style={{ color: currentAd.textColor }}
            >
              {currentAd.title}
            </h3>
            <p className="text-sm text-white/80">{currentAd.description}</p>
          </div>

          {/* 右侧图片占位 */}
          <div className="w-20 h-12 bg-white/10 rounded-lg flex items-center justify-center">
            <span className="text-white/60 text-xs">产品图</span>
          </div>
        </div>

        {/* 广告标识 */}
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded">
          广告
        </div>

        {/* 关闭按钮 */}
        {closable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-1 right-1 p-1 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  // 促销广告样式 - 浮动横幅
  if (type === 'promotion') {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg",
        className
      )}>
        <div 
          className="p-3 flex items-center space-x-3"
          style={{ background: currentAd.background }}
          onClick={handleClick}
        >
          {/* 左侧图标 */}
          <div className="text-2xl">{currentAd.icon}</div>
          
          {/* 中间内容 */}
          <div className="flex-1 space-y-0.5">
            <h3 
              className="font-semibold text-sm"
              style={{ color: currentAd.textColor }}
            >
              {currentAd.title}
            </h3>
            <p className="text-xs text-white/90">{currentAd.subtitle}</p>
          </div>

          {/* 右侧按钮 */}
          <Button 
            size="sm" 
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-0 text-xs"
          >
            {currentAd.description}
          </Button>
        </div>

        {/* 关闭按钮 */}
        {closable && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
            className="absolute top-1 right-1 p-1 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  return null;
}

// 导出不同类型的广告组件
export function LiveAdBanner({ className, onClose }: { className?: string; onClose?: () => void }) {
  return (
    <HomeAdBanner 
      type="live" 
      className={className}
      closable 
      onClose={onClose}
    />
  );
}

export function ProductAdBanner({ className, onClose }: { className?: string; onClose?: () => void }) {
  return (
    <HomeAdBanner 
      type="product" 
      className={className}
      closable 
      onClose={onClose}
    />
  );
}

export function PromotionAdBanner({ className, onClose }: { className?: string; onClose?: () => void }) {
  return (
    <HomeAdBanner 
      type="promotion" 
      className={className}
      closable 
      onClose={onClose}
    />
  );
}

import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar, 
  User, 
  Clock,
  ExternalLink,
  BookOpen,
  Lightbulb,
  Newspaper
} from 'lucide-react';
import type { ReferenceDesign, TechnicalDocument, ApplicationGuide, IndustryNews } from '@/lib/types';

interface ContentItemProps {
  item: ReferenceDesign | TechnicalDocument | ApplicationGuide | IndustryNews;
  type: 'reference' | 'document' | 'guide' | 'news';
}

export default function ContentItem({ item, type }: ContentItemProps) {
  const getIcon = () => {
    switch (type) {
      case 'reference':
        return <BookOpen className="h-5 w-5 text-blue-600" />;
      case 'document':
        return <FileText className="h-5 w-5 text-green-600" />;
      case 'guide':
        return <Lightbulb className="h-5 w-5 text-orange-600" />;
      case 'news':
        return <Newspaper className="h-5 w-5 text-purple-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'reference':
        return '参考设计';
      case 'document':
        return '技术文档';
      case 'guide':
        return '应用指南';
      case 'news':
        return '行业资讯';
      default:
        return '内容';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800'
    };
    const labels = {
      beginner: '初级',
      intermediate: '中级',
      advanced: '高级'
    };
    return (
      <Badge className={`${colors[difficulty as keyof typeof colors]} text-xs`}>
        {labels[difficulty as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {item.description}
              </p>
            </div>
            
            <Badge variant="secondary" className="text-xs flex-shrink-0">
              {getTypeLabel()}
            </Badge>
          </div>

          {/* 元数据信息 */}
          <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
            {/* 芯片型号 */}
            {'chipModel' in item && item.chipModel && (
              <span className="flex items-center gap-1">
                <span>芯片:</span>
                <span className="font-medium">{item.chipModel}</span>
              </span>
            )}
            
            {/* 制造商 */}
            {'manufacturer' in item && item.manufacturer && (
              <span className="flex items-center gap-1">
                <span>制造商:</span>
                <span className="font-medium">{item.manufacturer}</span>
              </span>
            )}

            {/* 应用领域 */}
            {'applicationField' in item && (
              <span className="flex items-center gap-1">
                <span>应用:</span>
                <span className="font-medium">{item.applicationField}</span>
              </span>
            )}

            {/* 难度等级 */}
            {'difficulty' in item && getDifficultyBadge(item.difficulty)}

            {/* 页数 */}
            {'pageCount' in item && item.pageCount && (
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>{item.pageCount}页</span>
              </span>
            )}

            {/* 下载次数 */}
            {'downloadCount' in item && item.downloadCount && (
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                <span>{item.downloadCount}</span>
              </span>
            )}

            {/* 阅读时间 */}
            {'readTime' in item && item.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{item.readTime}分钟</span>
              </span>
            )}

            {/* 发布日期 */}
            {'publishDate' in item && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{item.publishDate}</span>
              </span>
            )}

            {/* 作者 */}
            {'author' in item && item.author && (
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                <span>{item.author}</span>
              </span>
            )}

            {/* 更新时间 */}
            {'lastUpdated' in item && item.lastUpdated && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>更新: {item.lastUpdated}</span>
              </span>
            )}
          </div>

          {/* 标签 */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{item.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex items-center gap-2 mt-3">
            {('documentUrl' in item && item.documentUrl) && (
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" />
                下载
              </Button>
            )}
            
            {('sourceUrl' in item && item.sourceUrl) && (
              <Button variant="outline" size="sm" className="text-xs">
                <ExternalLink className="h-3 w-3 mr-1" />
                查看原文
              </Button>
            )}
            
            <Button variant="ghost" size="sm" className="text-xs">
              查看详情
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

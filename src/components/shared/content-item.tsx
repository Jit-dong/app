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
    <div className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:shadow-md transition-shadow">
      <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm mb-1">{item.title}</h4>
      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">{item.description}</p>
    </div>
  );
}

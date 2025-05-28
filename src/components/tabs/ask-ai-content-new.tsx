"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Cpu, 
  BarChart3, 
  BookOpen, 
  FileSearch, 
  Send, 
  Star,
  ArrowRight,
  Brain,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// 重新设计的AI功能卡片 - 国际化专业版本
const aiCapabilities = [
  {
    icon: Cpu,
    title: "智能选型助手",
    subtitle: "Smart Component Selection",
    description: "基于您的技术规格和应用场景，AI将为您推荐最适合的芯片解决方案",
    features: ["规格匹配", "性能分析", "成本优化"],
    buttonText: "开始选型",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20"
  },
  {
    icon: BarChart3,
    title: "参数对比分析",
    subtitle: "Performance Comparison",
    description: "深度对比多款芯片的关键参数，提供专业的技术分析和选择建议",
    features: ["多维对比", "性能评估", "优劣分析"],
    buttonText: "开始对比",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20"
  },
  {
    icon: BookOpen,
    title: "技术知识库",
    subtitle: "Technical Knowledge Base",
    description: "涵盖芯片技术原理、应用指南和行业标准的专业知识问答系统",
    features: ["原理解析", "应用指南", "标准规范"],
    buttonText: "咨询技术",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
  },
  {
    icon: FileSearch,
    title: "文档智能解读",
    subtitle: "Document Analysis",
    description: "上传技术文档、数据手册，AI将提取关键信息并回答您的专业问题",
    features: ["文档解析", "信息提取", "智能问答"],
    buttonText: "上传文档",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20"
  }
];

// AI统计数据
const aiStats = [
  { label: "知识库覆盖", value: "50K+", subtitle: "芯片型号", icon: Cpu },
  { label: "技术文档", value: "10K+", subtitle: "数据手册", icon: FileSearch },
  { label: "用户满意度", value: "98%", subtitle: "准确率", icon: Star },
  { label: "响应速度", value: "<2s", subtitle: "平均时间", icon: Zap }
];

// 现代化AI功能卡片组件
const ModernAiCard = ({ capability, onSelect }: { capability: any, onSelect: (title: string) => void }) => (
  <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
        onClick={() => onSelect(capability.title)}>
    {/* 背景渐变 */}
    <div className={`absolute inset-0 bg-gradient-to-br ${capability.bgGradient} opacity-60`} />
    
    {/* 装饰性光效 */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
    
    <CardContent className="relative p-6 space-y-4">
      {/* 图标和标题 */}
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-2xl bg-gradient-to-r ${capability.gradient} shadow-lg`}>
          <capability.icon className="h-6 w-6 text-white" />
        </div>
        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300" />
      </div>
      
      {/* 标题和副标题 */}
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
          {capability.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {capability.subtitle}
        </p>
      </div>
      
      {/* 描述 */}
      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
        {capability.description}
      </p>
      
      {/* 功能特性标签 */}
      <div className="flex flex-wrap gap-2">
        {capability.features.map((feature: string, index: number) => (
          <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-0">
            {feature}
          </Badge>
        ))}
      </div>
      
      {/* 行动按钮 */}
      <Button 
        className={`w-full bg-gradient-to-r ${capability.gradient} hover:opacity-90 text-white border-0 shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-105`}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(capability.title);
        }}
      >
        {capability.buttonText}
      </Button>
    </CardContent>
  </Card>
);

// 统计卡片组件
const StatCard = ({ stat }: { stat: any }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
        <stat.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stat.value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</div>
        <div className="text-xs text-gray-400 dark:text-gray-500">{stat.subtitle}</div>
      </div>
    </div>
  </div>
);

export default function AskAiContentNew() {
  const [viewMode, setViewMode] = useState<'welcome' | 'chat'>('welcome');
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const { toast } = useToast();

  const handleCapabilitySelect = (title: string) => {
    setViewMode('chat');
    toast({
      title: "功能启动",
      description: `正在启动 ${title} 功能...`,
    });
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsAiThinking(true);
    
    // 模拟AI响应
    setTimeout(() => {
      setIsAiThinking(false);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: `我收到了您的消息："${currentMessage}"。这是一个演示回复，实际使用中会连接到真实的AI服务。` 
      }]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10">
      {viewMode === 'welcome' ? (
        <div className="container mx-auto px-4 py-8 space-y-8">
          {/* 头部介绍区域 */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            {/* AI头像和标题 */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Brain className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  AI 芯片助手
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                  Intelligent Semiconductor Assistant
                </p>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                  基于先进的人工智能技术，为您提供专业的芯片选型、参数分析、技术咨询和文档解读服务
                </p>
              </div>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {aiStats.map((stat, index) => (
                <StatCard key={index} stat={stat} />
              ))}
            </div>
          </div>

          {/* AI功能卡片网格 */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                选择您需要的AI服务
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose the AI service you need
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {aiCapabilities.map((capability, index) => (
                <ModernAiCard 
                  key={index} 
                  capability={capability} 
                  onSelect={handleCapabilitySelect}
                />
              ))}
            </div>
          </div>

          {/* 快速开始区域 */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 dark:from-blue-500/10 dark:to-purple-500/10">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                    或者直接开始对话
                  </h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="输入您的问题，例如：推荐一款低功耗的MCU..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        // 聊天界面
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={() => setViewMode('welcome')}
              className="mb-4"
            >
              ← 返回主页
            </Button>
            
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI 对话
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 mb-4">
                  <div className="space-y-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          msg.type === 'user' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    ))}
                    {isAiThinking && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                            AI正在思考...
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="输入您的消息..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

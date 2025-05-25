"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, PackageSearch, Settings2, Lightbulb, MessageSquare, Sparkles, ArrowRight } from "lucide-react";

// AI场景化人物配置
const aiPersonas = [
  {
    id: 'datasheet',
    name: '资料解读师',
    avatar: '📚',
    icon: FileText,
    title: "资料解读",
    description: "专业解读芯片手册，提炼关键信息，回答技术细节问题",
    personality: "严谨专业，善于分析复杂技术文档",
    buttonText: "开始解读",
    color: "from-blue-500 to-cyan-500",
    examples: ["解读这个芯片的关键参数", "分析电路应用注意事项", "总结芯片主要特性"]
  },
  {
    id: 'selection',
    name: '选型专家',
    avatar: '🎯',
    icon: PackageSearch,
    title: "产品选型",
    description: "根据您的需求推荐最适合的芯片，提供专业选型建议",
    personality: "经验丰富，善于理解需求并提供精准推荐",
    buttonText: "开始选型",
    color: "from-green-500 to-emerald-500",
    examples: ["需要5V转3.3V的LDO", "找一个低功耗的MCU", "推荐高精度ADC"]
  },
  {
    id: 'design',
    name: '参数设计师',
    avatar: '⚡',
    icon: Settings2,
    title: "参数设计",
    description: "协助电路设计，计算参数，优化性能，解决设计难题",
    personality: "细致入微，擅长计算和电路分析",
    buttonText: "开始设计",
    color: "from-purple-500 to-violet-500",
    examples: ["计算滤波电容值", "设计反馈电阻", "优化PCB布局"]
  },
  {
    id: 'consultant',
    name: '行业顾问',
    avatar: '🌟',
    icon: Lightbulb,
    title: "行业咨询",
    description: "分享行业趋势，技术发展方向，市场动态和应用前景",
    personality: "视野开阔，对行业发展有深刻洞察",
    buttonText: "开始咨询",
    color: "from-orange-500 to-red-500",
    examples: ["AI芯片发展趋势", "新能源汽车芯片", "物联网芯片选择"]
  }
];

type ViewMode = 'personas' | 'chat';

interface PersonaCardProps {
  persona: typeof aiPersonas[0];
  onSelect: (persona: typeof aiPersonas[0]) => void;
}

function PersonaCard({ persona, onSelect }: PersonaCardProps) {
  const IconComponent = persona.icon;
  
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3 mb-2">
          <div className={`
            w-12 h-12 rounded-full bg-gradient-to-br ${persona.color} 
            flex items-center justify-center text-white shadow-lg
            group-hover:scale-110 transition-transform duration-300
          `}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-lg">{persona.title}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{persona.avatar}</span>
              <Badge variant="secondary" className="text-xs">
                {persona.name}
              </Badge>
            </div>
          </div>
        </div>
        <CardDescription className="text-sm leading-relaxed">
          {persona.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-2">擅长解决：</p>
            <div className="space-y-1">
              {persona.examples.map((example, index) => (
                <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                  <ArrowRight className="h-3 w-3 text-primary/60" />
                  {example}
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={() => onSelect(persona)}
            className={`w-full bg-gradient-to-r ${persona.color} hover:opacity-90 transition-opacity`}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            {persona.buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AskAiContentNew() {
  const [viewMode, setViewMode] = useState<ViewMode>('personas');
  const [selectedPersona, setSelectedPersona] = useState<typeof aiPersonas[0] | null>(null);

  const handlePersonaSelect = (persona: typeof aiPersonas[0]) => {
    setSelectedPersona(persona);
    setViewMode('chat');
  };

  const handleBackToPersonas = () => {
    setViewMode('personas');
    setSelectedPersona(null);
  };

  if (viewMode === 'chat' && selectedPersona) {
    return (
      <div className="space-y-4">
        {/* 聊天界面头部 */}
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-background to-muted rounded-lg border">
          <div className={`
            w-10 h-10 rounded-full bg-gradient-to-br ${selectedPersona.color} 
            flex items-center justify-center text-white shadow-lg
          `}>
            {React.createElement(selectedPersona.icon, { className: "h-5 w-5" })}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{selectedPersona.title}</h3>
              <span className="text-lg">{selectedPersona.avatar}</span>
              <Badge variant="outline">{selectedPersona.name}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{selectedPersona.personality}</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleBackToPersonas}>
            返回选择
          </Button>
        </div>

        {/* 聊天内容区域 */}
        <div className="min-h-[400px] bg-muted/20 rounded-lg p-4 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className={`
              w-16 h-16 rounded-full bg-gradient-to-br ${selectedPersona.color} 
              flex items-center justify-center text-white shadow-lg mx-auto
            `}>
              {React.createElement(selectedPersona.icon, { className: "h-8 w-8" })}
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                {selectedPersona.name}为您服务
              </h4>
              <p className="text-muted-foreground mb-4">
                {selectedPersona.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm font-medium">您可以这样问我：</p>
                {selectedPersona.examples.map((example, index) => (
                  <Badge key={index} variant="secondary" className="mr-2 mb-2">
                    {example}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 输入区域 */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder={`向${selectedPersona.name}提问...`}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button className={`bg-gradient-to-r ${selectedPersona.color}`}>
            <Sparkles className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 标题区域 */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI 专家团队
        </h2>
        <p className="text-muted-foreground">
          选择专业的AI助手，为您提供个性化的技术服务
        </p>
      </div>

      {/* 人物卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiPersonas.map((persona) => (
          <PersonaCard
            key={persona.id}
            persona={persona}
            onSelect={handlePersonaSelect}
          />
        ))}
      </div>

      {/* 底部提示 */}
      <div className="text-center text-sm text-muted-foreground">
        <p>每位AI专家都有独特的专业领域和服务风格</p>
        <p>选择最适合您需求的专家开始对话</p>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, PackageSearch, Settings2, Lightbulb, MessageSquare, Sparkles, ArrowRight, Crown, Zap, Users, Brain } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// AI场景化人物配置
const aiPersonas = [
  {
    id: 'omnipotent',
    name: '全能助手',
    avatar: '👑',
    icon: Crown,
    title: "全能助手",
    description: "集成所有专业能力，智能调度各领域专家，为您提供全方位技术支持",
    personality: "智慧全面，善于统筹协调，能够调用各专业助手的能力",
    buttonText: "开始协作",
    color: "from-gradient-start to-gradient-end",
    gradientClass: "bg-gradient-to-br from-amber-400 via-rose-400 to-purple-600",
    borderGlow: "shadow-2xl shadow-amber-500/25",
    examples: ["综合分析芯片选型方案", "协调多个专家解决复杂问题", "提供端到端技术支持"],
    isOmnipotent: true,
    canDelegate: ['datasheet', 'selection', 'design', 'consultant']
  },
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
    gradientClass: "bg-gradient-to-br from-blue-500 to-cyan-500",
    borderGlow: "shadow-lg shadow-blue-500/25",
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
    gradientClass: "bg-gradient-to-br from-green-500 to-emerald-500",
    borderGlow: "shadow-lg shadow-green-500/25",
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
    gradientClass: "bg-gradient-to-br from-purple-500 to-violet-500",
    borderGlow: "shadow-lg shadow-purple-500/25",
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
    gradientClass: "bg-gradient-to-br from-orange-500 to-red-500",
    borderGlow: "shadow-lg shadow-orange-500/25",
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
    <Card className={`
      group hover:shadow-2xl transition-all duration-500 cursor-pointer
      border border-primary/10 hover:border-primary/30
      backdrop-blur-md bg-gradient-to-br from-background/40 to-muted/40
      ${persona.isOmnipotent ? 'bg-gradient-to-br from-amber-50/30 to-rose-50/30 dark:from-amber-950/30 dark:to-rose-950/30' : 'bg-card/30'}
      relative overflow-hidden rounded-2xl
      hover:scale-[1.02] hover:-translate-y-1
    `}>
      {/* 动态背景效果 */}
      {persona.isOmnipotent && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400/10 via-rose-400/10 to-purple-600/10 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </>
      )}
      
      {/* 卡片内容 */}
      <CardHeader className="pb-3 relative">
        <div className="flex items-center gap-3 mb-2">
          {/* 图标容器 */}
          <div className={`
            w-12 h-12 rounded-2xl ${persona.gradientClass}
            flex items-center justify-center text-white shadow-lg
            group-hover:scale-110 transition-transform duration-500
            ${persona.isOmnipotent ? 'animate-pulse' : ''}
            relative overflow-hidden
          `}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            <IconComponent className="h-6 w-6 relative z-10" />
          </div>
          
          {/* 标题区域 */}
          <div className="flex-1">
            <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent group-hover:from-primary/90 group-hover:to-primary/70 transition-all duration-300">
              {persona.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{persona.avatar}</span>
              <Badge variant="secondary" className={`
                text-xs px-2 py-0.5 rounded-full
                ${persona.isOmnipotent 
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-lg shadow-amber-500/25' 
                  : 'bg-gradient-to-r from-muted to-muted/80'
                }
                group-hover:shadow-md transition-all duration-300
              `}>
                {persona.name}
              </Badge>
            </div>
          </div>
        </div>
        
        {/* 描述文本 */}
        <CardDescription className="text-sm leading-relaxed text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-300">
          {persona.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 relative">
        <div className="space-y-3">
          {/* 擅长解决区域 */}
          <div className="bg-gradient-to-br from-muted/50 to-background/50 rounded-xl p-3">
            <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-primary/60" />
              擅长解决：
            </p>
            <div className="space-y-1.5">
              {persona.examples.map((example, index) => (
                <div 
                  key={index} 
                  className="text-xs text-muted-foreground flex items-center gap-1.5 group/item hover:text-primary/80 transition-colors duration-200"
                >
                  <ArrowRight className="h-3 w-3 text-primary/60 group-hover/item:translate-x-0.5 transition-transform" />
                  {example}
                </div>
              ))}
            </div>
          </div>

          {/* 按钮区域 */}
          <Button
            onClick={() => onSelect(persona)}
            className={`
              w-full ${persona.gradientClass} hover:opacity-90 transition-all duration-300
              ${persona.isOmnipotent ? 'animate-pulse' : ''}
              text-white font-medium rounded-xl
              shadow-lg hover:shadow-xl
              hover:scale-[1.02] hover:-translate-y-0.5
              relative overflow-hidden
            `}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageSquare className="mr-2 h-4 w-4 relative z-10" />
            <span className="relative z-10">{persona.buttonText}</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AskAiContentNew() {
  const [selectedPersona, setSelectedPersona] = useState<typeof aiPersonas[0] | null>(aiPersonas[0]);
  const [showOtherAssistants, setShowOtherAssistants] = useState(true);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'assistant', content: string}>>([]);

  const handlePersonaSelect = (personaId: string) => {
    const persona = aiPersonas.find(p => p.id === personaId);
    if (persona) {
      setSelectedPersona(persona);
      setShowOtherAssistants(false);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    setMessages(prev => [...prev, { type: 'user', content }]);
    setShowOtherAssistants(false);
    // TODO: 处理AI回复逻辑
  };

  const handleBackToOmnipotent = () => {
    setSelectedPersona(aiPersonas[0]);
    setShowOtherAssistants(true);
  };

  if (!selectedPersona) return null;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* 聊天界面头部 */}
      <div className="flex items-center gap-1 px-1 py-0.5 border-b bg-background/95">
        <div className={`
          w-5 h-5 rounded-md ${selectedPersona.gradientClass}
          flex items-center justify-center text-white
        `}>
          {React.createElement(selectedPersona.icon, { className: "h-2.5 w-2.5" })}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-0.5 flex-wrap">
            <h3 className="font-semibold text-sm truncate">
              {selectedPersona.title}
            </h3>
            <span className="text-sm">{selectedPersona.avatar}</span>
            <Badge variant="outline" className="text-xs px-0.5 py-0 rounded-full">
              {selectedPersona.name}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground truncate">{selectedPersona.personality}</p>
        </div>
        {selectedPersona.id !== 'omnipotent' && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToOmnipotent}
            className="h-5 px-1 text-xs"
          >
            返回全能
          </Button>
        )}
      </div>

      {/* 聊天内容区域 */}
      <div className="flex-1 overflow-y-auto px-1 py-0.5 space-y-1">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-1 px-1">
              <div className={`
                w-7 h-7 rounded-md ${selectedPersona.gradientClass}
                flex items-center justify-center text-white mx-auto
              `}>
                {React.createElement(selectedPersona.icon, { className: "h-3.5 w-3.5" })}
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-0.5">
                  {selectedPersona.name}为您服务
                </h4>
                <p className="text-xs text-muted-foreground mb-1">
                  {selectedPersona.description}
                </p>
                <div className="space-y-0.5">
                  <p className="text-xs font-medium flex items-center justify-center gap-0.5">
                    <Sparkles className="h-2 w-2 text-primary/60" />
                    您可以这样问我：
                  </p>
                  <div className="flex flex-wrap gap-0.5 justify-center">
                    {selectedPersona.examples.map((example, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary" 
                        className="text-xs px-0.5 py-0 rounded-full cursor-pointer hover:bg-muted/80"
                        onClick={() => handleSendMessage(example)}
                      >
                        {example}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[95%] rounded-md p-1 text-sm ${
                  message.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 其他助手选择区域 */}
      {showOtherAssistants && (
        <div className="px-1 py-0.5 border-t bg-background/95">
          <div className="text-xs text-muted-foreground mb-0.5 flex items-center gap-0.5">
            <Sparkles className="h-2 w-2 text-primary/60" />
            我可以调用其他专家，您也可以直接选择：
          </div>
          <div className="grid grid-cols-2 gap-0.5">
            {aiPersonas.slice(1).map((persona) => (
              <div
                key={persona.id}
                className="flex items-center gap-0.5 p-0.5 rounded-md border cursor-pointer hover:bg-muted/50"
                onClick={() => handlePersonaSelect(persona.id)}
              >
                <div className={`
                  w-3.5 h-3.5 rounded-md ${persona.gradientClass}
                  flex items-center justify-center text-white
                `}>
                  {React.createElement(persona.icon, { className: "h-1.5 w-1.5" })}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium truncate">{persona.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{persona.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 输入区域 */}
      <div className="px-1 py-0.5 border-t bg-background/95">
        <div className="flex gap-0.5">
          <input
            type="text"
            placeholder={`向${selectedPersona.name}提问...`}
            className="flex-1 px-1.5 py-0.5 rounded-md focus:outline-none focus:ring-1 focus:ring-primary/20 bg-background/80 border text-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                handleSendMessage(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <Button 
            className={`${selectedPersona.gradientClass} text-white font-medium text-sm rounded-md h-6 px-1.5`}
            onClick={() => {
              const input = document.querySelector('input');
              if (input?.value.trim()) {
                handleSendMessage(input.value);
                input.value = '';
              }
            }}
          >
            <Sparkles className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}


"use client";

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, User, Cpu, Bot, Info } from "lucide-react";
import { cn } from '@/lib/utils';
import AiAvatar from '@/components/ai/ai-avatar';
import LoadingSpinner from '@/components/shared/loading-spinner';

interface AiChipAssistantModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string | React.ReactNode;
  timestamp: Date;
}

export default function AiChipAssistantModal({ isOpen, onOpenChange }: AiChipAssistantModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: 'ai-greeting-demo',
          sender: 'ai',
          text: (
            <div>
              <p>您好！我是您的AI芯片分类顾问小智。我可以帮助您在我们的产品分类中快速定位您需要的芯片。例如，如果您有具体的技术规格和应用场景，我可以为您推荐合适的分类和潜在芯片类型。下面是一个示例：</p>
            </div>
          ),
          timestamp: new Date(),
        },
        {
          id: 'user-demo-1',
          sender: 'user',
          text: "你好，我需要一款LED驱动芯片，要求12V输入，输出3V/6A，并且希望12周内可以到货。",
          timestamp: new Date(Date.now() + 100),
        },
        {
          id: 'ai-demo-1',
          sender: 'ai',
          text: (
            <div>
              <p>好的，根据您的需求：12V输入、3V/6A输出，用于LED驱动，且关注12周内到货周期。</p>
              <p className="mt-1">基于输入输出电压关系 (12V输入降至3V输出)，这通常需要一个 **降压 (Buck) 拓扑** 的LED驱动方案。</p>
              <p className="mt-1">在我们的分类系统中，您可以主要关注以下路径：</p>
              <ul className="list-disc list-inside mt-1 text-xs space-y-0.5 bg-muted/50 p-2 rounded-md">
                <li><strong>电源管理</strong> &gt; <strong>LED照明-DC/DC</strong> &gt; (进一步筛选降压型或特定电流/电压范围)</li>
                <li><strong>电源管理</strong> &gt; <strong>DC-DC稳压器</strong> &gt; <strong>降压型转换器</strong> (如果找不到专用的LED驱动，一些通用降压IC也可配置)</li>
              </ul>
              <p className="mt-1 text-xs">对于6A的输出电流，这是比较大的电流，您需要关注芯片的散热和效率。对于12周的到货周期，建议您在选型后，通过我们的供应商查询工具确认具体型号的实时供货情况。</p>
            </div>
          ),
          timestamp: new Date(Date.now() + 200),
        },
         {
          id: 'ai-demo-2',
          sender: 'ai',
          text: (
            <div>
                <p className="mt-2 font-semibold">为什么在这里找 (AI分类助手)？</p>
                <ul className="list-disc list-inside text-xs space-y-0.5">
                    <li><strong>专家知识引导：</strong> 我能根据您的技术描述，结合内置的芯片知识库，帮您判断所需的技术拓扑（如Buck、Boost等），并引导您到最相关的产品分类。</li>
                    <li><strong>精准定位：</strong> 避免您在海量分类中迷失方向，直接缩小选型范围。</li>
                    <li><strong>效率提升：</strong> 快速理解您的核心需求，节省您逐级浏览分类的时间。</li>
                </ul>
                <p className="mt-3 text-sm font-medium">以上为使用示例。现在，请您开始提问，我会尽力协助您在“产品分类查询”模块中找到方向。</p>
            </div>
          ),
          timestamp: new Date(Date.now() + 300),
        }
      ]);
    }
    if (!isOpen) {
      // Optionally reset messages when modal is closed, or persist if desired
      // setMessages([]); 
      setInputValue('');
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (sender: 'user' | 'ai', text: string | React.ReactNode) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender, text, timestamp: new Date() }]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    addMessage('user', userMessage);
    setInputValue('');
    setIsAiThinking(true);

    // Simulate AI response based on demo flow
    setTimeout(() => {
      setIsAiThinking(false);
      if (userMessage.toLowerCase().includes("led驱动") && userMessage.includes("12v") && userMessage.includes("3v")) {
        addMessage('ai', (
          <div>
            <p>好的，针对您的LED驱动需求（12V输入，3V输出），我判断您需要一个降压（Buck）拓扑的解决方案。</p>
            <p className="mt-1">在我们的“产品分类查询”中，您可以这样查找：</p>
            <ol className="list-decimal list-inside text-xs space-y-0.5 mt-1">
              <li>一级分类选择: <strong>电源管理</strong></li>
              <li>二级分类选择: <strong>LED照明-DC/DC</strong> 或 <strong>DC-DC稳压器</strong></li>
              <li>三级分类选择 (如果选择DC-DC稳压器): <strong>降压型转换器</strong></li>
            </ol>
            <p className="mt-1 text-xs">请注意，6A的电流较大，选型时请特别关注芯片的散热能力和最大输出电流。您还提到了12周到货，这个需要在具体型号选定后查询供应商库存。</p>
          </div>
        ));
      } else if (userMessage.toLowerCase().includes("mcu") && userMessage.toLowerCase().includes("低功耗")) {
         addMessage('ai', (
            <div>
                <p>对于低功耗MCU，您可以在“产品分类查询”中按以下路径尝试：</p>
                 <ol className="list-decimal list-inside text-xs space-y-0.5 mt-1">
                    <li>一级分类选择: <strong>MCU微控制器</strong></li>
                    <li>二级分类选择: 根据您的需求选择 <strong>8位、16位或32位微控制器</strong></li>
                </ol>
                <p className="mt-1 text-xs">在筛选具体型号时，可以留意参数中的“工作电流”、“休眠电流”等指标，或者在“特性与认证”中勾选“低功耗”选项（如果筛选面板支持）。</p>
            </div>
        ));
      }
       else {
        addMessage('ai', (
          <p className="flex items-start gap-1.5">
            <Info size={16} className="text-muted-foreground shrink-0 mt-0.5" />
            <span>我收到了您的消息：“{userMessage}”。我主要负责协助您更好地使用“产品分类查询”功能。请告诉我您想找哪一类芯片，或者描述一下您对芯片的初步需求，我会引导您到合适的分类。（此为演示回复）</span>
          </p>
        ));
      }
    }, 1200);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 flex flex-col h-[70vh] max-h-[600px]">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            AI 智能芯片分类顾问
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-grow p-4 space-y-4" ref={chatAreaRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-2 mb-3 max-w-[85%]",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {msg.sender === 'ai' && <AiAvatar iconSize={24} containerClassName="self-end mb-0.5 shrink-0" />}
              {msg.sender === 'user' && (
                <div className="p-2 rounded-full bg-muted text-muted-foreground self-end mb-0.5 shrink-0">
                  <User size={18} />
                </div>
              )}
              <div
                className={cn(
                  "p-2.5 rounded-lg text-sm shadow-sm",
                  msg.sender === 'user'
                    ? "bg-accent text-accent-foreground rounded-br-none"
                    : "bg-card border text-card-foreground rounded-bl-none"
                )}
              >
                {typeof msg.text === 'string' ? <p className="whitespace-pre-wrap break-words">{msg.text}</p> : msg.text}
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className="flex items-end gap-2 mb-3 mr-auto max-w-[85%]">
                <AiAvatar iconSize={24} containerClassName="self-end mb-0.5 shrink-0" />
                <div className="p-2.5 rounded-lg text-sm shadow-sm bg-card border text-card-foreground rounded-bl-none">
                    <LoadingSpinner size={16} label="小智思考中..." />
                </div>
            </div>
          )}
        </ScrollArea>

        <div className="p-3 border-t bg-muted/30">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isAiThinking && handleSendMessage()}
              placeholder="描述您的芯片需求或分类..."
              className="flex-grow h-10"
              disabled={isAiThinking}
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isAiThinking} className="h-10">
              <Send className="h-4 w-4" />
              <span className="sr-only">发送</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


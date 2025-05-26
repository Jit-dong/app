
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
              <ul className="list-disc list-inside mt-2 text-xs space-y-1 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-3 rounded-lg border border-blue-200/30 dark:border-blue-800/30">
                <li><strong className="text-blue-700 dark:text-blue-300">电源管理</strong> <span className="text-gray-500">→</span> <strong className="text-purple-700 dark:text-purple-300">LED照明-DC/DC</strong> <span className="text-gray-500">→</span> <span className="text-gray-600 dark:text-gray-400">(进一步筛选降压型或特定电流/电压范围)</span></li>
                <li><strong className="text-blue-700 dark:text-blue-300">电源管理</strong> <span className="text-gray-500">→</span> <strong className="text-purple-700 dark:text-purple-300">DC-DC稳压器</strong> <span className="text-gray-500">→</span> <strong className="text-indigo-700 dark:text-indigo-300">降压型转换器</strong> <span className="text-gray-600 dark:text-gray-400">(如果找不到专用的LED驱动，一些通用降压IC也可配置)</span></li>
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
                <ul className="list-none text-xs space-y-2 mt-2">
                    <li className="flex items-start gap-2 p-2 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-lg border border-emerald-200/30 dark:border-emerald-800/30">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">🎯</span>
                      <div><strong className="text-emerald-700 dark:text-emerald-300">专家知识引导：</strong> <span className="text-gray-700 dark:text-gray-300">我能根据您的技术描述，结合内置的芯片知识库，帮您判断所需的技术拓扑（如Buck、Boost等），并引导您到最相关的产品分类。</span></div>
                    </li>
                    <li className="flex items-start gap-2 p-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-lg border border-blue-200/30 dark:border-blue-800/30">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">🔍</span>
                      <div><strong className="text-blue-700 dark:text-blue-300">精准定位：</strong> <span className="text-gray-700 dark:text-gray-300">避免您在海量分类中迷失方向，直接缩小选型范围。</span></div>
                    </li>
                    <li className="flex items-start gap-2 p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200/30 dark:border-purple-800/30">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">⚡</span>
                      <div><strong className="text-purple-700 dark:text-purple-300">效率提升：</strong> <span className="text-gray-700 dark:text-gray-300">快速理解您的核心需求，节省您逐级浏览分类的时间。</span></div>
                    </li>
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
            <ol className="list-none text-xs space-y-1.5 mt-2">
              <li className="flex items-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg border border-blue-200/30 dark:border-blue-800/30">
                <span className="flex items-center justify-center w-5 h-5 bg-blue-500 text-white text-xs font-bold rounded-full">1</span>
                <span>一级分类选择: <strong className="text-blue-700 dark:text-blue-300">电源管理</strong></span>
              </li>
              <li className="flex items-center gap-2 p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200/30 dark:border-purple-800/30">
                <span className="flex items-center justify-center w-5 h-5 bg-purple-500 text-white text-xs font-bold rounded-full">2</span>
                <span>二级分类选择: <strong className="text-purple-700 dark:text-purple-300">LED照明-DC/DC</strong> 或 <strong className="text-purple-700 dark:text-purple-300">DC-DC稳压器</strong></span>
              </li>
              <li className="flex items-center gap-2 p-2 bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30 rounded-lg border border-indigo-200/30 dark:border-indigo-800/30">
                <span className="flex items-center justify-center w-5 h-5 bg-indigo-500 text-white text-xs font-bold rounded-full">3</span>
                <span>三级分类选择 (如果选择DC-DC稳压器): <strong className="text-indigo-700 dark:text-indigo-300">降压型转换器</strong></span>
              </li>
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
      <DialogContent className="sm:max-w-[600px] p-0 flex flex-col h-[80vh] max-h-[700px] overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/20">
        <DialogHeader className="p-6 border-b border-blue-200/40 dark:border-blue-800/40 bg-gradient-to-r from-blue-50/80 via-purple-50/60 to-indigo-50/80 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-indigo-950/40 backdrop-blur-sm">
          <DialogTitle className="flex items-center gap-4 text-xl font-bold">
            <div className="relative">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white shadow-xl">
                <Sparkles className="h-6 w-6" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 shadow-sm animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                AI 智能芯片分类顾问
              </span>
              <span className="text-sm font-normal text-gray-600 dark:text-gray-300 mt-1">
                小智 • 在线为您服务
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-grow p-6 space-y-6 bg-gradient-to-b from-gray-50/20 via-white/50 to-blue-50/20 dark:from-gray-900/20 dark:via-gray-950/50 dark:to-blue-950/20" ref={chatAreaRef}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-4 mb-6 max-w-[90%] animate-in slide-in-from-bottom-3 duration-500",
                msg.sender === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              {msg.sender === 'ai' && (
                <div className="relative">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white shadow-xl self-end mb-1 shrink-0 ring-3 ring-blue-200/50 dark:ring-blue-800/50">
                    <Cpu size={22} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                </div>
              )}
              {msg.sender === 'user' && (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white shadow-xl self-end mb-1 shrink-0 ring-3 ring-orange-200/50 dark:ring-orange-800/50">
                  <User size={20} />
                </div>
              )}
              <div
                className={cn(
                  "px-5 py-4 rounded-2xl text-sm shadow-xl backdrop-blur-sm border-2 relative",
                  msg.sender === 'user'
                    ? "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white rounded-br-lg shadow-orange-300/30 dark:shadow-orange-900/30 border-orange-400/30"
                    : "bg-gradient-to-br from-white via-blue-50/80 to-purple-50/60 dark:from-blue-950/60 dark:via-purple-950/40 dark:to-indigo-950/60 text-gray-800 dark:text-gray-200 rounded-bl-lg shadow-blue-300/30 dark:shadow-blue-900/30 border-blue-300/30 dark:border-blue-700/30"
                )}
              >
                {/* 消息气泡尾巴 */}
                <div className={cn(
                  "absolute w-0 h-0 border-solid",
                  msg.sender === 'user'
                    ? "bottom-0 right-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-orange-500"
                    : "bottom-0 left-0 border-r-[12px] border-r-transparent border-t-[12px] border-t-white dark:border-t-blue-950/60"
                )}></div>

                <div className={cn(
                  "prose prose-sm max-w-none leading-relaxed",
                  msg.sender === 'user'
                    ? "prose-invert [&_p]:text-white [&_strong]:text-white [&_li]:text-white [&_p]:font-medium"
                    : "prose-gray dark:prose-invert [&_p]:text-gray-800 dark:[&_p]:text-gray-200 [&_strong]:text-blue-700 dark:[&_strong]:text-blue-300 [&_li]:text-gray-700 dark:[&_li]:text-gray-300 [&_p]:font-medium"
                )}>
                  {typeof msg.text === 'string' ? <p className="whitespace-pre-wrap break-words">{msg.text}</p> : msg.text}
                </div>
              </div>
            </div>
          ))}
          {isAiThinking && (
            <div className="flex items-end gap-4 mb-6 mr-auto max-w-[90%] animate-in slide-in-from-bottom-3 duration-500">
              <div className="relative">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 text-white shadow-xl self-end mb-1 shrink-0 ring-3 ring-blue-200/50 dark:ring-blue-800/50">
                  <Cpu size={22} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
              </div>
              <div className="px-5 py-4 rounded-2xl text-sm shadow-xl backdrop-blur-sm border-2 relative bg-gradient-to-br from-white via-blue-50/80 to-purple-50/60 dark:from-blue-950/60 dark:via-purple-950/40 dark:to-indigo-950/60 text-gray-800 dark:text-gray-200 rounded-bl-lg shadow-blue-300/30 dark:shadow-blue-900/30 border-blue-300/30 dark:border-blue-700/30">
                {/* 消息气泡尾巴 */}
                <div className="absolute bottom-0 left-0 w-0 h-0 border-solid border-r-[12px] border-r-transparent border-t-[12px] border-t-white dark:border-t-blue-950/60"></div>

                <div className="flex items-center gap-3">
                  <LoadingSpinner size={18} className="text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-semibold">小智正在思考...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>

        <div className="p-5 border-t border-blue-200/40 dark:border-blue-800/40 bg-gradient-to-r from-gray-50/80 via-blue-50/60 to-purple-50/40 dark:from-gray-900/80 dark:via-blue-950/60 dark:to-purple-950/40 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isAiThinking && handleSendMessage()}
                placeholder="描述您的芯片需求或分类问题..."
                className="h-12 pl-5 pr-4 rounded-2xl border-2 border-blue-300/60 dark:border-blue-700/60 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm focus:border-blue-500 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-200/50 dark:focus:ring-blue-800/50 transition-all duration-300 text-sm font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-lg focus:shadow-xl"
                disabled={isAiThinking}
              />
              {/* 输入框装饰 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 pointer-events-none"></div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isAiThinking}
              className="h-12 px-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 hover:from-blue-600 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-lg transform hover:scale-105 active:scale-95"
            >
              <Send className="h-5 w-5" />
              <span className="sr-only">发送</span>
            </Button>
          </div>

          {/* 底部提示 */}
          <div className="mt-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              💡 小智可以帮您快速定位芯片分类，提高选型效率
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


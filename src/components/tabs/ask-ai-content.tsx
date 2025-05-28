"use client";

import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AiAvatar from "@/components/ai/ai-avatar";
import GuideCard from "@/components/ai/chat/guide-card";
import ChatInputBar from "@/components/ai/chat/chat-input-bar";
import ChatMessageDisplay from "@/components/ai/chat/chat-message-display";
import type { ChatMessage } from "@/components/ai/chat/chat-message";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, BookOpen, Brain, ChevronDown, ClipboardList, FileText, GitCompareArrows, Lightbulb, MessageSquare, PackageSearch, Send, Settings2, Zap, Sparkles, Cpu, TrendingUp, BarChart3, FileSearch, Layers, Globe, Star, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder for actual AI response generation
// import { askChatGpt } from "@/ai/flows/ask-chat-gpt"; // Assuming this flow exists

const guideCardsData = [
  {
    icon: PackageSearch, // Chip with magnifying glass
    title: "智能选型",
    description: "告诉我您的需求，如‘输入12V，输出5V/2A的DCDC’，我来帮您找料。",
    buttonText: "帮我找DCDC",
  },
  {
    icon: GitCompareArrows, // Two chips with VS
    title: "参数PK台",
    description: "想比较几款芯片的优劣？例如‘对比LM324和LM358’。",
    buttonText: "对比运算放大器",
  },
  {
    icon: BookOpen, // Open book or lightbulb
    title: "技术百科",
    description: "有不懂的芯片术语或原理？尽管问我，如‘什么是LDO的PSRR？’",
    buttonText: "什么是PSRR？",
  },
  {
    icon: FileText, // PDF icon + chat bubble
    title: "Datasheet解读",
    description: "上传芯片手册，向我提问关键信息或让小智帮您提炼要点。",
    buttonText: "上传Datasheet",
  },
];


// Mockup for AI detailed response for a chip
const MockAiChipResponse = ({ chipName, details, tip, onAction }: { chipName: string, details: string[], tip: string, onAction: (action: string) => void }) => (
  <Card className="my-2 shadow-md border-primary/30">
    <CardHeader className="pb-2 pt-3 px-3">
      <CardTitle className="text-base font-semibold flex items-center gap-1.5"> <Zap size={16} className="text-primary" /> {chipName}</CardTitle>
    </CardHeader>
    <CardContent className="text-xs px-3 pb-2 space-y-1.5">
      <div>
        <p className="font-medium text-muted-foreground">关键特性:</p>
        <ul className="list-disc list-inside pl-1">
          {details.map((d, i) => <li key={i}>{d}</li>)}
        </ul>
      </div>
      <p><strong className="text-primary/80">小智提示:</strong> {tip}</p>
    </CardContent>
    <CardFooter className="px-3 pb-3 flex flex-wrap gap-1.5">
      <Button size="sm" variant="outline" className="text-xs h-7" onClick={() => onAction(`查看 ${chipName} 详情`)}>查看详情</Button>
      <Button size="sm" variant="secondary" className="text-xs h-7" onClick={() => onAction(`添加 ${chipName} 到对比`)}>添加到对比</Button>
      <Button size="sm" variant="secondary" className="text-xs h-7" onClick={() => onAction(`找类似 ${chipName} 但更高耐压的`)}>更高耐压?</Button>
    </CardFooter>
  </Card>
);


export default function AskAiContent() {
  const [viewMode, setViewMode] = useState<'initial' | 'chat'>('initial');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (sender: 'user' | 'ai', type: ChatMessage['type'], content: React.ReactNode | string, aiAvatar?: boolean, title?: string) => {
    setMessages(prev => [...prev, { id: Date.now().toString(), sender, type, content, timestamp: new Date(), aiAvatar, title }]);
  };

  const handleSendMessage = async (text: string, context?: string) => {
    if (viewMode === 'initial') setViewMode('chat');
    addMessage('user', 'text', text);
    setIsAiThinking(true);

    // Simulate AI response
    setTimeout(async () => {
      setIsAiThinking(false);
      if (text.toLowerCase().includes("1500v")) {
         addMessage('ai', 'aiResponse',
          (
            <div className="space-y-2">
              <p className="font-semibold text-sm mb-2">好的！根据您的需求，小智为您解析如下：</p>
              <Card className="bg-muted/50 p-2.5 rounded-md text-xs">
                <CardHeader className="p-0 pb-1.5">
                    <CardTitle className="text-sm flex items-center gap-1.5"><ClipboardList size={16} />您的需求清单：</CardTitle>
                </CardHeader>
                <CardContent className="p-0 space-y-0.5">
                  <p><strong>功能分类：</strong> 电源管理 - DC/DC转换器</p>
                  <p><strong>拓扑结构：</strong> 反激式 (Flyback)</p>
                  <p><strong>输入电压 Vin：</strong> 1500 V</p>
                  <p><strong>输出电压 Vout：</strong> 32 V</p>
                  <p><strong>输出电流 Iout：</strong> 5 A</p>
                </CardContent>
              </Card>

              <p className="text-sm mt-2 mb-1">🔍 <strong>检索结果：</strong> 共找到 66 款可能符合的芯片。优先为您展示综合匹配度和常用性较高的前 3 款：</p>

              <MockAiChipResponse
                chipName="1. NCP1077P100G (安森美 ONSEMI)"
                details={["内置700V高雪崩坚固型MOSFET", "固定频率100kHz，动态自供电(DSS)", "过载、短路、过温保护", "封装: PDIP-7"]}
                tip="此款的集成MOSFET耐压可能不满足1500V直接输入，请确认您的具体应用电路设计。"
                onAction={(action) => handleSendMessage(action, "chip_action")}
              />
              <MockAiChipResponse
                chipName="2. LNK6777K (Power Integrations)"
                details={["EcoSmart™ 技术，高效率", "集成725V MOSFET，支持反激/降压-升压拓扑", "精确的过流/过温保护，输出过压保护", "封装: eSIP-7C"]}
                tip="同样，MOSFET耐压需关注。Power Integrations有更高耐压的系列，但可能需要更复杂的外部电路。"
                onAction={(action) => handleSendMessage(action, "chip_action")}
              />
               <MockAiChipResponse
                chipName="3. UCC28740DR (德州仪器 TI)"
                details={["反激式控制器，需外配高压MOSFET", "先进的谷值开关(VSR)技术", "全面的保护功能", "封装: SOIC-7"]}
                tip="这是控制器IC，需要您配合选用合适的1500V以上耐压的MOSFET。"
                onAction={(action) => handleSendMessage(action, "chip_action")}
              />
              <Button className="w-full mt-2" onClick={() => handleSendMessage("查看全部66款芯片", "view_all")}>查看全部66款芯片</Button>
              <p className="text-sm font-semibold mt-3">💡 接下来您可以问我：</p>
              <ul className="list-disc list-inside text-xs space-y-0.5 pl-1">
                  <li>“对比 NCP1077P100G 和 LNK6777K 的效率”</li>
                  <li>“UCC28740DR 有哪些典型的应用电路？”</li>
                  <li>“筛选出封装是DIP的型号”</li>
              </ul>
            </div>
          )
        );
      } else if (context === "Datasheet解读" || text.startsWith("分析文件:")) {
        addMessage('ai', 'text', `小智已收到文件 ${text.replace("分析文件: ", "")}。请问您想了解关于这个文件的哪些信息？例如，可以问我“总结一下主要特性”或“找出额定电压”。`);
      }
      else {
        addMessage('ai', 'text', `小智收到了您的消息：“${text}”。现在我会根据这个信息进行处理。 (这是一个模拟回应)`);
      }
    }, 1500);
  };

  const handleGuideCardClick = (cardTitle: string, buttonText: string) => {
    if (cardTitle === "Datasheet解读") {
      // File upload is handled by the card itself, message is sent via onFileUpload completion
      // toast({ title: "请选择 Datasheet 文件", description: "点击卡片下方的“上传Datasheet”按钮选择文件进行解读。" });
      return;
    }
    handleSendMessage(buttonText, cardTitle);
  };

  const handleFileUpload = (file: File, context: string) => {
    toast({
      title: "文件上传成功",
      description: `${file.name} 已上传。小智将开始分析。`,
    });
    // For "Datasheet解读", this message will be the primary trigger after file selection.
     handleSendMessage(`分析文件: ${file.name}`, context);
  };

  const handleClearChat = () => {
    setMessages([]);
    setViewMode('initial'); // Optionally go back to initial screen
    toast({ title: "对话已清空"});
  };


  return (
    <div className="flex flex-col h-[calc(100vh_-_200px)] md:h-[calc(100vh_-_180px)] bg-muted/20 rounded-lg shadow-inner"> {/* Adjust height as needed */}
      <CardHeader className="py-3 px-4 border-b bg-card rounded-t-lg">
        <CardTitle className="text-xl flex items-center gap-2">
          <Brain className="h-6 w-6 text-accent" />
          与小智对话
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-grow p-3 md:p-4" ref={chatAreaRef}>
        {viewMode === 'initial' && (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <AiAvatar iconSize={40} containerClassName="mb-3 p-3" />
            <p className="text-lg font-semibold mb-1">你好！我是您的专属芯片助手小智。</p>
            <p className="text-muted-foreground mb-5 text-sm max-w-md">在芯片的海洋里，我能帮您：</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full max-w-2xl px-2">
              {guideCardsData.map(card => (
                <GuideCard
                  key={card.title}
                  {...card}
                  onButtonClick={handleGuideCardClick}
                  onFileUpload={card.title === "Datasheet解读" ? handleFileUpload : undefined}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-6">或者，直接在下方输入您的问题开始对话。</p>
          </div>
        )}

        {viewMode === 'chat' && messages.map(msg => (
          <ChatMessageDisplay key={msg.id} message={msg} />
        ))}

        {viewMode === 'chat' && isAiThinking && (
          <ChatMessageDisplay message={{id: 'thinking', sender: 'ai', type: 'loading', content: "小智正在全力检索...", timestamp: new Date()}} />
        )}
         {viewMode === 'chat' && messages.length === 0 && !isAiThinking && (
            <div className="text-center text-muted-foreground py-10">
                <MessageSquare size={40} className="mx-auto mb-2" />
                <p>开始与小智对话吧！</p>
                <p className="text-xs">可以从下方输入框提问，或使用 "+" 按钮探索更多功能。</p>
            </div>
        )}
      </ScrollArea>

      <ChatInputBar
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onClearChat={messages.length > 0 ? handleClearChat : undefined}
        isChatEmpty={messages.length === 0}
        placeholder={isAiThinking ? "小智正在思考..." : "输入您的问题或需求..."}
      />
    </div>
  );
}

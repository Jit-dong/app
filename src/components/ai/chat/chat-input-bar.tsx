"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, PlusCircle, Camera, FileUp, ListChecks, Trash2 } from "lucide-react";
import { useState, useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface ChatInputBarProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File, context: string) => void;
  onClearChat?: () => void;
  placeholder?: string;
  isChatEmpty?: boolean;
}

export default function ChatInputBar({
  onSendMessage,
  onFileUpload,
  onClearChat,
  placeholder = "例如：找一款低功耗蓝牙SoC",
  isChatEmpty = true,
}: ChatInputBarProps) {
  const [message, setMessage] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const datasheetInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleGenericFileUpload = (event: React.ChangeEvent<HTMLInputElement>, context: string) => {
    const file = event.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file, context);
      toast({ title: "文件已选择", description: `${file.name} 已准备好随消息发送或分析。` });
      onSendMessage(`分析文件: ${file.name}`); // Auto-send a message indicating file upload
    }
    // Reset file input
    if (event.target) {
      event.target.value = "";
    }
    setIsPopoverOpen(false);
  };

  const handlePlusAction = (action: () => void) => {
    action();
    setIsPopoverOpen(false);
  }

  return (
    <div className="sticky bottom-0 left-0 right-0 mt-auto flex items-center gap-1 md:gap-2 border-t bg-background p-2 md:p-3 shadow-sm z-10">
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent shrink-0">
            <PlusCircle className="h-5 w-5 md:h-6 md:w-6" />
            <span className="sr-only">展开选项</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" align="start" className="w-auto p-1 space-y-0.5 mb-2 shadow-xl rounded-xl">
          <Button variant="ghost" className="w-full justify-start gap-2 px-3 py-1.5 text-sm h-auto" onClick={() => handlePlusAction(() => imageInputRef.current?.click())}>
            <Camera className="h-4 w-4" /> 拍图识芯
          </Button>
          <input type="file" ref={imageInputRef} onChange={(e) => handleGenericFileUpload(e, "拍图识芯")} className="hidden" accept="image/*" />
          
          <Button variant="ghost" className="w-full justify-start gap-2 px-3 py-1.5 text-sm h-auto" onClick={() => handlePlusAction(() => datasheetInputRef.current?.click())}>
            <FileUp className="h-4 w-4" /> 上传文档
          </Button>
          <input type="file" ref={datasheetInputRef} onChange={(e) => handleGenericFileUpload(e, "上传文档")} className="hidden" accept=".pdf,.txt,application/pdf,text/plain" />
          
          <Button variant="ghost" className="w-full justify-start gap-2 px-3 py-1.5 text-sm h-auto" onClick={() => handlePlusAction(() => { onSendMessage("提供一些常用提问模板")})}>
            <ListChecks className="h-4 w-4" /> 常用提问模板
          </Button>
          
          {onClearChat && !isChatEmpty && (
            <Button variant="ghost" className="w-full justify-start gap-2 px-3 py-1.5 text-sm h-auto text-destructive hover:text-destructive" onClick={() => handlePlusAction(onClearChat)}>
              <Trash2 className="h-4 w-4" /> 清空对话
            </Button>
          )}
        </PopoverContent>
      </Popover>

      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent shrink-0">
        <Mic className="h-5 w-5" />
        <span className="sr-only">语音输入</span>
      </Button>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1 rounded-full px-4 py-2 text-sm md:text-base h-10 border-input focus:ring-accent focus:border-accent"
        aria-label="聊天输入"
      />
      <Button onClick={handleSend} disabled={!message.trim()} size="icon" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground w-10 h-10 shrink-0">
        <Send className="h-5 w-5" />
        <span className="sr-only">发送</span>
      </Button>
    </div>
  );
}

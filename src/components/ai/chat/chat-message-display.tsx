import AiAvatar from '@/components/ai/ai-avatar';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import type { ChatMessage } from './chat-message';

interface ChatMessageDisplayProps {
  message: ChatMessage;
}

export default function ChatMessageDisplay({ message }: ChatMessageDisplayProps) {
  const isUser = message.sender === 'user';

  const bubbleAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleStyles = isUser
    ? 'bg-accent text-accent-foreground rounded-br-none'
    : 'bg-card text-card-foreground rounded-bl-none shadow-sm border';
  
  const avatarSize = 24;

  return (
    <div className={cn('flex w-full mb-3 md:mb-4', bubbleAlignment)}>
      <div className={cn('flex items-end gap-2 max-w-[85%] sm:max-w-[75%] lg:max-w-[70%]', isUser ? 'flex-row-reverse' : 'flex-row')}>
        {!isUser && message.aiAvatar !== false && (
          <AiAvatar iconSize={avatarSize} containerClassName="self-end mb-0.5" />
        )}
        
        {message.type === 'loading' ? (
            <Card className={cn('p-3 rounded-lg min-w-[120px]', bubbleStyles)}>
                <CardContent className="p-0 flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {typeof message.content === 'string' ? message.content : "小智思考中..."}
                </CardContent>
            </Card>
        ) : message.type === 'error' ? (
            <Card className={cn('p-3 rounded-lg border-destructive bg-destructive/10', bubbleStyles, 'text-destructive rounded-bl-none')}>
                <CardContent className="p-0 text-sm">
                    {typeof message.content === 'string' ? message.content : "抱歉，小智遇到了一点问题。"}
                </CardContent>
            </Card>
        ) : (
            // type 'text' or 'aiResponse' (which is ReactNode)
             <Card className={cn('p-3 rounded-lg', bubbleStyles, {'ml-0': isUser && message.aiAvatar === false})}>
                <CardContent className="p-0 text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </CardContent>
            </Card>
        )}
      </div>
    </div>
  );
}

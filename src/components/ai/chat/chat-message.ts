export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  type: 'text' | 'loading' | 'error' | 'aiResponse'; // aiResponse for complex AI cards
  content: React.ReactNode | string; // Can be string for text, or structured object for complex messages
  timestamp: Date;
  aiAvatar?: boolean; // Show AI avatar for AI messages, defaults to true for AI
  title?: string; // Optional title for AI responses
}

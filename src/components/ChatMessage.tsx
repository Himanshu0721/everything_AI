import { Bot, User } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-start space-x-2 max-w-[80%] ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      }`}>
        <div className={`p-3 rounded-lg ${
          isUser ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
        }`}>
          <p className="text-sm">{message.content}</p>
        </div>
        {isUser ? (
          <User className="w-6 h-6 text-gray-600" />
        ) : (
          <Bot className="w-6 h-6 text-blue-600" />
        )}
      </div>
    </div>
  );
}
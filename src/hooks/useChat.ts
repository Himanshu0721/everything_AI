import { useState } from 'react';
import { Message } from '../types';
import { sendChatMessage } from '../services/chatService';
import { ChatServiceError } from '../types/errors';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { type: 'user', content }]);
      
      const response = await sendChatMessage(content);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      const errorMessage = error instanceof ChatServiceError 
        ? error.message 
        : 'An unexpected error occurred. Please try again.';
        
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: `🚨 ${errorMessage}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    sendMessage
  };
}
import { Bot } from 'lucide-react';

export function LoadingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center space-x-2">
        <Bot className="w-6 h-6 text-blue-600" />
        <div className="bg-white border border-gray-200 p-3 rounded-lg">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
import { Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center">
        <Bot className="w-8 h-8 text-blue-600 mr-2" />
        <h1 className="text-xl font-semibold text-gray-800">AI Chat Assistant</h1>
      </div>
    </header>
  );
}
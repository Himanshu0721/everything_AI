import { Header } from './components/Header';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { LoadingIndicator } from './components/LoadingIndicator';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header />
      
      <div className="flex-1 overflow-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
          {isLoading && <LoadingIndicator />}
        </div>
      </div>

      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
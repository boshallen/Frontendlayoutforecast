import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Send, Bot, User, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIReasoningChatProps {
  compact?: boolean;
}

export function AIReasoningChat({ compact = false }: AIReasoningChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "您好！我是您的房地产智能顾问。我已经分析了预测结果，可以为您提供关于房产估值、市场趋势和投资建议的详细见解。您想了解什么信息？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response - replace with actual LLM API call
    setTimeout(() => {
      const responses = [
        "根据预测结果，该房产价格为 458 万元，处于该区域的合理市场范围内。87% 的置信度得分表明数据支持充分。地段评分达到 92/100，这表明该位置具有出色的可达性和社区质量。",
        "可比房产分析显示，您的目标房产定价具有竞争力。0.7 公里范围内的相似房产价格从 448 万元到 465 万元不等，您的预估价格正好处于中间位置，说明市场价值合理。",
        "从关键因素来看，交通便利度和配套设施都获得了高分（分别为 85 分和 88 分），这对长期保值至关重要。但是房龄评分为 65 分，表明这不是新建筑，可能会影响升值潜力。",
        "市场趋势显示该区域呈上升态势。高影响因素（地段和交通）是不易改变的基础要素，使其成为相对稳定的投资选择。如果您的预算符合，建议考虑这处房产。",
        "从 RAG 分析角度来看，结合机器学习预测和最新市场数据，该社区在过去一年中升值了 12%。学区评分 78 分也表明有家庭导向的需求，通常能提供稳定的租金收益。",
        "该房产的价格趋势向好，建议您关注周边配套设施的发展规划。如果未来有地铁线路或大型商业中心建设，将进一步提升房产价值。",
        "综合各项指标分析，该房产适合长期持有。虽然房龄因素影响了部分评分，但优越的地段和交通优势能够有效对冲这一不利因素。"
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const heightClass = compact ? "h-[400px]" : "h-[500px]";

  return (
    <Card className="flex flex-col p-4 border-2 border-gray-300">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b-2 border-blue-600">
        <Bot className="w-5 h-5 text-blue-600" />
        <h3 className="text-gray-900">智能分析助手</h3>
      </div>

      <ScrollArea className={`flex-1 pr-4 ${heightClass}`} ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className={message.role === 'user' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}>
                  {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex-1 p-3 border ${
                  message.role === 'user'
                    ? 'bg-red-50 border-red-200 text-gray-900 ml-12'
                    : 'bg-blue-50 border-blue-200 text-gray-900 mr-12'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                <div className="text-xs mt-2 text-gray-500">
                  {message.timestamp.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 p-3 border bg-blue-50 border-blue-200 mr-12">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2 mt-4 pt-3 border-t-2 border-gray-200">
        <Textarea
          placeholder="请输入您想咨询的问题，比如市场趋势、投资建议或房产详情..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="min-h-[60px] resize-none border-gray-300"
          disabled={isLoading}
        />
        <Button 
          onClick={handleSend} 
          disabled={!input.trim() || isLoading} 
          className="shrink-0 bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-2 text-center">
        按 Enter 发送消息，Shift+Enter 换行
      </div>
    </Card>
  );
}

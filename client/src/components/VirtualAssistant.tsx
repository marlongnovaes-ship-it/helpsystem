import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, X, Send, Minimize2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const responses: { [key: string]: string } = {
  "oi": "Olá! 👋 Sou o TechBot, seu assistente virtual! Como posso ajudar?",
  "olá": "Oi! 😊 Em que posso ser útil hoje?",
  "ajuda": "Posso te ajudar com: Formatação, Limpeza, Atualização, Suporte Remoto. O que você precisa?",
  "preço": "Nossos preços variam de acordo com o serviço. Entre em contato para um orçamento personalizado!",
  "horário": "Atendimento remoto 24/7! Presencial de Seg-Sex, 9h-18h.",
  "contato": "Email: contato@helpsystem.com.br | Tel: (11) 99999-9999",
  "formatação": "Formatação completa com backup de dados! Deixa seu PC novo em folha! 💻",
  "limpeza": "Limpeza profunda de hardware + troca de pasta térmica. Seu PC vai agradecer! 🧹",
  "default": "Interessante! 🤔 Para mais detalhes, use o formulário de contato ou ligue para nós!"
};

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Olá! Sou o TechBot 🤖 Como posso ajudar você hoje?", isBot: true, timestamp: new Date() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        text: getResponse(input),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/50 rounded-full p-6 animate-bounce"
        >
          <Bot className="w-6 h-6 mr-2 animate-pulse" />
          Fale com TechBot
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          size="lg"
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/50 rounded-full p-4"
        >
          <Bot className="w-6 h-6 animate-pulse" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 w-96">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-green-500/50 shadow-2xl shadow-green-500/20">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <div>
              <h3 className="font-bold text-white">TechBot</h3>
              <p className="text-xs text-green-100">Online agora</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/10"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="h-80 overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-green-500">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-green-500/20 border border-green-500/30 text-white'
                      : 'bg-blue-500/20 border border-blue-500/30 text-white'
                  }`}
                >
                  {msg.isBot && <Bot className="w-4 h-4 inline mr-2 text-green-400" />}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-green-500/20 border border-green-500/30 p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Digite sua mensagem..."
              className="bg-slate-950/50 border-green-500/30 focus:border-green-500 text-white"
            />
            <Button
              onClick={sendMessage}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-3 text-xs text-center text-gray-500">
            Sugestões: "ajuda", "preço", "horário", "contato"
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");

  useEffect(() => {
    // Carregar número do WhatsApp do localStorage
    const savedNumber = localStorage.getItem("whatsapp_number") || "5511999999999";
    setWhatsappNumber(savedNumber);

    // Mostrar botão após 2 segundos
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Vim pelo site e preciso de suporte técnico. Pode me ajudar?");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Botão WhatsApp Flutuante */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce-slow">
        <button
          onClick={handleWhatsAppClick}
          className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-4 shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 hover:scale-110 animate-pulse-slow"
          aria-label="Contato via WhatsApp"
        >
          {/* Ícone WhatsApp */}
          <MessageCircle className="w-8 h-8" />
          
          {/* Badge de Urgência */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse shadow-lg">
            URGENTE
          </div>

          {/* Tooltip */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            <div className="font-bold text-sm">💬 Precisa de ajuda?</div>
            <div className="text-xs text-gray-600">Clique para falar no WhatsApp!</div>
            {/* Seta */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
          </div>

          {/* Ondas de Pulso */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-10" style={{ animationDelay: "0.5s" }}></div>
        </button>

        {/* Texto Flutuante */}
        <div className="absolute -top-16 right-0 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg shadow-xl animate-bounce-slow">
          <div className="text-sm font-bold">🚨 Atendimento Online!</div>
          <div className="text-xs">Resposta em minutos</div>
          {/* Seta */}
          <div className="absolute bottom-0 right-6 translate-y-full w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-green-600"></div>
        </div>
      </div>

      {/* Estilos adicionais */}
      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

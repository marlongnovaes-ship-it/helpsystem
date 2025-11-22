import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

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
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 flex items-center gap-2">
        {/* Badge "Técnico Online" - apenas desktop */}
        <div className="hidden md:flex bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full shadow-lg items-center gap-1.5 animate-fade-in">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold whitespace-nowrap">Técnico Online</span>
        </div>

        {/* Botão WhatsApp */}
        <button
          onClick={handleWhatsAppClick}
          className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-3 md:p-4 shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 hover:scale-110"
          aria-label="Contato via WhatsApp"
        >
          {/* Ícone WhatsApp */}
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />

          {/* Ondas de Pulso */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        </button>
      </div>

      {/* Estilos adicionais */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </>
  );
}

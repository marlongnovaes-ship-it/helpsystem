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
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40">
        <button
          onClick={handleWhatsAppClick}
          className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full p-3 md:p-4 shadow-2xl shadow-green-500/50 hover:shadow-green-500/70 transition-all duration-300 hover:scale-110"
          aria-label="Contato via WhatsApp"
        >
          {/* Ícone WhatsApp */}
          <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />

          {/* Tooltip - apenas desktop */}
          <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-sm">
            💬 Fale conosco
            {/* Seta */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900"></div>
          </div>

          {/* Ondas de Pulso */}
          <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
        </button>
      </div>
    </>
  );
}

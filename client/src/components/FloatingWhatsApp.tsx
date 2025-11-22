import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("5511999999999");

  useEffect(() => {
    // Carregar número do WhatsApp do localStorage
    const savedNumber = localStorage.getItem("whatsapp_number");
    if (savedNumber) {
      setWhatsappNumber(savedNumber);
    }
  }, []);

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de solicitar um atendimento técnico.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Badge de status online */}
      <div className="bg-green-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce flex items-center gap-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-semibold">Online Agora!</span>
      </div>

      {/* Botão principal do WhatsApp */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        aria-label="Contato via WhatsApp"
      >
        {/* Efeito de onda ao redor do botão */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
        
        {/* Ícone do WhatsApp */}
        <MessageCircle className="w-8 h-8 relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          <span className="text-sm font-semibold">💬 Fale conosco agora!</span>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
        </div>
      </button>

      {/* Botão de fechar (opcional) */}
      <button
        onClick={() => setIsVisible(false)}
        className="bg-gray-700 hover:bg-gray-800 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 opacity-70 hover:opacity-100"
        aria-label="Fechar botão WhatsApp"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

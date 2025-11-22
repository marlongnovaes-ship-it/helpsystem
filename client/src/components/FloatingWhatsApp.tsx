import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Botão principal do WhatsApp */}
      <button
        onClick={handleWhatsAppClick}
        className="group relative bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
        aria-label="Contato via WhatsApp"
      >
        {/* Efeito de onda ao redor do botão */}
        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75"></div>
        
        {/* Ícone do WhatsApp */}
        <MessageCircle className="w-8 h-8 relative z-10" />
        
        {/* Tooltip simples */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none text-sm">
          Fale conosco
          <div className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-full w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-gray-900"></div>
        </div>
      </button>
    </div>
  );
}

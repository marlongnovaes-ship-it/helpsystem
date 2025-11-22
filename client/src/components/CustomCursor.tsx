import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Adiciona partícula à trilha
      const newTrail = { x: e.clientX, y: e.clientY, id: trailId++ };
      setTrail(prev => [...prev.slice(-8), newTrail]); // Mantém últimas 8 partículas

      // Verifica se está sobre elemento clicável
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(isClickable);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Não renderiza em mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  if (isMobile) return null;

  return (
    <>
      {/* Esconde cursor padrão */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trilha de partículas */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9999] rounded-full bg-blue-400"
          style={{
            left: point.x,
            top: point.y,
            width: '4px',
            height: '4px',
            transform: 'translate(-50%, -50%)',
            opacity: (index + 1) / trail.length * 0.5,
            transition: 'opacity 0.3s ease-out',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)'
          }}
        />
      ))}

      {/* Cursor principal (ponto central) */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white transition-transform duration-75"
        style={{
          left: position.x,
          top: position.y,
          width: isClicking ? '6px' : '8px',
          height: isClicking ? '6px' : '8px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
          boxShadow: '0 0 15px rgba(255, 255, 255, 0.8), 0 0 30px rgba(59, 130, 246, 0.6)'
        }}
      />

      {/* Anel externo */}
      <div
        className="fixed pointer-events-none z-[9998] rounded-full border-2 transition-all duration-200 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: isPointer ? '50px' : '35px',
          height: isPointer ? '50px' : '35px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.9 : 1})`,
          borderColor: isPointer ? 'rgba(59, 130, 246, 0.8)' : 'rgba(59, 130, 246, 0.5)',
          boxShadow: isPointer 
            ? '0 0 20px rgba(59, 130, 246, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.3)'
            : '0 0 15px rgba(59, 130, 246, 0.4)',
          background: isPointer ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
        }}
      />

      {/* Efeito de clique (ondas) */}
      {isClicking && (
        <>
          <div
            className="fixed pointer-events-none z-[9997] rounded-full border-2 border-blue-400 animate-ping"
            style={{
              left: position.x,
              top: position.y,
              width: '60px',
              height: '60px',
              transform: 'translate(-50%, -50%)',
              opacity: 0.6
            }}
          />
          <div
            className="fixed pointer-events-none z-[9997] rounded-full border border-cyan-400 animate-ping"
            style={{
              left: position.x,
              top: position.y,
              width: '80px',
              height: '80px',
              transform: 'translate(-50%, -50%)',
              opacity: 0.4,
              animationDelay: '0.1s'
            }}
          />
        </>
      )}
    </>
  );
}

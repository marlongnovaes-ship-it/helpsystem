import { useEffect, useState } from "react";
import { Cpu, HardDrive, MemoryStick, Server, Database, Wifi, CircuitBoard, Microchip } from "lucide-react";

interface HardwareItem {
  id: number;
  Icon: any;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingHardware() {
  const [hardware, setHardware] = useState<HardwareItem[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Ícones de hardware real
    const icons = [Server, Database, Cpu, HardDrive, MemoryStick, Wifi, CircuitBoard, Microchip];
    
    // Gera posições aleatórias para hardware
    const items: HardwareItem[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      Icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 40 + Math.random() * 80, // 40-120px
      duration: 20 + Math.random() * 30, // 20-50s
      delay: Math.random() * 10,
      opacity: 0.03 + Math.random() * 0.07 // 0.03-0.1
    }));

    setHardware(items);

    // Parallax com mouse
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hardware.map((item) => {
        const Icon = item.Icon;
        return (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
              transition: 'transform 0.3s ease-out',
              animation: `float-hardware ${item.duration}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`
            }}
          >
            <Icon
              className="text-blue-400"
              style={{
                width: `${item.size}px`,
                height: `${item.size}px`,
                opacity: item.opacity,
                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))'
              }}
            />
          </div>
        );
      })}

      {/* Servidores maiores em posições estratégicas */}
      <div
        className="absolute top-10 right-10 opacity-5"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <Server className="w-64 h-64 text-blue-400" style={{ filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.4))' }} />
      </div>

      <div
        className="absolute bottom-20 left-10 opacity-5"
        style={{
          transform: `translate(${mousePosition.x * 0.8}px, ${mousePosition.y * 0.8}px)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <Database className="w-56 h-56 text-cyan-400" style={{ filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.4))' }} />
      </div>

      <div
        className="absolute top-1/3 left-1/4 opacity-4"
        style={{
          transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px) rotate(15deg)`,
          transition: 'transform 0.5s ease-out'
        }}
      >
        <CircuitBoard className="w-48 h-48 text-purple-400" style={{ filter: 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.3))' }} />
      </div>

      <style>{`
        @keyframes float-hardware {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) rotate(5deg);
          }
          50% {
            transform: translateY(-10px) rotate(-5deg);
          }
          75% {
            transform: translateY(-30px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
}

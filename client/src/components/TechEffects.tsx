import { useEffect, useState } from "react";

export default function TechEffects() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Gera partículas aleatórias
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid de fundo tech */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Linhas de circuito animadas */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(59, 130, 246)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(147, 51, 234)" stopOpacity="1" />
            <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Linha horizontal animada */}
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="url(#lineGradient1)" strokeWidth="2">
          <animate attributeName="y1" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="20%;80%;20%" dur="8s" repeatCount="indefinite" />
        </line>
        
        {/* Linha vertical animada */}
        <line x1="30%" y1="0" x2="30%" y2="100%" stroke="url(#lineGradient2)" strokeWidth="2">
          <animate attributeName="x1" values="30%;70%;30%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="x2" values="30%;70%;30%" dur="10s" repeatCount="indefinite" />
        </line>

        {/* Linha diagonal */}
        <line x1="0" y1="0" x2="100%" y2="100%" stroke="url(#lineGradient1)" strokeWidth="1" opacity="0.3">
          <animate attributeName="stroke-dasharray" values="0,1000;1000,0;0,1000" dur="15s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Partículas de luz flutuantes */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float-particle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.8), 0 0 20px rgba(59, 130, 246, 0.4)'
          }}
        />
      ))}

      {/* Hexágonos tech */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 opacity-10 animate-spin-slow">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,5 90,25 90,75 50,95 10,75 10,25" 
            fill="none" 
            stroke="rgb(59, 130, 246)" 
            strokeWidth="2"
          />
          <polygon 
            points="50,15 80,30 80,70 50,85 20,70 20,30" 
            fill="none" 
            stroke="rgb(147, 51, 234)" 
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-1/4 w-24 h-24 opacity-10 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '20s' }}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <polygon 
            points="50,5 90,25 90,75 50,95 10,75 10,25" 
            fill="none" 
            stroke="rgb(6, 182, 212)" 
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Ondas de dados digitais */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border-2 border-blue-400 rounded-full"
            style={{
              animation: `ripple ${3 + i}s ease-out infinite`,
              animationDelay: `${i * 1}s`
            }}
          />
        ))}
      </div>

      {/* Raios de energia */}
      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent animate-pulse-slow" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Brilhos holográficos */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

      {/* Código binário flutuante */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xs font-mono text-green-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-text ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            {Math.random() > 0.5 ? '01010101' : '10101010'}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(0.8);
            opacity: 0.5;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes float-text {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

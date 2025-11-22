import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cpu, HardDrive, Wifi, Monitor, Zap, Trophy, X } from "lucide-react";
import { toast } from "sonner";

interface Component {
  id: number;
  icon: any;
  name: string;
  broken: boolean;
  fixed: boolean;
  position: { x: number; y: number };
}

export default function DiagnosticGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameStarted, setGameStarted] = useState(false);
  const [components, setComponents] = useState<Component[]>([]);

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      endGame();
    }
  }, [timeLeft, gameStarted]);

  const startGame = () => {
    const newComponents: Component[] = [
      { id: 1, icon: Cpu, name: "CPU", broken: Math.random() > 0.5, fixed: false, position: { x: 20, y: 30 } },
      { id: 2, icon: HardDrive, name: "HD", broken: Math.random() > 0.5, fixed: false, position: { x: 60, y: 30 } },
      { id: 3, icon: Wifi, name: "Rede", broken: Math.random() > 0.5, fixed: false, position: { x: 20, y: 60 } },
      { id: 4, icon: Monitor, name: "Monitor", broken: Math.random() > 0.5, fixed: false, position: { x: 60, y: 60 } },
      { id: 5, icon: Zap, name: "Fonte", broken: Math.random() > 0.5, fixed: false, position: { x: 40, y: 45 } },
    ];
    setComponents(newComponents);
    setScore(0);
    setTimeLeft(30);
    setGameStarted(true);
  };

  const fixComponent = (id: number) => {
    setComponents(prev => prev.map(comp => {
      if (comp.id === id && comp.broken && !comp.fixed) {
        setScore(score + 100);
        toast.success(`${comp.name} consertado! +100 pontos`);
        return { ...comp, fixed: true };
      }
      return comp;
    }));
  };

  const endGame = () => {
    setGameStarted(false);
    const discount = Math.min(score / 10, 50);
    toast.success(`Jogo finalizado! Você ganhou ${discount}% de desconto!`, {
      duration: 5000,
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50 animate-bounce">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 rounded-full p-6"
        >
          <Trophy className="w-6 h-6 mr-2" />
          Jogar e Ganhar Desconto!
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/50">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-2xl text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🎮 Diagnóstico Interativo
          </CardTitle>
          <p className="text-center text-gray-400 mt-2">
            Conserte os componentes com problema e ganhe desconto!
          </p>
        </CardHeader>
        <CardContent>
          {!gameStarted ? (
            <div className="text-center space-y-6 py-8">
              <div className="text-6xl">🖥️</div>
              <h3 className="text-xl text-white">Como Jogar:</h3>
              <ul className="text-gray-300 space-y-2 text-left max-w-md mx-auto">
                <li>• Clique nos componentes com problema (vermelhos)</li>
                <li>• Cada componente consertado = 100 pontos</li>
                <li>• Você tem 30 segundos!</li>
                <li>• Ganhe até 50% de desconto no serviço!</li>
              </ul>
              <Button
                size="lg"
                onClick={startGame}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Iniciar Jogo
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-purple-400">
                  Pontos: {score}
                </div>
                <div className="text-2xl font-bold text-pink-400">
                  Tempo: {timeLeft}s
                </div>
              </div>
              
              <div className="relative h-80 bg-gradient-to-br from-slate-950 to-slate-900 rounded-lg border-2 border-purple-500/30 overflow-hidden">
                {components.map(comp => (
                  <button
                    key={comp.id}
                    onClick={() => fixComponent(comp.id)}
                    disabled={comp.fixed || !comp.broken}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-lg transition-all ${
                      comp.broken && !comp.fixed
                        ? 'bg-red-500/20 border-2 border-red-500 hover:scale-110 animate-pulse cursor-pointer'
                        : comp.fixed
                        ? 'bg-green-500/20 border-2 border-green-500'
                        : 'bg-blue-500/20 border-2 border-blue-500 opacity-50'
                    }`}
                    style={{ left: `${comp.position.x}%`, top: `${comp.position.y}%` }}
                  >
                    <comp.icon className={`w-8 h-8 ${
                      comp.broken && !comp.fixed
                        ? 'text-red-400'
                        : comp.fixed
                        ? 'text-green-400'
                        : 'text-blue-400'
                    }`} />
                    <div className="text-xs mt-1 text-white">{comp.name}</div>
                  </button>
                ))}
              </div>

              <div className="text-center text-gray-400 text-sm">
                Clique nos componentes vermelhos para consertá-los!
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

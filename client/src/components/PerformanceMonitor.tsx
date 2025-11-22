import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cpu, HardDrive, Wifi, Activity, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PerformanceMonitor() {
  const [isOpen, setIsOpen] = useState(false);
  const [cpu, setCpu] = useState(0);
  const [ram, setRam] = useState(0);
  const [network, setNetwork] = useState(0);
  const [fps, setFps] = useState(0);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setCpu(Math.floor(Math.random() * 40) + 30);
      setRam(Math.floor(Math.random() * 30) + 40);
      setNetwork(Math.floor(Math.random() * 50) + 50);
      setFps(Math.floor(Math.random() * 10) + 55);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div className="fixed top-24 right-8 z-40">
        <Button
          size="sm"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg shadow-cyan-500/50"
        >
          <Activity className="w-4 h-4 mr-2 animate-pulse" />
          Performance
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed top-24 right-8 z-40 w-72">
      <Card className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl border-cyan-500/50 shadow-2xl shadow-cyan-500/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
              Monitor de Performance
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 h-6 w-6"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* CPU */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300">CPU</span>
              </div>
              <span className="text-cyan-400 font-mono font-bold">{cpu}%</span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 animate-pulse-slow"
                style={{ width: `${cpu}%` }}
              />
            </div>
          </div>

          {/* RAM */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">RAM</span>
              </div>
              <span className="text-purple-400 font-mono font-bold">{ram}%</span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 animate-pulse-slow"
                style={{ width: `${ram}%` }}
              />
            </div>
          </div>

          {/* Network */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-gray-300">Rede</span>
              </div>
              <span className="text-green-400 font-mono font-bold">{network} Mbps</span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500 animate-pulse-slow"
                style={{ width: `${network}%` }}
              />
            </div>
          </div>

          {/* FPS */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">FPS</span>
              </div>
              <span className="text-yellow-400 font-mono font-bold">{fps}</span>
            </div>
            <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500 animate-pulse-slow"
                style={{ width: `${(fps / 60) * 100}%` }}
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="text-center text-xs text-gray-500">
              Status: <span className="text-green-400 font-semibold">Excelente ✓</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

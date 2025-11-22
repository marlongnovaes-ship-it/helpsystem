import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Terminal, Cpu, HardDrive, Wifi, Monitor, Zap, CheckCircle, AlertTriangle } from "lucide-react";

interface SystemInfo {
  os: string;
  browser: string;
  resolution: string;
  connection: string;
  ram: string;
  cores: number;
  language: string;
  timezone: string;
}

export default function DiagnosticTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Detecta se é desktop
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsDesktop(width >= 1024 && !isMobile);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Auto-open após 3 segundos (só no desktop)
  useEffect(() => {
    if (isDesktop && !isOpen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        startScan();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isDesktop]);

  // Scroll automático
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (text: string, delay: number = 0) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLines(prev => [...prev, text]);
        resolve(true);
      }, delay);
    });
  };

  const getSystemInfo = (): SystemInfo => {
    const ua = navigator.userAgent;
    let os = "Unknown OS";
    let browser = "Unknown Browser";

    // Detectar OS
    if (ua.indexOf("Win") !== -1) os = "Windows";
    else if (ua.indexOf("Mac") !== -1) os = "MacOS";
    else if (ua.indexOf("Linux") !== -1) os = "Linux";
    else if (ua.indexOf("X11") !== -1) os = "Unix";

    // Detectar Browser
    if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
    else if (ua.indexOf("Chrome") !== -1) browser = "Chrome";
    else if (ua.indexOf("Safari") !== -1) browser = "Safari";
    else if (ua.indexOf("Edge") !== -1) browser = "Edge";

    // Estimar conexão
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection ? connection.effectiveType : "4g";

    return {
      os,
      browser,
      resolution: `${window.screen.width}x${window.screen.height}`,
      connection: connectionType,
      ram: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : "Unknown",
      cores: navigator.hardwareConcurrency || 4,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
  };

  const startScan = async () => {
    setIsScanning(true);
    setLines([]);
    
    await addLine("╔═══════════════════════════════════════════════════════╗", 100);
    await addLine("║     HELPSYSTEM DIAGNOSTIC TERMINAL v2.0               ║", 200);
    await addLine("║     Advanced System Analysis Tool                     ║", 300);
    await addLine("╚═══════════════════════════════════════════════════════╝", 400);
    await addLine("", 500);
    await addLine("> Inicializando módulos de diagnóstico...", 600);
    await addLine("> [OK] Módulo de detecção carregado", 800);
    await addLine("> [OK] Analisador de sistema ativo", 1000);
    await addLine("> [OK] Scanner de hardware iniciado", 1200);
    await addLine("", 1400);
    await addLine("═══════════════════════════════════════════════════════", 1500);
    await addLine("  INICIANDO SCAN DO SISTEMA...", 1600);
    await addLine("═══════════════════════════════════════════════════════", 1700);
    await addLine("", 1800);

    // Simula progresso do scan
    for (let i = 0; i <= 100; i += 10) {
      setScanProgress(i);
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    const info = getSystemInfo();
    setSystemInfo(info);

    await addLine(`> Detectando sistema operacional... [${info.os}]`, 100);
    await addLine(`> Identificando navegador... [${info.browser}]`, 200);
    await addLine(`> Analisando resolução de tela... [${info.resolution}]`, 300);
    await addLine(`> Testando conexão de rede... [${info.connection.toUpperCase()}]`, 400);
    await addLine(`> Verificando recursos de hardware... [${info.cores} cores]`, 500);
    await addLine(`> Estimando memória RAM... [${info.ram}]`, 600);
    await addLine("", 700);
    await addLine("═══════════════════════════════════════════════════════", 800);
    await addLine("  ANÁLISE COMPLETA", 900);
    await addLine("═══════════════════════════════════════════════════════", 1000);
    await addLine("", 1100);

    // Análise e recomendações
    await addLine("📊 RELATÓRIO DE DIAGNÓSTICO:", 1200);
    await addLine("", 1300);

    // Recomendações baseadas no sistema
    if (info.os.includes("Windows")) {
      await addLine("✓ Sistema Windows detectado", 1400);
      await addLine("  → Recomendamos limpeza preventiva a cada 6 meses", 1500);
    }

    if (parseInt(info.ram) < 8 || info.ram === "Unknown") {
      await addLine("⚠ RAM pode estar limitada", 1600);
      await addLine("  → Considere upgrade para 8GB ou mais", 1700);
    } else {
      await addLine("✓ Memória RAM adequada", 1600);
    }

    if (info.cores < 4) {
      await addLine("⚠ Processador com poucos núcleos", 1800);
      await addLine("  → Pode apresentar lentidão em multitarefa", 1900);
    } else {
      await addLine("✓ Processador com boa capacidade", 1800);
    }

    if (info.connection === "slow-2g" || info.connection === "2g") {
      await addLine("⚠ Conexão lenta detectada", 2000);
      await addLine("  → Verifique seu roteador ou plano de internet", 2100);
    } else {
      await addLine("✓ Conexão de internet adequada", 2000);
    }

    await addLine("", 2200);
    await addLine("═══════════════════════════════════════════════════════", 2300);
    await addLine("💡 RECOMENDAÇÕES GERAIS:", 2400);
    await addLine("", 2500);
    await addLine("1. Mantenha seu sistema sempre atualizado", 2600);
    await addLine("2. Faça backup regular dos seus dados", 2700);
    await addLine("3. Limpeza física a cada 6-12 meses", 2800);
    await addLine("4. Use antivírus atualizado", 2900);
    await addLine("5. Considere upgrade para SSD se ainda usa HD", 3000);
    await addLine("", 3100);
    await addLine("═══════════════════════════════════════════════════════", 3200);
    await addLine("", 3300);
    await addLine("📞 Precisa de ajuda profissional?", 3400);
    await addLine("   WhatsApp: (11) 99999-9999", 3500);
    await addLine("   Suporte remoto 24/7 disponível!", 3600);
    await addLine("", 3700);
    await addLine("> Scan finalizado. Pressione X para fechar.", 3800);

    setIsScanning(false);
  };

  // Não renderiza nada se não for desktop
  if (!isDesktop || !isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-4xl bg-black border-green-500 shadow-2xl shadow-green-500/50">
        <div className="bg-gradient-to-r from-green-900 to-emerald-900 p-3 flex items-center justify-between border-b border-green-500">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-green-400 animate-pulse" />
            <span className="text-green-400 font-mono text-sm">HELPSYSTEM_DIAGNOSTIC_TERMINAL</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="text-green-400 hover:bg-green-500/20 hover:text-green-300"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <CardContent className="p-0">
          <div
            ref={terminalRef}
            className="h-[600px] overflow-y-auto bg-black p-6 font-mono text-sm scrollbar-thin scrollbar-thumb-green-500"
          >
            {/* Matrix rain effect background */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,transparent_50%,rgba(0,255,0,0.1)_50%,rgba(0,255,0,0.1)_100%)] bg-[length:100%_4px] animate-scan" />
            </div>

            {lines.map((line, idx) => (
              <div
                key={idx}
                className="text-green-400 mb-1 animate-fade-in"
                style={{ 
                  animationDelay: `${idx * 0.05}s`,
                  textShadow: '0 0 5px rgba(0,255,0,0.5)'
                }}
              >
                {line}
              </div>
            ))}

            {isScanning && (
              <div className="mt-4">
                <div className="flex items-center gap-2 text-green-400 mb-2">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span>Scanning... {scanProgress}%</span>
                </div>
                <div className="h-2 bg-green-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cursor piscante */}
            <div className="inline-block w-2 h-4 bg-green-400 animate-pulse ml-1" />
          </div>

          {/* Info cards na parte inferior */}
          {systemInfo && !isScanning && (
            <div className="grid grid-cols-4 gap-2 p-4 bg-green-950/20 border-t border-green-500/30">
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Monitor className="w-4 h-4" />
                <div>
                  <div className="font-semibold">{systemInfo.os}</div>
                  <div className="text-green-600">{systemInfo.browser}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Cpu className="w-4 h-4" />
                <div>
                  <div className="font-semibold">{systemInfo.cores} Cores</div>
                  <div className="text-green-600">{systemInfo.ram} RAM</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <HardDrive className="w-4 h-4" />
                <div>
                  <div className="font-semibold">{systemInfo.resolution}</div>
                  <div className="text-green-600">Resolução</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <Wifi className="w-4 h-4" />
                <div>
                  <div className="font-semibold">{systemInfo.connection.toUpperCase()}</div>
                  <div className="text-green-600">Conexão</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

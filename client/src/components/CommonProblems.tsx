import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Power, 
  AlertTriangle, 
  Gauge, 
  Wifi, 
  Flame, 
  Shield, 
  Printer, 
  Trash2, 
  Lock, 
  Volume2,
  Search,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface Problem {
  id: number;
  title: string;
  icon: any;
  difficulty: "Fácil" | "Médio" | "Difícil";
  causes: string[];
  steps: string[];
  whenToCall: string;
  color: string;
}

const problems: Problem[] = [
  {
    id: 1,
    title: "PC não liga",
    icon: Power,
    difficulty: "Médio",
    color: "from-red-600 to-red-800",
    causes: [
      "Cabo de energia desconectado ou com defeito",
      "Fonte de alimentação queimada",
      "Problema na placa-mãe",
      "Botão power com defeito"
    ],
    steps: [
      "Verifique se o cabo de energia está bem conectado na tomada e no PC",
      "Teste em outra tomada que você sabe que funciona",
      "Verifique se o botão de liga/desliga da fonte (atrás do PC) está ligado",
      "Ouça se o cooler faz barulho ao apertar o botão (se sim, pode ser problema no monitor)",
      "Desconecte todos os periféricos e tente ligar apenas com teclado",
      "Se nada funcionar, pode ser fonte ou placa-mãe queimada"
    ],
    whenToCall: "Se após verificar cabos e tomadas o PC continuar sem ligar, chame um técnico. Pode ser fonte ou placa-mãe queimada."
  },
  {
    id: 2,
    title: "Tela Azul (BSOD)",
    icon: AlertTriangle,
    difficulty: "Médio",
    color: "from-blue-600 to-blue-800",
    causes: [
      "Driver incompatível ou desatualizado",
      "Problema de hardware (RAM, HD)",
      "Superaquecimento",
      "Vírus ou malware",
      "Atualização do Windows com problema"
    ],
    steps: [
      "Anote o código de erro que aparece na tela azul (ex: DRIVER_IRQL_NOT_LESS_OR_EQUAL)",
      "Reinicie o PC em Modo de Segurança (pressione F8 ao ligar)",
      "Desinstale programas ou drivers instalados recentemente",
      "Execute o Verificador de Memória do Windows (digite 'mdsched' no Executar)",
      "Atualize todos os drivers, especialmente placa de vídeo",
      "Verifique a temperatura do PC (pode estar superaquecendo)",
      "Execute uma verificação de vírus completa"
    ],
    whenToCall: "Se a tela azul aparecer frequentemente (mais de 1x por dia) ou se você não conseguir entrar nem em Modo de Segurança."
  },
  {
    id: 3,
    title: "PC Muito Lento",
    icon: Gauge,
    difficulty: "Fácil",
    color: "from-yellow-600 to-yellow-800",
    causes: [
      "HD tradicional (não SSD)",
      "Pouca memória RAM",
      "Muitos programas iniciando com o Windows",
      "Vírus ou malware",
      "HD cheio (mais de 90%)",
      "Superaquecimento"
    ],
    steps: [
      "Abra o Gerenciador de Tarefas (Ctrl + Shift + Esc)",
      "Veja qual recurso está em 100% (CPU, RAM ou Disco)",
      "Vá em 'Inicializar' e desative programas desnecessários",
      "Limpe arquivos temporários (digite '%temp%' no Executar e delete tudo)",
      "Desinstale programas que não usa mais",
      "Execute o Limpeza de Disco do Windows",
      "Verifique se tem espaço livre no HD (mínimo 15%)",
      "Faça uma verificação de vírus"
    ],
    whenToCall: "Se após limpeza o PC continuar lento, pode precisar de upgrade (SSD ou RAM) ou formatação. Consulte um técnico."
  },
  {
    id: 4,
    title: "Internet Caindo",
    icon: Wifi,
    difficulty: "Fácil",
    color: "from-cyan-600 to-cyan-800",
    causes: [
      "Roteador com problema",
      "Interferência WiFi",
      "Cabo de rede danificado",
      "Problema no provedor",
      "Placa de rede com defeito"
    ],
    steps: [
      "Reinicie o modem/roteador (desligue por 30 segundos)",
      "Teste com cabo de rede direto (se melhorar, é problema no WiFi)",
      "Aproxime-se do roteador para testar",
      "Verifique se outros dispositivos também estão com problema",
      "Teste a velocidade em fast.com ou speedtest.net",
      "Troque o canal do WiFi no roteador (evite canais congestionados)",
      "Atualize o firmware do roteador",
      "Entre em contato com seu provedor se o problema persistir"
    ],
    whenToCall: "Se apenas seu PC tem problema e cabo de rede não resolve, pode ser placa de rede. Se todos os dispositivos têm problema, ligue para o provedor."
  },
  {
    id: 5,
    title: "Notebook Esquentando",
    icon: Flame,
    difficulty: "Médio",
    color: "from-orange-600 to-orange-800",
    causes: [
      "Poeira acumulada nos coolers",
      "Pasta térmica ressecada",
      "Uso em superfície macia (cama, sofá)",
      "Cooler com defeito",
      "Muitos programas rodando"
    ],
    steps: [
      "URGENTE: Desligue imediatamente se estiver muito quente ao tocar",
      "Use sempre em superfície plana e dura",
      "Nunca use na cama ou sofá (bloqueia ventilação)",
      "Limpe as entradas de ar com um pincel macio",
      "Use uma base com cooler (ajuda muito)",
      "Feche programas pesados desnecessários",
      "Verifique temperatura com HWMonitor (download gratuito)",
      "Se temperatura passar de 80°C em uso normal, precisa de limpeza profissional"
    ],
    whenToCall: "Se o notebook desliga sozinho, está muito quente ao tocar ou faz barulho estranho, precisa de limpeza URGENTE com troca de pasta térmica."
  },
  {
    id: 6,
    title: "Vírus / Malware",
    icon: Shield,
    difficulty: "Médio",
    color: "from-purple-600 to-purple-800",
    causes: [
      "Download de programas piratas",
      "Clicar em links suspeitos",
      "Pen drive infectado",
      "Antivírus desatualizado ou inexistente",
      "Sites maliciosos"
    ],
    steps: [
      "NÃO pague se aparecer mensagem pedindo resgate!",
      "Desconecte da internet imediatamente",
      "Inicie em Modo de Segurança com Rede",
      "Baixe e execute o Malwarebytes (versão gratuita)",
      "Execute também o Windows Defender em scan completo",
      "Desinstale programas suspeitos instalados recentemente",
      "Limpe extensões do navegador",
      "Troque todas as senhas importantes DEPOIS de limpar",
      "Ative o Windows Defender e mantenha atualizado"
    ],
    whenToCall: "Se o vírus bloqueou o Windows, criptografou arquivos ou você não consegue remover, chame um técnico URGENTE."
  },
  {
    id: 7,
    title: "Impressora Não Funciona",
    icon: Printer,
    difficulty: "Fácil",
    color: "from-green-600 to-green-800",
    causes: [
      "Cabo USB desconectado",
      "Driver desatualizado",
      "Fila de impressão travada",
      "Cartucho vazio ou entupido",
      "Papel atolado"
    ],
    steps: [
      "Verifique se a impressora está ligada e conectada",
      "Veja se tem papel na bandeja",
      "Verifique se o cartucho tem tinta",
      "Abra 'Dispositivos e Impressoras' e veja se há erros",
      "Cancele todos os trabalhos de impressão pendentes",
      "Reinicie a impressora e o PC",
      "Desinstale e reinstale o driver (baixe do site do fabricante)",
      "Execute a limpeza de cabeças (opção nas configurações da impressora)",
      "Imprima uma página de teste"
    ],
    whenToCall: "Se após reinstalar o driver a impressora não for reconhecida, pode ser problema de hardware (cabo USB ou porta)."
  },
  {
    id: 8,
    title: "Arquivo Deletado por Engano",
    icon: Trash2,
    difficulty: "Fácil",
    color: "from-pink-600 to-pink-800",
    causes: [
      "Deletou sem querer",
      "Esvaziou a Lixeira",
      "Shift + Delete (delete permanente)",
      "Formatação acidental"
    ],
    steps: [
      "PARE IMEDIATAMENTE de usar o PC (quanto mais usar, menor a chance de recuperar)",
      "Verifique a Lixeira primeiro",
      "Se esvaziou a Lixeira, use Ctrl+Z para desfazer",
      "Baixe o Recuva (programa gratuito de recuperação)",
      "Execute o Recuva e selecione o tipo de arquivo",
      "Escolha o local onde estava o arquivo",
      "Faça o scan e tente recuperar",
      "Salve o arquivo recuperado em OUTRO disco/pen drive"
    ],
    whenToCall: "Se o arquivo é muito importante e o Recuva não recuperou, procure um especialista em recuperação de dados URGENTE (não use mais o PC!)."
  },
  {
    id: 9,
    title: "Senha Esquecida do Windows",
    icon: Lock,
    difficulty: "Difícil",
    color: "from-indigo-600 to-indigo-800",
    causes: [
      "Esqueceu a senha",
      "Trocou a senha e não lembra",
      "Conta Microsoft com problema"
    ],
    steps: [
      "Se é conta Microsoft, acesse account.microsoft.com/password/reset de outro dispositivo",
      "Siga o processo de recuperação por email ou SMS",
      "Se é conta local, precisará de um técnico ou:",
      "Crie um pendrive de recuperação de senha (Ophcrack ou similar)",
      "Inicie o PC pelo pendrive",
      "Siga as instruções para resetar a senha",
      "ATENÇÃO: Alguns métodos podem causar perda de dados!"
    ],
    whenToCall: "Recomendamos SEMPRE chamar um técnico para resetar senha. Métodos caseiros podem causar perda de dados ou problemas no Windows."
  },
  {
    id: 10,
    title: "Barulho Estranho no PC",
    icon: Volume2,
    difficulty: "Médio",
    color: "from-slate-600 to-slate-800",
    causes: [
      "Cooler com poeira ou desbalanceado",
      "HD com defeito (cliques)",
      "Fonte de alimentação com problema",
      "Cabo encostando no cooler"
    ],
    steps: [
      "Identifique o tipo de barulho:",
      "• Zumbido constante = cooler com poeira",
      "• Cliques repetidos = HD com defeito (URGENTE!)",
      "• Chiado = fonte de alimentação",
      "• Raspando = cabo encostando no cooler",
      "Desligue o PC e abra o gabinete",
      "Limpe os coolers com pincel ou ar comprimido",
      "Verifique se há cabos soltos encostando nos coolers",
      "Se o barulho é de cliques no HD, FAÇA BACKUP IMEDIATO!"
    ],
    whenToCall: "Se o barulho é de cliques no HD, chame técnico URGENTE e faça backup! HD pode parar a qualquer momento. Outros barulhos, agende limpeza."
  }
];

export default function CommonProblems() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredProblems = problems.filter(problem =>
    problem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Médio": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Difícil": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Problemas Comuns e Soluções Rápidas
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Encontre soluções passo a passo para os problemas mais comuns. Clique em qualquer card para ver a solução completa!
          </p>
        </div>

        {/* Busca */}
        <div className="max-w-md mx-auto mb-12 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <Input
            type="text"
            placeholder="Buscar problema..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 bg-slate-900/50 border-blue-500/30 focus:border-blue-500 text-white placeholder:text-gray-500 h-12"
          />
        </div>

        {/* Grid de Problemas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProblems.map((problem, index) => {
            const Icon = problem.icon;
            const isExpanded = expandedId === problem.id;

            return (
              <Card
                key={problem.id}
                className={`bg-gradient-to-br ${problem.color} border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer group overflow-hidden ${
                  isExpanded ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setExpandedId(isExpanded ? null : problem.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-white text-xl">{problem.title}</CardTitle>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs border ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="text-white/50 group-hover:text-white transition-colors">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="space-y-6 animate-fade-in">
                    {/* Causas */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Causas Prováveis:
                      </h4>
                      <ul className="space-y-2">
                        {problem.causes.map((cause, idx) => (
                          <li key={idx} className="text-white/80 text-sm flex items-start gap-2">
                            <span className="text-white/50 mt-1">•</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Passos */}
                    <div>
                      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                        <ChevronDown className="w-4 h-4" />
                        Solução Passo a Passo:
                      </h4>
                      <ol className="space-y-3">
                        {problem.steps.map((step, idx) => (
                          <li key={idx} className="text-white/80 text-sm flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">
                              {idx + 1}
                            </span>
                            <span className="flex-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Quando chamar técnico */}
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                        📞 Quando Chamar um Técnico:
                      </h4>
                      <p className="text-white/90 text-sm">{problem.whenToCall}</p>
                      <div className="mt-4 flex gap-3">
                        <a
                          href="https://wa.me/5511999999999"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          WhatsApp
                        </a>
                        <a
                          href="tel:11999999999"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Ligar
                        </a>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Nenhum problema encontrado. Tente outro termo de busca.</p>
          </div>
        )}
      </div>
    </section>
  );
}

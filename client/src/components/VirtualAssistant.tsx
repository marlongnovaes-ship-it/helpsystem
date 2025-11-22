import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, X, Send, Minimize2, Sparkles, Lightbulb } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Sistema de IA avançado com respostas contextuais e inteligentes
const intelligentResponses: { [key: string]: string[] } = {
  // Saudações
  "oi|olá|ola|hey|opa": [
    "Olá! 👋 Sou o TechBot, seu especialista em tecnologia! Estou aqui para ajudar com qualquer dúvida sobre hardware, software, redes ou serviços de TI. Como posso te auxiliar hoje?",
    "Oi! 😊 Prazer em te conhecer! Sou especializado em resolver problemas técnicos e dar dicas profissionais. Me conta, o que você precisa?",
    "E aí! 🤖 TechBot online e pronto para ajudar! Seja problema no PC, dúvida técnica ou orçamento, estou aqui. O que você gostaria de saber?"
  ],
  
  // Ajuda geral
  "ajuda|help|o que|pode fazer": [
    "Posso te ajudar com MUITA coisa! 💡\n\n🔧 **Serviços:**\n• Formatação e instalação de SO\n• Limpeza e manutenção de hardware\n• Upgrade de componentes\n• Suporte remoto 24/7\n\n💻 **Dicas Técnicas:**\n• Otimização de performance\n• Segurança e antivírus\n• Backup de dados\n• Resolução de problemas\n\n📞 **Informações:**\n• Preços e orçamentos\n• Horários de atendimento\n• Contato direto\n\nDigite sua dúvida e vou te dar uma resposta detalhada!"
  ],
  
  // Formatação
  "formatação|formatar|formataçao|reinstalar|windows|linux": [
    "💻 **Formatação Profissional:**\n\nNosso serviço inclui:\n✅ Backup completo dos seus dados\n✅ Formatação e particionamento do HD/SSD\n✅ Instalação do Windows ou Linux (sua escolha)\n✅ Drivers atualizados\n✅ Programas essenciais (Office, navegador, etc)\n✅ Otimização do sistema\n✅ Restauração dos seus arquivos\n\n💡 **Dica Pro:** Recomendo formatar a cada 1-2 anos para manter o PC rápido! Se seu PC está lento, travando ou com vírus, a formatação resolve 90% dos problemas.\n\n⏱️ Tempo médio: 2-4 horas\n💰 Orçamento: Entre em contato!"
  ],
  
  // Limpeza
  "limpeza|limpar|poeira|superaquecimento|barulho|ventilador": [
    "🧹 **Limpeza Profunda de Hardware:**\n\nO que fazemos:\n✅ Desmontagem completa do PC/Notebook\n✅ Remoção de poeira com ar comprimido\n✅ Limpeza de coolers e ventoinhas\n✅ Troca de pasta térmica (reduz até 20°C!)\n✅ Limpeza de slots e conectores\n✅ Teste de funcionamento\n\n⚠️ **Sinais que você precisa:**\n• PC muito quente\n• Ventilador fazendo barulho\n• Desligamentos inesperados\n• Lentidão por superaquecimento\n\n💡 **Dica Pro:** Faça limpeza a cada 6-12 meses. Poeira é inimiga número 1 do hardware! Um PC limpo dura muito mais."
  ],
  
  // Lentidão
  "lento|travando|devagar|lentidão|demora|lag": [
    "🐌 **PC Lento? Vou te ajudar!**\n\nCausas mais comuns:\n1️⃣ **HD tradicional** → Upgrade para SSD resolve 80% dos casos!\n2️⃣ **Pouca RAM** → 8GB é mínimo hoje, 16GB ideal\n3️⃣ **Vírus/Malware** → Scan completo necessário\n4️⃣ **Sistema desatualizado** → Windows Update pendente\n5️⃣ **Muitos programas inicializando** → Limpeza de startup\n6️⃣ **Superaquecimento** → Limpeza + pasta térmica\n\n💡 **Dica Rápida:**\nAbra o Gerenciador de Tarefas (Ctrl+Shift+Esc) e veja:\n• CPU acima de 80%? Processo travado ou vírus\n• RAM acima de 90%? Precisa de mais memória\n• Disco 100%? HD com problema ou precisa de SSD\n\n🚀 **Solução Express:** SSD + limpeza + formatação = PC novo!"
  ],
  
  // Vírus
  "vírus|virus|malware|antivirus|antivírus|infectado|hackeado": [
    "🛡️ **Segurança e Remoção de Vírus:**\n\nSinais de infecção:\n⚠️ PC muito lento\n⚠️ Propagandas estranhas\n⚠️ Programas abrindo sozinhos\n⚠️ Arquivos desaparecendo\n⚠️ Antivírus desativado\n\n**Nosso serviço:**\n✅ Scan profundo com múltiplos antivírus\n✅ Remoção de malware, spyware, ransomware\n✅ Limpeza de registro e arquivos ocultos\n✅ Instalação de proteção profissional\n✅ Orientação de segurança\n\n💡 **Dicas de Prevenção:**\n1. Use Windows Defender (já vem no Windows)\n2. Nunca clique em links suspeitos\n3. Baixe programas só de sites oficiais\n4. Mantenha Windows atualizado\n5. Faça backup regular\n\n🆘 **Urgente?** Suporte remoto disponível 24/7!"
  ],
  
  // Upgrade
  "upgrade|melhorar|atualizar hardware|trocar|componente|ssd|ram|memória": [
    "⚡ **Upgrade de Hardware - Turbine seu PC!**\n\n**Upgrades mais efetivos:**\n\n1️⃣ **SSD (Prioridade #1)**\n• Deixa PC 5-10x mais rápido\n• Boot em 10 segundos\n• Programas abrem instantaneamente\n• Melhor investimento custo/benefício\n\n2️⃣ **Memória RAM**\n• 8GB → 16GB: +100% performance multitarefa\n• Essencial para Chrome, edição, games\n\n3️⃣ **Placa de Vídeo**\n• Para games e edição de vídeo\n• Avalie se vale a pena vs PC novo\n\n4️⃣ **Processador**\n• Só se placa-mãe suportar\n• Geralmente não compensa\n\n💡 **Dica de Ouro:**\nAntes de gastar, me mande o modelo do seu PC! Posso avaliar se vale a pena o upgrade ou se é melhor investir em um novo.\n\n📊 Orçamento personalizado sem compromisso!"
  ],
  
  // Preço
  "preço|preco|valor|quanto custa|orçamento|orcamento": [
    "💰 **Preços e Orçamentos:**\n\nNossos valores são justos e transparentes:\n\n🔧 **Formatação:** A partir de R$ 80\n🧹 **Limpeza + Pasta Térmica:** A partir de R$ 60\n⚡ **Upgrade (instalação):** A partir de R$ 50\n💻 **Suporte Remoto:** A partir de R$ 40\n🔍 **Diagnóstico:** GRÁTIS!\n\n**Combos:**\n📦 Formatação + Limpeza: R$ 120\n📦 Formatação + SSD: R$ 150 (SSD não incluso)\n\n💡 **Importante:**\n• Peças/componentes cobrados à parte\n• Orçamento detalhado antes de qualquer serviço\n• Sem surpresas na hora de pagar!\n\n📞 Entre em contato para orçamento personalizado:\n• WhatsApp: (11) 99999-9999\n• Email: contato@helpsystem.com.br"
  ],
  
  // Horário
  "horário|horario|quando|atende|funciona|aberto": [
    "🕐 **Horários de Atendimento:**\n\n**Suporte Remoto:**\n🌐 24 horas por dia, 7 dias por semana\n✅ Finais de semana e feriados\n⚡ Resposta em até 30 minutos\n\n**Atendimento Presencial:**\n📍 Segunda a Sexta: 9h às 18h\n📍 Sábado: 9h às 13h\n❌ Domingo: Fechado\n\n⚠️ **Importante:**\n• Atendimento presencial APENAS com agendamento\n• Agende pelo formulário ou WhatsApp\n• Não trabalhamos sem hora marcada\n\n💡 **Dica:** Para problemas urgentes, use o suporte remoto! Resolvemos 80% dos casos sem precisar levar o PC."
  ],
  
  // Contato
  "contato|telefone|whatsapp|email|falar|ligar": [
    "📞 **Entre em Contato:**\n\n**WhatsApp (Preferencial):**\n📱 (11) 99999-9999\n⚡ Resposta rápida!\n\n**Email:**\n📧 contato@helpsystem.com.br\n⏱️ Respondemos em até 24h\n\n**Formulário:**\n📝 Preencha o formulário aqui no site\n✅ Retornamos em breve\n\n**Redes Sociais:**\n📘 Facebook: /helpsystem\n📸 Instagram: @helpsystem\n\n💡 **Dica:** Pelo WhatsApp é mais rápido! Mande uma mensagem agora mesmo e já começamos a resolver seu problema."
  ],
  
  // Backup
  "backup|salvar|perder dados|recuperar arquivos": [
    "💾 **Backup de Dados - Nunca perca nada!**\n\n**Regra 3-2-1:**\n3️⃣ Três cópias dos dados\n2️⃣ Dois tipos de mídia diferentes\n1️⃣ Uma cópia fora de casa\n\n**Opções de Backup:**\n\n☁️ **Nuvem (Recomendado):**\n• Google Drive: 15GB grátis\n• OneDrive: 5GB grátis\n• Dropbox: 2GB grátis\n• Automático e seguro!\n\n💽 **HD Externo:**\n• 1TB por ~R$ 300\n• Backup manual\n• Rápido para grandes arquivos\n\n🔒 **Nosso Serviço:**\n✅ Configuração de backup automático\n✅ Recuperação de dados perdidos\n✅ Migração para novo PC\n\n⚠️ **IMPORTANTE:** HD pode quebrar a qualquer momento! Não espere perder tudo para fazer backup."
  ],
  
  // Rede/Internet
  "internet|wifi|rede|lenta|cai|conexão|conexao|roteador": [
    "📡 **Problemas de Internet/WiFi:**\n\n**Diagnóstico Rápido:**\n\n1️⃣ **Teste a velocidade:**\n• Acesse: fast.com\n• Compare com seu plano\n\n2️⃣ **WiFi vs Cabo:**\n• Teste com cabo de rede\n• Se melhorar = problema no WiFi\n• Se continuar = problema no provedor\n\n**Soluções WiFi Lento:**\n✅ Reinicie o roteador (desliga 30seg)\n✅ Aproxime do roteador\n✅ Troque canal do WiFi (app do roteador)\n✅ Atualize firmware do roteador\n✅ Use cabo sempre que possível\n\n**Quando chamar técnico:**\n⚠️ Velocidade muito abaixo do contratado\n⚠️ Internet cai várias vezes ao dia\n⚠️ Roteador reiniciando sozinho\n\n💡 **Dica Pro:** WiFi 5GHz é mais rápido mas tem menos alcance. Use 2.4GHz para longas distâncias."
  ],
  
  // Notebook
  "notebook|laptop|portátil|bateria|teclado|tela": [
    "💻 **Suporte para Notebooks:**\n\n**Problemas Comuns:**\n\n🔋 **Bateria:**\n• Vida útil: 2-3 anos\n• Não segura carga? Precisa trocar\n• Use no cabo quando possível\n\n⌨️ **Teclado:**\n• Teclas não funcionam? Pode ser sujeira\n• Limpeza resolve 50% dos casos\n• Troca de teclado: ~R$ 150-300\n\n🖥️ **Tela:**\n• Manchas = problema no LCD\n• Rachaduras = troca necessária\n• Tela piscando = cabo flat solto\n\n🌡️ **Superaquecimento:**\n• Limpeza + pasta térmica URGENTE\n• Use em superfície plana e dura\n• Base com cooler ajuda muito\n\n💡 **Dica de Ouro:**\nNotebooks precisam de limpeza a cada 6 meses! Superaquecimento reduz vida útil em até 50%.\n\nFazemos manutenção completa!"
  ],
  
  // Impressora
  "impressora|imprimir|scanner|toner|cartucho": [
    "🖨️ **Suporte para Impressoras:**\n\n**Problemas Comuns:**\n\n📄 **Não Imprime:**\n1. Verifique se está ligada e conectada\n2. Veja se tem papel\n3. Reinicie impressora e PC\n4. Reinstale o driver\n\n🎨 **Impressão com Defeito:**\n• Linhas brancas = cabeça entupida\n• Cores erradas = cartucho vazio\n• Borrões = limpeza necessária\n\n💡 **Dicas de Economia:**\n• Use modo rascunho para testes\n• Imprima em preto quando possível\n• Compre toner compatível (mais barato)\n• Impressora a laser = mais econômica\n\n🔧 **Nossos Serviços:**\n✅ Instalação e configuração\n✅ Limpeza de cabeças\n✅ Configuração de rede\n✅ Resolução de erros\n\n⚠️ Cartuchos remanufaturados podem danificar a impressora!"
  ]
};

// Sistema de dicas contextuais
const proTips = [
  "💡 **Dica Pro:** Pressione Windows + Shift + S para capturar tela rapidamente!",
  "💡 **Dica Pro:** Ctrl + Shift + Esc abre o Gerenciador de Tarefas direto!",
  "💡 **Dica Pro:** Windows + V mostra histórico da área de transferência!",
  "💡 **Dica Pro:** Ctrl + Shift + T reabre a última aba fechada no navegador!",
  "💡 **Dica Pro:** Windows + L bloqueia o PC instantaneamente!",
  "💡 **Dica Pro:** Alt + Tab para alternar entre programas abertos!",
  "💡 **Dica Pro:** Windows + D minimiza tudo e mostra a área de trabalho!",
  "💡 **Dica Pro:** F2 renomeia arquivos rapidamente!",
  "💡 **Dica Pro:** Ctrl + Shift + N cria pasta nova instantaneamente!",
  "💡 **Dica Pro:** Windows + E abre o Explorador de Arquivos na hora!"
];

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Olá! 👋 Sou o **TechBot**, seu assistente técnico inteligente!\n\nPosso te ajudar com:\n• Diagnóstico de problemas\n• Dicas técnicas avançadas\n• Informações sobre serviços\n• Orçamentos e contato\n\nDigite sua dúvida e vou te dar uma resposta detalhada! 🚀", 
      isBot: true, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sistema de IA para encontrar melhor resposta
  const getIntelligentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove acentos
    
    // Busca por padrões nas chaves
    for (const [pattern, responses] of Object.entries(intelligentResponses)) {
      const patterns = pattern.split("|");
      if (patterns.some(p => lowerMessage.includes(p))) {
        // Retorna resposta aleatória do array
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Resposta padrão inteligente
    const defaultResponses = [
      `Hmm, interessante! 🤔 Não tenho uma resposta específica para "${userMessage}", mas posso te ajudar com:\n\n• **Problemas técnicos** (lentidão, vírus, travamentos)\n• **Serviços** (formatação, limpeza, upgrade)\n• **Dicas** (otimização, segurança, backup)\n• **Orçamentos** e informações de contato\n\nTente reformular sua pergunta ou digite "ajuda" para ver tudo que posso fazer!`,
      `Boa pergunta sobre "${userMessage}"! 💭 Embora eu não tenha uma resposta pronta, posso te ajudar de outras formas:\n\n🔧 Descreva seu problema técnico\n💰 Peça um orçamento\n💡 Peça dicas de otimização\n📞 Informações de contato\n\nOu digite "ajuda" para ver todas minhas funcionalidades!`,
      `Entendi que você perguntou sobre "${userMessage}". 🎯 Vou te dar algumas opções:\n\n1️⃣ Se é um problema técnico, descreva os sintomas\n2️⃣ Se quer saber preços, digite "preço"\n3️⃣ Se quer dicas, digite "dicas"\n4️⃣ Para falar com humano: (11) 99999-9999\n\nComo posso te ajudar melhor?`
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simula tempo de "pensamento" da IA
    setTimeout(() => {
      const botResponse: Message = {
        text: getIntelligentResponse(input),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Adiciona dica aleatória às vezes
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const tipMessage: Message = {
            text: proTips[Math.floor(Math.random() * proTips.length)],
            isBot: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, tipMessage]);
          setIsTyping(false);
        }, 1500);
      } else {
        setIsTyping(false);
      }
    }, 1000 + Math.random() * 1500);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/50 rounded-full p-6 animate-bounce group relative"
        >
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            AI
          </div>
          <Bot className="w-6 h-6 mr-2 animate-pulse" />
          <span className="hidden md:inline">TechBot Inteligente</span>
          <span className="md:hidden">TechBot</span>
          <Sparkles className="w-4 h-4 ml-2 text-yellow-300 animate-pulse" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-8 left-8 z-50">
        <Button
          size="lg"
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/50 rounded-full p-4 relative"
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
          <Bot className="w-6 h-6 animate-pulse" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-8 left-8 z-50 w-[450px] max-w-[calc(100vw-4rem)]">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-green-500/50 shadow-2xl shadow-green-500/20">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bot className="w-8 h-8 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
              <Sparkles className="absolute -bottom-1 -right-1 w-4 h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-2">
                TechBot AI
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Inteligente</span>
              </h3>
              <p className="text-xs text-green-100 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                Online • Respostas em segundos
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/10"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="h-96 overflow-y-auto mb-4 space-y-3 scrollbar-thin scrollbar-thumb-green-500 pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.isBot
                      ? 'bg-green-500/20 border border-green-500/30 text-white'
                      : 'bg-blue-500/20 border border-blue-500/30 text-white'
                  }`}
                >
                  {msg.isBot && (
                    <div className="flex items-center gap-2 mb-1">
                      <Bot className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-green-400 font-semibold">TechBot AI</span>
                    </div>
                  )}
                  <div className="text-sm whitespace-pre-line">{msg.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-green-500/20 border border-green-500/30 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-green-400" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-xs text-green-400">Pensando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Digite sua dúvida técnica..."
                className="bg-slate-950/50 border-green-500/30 focus:border-green-500 text-white placeholder:text-gray-500"
              />
              <Button
                onClick={sendMessage}
                disabled={isTyping}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {["ajuda", "formatação", "lento", "preço", "contato"].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  className="text-xs px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 hover:bg-green-500/20 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lightbulb className="w-3 h-3 text-yellow-400" />
              <span>Respostas inteligentes • Dicas profissionais • 24/7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

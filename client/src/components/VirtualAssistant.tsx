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

// Sistema de IA super avançado com personalidade e contexto
const intelligentResponses: { [key: string]: string[] } = {
  // Agradecimentos
  "obrigado|obrigada|valeu|vlw|thanks|brigado": [
    "Por nada! 😊 Fico feliz em ajudar! Se precisar de mais alguma coisa, é só chamar. Estou sempre por aqui! 🤖💙",
    "Disponha! 🙌 É um prazer te ajudar! Qualquer dúvida técnica, pode contar comigo. Até mais! ✨",
    "Imagina! 😄 Adorei poder ajudar! Se tiver mais alguma dúvida, não hesite em me chamar. Estou aqui 24/7! 🚀",
    "De nada! 💚 Foi ótimo conversar com você! Lembre-se: problemas técnicos sempre têm solução! Até logo! 👋"
  ],

  // Despedidas
  "tchau|adeus|ate logo|até logo|flw|falou|bye|até mais": [
    "Até logo! 👋 Foi um prazer te ajudar! Volte sempre que precisar! 😊",
    "Tchau! 🤖 Espero ter ajudado! Qualquer coisa, estou aqui 24/7! Até mais! ✨",
    "Falou! 🙌 Cuide bem do seu PC! Se precisar, já sabe onde me encontrar! 💙",
    "Até a próxima! 👋 Lembre-se: backup sempre! Volte quando quiser! 🚀"
  ],

  // Saudações
  "oi|olá|ola|hey|opa|bom dia|boa tarde|boa noite": [
    "Olá! 👋 Sou o TechBot, seu especialista em tecnologia! Estou aqui para resolver problemas, dar dicas e te ajudar com qualquer dúvida técnica. Como posso te auxiliar hoje? 😊",
    "Oi! 🤖 Prazer em te conhecer! Sou especializado em hardware, software, redes e muito mais! Me conta, o que está precisando? 💻",
    "E aí! 🙌 TechBot online e pronto para ajudar! Seja problema no PC, dúvida técnica ou informações sobre serviços, estou aqui. O que você gostaria de saber? ✨",
    "Olá! 😊 Que bom te ver por aqui! Sou seu assistente técnico pessoal. Pode me contar seu problema ou dúvida que vou te ajudar da melhor forma possível! 🚀"
  ],
  
  // Como está / Tudo bem
  "tudo bem|como vai|como está|como esta|beleza|suave": [
    "Tudo ótimo por aqui! 😊 Meus circuitos estão funcionando perfeitamente! E você, como está? Algum problema técnico te incomodando? 🤖",
    "Estou 100% operacional! ⚡ Pronto para resolver qualquer desafio técnico! E aí, como posso te ajudar hoje? 💻",
    "Tudo certo! 🙌 Sistemas online, conhecimento atualizado e muita disposição para ajudar! Me conta, o que você precisa? 😊"
  ],

  // Quem é você / Nome
  "quem é você|quem e voce|seu nome|como se chama|o que é você|o que e voce": [
    "Eu sou o TechBot! 🤖 Seu assistente técnico inteligente especializado em resolver problemas de tecnologia. Fui criado para te ajudar com:\n\n💻 Problemas de hardware e software\n🔧 Dicas de manutenção\n⚡ Otimização de performance\n🛡️ Segurança digital\n📞 Informações sobre nossos serviços\n\nSou como um técnico de TI que está sempre disponível para você! 😊",
    "Me chamo TechBot! 🤖✨ Sou um assistente virtual especializado em tecnologia. Minha missão é te ajudar com qualquer dúvida técnica, desde PC lento até configuração de rede. Pensa em mim como aquele amigo nerd que sempre sabe resolver problemas de computador! 😄"
  ],

  // Piadas / Humor
  "piada|engraçado|humor|me faz rir|conta uma piada": [
    "Haha! 😄 Aqui vai uma:\n\n\"Por que o computador foi ao médico?\nPorque estava com vírus!\" 🦠💻\n\nMas falando sério, se seu PC realmente está com vírus, posso te ajudar! 😊",
    "Olha essa! 😂\n\n\"Qual é o navegador favorito dos hackers?\nFirefox... porque eles adoram deixar tudo pegando fogo!\" 🔥\n\nBrincadeiras à parte, precisa de ajuda com algo? 🤖",
    "Vai uma piada nerd! 🤓\n\n\"Por que o programador confundiu Halloween com Natal?\nPorque Oct 31 = Dec 25!\" 🎃🎄\n\n(Se não entendeu, é porque 31 em octal = 25 em decimal! 😄)"
  ],

  // Elogios ao bot
  "inteligente|esperto|legal|top|massa|show|incrível|incrivel|parabéns|parabens": [
    "Ahh, obrigado! 😊 Fico feliz que esteja gostando! Meu objetivo é sempre te ajudar da melhor forma possível! Como posso te auxiliar agora? 💙",
    "Que legal! 🤖✨ Agradeço o elogio! Estou sempre aprendendo para te ajudar melhor! Me conta, o que você precisa? 😊",
    "Valeu! 🙌 É muito bom saber que estou sendo útil! Pode contar comigo sempre! Alguma dúvida técnica? 🚀"
  ],
  
  // Ajuda geral
  "ajuda|help|o que pode fazer|o que voce faz|me ajuda": [
    "Claro! Posso te ajudar com MUITA coisa! 💡\n\n🔧 **Problemas Técnicos:**\n• PC lento, travando ou com vírus\n• Erros do Windows\n• Problemas de hardware\n• Internet/WiFi com problemas\n\n💻 **Serviços:**\n• Formatação e instalação\n• Limpeza e manutenção\n• Upgrade de componentes\n• Suporte remoto 24/7\n\n💡 **Dicas e Orientações:**\n• Como otimizar seu PC\n• Segurança e backup\n• Escolha de componentes\n• Atalhos e truques\n\n📞 **Informações:**\n• Horários de atendimento\n• Como entrar em contato\n• Orçamentos personalizados\n\nÉ só me contar seu problema ou dúvida! 😊"
  ],
  
  // Formatação
  "formatação|formatar|formataçao|reinstalar|windows|linux|instalar sistema": [
    "💻 **Formatação Profissional:**\n\nNosso serviço completo inclui:\n✅ Backup seguro de todos os seus dados\n✅ Formatação e particionamento correto\n✅ Instalação do Windows ou Linux\n✅ Todos os drivers atualizados\n✅ Programas essenciais configurados\n✅ Otimização do sistema\n✅ Restauração dos seus arquivos\n✅ Teste completo de funcionamento\n\n💡 **Quando formatar?**\n• PC muito lento mesmo após limpeza\n• Vírus que não saem\n• Erros constantes do Windows\n• Quer começar do zero\n• A cada 1-2 anos (preventivo)\n\n⏱️ **Tempo:** 2-4 horas em média\n📞 **Orçamento:** Entre em contato com nossos atendentes pelo WhatsApp (11) 99999-9999 para valores personalizados!"
  ],
  
  // Limpeza
  "limpeza|limpar|poeira|superaquecimento|barulho|ventilador|cooler|quente": [
    "🧹 **Limpeza Profunda de Hardware:**\n\nO que fazemos:\n✅ Desmontagem completa e cuidadosa\n✅ Remoção total de poeira\n✅ Limpeza de coolers e ventoinhas\n✅ Troca de pasta térmica premium\n✅ Limpeza de slots e conectores\n✅ Teste de temperatura\n\n🌡️ **Sinais que você PRECISA de limpeza:**\n⚠️ PC/Notebook muito quente ao tocar\n⚠️ Ventilador fazendo barulho estranho\n⚠️ Desligamentos inesperados\n⚠️ Lentidão por superaquecimento\n⚠️ Tela azul (BSOD) frequente\n\n💡 **Resultado:**\n• Redução de até 20°C na temperatura!\n• PC mais silencioso\n• Maior vida útil dos componentes\n• Performance restaurada\n\n📅 **Recomendação:** Limpeza a cada 6-12 meses\n📞 **Agendar:** WhatsApp (11) 99999-9999"
  ],
  
  // Lentidão
  "lento|travando|devagar|lentidão|demora|lag|engasga|trava": [
    "🐌 **PC Lento? Vamos resolver!**\n\n**Diagnóstico rápido:**\n\n1️⃣ **HD Tradicional** (Causa #1)\n→ Upgrade para SSD resolve 80% dos casos!\n→ Diferença de 5-10x na velocidade\n\n2️⃣ **Pouca RAM**\n→ 4GB: Insuficiente hoje\n→ 8GB: Mínimo aceitável\n→ 16GB: Ideal para multitarefa\n\n3️⃣ **Vírus/Malware**\n→ Scan completo necessário\n→ Pode estar minerando bitcoin sem você saber!\n\n4️⃣ **Sistema Desatualizado**\n→ Windows Update pendente\n→ Drivers antigos\n\n5️⃣ **Superaquecimento**\n→ Limpeza + pasta térmica resolve\n\n6️⃣ **Muitos Programas no Startup**\n→ Limpeza de inicialização\n\n💡 **Teste Rápido:**\nAbra o Gerenciador de Tarefas (Ctrl+Shift+Esc):\n• CPU 100%? Processo travado ou vírus\n• RAM 90%+? Precisa de mais memória\n• Disco 100%? HD com problema\n\n🚀 **Solução Express:** SSD + Limpeza + Formatação = PC novo!\n\n📞 Quer um diagnóstico profissional? Chama no WhatsApp!"
  ],
  
  // Vírus
  "vírus|virus|malware|antivirus|antivírus|infectado|hackeado|hacker|ransomware": [
    "🛡️ **Segurança e Remoção de Vírus:**\n\n**Sinais de infecção:**\n⚠️ PC extremamente lento\n⚠️ Propagandas aparecendo do nada\n⚠️ Programas abrindo sozinhos\n⚠️ Arquivos desaparecendo ou criptografados\n⚠️ Antivírus desativado misteriosamente\n⚠️ Webcam ligando sozinha\n⚠️ Senhas não funcionando\n\n**Nosso serviço de limpeza:**\n✅ Scan profundo com múltiplas ferramentas\n✅ Remoção de vírus, malware, spyware, ransomware\n✅ Limpeza de registro e arquivos ocultos\n✅ Instalação de proteção profissional\n✅ Orientação completa de segurança\n\n💡 **Prevenção (IMPORTANTE!):**\n1. Use Windows Defender (já vem no Windows)\n2. NUNCA clique em links suspeitos\n3. Baixe programas só de sites oficiais\n4. Mantenha Windows sempre atualizado\n5. Faça backup regular (regra 3-2-1)\n6. Use senhas fortes e diferentes\n\n🆘 **Urgente?** Suporte remoto disponível 24/7!\n📞 WhatsApp: (11) 99999-9999"
  ],
  
  // Upgrade
  "upgrade|melhorar|atualizar hardware|trocar|componente|ssd|ram|memória|memoria|placa de video|processador": [
    "⚡ **Upgrade de Hardware - Turbine seu PC!**\n\n**Ordem de prioridade (melhor custo x benefício):**\n\n🥇 **1. SSD (PRIORIDADE MÁXIMA!)**\n• Melhoria mais perceptível\n• PC 5-10x mais rápido\n• Boot em 10 segundos\n• Programas abrem instantaneamente\n• Investimento: R$ 200-400 (240-500GB)\n• **Vale MUITO a pena!**\n\n🥈 **2. Memória RAM**\n• 4GB → 8GB: Essencial\n• 8GB → 16GB: Recomendado\n• Melhora multitarefa e navegação\n• Investimento: R$ 150-300\n\n🥉 **3. Placa de Vídeo**\n• Só se for para games ou edição\n• Avalie se vale vs PC novo\n• Investimento: R$ 800-3000+\n\n4️⃣ **Processador**\n• Só se placa-mãe suportar\n• Geralmente não compensa\n• Melhor investir em PC novo\n\n💡 **Dica de Ouro:**\nAntes de gastar, me mande o modelo do seu PC! Posso avaliar se vale a pena o upgrade ou se é melhor investir em um novo.\n\n📞 Orçamento personalizado: WhatsApp (11) 99999-9999"
  ],
  
  // Preço (SEM VALORES!)
  "preço|preco|valor|quanto custa|orçamento|orcamento|quanto fica|quanto sai": [
    "💰 **Sobre Preços e Orçamentos:**\n\nNossos valores variam de acordo com:\n• Tipo de serviço necessário\n• Complexidade do problema\n• Peças/componentes (se necessário)\n• Urgência do atendimento\n\n📊 **Para um orçamento personalizado e preciso:**\n\n📱 **WhatsApp (RECOMENDADO):**\n(11) 99999-9999\n⚡ Resposta rápida!\n\n📧 **Email:**\ncontato@helpsystem.com.br\n\n📝 **Formulário:**\nPreencha aqui no site que retornamos!\n\n💡 **Importante:**\n• Orçamento sempre SEM COMPROMISSO\n• Valores justos e transparentes\n• Sem surpresas na hora de pagar\n• Diagnóstico inicial GRÁTIS!\n\nNossos atendentes vão te passar o melhor preço! 😊"
  ],
  
  // Horário
  "horário|horario|quando|atende|funciona|aberto|fecha|abre": [
    "🕐 **Horários de Atendimento:**\n\n**🌐 Suporte Remoto:**\n• 24 horas por dia\n• 7 dias por semana\n• Finais de semana e feriados\n• Resposta em até 30 minutos\n• Resolvemos 80% dos problemas remotamente!\n\n**📍 Atendimento Presencial:**\n• Segunda a Sexta: 9h às 18h\n• Sábado: 9h às 13h\n• Domingo: Fechado\n• **APENAS com agendamento prévio!**\n\n⚠️ **Importante:**\n• Não trabalhamos sem hora marcada\n• Agende pelo WhatsApp ou formulário\n• Evite filas e espera!\n\n💡 **Dica:** Para urgências, use o suporte remoto! É mais rápido e resolve a maioria dos casos sem precisar sair de casa! 🏠\n\n📞 Agendar: WhatsApp (11) 99999-9999"
  ],
  
  // Contato
  "contato|telefone|whatsapp|email|falar|ligar|mensagem": [
    "📞 **Entre em Contato Conosco:**\n\n**📱 WhatsApp (Preferencial):**\n(11) 99999-9999\n⚡ Resposta mais rápida!\n💬 Envie fotos/vídeos do problema\n🕐 Disponível 24/7\n\n**📧 Email:**\ncontato@helpsystem.com.br\n⏱️ Respondemos em até 24h\n\n**📝 Formulário:**\nPreencha aqui no site\n✅ Retornamos em breve\n\n**📱 Redes Sociais:**\n📘 Facebook: /helpsystem\n📸 Instagram: @helpsystem\n\n💡 **Dica:** Pelo WhatsApp é MUITO mais rápido! Mande uma mensagem agora e já começamos a resolver seu problema! 🚀\n\nEstamos esperando seu contato! 😊"
  ],
  
  // Backup
  "backup|salvar|perder dados|recuperar arquivos|recuperação|recuperacao": [
    "💾 **Backup - Nunca Perca Seus Dados!**\n\n**⚠️ ATENÇÃO:** HD pode quebrar a QUALQUER momento!\n\n**Regra de Ouro 3-2-1:**\n3️⃣ Três cópias dos seus dados\n2️⃣ Dois tipos de mídia diferentes\n1️⃣ Uma cópia fora de casa/nuvem\n\n**Opções de Backup:**\n\n☁️ **Nuvem (RECOMENDADO):**\n• Google Drive: 15GB grátis\n• OneDrive: 5GB grátis\n• Dropbox: 2GB grátis\n• **Vantagens:** Automático, seguro, acesso de qualquer lugar\n\n💽 **HD Externo:**\n• 1TB por ~R$ 300\n• Backup manual\n• Rápido para grandes arquivos\n• **Atenção:** Também pode quebrar!\n\n🔒 **Nossos Serviços:**\n✅ Configuração de backup automático\n✅ Recuperação de dados perdidos\n✅ Migração para novo PC\n✅ Consultoria de backup corporativo\n\n💡 **História Real:**\n\"Cliente perdeu 10 anos de fotos de família porque o HD quebrou e não tinha backup. Não seja essa pessoa!\" 😢\n\n📞 Quer ajuda para configurar? Chama no WhatsApp!"
  ],
  
  // Internet/Rede
  "internet|wifi|rede|lenta|cai|conexão|conexao|roteador|modem|sinal": [
    "📡 **Problemas de Internet/WiFi:**\n\n**🔍 Diagnóstico Rápido em 3 Passos:**\n\n1️⃣ **Teste a velocidade:**\n• Acesse: fast.com ou speedtest.net\n• Compare com seu plano contratado\n• Se muito abaixo: problema no provedor\n\n2️⃣ **WiFi vs Cabo:**\n• Conecte um cabo de rede direto\n• Melhorou? = Problema no WiFi\n• Continua ruim? = Problema no provedor/modem\n\n3️⃣ **Reinicie tudo:**\n• Desligue modem/roteador por 30 segundos\n• Ligue novamente\n• Resolve 50% dos casos!\n\n**🛠️ Soluções para WiFi Lento:**\n✅ Aproxime do roteador (paredes bloqueiam sinal)\n✅ Troque canal do WiFi (menos interferência)\n✅ Atualize firmware do roteador\n✅ Posicione roteador no centro da casa\n✅ Use cabo sempre que possível (mais estável)\n\n**📞 Quando chamar técnico:**\n⚠️ Velocidade 50% abaixo do contratado\n⚠️ Internet cai várias vezes ao dia\n⚠️ Roteador reiniciando sozinho\n⚠️ Luzes do modem piscando errado\n\n💡 **Dica Pro:** WiFi 5GHz é mais rápido mas tem menos alcance. Use 2.4GHz para longas distâncias.\n\nPrecisa de ajuda? Suporte remoto disponível!"
  ],
  
  // Notebook
  "notebook|laptop|portátil|portatil|bateria|teclado|tela|touchpad": [
    "💻 **Suporte Especializado para Notebooks:**\n\n**Problemas Comuns e Soluções:**\n\n🔋 **Bateria:**\n• Vida útil normal: 2-3 anos\n• Não segura carga? Precisa trocar\n• Dica: Use no cabo quando possível\n• Não deixe sempre na tomada (vicia bateria)\n\n⌨️ **Teclado:**\n• Teclas não funcionam? Pode ser sujeira ou líquido\n• Limpeza resolve 50% dos casos\n• Derramou líquido? DESLIGUE IMEDIATAMENTE!\n• Troca de teclado: consulte atendente\n\n🖥️ **Tela:**\n• Manchas = problema no LCD\n• Rachaduras = troca necessária (caro)\n• Tela piscando = cabo flat solto (fácil de resolver)\n• Linhas na tela = problema grave\n\n🌡️ **Superaquecimento (COMUM!):**\n• Limpeza + pasta térmica URGENTE\n• Use em superfície plana e dura\n• Base com cooler ajuda muito\n• Nunca use na cama/sofá (bloqueia ventilação)\n\n💡 **Dica de Ouro:**\nNotebooks precisam de limpeza a cada 6 meses! Superaquecimento reduz vida útil em até 50% e pode queimar componentes!\n\n📞 Manutenção completa: WhatsApp (11) 99999-9999"
  ],
  
  // Impressora
  "impressora|imprimir|scanner|toner|cartucho|papel": [
    "🖨️ **Suporte para Impressoras:**\n\n**Problemas Comuns:**\n\n📄 **Não Imprime:**\n1. Está ligada e conectada?\n2. Tem papel na bandeja?\n3. Cartucho tem tinta?\n4. Reinicie impressora e PC\n5. Reinstale o driver (site do fabricante)\n\n🎨 **Impressão com Defeito:**\n• Linhas brancas = cabeça entupida (limpeza)\n• Cores erradas = cartucho vazio ou entupido\n• Borrões = limpeza necessária\n• Papel amassando = rolos sujos\n\n💡 **Dicas de Economia:**\n• Use modo rascunho para testes\n• Imprima em preto quando possível\n• Impressora a laser = mais econômica\n• Compre toner compatível (cuidado com qualidade)\n\n🔧 **Nossos Serviços:**\n✅ Instalação e configuração\n✅ Limpeza de cabeças\n✅ Configuração de rede/WiFi\n✅ Resolução de erros\n✅ Manutenção preventiva\n\n⚠️ **Atenção:** Cartuchos remanufaturados de má qualidade podem danificar a impressora!\n\n📞 Problemas com impressora? Chama no WhatsApp!"
  ],

  // Dúvidas / Não entendi
  "não entendi|nao entendi|como assim|explica melhor|não sei|nao sei|dúvida|duvida": [
    "Sem problemas! 😊 Vou tentar explicar de forma mais simples!\n\nMe diga:\n• Qual é exatamente seu problema?\n• O que está acontecendo com seu PC/Notebook?\n• Que tipo de serviço você precisa?\n\nQuanto mais detalhes você me der, melhor posso te ajudar! 💙\n\nOu se preferir, pode falar direto com nossos atendentes humanos pelo WhatsApp: (11) 99999-9999 😊",
    "Entendo! 🤔 Deixa eu reformular...\n\nVocê pode me contar:\n1. O que está acontecendo?\n2. Quando começou o problema?\n3. Já tentou algo para resolver?\n\nAssim consigo te ajudar melhor! Ou se preferir, nossos atendentes estão disponíveis no WhatsApp para te explicar tudo! 📞"
  ],

  // Urgência / Emergência
  "urgente|emergência|emergencia|rápido|rapido|agora|já|ja|socorro": [
    "🚨 **Situação Urgente? Estamos aqui!**\n\nPara atendimento IMEDIATO:\n\n📱 **WhatsApp (Mais Rápido):**\n(11) 99999-9999\n⚡ Resposta em minutos!\n\n💻 **Suporte Remoto 24/7:**\n• Resolvemos 80% dos problemas remotamente\n• Não precisa sair de casa\n• Atendimento em minutos\n\n🏃 **Atendimento Presencial Urgente:**\n• Agende pelo WhatsApp\n• Priorizamos emergências\n• Diagnóstico rápido\n\n💡 **Enquanto isso:**\nMe conta o que está acontecendo! Posso te dar orientações imediatas enquanto você entra em contato! 🤖💙"
  ]
};

// Dicas contextuais profissionais
const proTips = [
  "💡 **Dica Pro:** Pressione Windows + Shift + S para capturar tela rapidamente!",
  "💡 **Dica Pro:** Ctrl + Shift + Esc abre o Gerenciador de Tarefas direto!",
  "💡 **Dica Pro:** Windows + V mostra histórico da área de transferência!",
  "💡 **Dica Pro:** Ctrl + Shift + T reabre a última aba fechada no navegador!",
  "💡 **Dica Pro:** Windows + L bloqueia o PC instantaneamente!",
  "💡 **Dica Pro:** Alt + Tab para alternar entre programas abertos rapidinho!",
  "💡 **Dica Pro:** Windows + D minimiza tudo e mostra a área de trabalho!",
  "💡 **Dica Pro:** F2 renomeia arquivos rapidamente no Windows!",
  "💡 **Dica Pro:** Ctrl + Shift + N cria pasta nova instantaneamente!",
  "💡 **Dica Pro:** Windows + E abre o Explorador de Arquivos na hora!",
  "💡 **Dica Pro:** Ctrl + Z desfaz a última ação em qualquer programa!",
  "💡 **Dica Pro:** Windows + Ponto (.) abre o menu de emojis! 😊",
  "💡 **Dica Pro:** Alt + F4 fecha o programa atual rapidamente!",
  "💡 **Dica Pro:** Windows + Seta move janelas para os lados da tela!",
  "💡 **Dica Pro:** Ctrl + F busca texto em qualquer página ou documento!"
];

export default function VirtualAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Olá! 👋 Sou o **TechBot**, seu assistente técnico inteligente!\n\nPosso te ajudar com:\n• Diagnóstico de problemas\n• Dicas técnicas profissionais\n• Informações sobre serviços\n• Contato e agendamento\n\nDigite sua dúvida e vou te dar uma resposta completa! 🚀", 
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

  // Sistema de IA avançado com normalização de texto
  const getIntelligentResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[^\w\s]/g, " ") // Remove pontuação
      .trim();
    
    // Busca por padrões nas chaves
    for (const [pattern, responses] of Object.entries(intelligentResponses)) {
      const patterns = pattern.split("|");
      if (patterns.some(p => lowerMessage.includes(p))) {
        // Retorna resposta aleatória do array
        return responses[Math.floor(Math.random() * responses.length)];
      }
    }
    
    // Resposta padrão inteligente e empática
    const defaultResponses = [
      `Hmm, entendi que você mencionou "${userMessage}" 🤔\n\nAinda não tenho uma resposta específica para isso, mas posso te ajudar com:\n\n🔧 **Problemas técnicos** (lentidão, vírus, travamentos, internet)\n💻 **Serviços** (formatação, limpeza, upgrade, manutenção)\n💡 **Dicas** (otimização, segurança, backup, atalhos)\n📞 **Contato** e informações gerais\n\nTente reformular sua pergunta ou digite "ajuda" para ver tudo que posso fazer! 😊\n\nOu se preferir, fale direto com nossos atendentes: (11) 99999-9999`,
      `Interessante! Você perguntou sobre "${userMessage}" 💭\n\nEmbora eu não tenha uma resposta pronta para isso, posso te ajudar de várias formas:\n\n1️⃣ Descreva seu problema técnico em detalhes\n2️⃣ Peça dicas de otimização ou segurança\n3️⃣ Solicite informações de contato\n4️⃣ Tire dúvidas sobre nossos serviços\n\nComo posso te ajudar melhor? 🚀\n\nOu fale com humanos pelo WhatsApp: (11) 99999-9999`,
      `Entendi que você mencionou "${userMessage}" 🎯\n\nVou te dar algumas opções:\n\n💻 Se é um **problema técnico**, descreva os sintomas\n📞 Se quer **falar com atendente**: (11) 99999-9999\n💡 Se quer **dicas**, digite "dicas" ou "ajuda"\n🕐 Se quer saber **horários**, digite "horário"\n\nEstou aqui para te ajudar da melhor forma! 😊`
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
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    // Simula tempo de "pensamento" realista
    setTimeout(() => {
      const botResponse: Message = {
        text: getIntelligentResponse(currentInput),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      
      // Adiciona dica aleatória 30% das vezes
      if (Math.random() > 0.7) {
        setTimeout(() => {
          const tipMessage: Message = {
            text: proTips[Math.floor(Math.random() * proTips.length)],
            isBot: true,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, tipMessage]);
          setIsTyping(false);
        }, 1200);
      } else {
        setIsTyping(false);
      }
    }, 800 + Math.random() * 1200);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 left-4 z-50 sm:bottom-8 sm:left-8">
        <Button
          size="lg"
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/50 rounded-full p-4 sm:p-6 animate-bounce group relative"
        >
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center animate-pulse font-bold">
            AI
          </div>
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 mr-0 sm:mr-2 animate-pulse" />
          <span className="hidden sm:inline">TechBot Inteligente</span>
          <Sparkles className="hidden sm:block w-4 h-4 ml-2 text-yellow-300 animate-pulse" />
        </Button>
      </div>
    );
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 left-4 z-50 sm:bottom-8 sm:left-8">
        <Button
          size="lg"
          onClick={() => setIsMinimized(false)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-2xl shadow-green-500/50 rounded-full p-3 sm:p-4 relative"
        >
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
          <Bot className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-8 sm:left-8 sm:right-auto z-50 w-full sm:w-[450px] sm:max-w-[calc(100vw-4rem)]">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-green-500/50 shadow-2xl shadow-green-500/20 rounded-t-2xl sm:rounded-lg">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 sm:p-4 rounded-t-2xl sm:rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <Bot className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping" />
              <Sparkles className="absolute -bottom-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
            </div>
            <div>
              <h3 className="font-bold text-white flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base">
                TechBot AI
                <span className="text-[10px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full">Inteligente</span>
              </h3>
              <p className="text-[10px] sm:text-xs text-green-100 flex items-center gap-1">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-300 rounded-full animate-pulse" />
                Online • Respostas em segundos
              </p>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 h-8 w-8 sm:h-10 sm:w-10 touch-manipulation"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-3 sm:p-4">
          <div className="h-[50vh] sm:h-96 overflow-y-auto mb-3 sm:mb-4 space-y-2 sm:space-y-3 scrollbar-thin scrollbar-thumb-green-500 pr-1 sm:pr-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-2.5 sm:p-3 rounded-lg text-xs sm:text-sm ${
                    msg.isBot
                      ? 'bg-green-500/20 border border-green-500/30 text-white'
                      : 'bg-blue-500/20 border border-blue-500/30 text-white'
                  }`}
                >
                  {msg.isBot && (
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                      <span className="text-[10px] sm:text-xs text-green-400 font-semibold">TechBot AI</span>
                    </div>
                  )}
                  <div className="whitespace-pre-line">{msg.text}</div>
                  <div className="text-[9px] sm:text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-green-500/20 border border-green-500/30 p-2.5 sm:p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" />
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                    <span className="text-[10px] sm:text-xs text-green-400">Pensando...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="space-y-2 sm:space-y-3">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Digite sua dúvida..."
                className="bg-slate-950/50 border-green-500/30 focus:border-green-500 text-white placeholder:text-gray-500 text-sm sm:text-base h-10 sm:h-11"
              />
              <Button
                onClick={sendMessage}
                disabled={isTyping}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-10 sm:h-11 px-3 sm:px-4 touch-manipulation"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["ajuda", "formatação", "lento", "contato"].map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 hover:bg-green-500/20 transition-colors touch-manipulation"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-500">
              <Lightbulb className="w-3 h-3 text-yellow-400" />
              <span>Respostas inteligentes • Dicas profissionais • 24/7</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

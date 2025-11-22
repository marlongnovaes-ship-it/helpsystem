import { Button } from "@/components/ui/button";
import VirtualAssistant from "@/components/VirtualAssistant";
import TechEffects from "@/components/TechEffects";
import FloatingHardware from "@/components/FloatingHardware";
import Testimonials from "@/components/Testimonials";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  Monitor, Wrench, Download, Headset, Clock, Calendar, Server, Cpu, HardDrive, 
  Zap, Shield, Users, CheckCircle2, Star, Database, Wifi, Code, Terminal,
  Rocket, Activity, TrendingUp, MessageSquare
} from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    description: "",
  });

  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    satisfaction: 0,
  });

  // Animated counter effect
  useEffect(() => {
    const targets = { clients: 500, projects: 1200, satisfaction: 98 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        clients: Math.floor(targets.clients * progress),
        projects: Math.floor(targets.projects * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setStats(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceType) {
      toast.error("Por favor, selecione um tipo de serviço");
      return;
    }

    // Salvar mensagem no localStorage para o painel admin
    const newContact = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      message: `Serviço: ${formData.serviceType}\n\n${formData.description || 'Sem descrição adicional'}`,
      date: new Date().toLocaleString('pt-BR'),
      status: "new" as const
    };

    const existingContacts = JSON.parse(localStorage.getItem("contact_requests") || "[]");
    existingContacts.unshift(newContact);
    localStorage.setItem("contact_requests", JSON.stringify(existingContacts));

    toast.success("✅ Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", serviceType: "", description: "" });
  };

  const technologies = [
    { name: "Windows", icon: Monitor, color: "blue" },
    { name: "Linux", icon: Terminal, color: "green" },
    { name: "Redes", icon: Wifi, color: "cyan" },
    { name: "Servidores", icon: Server, color: "purple" },
    { name: "Banco de Dados", icon: Database, color: "orange" },
    { name: "Hardware", icon: Cpu, color: "red" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white overflow-hidden">
      {/* Floating Hardware Background */}
      <FloatingHardware />
      
      {/* Tech Effects Background */}
      <TechEffects />
      
      {/* Interactive Components */}
      <VirtualAssistant />
      <FloatingWhatsApp />
      {/* Animated particles background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/30 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-500/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      </div>

      {/* More floating tech icons */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <Server className="absolute top-20 left-[10%] w-8 h-8 text-blue-400/30 animate-float-slow" />
        <Cpu className="absolute top-40 right-[15%] w-10 h-10 text-purple-400/30 animate-float-slow" style={{ animationDelay: '0.5s' }} />
        <HardDrive className="absolute bottom-32 left-[20%] w-7 h-7 text-cyan-400/30 animate-float-slow" style={{ animationDelay: '1s' }} />
        <Shield className="absolute top-1/2 right-[10%] w-9 h-9 text-green-400/30 animate-float-slow" style={{ animationDelay: '1.5s' }} />
        <Zap className="absolute bottom-40 right-[25%] w-8 h-8 text-yellow-400/30 animate-float-slow" style={{ animationDelay: '2s' }} />
        <Database className="absolute top-1/3 left-[15%] w-8 h-8 text-orange-400/30 animate-float-slow" style={{ animationDelay: '2.5s' }} />
        <Wifi className="absolute bottom-1/3 right-[20%] w-9 h-9 text-cyan-400/30 animate-float-slow" style={{ animationDelay: '3s' }} />
        <Code className="absolute top-2/3 left-[30%] w-8 h-8 text-pink-400/30 animate-float-slow" style={{ animationDelay: '3.5s' }} />
        <Terminal className="absolute top-1/4 right-[30%] w-7 h-7 text-green-400/30 animate-float-slow" style={{ animationDelay: '4s' }} />
        <Activity className="absolute bottom-1/4 left-[25%] w-8 h-8 text-blue-400/30 animate-float-slow" style={{ animationDelay: '4.5s' }} />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <Server className="w-10 h-10 text-blue-400 animate-pulse-glow" />
                <div className="absolute inset-0 bg-blue-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                HelpSystem
              </h1>
            </div>
            <nav className="hidden md:flex gap-8">
              <a href="#servicos" className="text-white/70 hover:text-blue-400 transition-all hover:scale-110 transform">Serviços</a>
              <a href="#stats" className="text-white/70 hover:text-blue-400 transition-all hover:scale-110 transform">Estatísticas</a>
              <a href="#atendimento" className="text-white/70 hover:text-blue-400 transition-all hover:scale-110 transform">Atendimento</a>
              <a href="#contato" className="text-white/70 hover:text-blue-400 transition-all hover:scale-110 transform">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-sm text-blue-300 animate-fade-in">
                ⚡ Suporte 24/7 Disponível
              </div>
              <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                Suporte Técnico
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                  Profissional
                </span>
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Soluções tecnológicas de ponta para manter seus sistemas funcionando perfeitamente. 
                Atendimento remoto instantâneo e presencial especializado.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105 transform"
                  asChild
                >
                  <a href="#contato">
                    <Zap className="w-5 h-5 mr-2" />
                    Solicitar Suporte
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-blue-400/50 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition-all hover:scale-105 transform"
                  asChild
                >
                  <a href="#servicos">Nossos Serviços</a>
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-lg border border-blue-500/30">
                  <img 
                    src="/images/hero-server.jpg" 
                    alt="Servidor com cabos de rede" 
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                </div>
              </div>
            </div>
           </div>
        </div>
      </section>

      {/* Fast Service Banner */}
      <section className="relative py-8 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full animate-pulse-glow">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white">Atendimento Ultra Rápido</h3>
                <p className="text-white/90 text-lg">Prezamos por respostas rápidas, sem deixar você esperando!</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-white">
                  <MessageSquare className="w-12 h-12 inline animate-bounce" />
                </div>
                <p className="text-white/90 text-sm">Resposta Imediata</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white">
                  <TrendingUp className="w-12 h-12 inline animate-pulse" />
                </div>
                <p className="text-white/90 text-sm">Alta Performance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-16 bg-black/30 backdrop-blur-sm border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="inline-block p-4 bg-blue-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                {stats.clients}+
              </div>
              <div className="text-gray-400">Clientes Satisfeitos</div>
            </div>
            <div className="text-center group">
              <div className="inline-block p-4 bg-purple-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                {stats.projects}+
              </div>
              <div className="text-gray-400">Projetos Concluídos</div>
            </div>
            <div className="text-center group">
              <div className="inline-block p-4 bg-green-500/20 rounded-full mb-4 group-hover:scale-110 transition-transform">
                <Star className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                {stats.satisfaction}%
              </div>
              <div className="text-gray-400">Taxa de Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tecnologias que Dominamos
            </h2>
            <p className="text-gray-400 text-lg">Expertise em múltiplas plataformas e sistemas</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-xl opacity-0 group-hover:opacity-75 transition-opacity" />
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-blue-500/50 transition-all hover:scale-110 transform">
                  <tech.icon className={`w-12 h-12 mx-auto mb-3 text-${tech.color}-400 group-hover:scale-110 transition-transform`} />
                  <p className="text-center text-sm text-gray-300 font-semibold">{tech.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="relative py-20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Nossos Serviços
            </h2>
            <p className="text-gray-400 text-lg">Soluções tecnológicas completas para todas as suas necessidades</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Monitor, title: "Formatação de Computadores", desc: "Reinstalação completa do sistema operacional com backup de dados e otimização.", color: "blue", delay: "0s" },
              { icon: Wrench, title: "Limpeza Física", desc: "Limpeza profunda de hardware, troca de pasta térmica e manutenção preventiva.", color: "purple", delay: "0.1s" },
              { icon: Download, title: "Atualização de Sistema", desc: "Atualização e upgrade de sistemas operacionais, drivers e softwares.", color: "cyan", delay: "0.2s" },
              { icon: Headset, title: "Suporte Remoto", desc: "Assistência técnica via conexão remota para resolver problemas rapidamente.", color: "green", delay: "0.3s" }
            ].map((service, index) => (
              <Card 
                key={index}
                className="group bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-fade-in-up"
                style={{ animationDelay: service.delay }}
              >
                <CardHeader>
                  <div className="relative inline-block">
                    <service.icon className={`w-14 h-14 text-${service.color}-400 mb-4 group-hover:scale-110 transition-transform animate-float-slow`} />
                    <div className={`absolute inset-0 bg-${service.color}-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-400 transition-colors">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {service.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Horários Section */}
      <section id="atendimento" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="group bg-gradient-to-br from-blue-900/50 to-slate-900/50 backdrop-blur-sm border-blue-500/30 hover:border-blue-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30">
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <Clock className="w-14 h-14 text-blue-400 group-hover:rotate-12 transition-transform" />
                  <div className="absolute inset-0 bg-blue-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-2xl">Atendimento Remoto</CardTitle>
                <CardDescription className="text-lg text-gray-300">
                  Disponível 24 horas por dia, 7 dias por semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Nosso suporte remoto está sempre disponível para resolver seus problemas 
                  de forma rápida e eficiente, não importa a hora.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-gradient-to-br from-purple-900/50 to-slate-900/50 backdrop-blur-sm border-purple-500/30 hover:border-purple-400 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30">
              <CardHeader>
                <div className="relative inline-block mb-4">
                  <Calendar className="w-14 h-14 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="absolute inset-0 bg-purple-400/50 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <CardTitle className="text-2xl">Atendimento Presencial</CardTitle>
                <CardDescription className="text-lg text-gray-300">
                  Mediante agendamento prévio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Para serviços que requerem atendimento presencial, agende um horário 
                  através do nosso formulário de contato.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="relative py-20 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Solicite Suporte
              </h2>
              <p className="text-gray-400 text-lg">
                Preencha o formulário abaixo e entraremos em contato em breve
              </p>
            </div>

            <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm border-blue-500/30 hover:border-blue-400 transition-all shadow-2xl shadow-blue-500/10">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-slate-950/50 border-white/10 focus:border-blue-400 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-slate-950/50 border-white/10 focus:border-blue-400 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType" className="text-gray-300">Tipo de Serviço</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger className="bg-slate-950/50 border-white/10 focus:border-blue-400 text-white">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10">
                        <SelectItem value="formatacao">Formatação de Computadores</SelectItem>
                        <SelectItem value="limpeza">Limpeza Física</SelectItem>
                        <SelectItem value="atualizacao">Atualização de Sistema</SelectItem>
                        <SelectItem value="suporte_remoto">Suporte Remoto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">Descrição do Problema (Opcional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="bg-slate-950/50 border-white/10 focus:border-blue-400 text-white resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all hover:scale-105 transform"
                  >
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Footer */}
      <footer className="relative py-12 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">HelpSystem</h3>
              <p className="text-gray-400">Suporte técnico profissional em informática</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Contato</h4>
              <p className="text-gray-400">contato@helpsystem.com.br</p>
              <p className="text-gray-400">(11) 99999-9999</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-gray-300">Horários</h4>
              <p className="text-gray-400">Remoto: {siteContent.scheduleRemote || "24/7"}</p>
              <p className="text-gray-400">Presencial: {siteContent.scheduleInPerson || "Seg-Sex 9h-18h"}</p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-gray-500">
            <p>&copy; 2026 HelpSystem. Todos os direitos reservados. | Desenvolvido por Marlon Novaes</p>
          </div>
        </div>
      </footer>
      
      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

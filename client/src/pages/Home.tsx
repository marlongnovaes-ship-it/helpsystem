import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Monitor, Wrench, Download, Headset, Clock, Calendar, Server, Cpu, HardDrive } from "lucide-react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "",
    description: "",
  });

  const createRequest = trpc.support.create.useMutation({
    onSuccess: () => {
      toast.success("Solicitação enviada com sucesso! Entraremos em contato em breve.");
      setFormData({ name: "", email: "", serviceType: "", description: "" });
    },
    onError: (error) => {
      toast.error("Erro ao enviar solicitação: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.serviceType) {
      toast.error("Por favor, selecione um tipo de serviço");
      return;
    }
    createRequest.mutate({
      name: formData.name,
      email: formData.email,
      serviceType: formData.serviceType as "formatacao" | "limpeza" | "atualizacao" | "suporte_remoto",
      description: formData.description,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 tech-grid opacity-30 pointer-events-none" />
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(/images/datacenter.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
        }}
      />

      {/* Header */}
      <header className="relative border-b border-primary/20 bg-card/50 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-10 h-10 text-primary animate-pulse-glow" />
              <h1 className="text-3xl font-bold text-primary">HelpSystem</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#servicos" className="text-foreground/80 hover:text-primary transition-colors">Serviços</a>
              <a href="#atendimento" className="text-foreground/80 hover:text-primary transition-colors">Atendimento</a>
              <a href="#contato" className="text-foreground/80 hover:text-primary transition-colors">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left space-y-6">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Suporte Técnico em
                <span className="text-primary block">Informática</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Soluções profissionais para manter seu computador funcionando perfeitamente. 
                Atendimento remoto 24/7 e presencial com hora marcada.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                  <a href="#contato">Solicitar Suporte</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="#servicos">Nossos Serviços</a>
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-in-right">
              <div className="relative card-glow rounded-lg overflow-hidden">
                <img 
                  src="/images/hero-server.jpg" 
                  alt="Servidor com cabos de rede" 
                  className="w-full h-auto rounded-lg shadow-2xl shadow-primary/20"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="relative py-20 bg-card/30 backdrop-blur-sm">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-muted-foreground text-lg">Soluções completas para todas as suas necessidades</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="card-glow bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <Monitor className="w-12 h-12 text-primary mb-4 animate-float" />
                <CardTitle>Formatação de Computadores</CardTitle>
                <CardDescription>
                  Reinstalação completa do sistema operacional com backup de dados e otimização.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-glow bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <Wrench className="w-12 h-12 text-accent mb-4 animate-float" style={{ animationDelay: '0.5s' }} />
                <CardTitle>Limpeza Física</CardTitle>
                <CardDescription>
                  Limpeza profunda de hardware, troca de pasta térmica e manutenção preventiva.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-glow bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <Download className="w-12 h-12 text-primary mb-4 animate-float" style={{ animationDelay: '1s' }} />
                <CardTitle>Atualização de Sistema</CardTitle>
                <CardDescription>
                  Atualização e upgrade de sistemas operacionais, drivers e softwares.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="card-glow bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all">
              <CardHeader>
                <Headset className="w-12 h-12 text-accent mb-4 animate-float" style={{ animationDelay: '1.5s' }} />
                <CardTitle>Suporte Remoto</CardTitle>
                <CardDescription>
                  Assistência técnica via conexão remota para resolver problemas rapidamente.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Horários Section */}
      <section id="atendimento" className="relative py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="card-glow bg-card/80 backdrop-blur-sm border-primary/20">
              <CardHeader>
                <Clock className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-2xl">Atendimento Remoto</CardTitle>
                <CardDescription className="text-lg">
                  Disponível 24 horas por dia, 7 dias por semana
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Nosso suporte remoto está sempre disponível para resolver seus problemas 
                  de forma rápida e eficiente, não importa a hora.
                </p>
              </CardContent>
            </Card>

            <Card className="card-glow bg-card/80 backdrop-blur-sm border-accent/20">
              <CardHeader>
                <Calendar className="w-12 h-12 text-accent mb-4" />
                <CardTitle className="text-2xl">Atendimento Presencial</CardTitle>
                <CardDescription className="text-lg">
                  Mediante agendamento prévio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Para serviços que requerem atendimento presencial, agende um horário 
                  através do nosso formulário de contato.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contato" className="relative py-20 bg-card/30 backdrop-blur-sm">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Solicite Suporte</h2>
              <p className="text-muted-foreground text-lg">
                Preencha o formulário abaixo e entraremos em contato em breve
              </p>
            </div>

            <Card className="card-glow bg-card/80 backdrop-blur-sm border-primary/20 relative z-10">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Tipo de Serviço</Label>
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    >
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Selecione o serviço" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="formatacao">Formatação de Computadores</SelectItem>
                        <SelectItem value="limpeza">Limpeza Física</SelectItem>
                        <SelectItem value="atualizacao">Atualização de Sistema</SelectItem>
                        <SelectItem value="suporte_remoto">Suporte Remoto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descrição do Problema (Opcional)</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={5}
                      className="bg-background/50"
                      placeholder="Descreva detalhadamente o problema ou serviço que você precisa..."
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90" 
                    size="lg"
                    disabled={createRequest.isPending}
                  >
                    {createRequest.isPending ? "Enviando..." : "Enviar Solicitação"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-primary/20 bg-card/50 backdrop-blur-sm py-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold">HelpSystem</h3>
              </div>
              <p className="text-muted-foreground">
                Suporte técnico profissional em informática. Seu computador em boas mãos.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Serviços</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Formatação de Computadores</li>
                <li>Limpeza Física</li>
                <li>Atualização de Sistema</li>
                <li>Suporte Remoto</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Atendimento</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Remoto: 24/7
                </li>
                <li className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Presencial: Com agendamento
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary/20 text-center text-muted-foreground">
            <p>&copy; 2025 HelpSystem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

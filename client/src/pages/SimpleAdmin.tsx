import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogOut, Save, Eye, Settings, MessageSquare, BarChart3, Home as HomeIcon, Palette, Mail } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ADMIN_PASSWORD = "admin2026";

interface SiteContent {
  // Hero
  heroTitle: string;
  heroSubtitle: string;
  heroButtonText: string;
  
  // Services
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  service4Title: string;
  service4Desc: string;
  
  // Technologies
  tech1Name: string;
  tech1Desc: string;
  tech2Name: string;
  tech2Desc: string;
  tech3Name: string;
  tech3Desc: string;
  tech4Name: string;
  tech4Desc: string;
  tech5Name: string;
  tech5Desc: string;
  tech6Name: string;
  tech6Desc: string;
  
  // Fast Service Banner
  fastServiceTitle: string;
  fastServiceDesc: string;
  
  // Stats
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  
  // Contact
  contactTitle: string;
  contactSubtitle: string;
  contactEmail: string;
  contactPhone: string;
  contactWhatsApp: string;
  contactAddress: string;
  
  // Footer
  footerCompanyName: string;
  footerDesc: string;
  footerFacebook: string;
  footerInstagram: string;
  footerLinkedIn: string;
  
  // Colors
  primaryColor: string;
  secondaryColor: string;
}

const defaultContent: SiteContent = {
  heroTitle: "Soluções em Tecnologia",
  heroSubtitle: "Assistência técnica especializada em informática",
  heroButtonText: "Solicitar Atendimento",
  
  service1Title: "Formatação de Computadores",
  service1Desc: "Reinstalação completa do sistema operacional com backup de dados e otimização.",
  service2Title: "Limpeza Física",
  service2Desc: "Limpeza profunda de hardware, troca de pasta térmica e manutenção preventiva.",
  service3Title: "Atualização de Sistema",
  service3Desc: "Atualização e upgrade de sistemas operacionais, drivers e softwares.",
  service4Title: "Suporte Remoto",
  service4Desc: "Assistência técnica via conexão remota para resolver problemas rapidamente.",
  
  tech1Name: "Windows",
  tech1Desc: "Especialistas em Windows 10 e 11",
  tech2Name: "Hardware",
  tech2Desc: "Manutenção e upgrade de componentes",
  tech3Name: "Redes",
  tech3Desc: "Configuração de redes e WiFi",
  tech4Name: "Backup",
  tech4Desc: "Soluções de backup e recuperação",
  tech5Name: "Antivírus",
  tech5Desc: "Proteção e remoção de vírus",
  tech6Name: "Cloud",
  tech6Desc: "Migração para nuvem",
  
  fastServiceTitle: "Atendimento Rápido e Eficiente",
  fastServiceDesc: "Prezamos muito por um atendimento rápido e resposta imediata, sem deixar nossos clientes esperando.",
  
  stat1Value: "500+",
  stat1Label: "Clientes Satisfeitos",
  stat2Value: "1200+",
  stat2Label: "Projetos Concluídos",
  stat3Value: "98%",
  stat3Label: "Taxa de Satisfação",
  
  contactTitle: "Entre em Contato",
  contactSubtitle: "Estamos prontos para ajudar você",
  contactEmail: "contato@helpsystem.com",
  contactPhone: "(11) 99999-9999",
  contactWhatsApp: "5511999999999",
  contactAddress: "São Paulo, SP - Brasil",
  
  footerCompanyName: "HelpSystem",
  footerDesc: "Sua solução completa em tecnologia e informática.",
  footerFacebook: "https://facebook.com/helpsystem",
  footerInstagram: "https://instagram.com/helpsystem",
  footerLinkedIn: "https://linkedin.com/company/helpsystem",
  
  primaryColor: "#3b82f6",
  secondaryColor: "#8b5cf6"
};

interface ContactRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "new" | "read" | "replied";
}

export default function SimpleAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }

    const savedContent = localStorage.getItem("site_content");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }

    const savedContacts = localStorage.getItem("contact_requests");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const savedPassword = localStorage.getItem("admin_password") || ADMIN_PASSWORD;
    if (password === savedPassword) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("❌ Senha incorreta!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    setPassword("");
  };

  const handleSave = () => {
    localStorage.setItem("site_content", JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    alert("✅ Conteúdo salvo com sucesso!\n\nRecarregue a página inicial para ver as alterações.");
  };

  const handleChange = (field: keyof SiteContent, value: string) => {
    setContent(prev => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = () => {
    if (newPassword.length < 6) {
      alert("❌ A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    localStorage.setItem("admin_password", newPassword);
    setNewPassword("");
    alert("✅ Senha alterada com sucesso!");
  };

  const markAsRead = (id: string) => {
    const updated = contacts.map(c => 
      c.id === id ? { ...c, status: "read" as const } : c
    );
    setContacts(updated);
    localStorage.setItem("contact_requests", JSON.stringify(updated));
  };

  const deleteContact = (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta solicitação?")) {
      const updated = contacts.filter(c => c.id !== id);
      setContacts(updated);
      localStorage.setItem("contact_requests", JSON.stringify(updated));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-slate-900/90 border-blue-500/30">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-4 bg-blue-500/20 rounded-full w-fit">
              <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <CardTitle className="text-2xl text-white">Painel Administrativo</CardTitle>
            <CardDescription>Digite a senha para acessar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white"
                autoFocus
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                Entrar
              </Button>
              <p className="text-xs text-gray-500 text-center mt-4">
                Senha padrão: admin2026
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const newContactsCount = contacts.filter(c => c.status === "new").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-slate-900/50 p-6 rounded-lg border border-blue-500/30">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🎛️ Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie todo o conteúdo do seu site</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              className="border-blue-500/30"
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Site
            </Button>
            <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-slate-900/50 border border-blue-500/30">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-blue-600">
              <HomeIcon className="w-4 h-4 mr-2" />
              Conteúdo
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-600">
              <Mail className="w-4 h-4 mr-2" />
              Mensagens {newContactsCount > 0 && `(${newContactsCount})`}
            </TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-blue-600">
              <Palette className="w-4 h-4 mr-2" />
              Design
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Total de Mensagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">{contacts.length}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-600 to-green-800 border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Novas Mensagens</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">{newContactsCount}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-0">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Taxa de Resposta</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-white">98%</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">Atalhos Rápidos</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button onClick={() => document.querySelector('[value="content"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))} className="h-20 bg-blue-600 hover:bg-blue-700">
                  <HomeIcon className="w-6 h-6 mr-2" />
                  Editar Conteúdo
                </Button>
                <Button onClick={() => document.querySelector('[value="contacts"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))} className="h-20 bg-green-600 hover:bg-green-700">
                  <Mail className="w-6 h-6 mr-2" />
                  Ver Mensagens
                </Button>
                <Button onClick={() => window.open("/", "_blank")} className="h-20 bg-purple-600 hover:bg-purple-700">
                  <Eye className="w-6 h-6 mr-2" />
                  Visualizar Site
                </Button>
                <Button onClick={() => document.querySelector('[value="settings"]')?.dispatchEvent(new MouseEvent('click', {bubbles: true}))} className="h-20 bg-orange-600 hover:bg-orange-700">
                  <Settings className="w-6 h-6 mr-2" />
                  Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              {saved ? "✅ Salvo!" : "Salvar Todas as Alterações"}
            </Button>

            {/* Hero */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">🎯 Seção Principal (Hero)</CardTitle>
                <CardDescription>Primeira seção que os visitantes veem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Título Principal</label>
                  <Input
                    value={content.heroTitle}
                    onChange={(e) => handleChange("heroTitle", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Ex: Soluções em Tecnologia"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Subtítulo</label>
                  <Input
                    value={content.heroSubtitle}
                    onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Ex: Assistência técnica especializada"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Texto do Botão</label>
                  <Input
                    value={content.heroButtonText}
                    onChange={(e) => handleChange("heroButtonText", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Ex: Solicitar Atendimento"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">🛠️ Serviços (4 cards)</CardTitle>
                <CardDescription>Serviços que sua empresa oferece</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="p-4 bg-slate-800/30 rounded-lg border border-blue-500/20">
                    <h4 className="text-white font-semibold mb-3">Serviço {num}</h4>
                    <div className="space-y-3">
                      <Input
                        value={content[`service${num}Title` as keyof SiteContent]}
                        onChange={(e) => handleChange(`service${num}Title` as keyof SiteContent, e.target.value)}
                        className="bg-slate-800/50 border-blue-500/30 text-white"
                        placeholder="Título do serviço"
                      />
                      <Textarea
                        value={content[`service${num}Desc` as keyof SiteContent]}
                        onChange={(e) => handleChange(`service${num}Desc` as keyof SiteContent, e.target.value)}
                        className="bg-slate-800/50 border-blue-500/30 text-white"
                        rows={2}
                        placeholder="Descrição do serviço"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">💻 Tecnologias (6 cards)</CardTitle>
                <CardDescription>Tecnologias e especializações</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <div key={num} className="p-4 bg-slate-800/30 rounded-lg border border-blue-500/20">
                    <h4 className="text-white font-semibold mb-3">Tech {num}</h4>
                    <div className="space-y-3">
                      <Input
                        value={content[`tech${num}Name` as keyof SiteContent]}
                        onChange={(e) => handleChange(`tech${num}Name` as keyof SiteContent, e.target.value)}
                        className="bg-slate-800/50 border-blue-500/30 text-white text-sm"
                        placeholder="Nome"
                      />
                      <Input
                        value={content[`tech${num}Desc` as keyof SiteContent]}
                        onChange={(e) => handleChange(`tech${num}Desc` as keyof SiteContent, e.target.value)}
                        className="bg-slate-800/50 border-blue-500/30 text-white text-sm"
                        placeholder="Descrição curta"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fast Service Banner */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">⚡ Banner de Atendimento Rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={content.fastServiceTitle}
                  onChange={(e) => handleChange("fastServiceTitle", e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  placeholder="Título"
                />
                <Textarea
                  value={content.fastServiceDesc}
                  onChange={(e) => handleChange("fastServiceDesc", e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  rows={2}
                  placeholder="Descrição"
                />
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">📊 Estatísticas (3 contadores)</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="p-4 bg-slate-800/30 rounded-lg border border-blue-500/20">
                    <h4 className="text-white font-semibold mb-3">Stat {num}</h4>
                    <div className="space-y-3">
                      <Input
                        value={content[`stat${num}Value` as keyof SiteContent]}
                        onChange={(e) => handleChange(`stat${num}Value` as keyof SiteContent, e.target.value)}
                        className="bg-slate-800/50 border-blue-500/30 text-white"
                        placeholder="Ex: 500+"
                      />
                      <Input
                        value={content[`stat${num}Label` as keyof SiteContent]}
                        onChange={(e) => handleChange(`stat${num}Label` as keyof SiteContent, e.target.value)}
                        className="bg-slate-800/50 border-blue-500/30 text-white"
                        placeholder="Ex: Clientes"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">📞 Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={content.contactTitle}
                    onChange={(e) => handleChange("contactTitle", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Título da seção"
                  />
                  <Input
                    value={content.contactSubtitle}
                    onChange={(e) => handleChange("contactSubtitle", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Subtítulo"
                  />
                  <Input
                    type="email"
                    value={content.contactEmail}
                    onChange={(e) => handleChange("contactEmail", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Email"
                  />
                  <Input
                    value={content.contactPhone}
                    onChange={(e) => handleChange("contactPhone", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Telefone"
                  />
                  <Input
                    value={content.contactWhatsApp}
                    onChange={(e) => handleChange("contactWhatsApp", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="WhatsApp (com DDI)"
                  />
                  <Input
                    value={content.contactAddress}
                    onChange={(e) => handleChange("contactAddress", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Endereço"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Footer */}
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">🔗 Rodapé e Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={content.footerCompanyName}
                  onChange={(e) => handleChange("footerCompanyName", e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  placeholder="Nome da empresa"
                />
                <Textarea
                  value={content.footerDesc}
                  onChange={(e) => handleChange("footerDesc", e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  rows={2}
                  placeholder="Descrição"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    value={content.footerFacebook}
                    onChange={(e) => handleChange("footerFacebook", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Facebook URL"
                  />
                  <Input
                    value={content.footerInstagram}
                    onChange={(e) => handleChange("footerInstagram", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="Instagram URL"
                  />
                  <Input
                    value={content.footerLinkedIn}
                    onChange={(e) => handleChange("footerLinkedIn", e.target.value)}
                    className="bg-slate-800/50 border-blue-500/30 text-white"
                    placeholder="LinkedIn URL"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSave}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Save className="w-5 h-5 mr-2" />
              {saved ? "✅ Salvo!" : "Salvar Todas as Alterações"}
            </Button>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">📨 Mensagens Recebidas</CardTitle>
                <CardDescription>
                  {contacts.length === 0 ? "Nenhuma mensagem ainda" : `${contacts.length} mensagem(ns) total`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Quando alguém enviar uma mensagem pelo formulário de contato, ela aparecerá aqui.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 rounded-lg border ${
                          contact.status === "new"
                            ? "bg-blue-500/10 border-blue-500/30"
                            : "bg-slate-800/30 border-slate-700/30"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="text-white font-semibold">{contact.name}</h4>
                            <p className="text-sm text-gray-400">{contact.email}</p>
                          </div>
                          <div className="flex gap-2">
                            {contact.status === "new" && (
                              <Button
                                size="sm"
                                onClick={() => markAsRead(contact.id)}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                Marcar como Lida
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => deleteContact(contact.id)}
                            >
                              Excluir
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-2">{contact.message}</p>
                        <p className="text-xs text-gray-500">{contact.date}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Design Tab */}
          <TabsContent value="design" className="space-y-6">
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">🎨 Cores do Site</CardTitle>
                <CardDescription>Personalize as cores principais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Cor Primária (Azul)</label>
                  <div className="flex gap-4">
                    <Input
                      type="color"
                      value={content.primaryColor}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="w-20 h-12"
                    />
                    <Input
                      value={content.primaryColor}
                      onChange={(e) => handleChange("primaryColor", e.target.value)}
                      className="bg-slate-800/50 border-blue-500/30 text-white"
                      placeholder="#3b82f6"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-2 block">Cor Secundária (Roxo)</label>
                  <div className="flex gap-4">
                    <Input
                      type="color"
                      value={content.secondaryColor}
                      onChange={(e) => handleChange("secondaryColor", e.target.value)}
                      className="w-20 h-12"
                    />
                    <Input
                      value={content.secondaryColor}
                      onChange={(e) => handleChange("secondaryColor", e.target.value)}
                      className="bg-slate-800/50 border-blue-500/30 text-white"
                      placeholder="#8b5cf6"
                    />
                  </div>
                </div>
                <Button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar Cores
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">🔐 Alterar Senha do Painel</CardTitle>
                <CardDescription>Atualize a senha de acesso ao painel administrativo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  placeholder="Nova senha (mínimo 6 caracteres)"
                />
                <Button
                  onClick={handleChangePassword}
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  disabled={newPassword.length < 6}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/90 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white">ℹ️ Informações do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-400">
                <p>• Versão do Painel: 2.0</p>
                <p>• Armazenamento: LocalStorage</p>
                <p>• Última atualização: {new Date().toLocaleDateString()}</p>
                <p>• Status: ✅ Funcionando</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

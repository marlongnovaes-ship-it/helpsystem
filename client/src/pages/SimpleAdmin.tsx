import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, LogOut, Save, Eye } from "lucide-react";

const ADMIN_PASSWORD = "admin2026";

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  service1Title: string;
  service1Desc: string;
  service2Title: string;
  service2Desc: string;
  service3Title: string;
  service3Desc: string;
  service4Title: string;
  service4Desc: string;
  contactEmail: string;
  contactPhone: string;
  footerDesc: string;
}

const defaultContent: SiteContent = {
  heroTitle: "Soluções em Tecnologia",
  heroSubtitle: "Assistência técnica especializada em informática",
  service1Title: "Formatação de Computadores",
  service1Desc: "Reinstalação completa do sistema operacional com backup de dados e otimização.",
  service2Title: "Limpeza Física",
  service2Desc: "Limpeza profunda de hardware, troca de pasta térmica e manutenção preventiva.",
  service3Title: "Atualização de Sistema",
  service3Desc: "Atualização e upgrade de sistemas operacionais, drivers e softwares.",
  service4Title: "Suporte Remoto",
  service4Desc: "Assistência técnica via conexão remota para resolver problemas rapidamente.",
  contactEmail: "contato@helpsystem.com",
  contactPhone: "(11) 99999-9999",
  footerDesc: "Sua solução completa em tecnologia e informática."
};

export default function SimpleAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Verifica se já está autenticado
    const auth = localStorage.getItem("admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }

    // Carrega conteúdo salvo
    const savedContent = localStorage.getItem("site_content");
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Senha incorreta!");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 bg-slate-900/50 p-4 rounded-lg border border-blue-500/30">
          <div>
            <h1 className="text-2xl font-bold text-white">Painel Administrativo</h1>
            <p className="text-gray-400">Edite o conteúdo do seu site</p>
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

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full mb-6 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Save className="w-5 h-5 mr-2" />
          {saved ? "✅ Salvo!" : "Salvar Alterações"}
        </Button>

        {/* Hero Section */}
        <Card className="mb-6 bg-slate-900/90 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">Seção Principal (Hero)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Título Principal</label>
              <Input
                value={content.heroTitle}
                onChange={(e) => handleChange("heroTitle", e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Subtítulo</label>
              <Input
                value={content.heroSubtitle}
                onChange={(e) => handleChange("heroSubtitle", e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Services */}
        {[1, 2, 3, 4].map((num) => (
          <Card key={num} className="mb-6 bg-slate-900/90 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white">Serviço {num}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Título</label>
                <Input
                  value={content[`service${num}Title` as keyof SiteContent]}
                  onChange={(e) => handleChange(`service${num}Title` as keyof SiteContent, e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Descrição</label>
                <Textarea
                  value={content[`service${num}Desc` as keyof SiteContent]}
                  onChange={(e) => handleChange(`service${num}Desc` as keyof SiteContent, e.target.value)}
                  className="bg-slate-800/50 border-blue-500/30 text-white"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Contact */}
        <Card className="mb-6 bg-slate-900/90 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">Informações de Contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Email</label>
              <Input
                type="email"
                value={content.contactEmail}
                onChange={(e) => handleChange("contactEmail", e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Telefone</label>
              <Input
                value={content.contactPhone}
                onChange={(e) => handleChange("contactPhone", e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <Card className="mb-6 bg-slate-900/90 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white">Rodapé</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Descrição</label>
              <Textarea
                value={content.footerDesc}
                onChange={(e) => handleChange("footerDesc", e.target.value)}
                className="bg-slate-800/50 border-blue-500/30 text-white"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>

        {/* Save Button Bottom */}
        <Button
          onClick={handleSave}
          className="w-full mb-8 bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Save className="w-5 h-5 mr-2" />
          {saved ? "✅ Salvo!" : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
}

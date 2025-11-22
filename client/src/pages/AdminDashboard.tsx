import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  LogOut, 
  Inbox, 
  Loader2, 
  CheckCircle, 
  Clock, 
  PlayCircle, 
  Edit3, 
  Save, 
  X,
  FileText,
  Settings,
  LayoutDashboard
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("requests");
  const [editingContent, setEditingContent] = useState<any>(null);
  const [editForm, setEditForm] = useState({ key: "", value: "", label: "", section: "" });

  const { data: authData, isLoading: authLoading } = trpc.admin.checkAuth.useQuery();
  const { data: requests, refetch: refetchRequests, isLoading: requestsLoading } = trpc.admin.getSupportRequests.useQuery();
  const { data: siteContent, refetch: refetchContent, isLoading: contentLoading } = trpc.admin.getSiteContent.useQuery();
  
  const logoutMutation = trpc.admin.logout.useMutation({
    onSuccess: () => {
      toast.success("Logout realizado");
      setLocation("/admin");
    },
  });

  const updateStatusMutation = trpc.admin.updateRequestStatus.useMutation({
    onSuccess: () => {
      toast.success("Status atualizado!");
      refetchRequests();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateContentMutation = trpc.admin.updateSiteContent.useMutation({
    onSuccess: () => {
      toast.success("Conteúdo atualizado com sucesso!");
      refetchContent();
      setEditingContent(null);
      setEditForm({ key: "", value: "", label: "", section: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Redirecionar se não autenticado
  useEffect(() => {
    if (!authLoading && authData && !authData.isAuthenticated) {
      setLocation("/admin");
    }
  }, [authData, authLoading, setLocation]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!authData?.isAuthenticated) {
    return null;
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pendente: { variant: "secondary" as const, icon: Clock, label: "Pendente" },
      em_andamento: { variant: "default" as const, icon: PlayCircle, label: "Em Andamento" },
      concluido: { variant: "outline" as const, icon: CheckCircle, label: "Concluído" },
    };
    const config = variants[status as keyof typeof variants] || variants.pendente;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const getServiceLabel = (type: string) => {
    const labels = {
      formatacao: "Formatação de Computadores",
      limpeza: "Limpeza Física",
      atualizacao: "Atualização de Sistema",
      suporte_remoto: "Suporte Remoto",
    };
    return labels[type as keyof typeof labels] || type;
  };

  const handleEditContent = (content: any) => {
    setEditingContent(content);
    setEditForm({
      key: content.key,
      value: content.value,
      label: content.label,
      section: content.section,
    });
  };

  const handleSaveContent = () => {
    if (!editForm.key || !editForm.value || !editForm.label || !editForm.section) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }
    updateContentMutation.mutate(editForm);
  };

  const handleCancelEdit = () => {
    setEditingContent(null);
    setEditForm({ key: "", value: "", label: "", section: "" });
  };

  // Agrupar conteúdo por seção
  const groupedContent = siteContent?.reduce((acc: any, item: any) => {
    if (!acc[item.section]) {
      acc[item.section] = [];
    }
    acc[item.section].push(item);
    return acc;
  }, {}) || {};

  const sectionLabels: Record<string, string> = {
    hero: "Seção Principal (Hero)",
    services: "Serviços",
    attendance: "Atendimento",
    contact: "Contato",
    footer: "Rodapé",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">
                Bem-vindo, {authData.username}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="requests" className="gap-2">
              <Inbox className="w-4 h-4" />
              Solicitações
            </TabsTrigger>
            <TabsTrigger value="content" className="gap-2">
              <FileText className="w-4 h-4" />
              Conteúdo do Site
            </TabsTrigger>
          </TabsList>

          {/* Tab: Solicitações de Suporte */}
          <TabsContent value="requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Inbox className="w-5 h-5" />
                  Solicitações de Suporte
                </CardTitle>
                <CardDescription>
                  Gerencie todas as solicitações recebidas dos clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : !requests || requests.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Inbox className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma solicitação recebida ainda</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request: any) => (
                      <Card key={request.id} className="border-l-4 border-l-primary/50">
                        <CardContent className="pt-6">
                          <div className="grid gap-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="space-y-1 flex-1">
                                <h3 className="font-semibold text-lg">{request.name}</h3>
                                <p className="text-sm text-muted-foreground">{request.email}</p>
                              </div>
                              {getStatusBadge(request.status)}
                            </div>

                            <div className="grid gap-3">
                              <div>
                                <span className="text-sm font-medium">Serviço:</span>
                                <p className="text-sm text-muted-foreground">
                                  {getServiceLabel(request.serviceType)}
                                </p>
                              </div>

                              {request.description && (
                                <div>
                                  <span className="text-sm font-medium">Descrição:</span>
                                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                                    {request.description}
                                  </p>
                                </div>
                              )}

                              <div>
                                <span className="text-sm font-medium">Data:</span>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(request.createdAt).toLocaleString('pt-BR')}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 pt-2 border-t">
                              <span className="text-sm font-medium">Alterar Status:</span>
                              <Select
                                value={request.status}
                                onValueChange={(value) => {
                                  updateStatusMutation.mutate({
                                    id: request.id,
                                    status: value as "pendente" | "em_andamento" | "concluido",
                                  });
                                }}
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pendente">Pendente</SelectItem>
                                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                                  <SelectItem value="concluido">Concluído</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Conteúdo do Site */}
          <TabsContent value="content" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Editar Conteúdo do Site
                </CardTitle>
                <CardDescription>
                  Edite todos os textos e informações exibidas no site
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contentLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedContent).map(([section, items]: [string, any]) => (
                      <div key={section} className="space-y-4">
                        <h3 className="text-lg font-semibold border-b pb-2">
                          {sectionLabels[section] || section}
                        </h3>
                        <div className="grid gap-4">
                          {items.map((item: any) => (
                            <Card key={item.id} className="border-primary/20">
                              <CardContent className="pt-6">
                                {editingContent?.id === item.id ? (
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label>Identificador (Key)</Label>
                                      <Input
                                        value={editForm.key}
                                        disabled
                                        className="bg-muted"
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Rótulo</Label>
                                      <Input
                                        value={editForm.label}
                                        onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                                      />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Conteúdo</Label>
                                      <Textarea
                                        value={editForm.value}
                                        onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                                        rows={4}
                                        className="resize-none"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button
                                        onClick={handleSaveContent}
                                        disabled={updateContentMutation.isPending}
                                        className="flex-1"
                                      >
                                        <Save className="w-4 h-4 mr-2" />
                                        Salvar
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={handleCancelEdit}
                                        disabled={updateContentMutation.isPending}
                                      >
                                        <X className="w-4 h-4 mr-2" />
                                        Cancelar
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                      <div className="space-y-1 flex-1">
                                        <h4 className="font-medium">{item.label}</h4>
                                        <p className="text-sm text-muted-foreground">
                                          {item.value}
                                        </p>
                                        <p className="text-xs text-muted-foreground/60">
                                          ID: {item.key}
                                        </p>
                                      </div>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEditContent(item)}
                                      >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Editar
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

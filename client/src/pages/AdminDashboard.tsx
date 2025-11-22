import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { LogOut, Inbox, Loader2, CheckCircle, Clock, PlayCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { data: authData, isLoading: authLoading } = trpc.admin.checkAuth.useQuery();
  const { data: requests, refetch: refetchRequests, isLoading: requestsLoading } = trpc.admin.getSupportRequests.useQuery();
  
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Inbox className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">HelpSystem</p>
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Inbox className="w-5 h-5" />
              Solicitações de Suporte
            </CardTitle>
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
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">{request.name}</h3>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                          {getStatusBadge(request.status)}
                        </div>

                        <div className="grid gap-2">
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
      </main>
    </div>
  );
}

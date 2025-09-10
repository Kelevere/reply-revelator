import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  MessageCircle,
  Database,
  Zap,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity
} from 'lucide-react';

const stats = [
  {
    title: 'Conversas Hoje',
    value: '127',
    change: '+12%',
    trend: 'up',
    icon: MessageCircle,
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    title: 'Documentos Indexados',
    value: '48',
    change: '+3 novos',
    trend: 'up',
    icon: Database,
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    title: 'Taxa de Resposta',
    value: '94%',
    change: '+2%',
    trend: 'up',
    icon: Zap,
    color: 'text-warning',
    bgColor: 'bg-warning/10'
  },
  {
    title: 'Usuários Ativos',
    value: '1,284',
    change: '+8%',
    trend: 'up',
    icon: Users,
    color: 'text-primary-glow',
    bgColor: 'bg-primary-glow/10'
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'conversation',
    message: 'Nova conversa sobre produtos iniciada',
    user: 'João Silva',
    time: '2 min atrás',
    status: 'success'
  },
  {
    id: 2,
    type: 'document',
    message: 'Documento "FAQ Produtos.pdf" foi indexado',
    user: 'Sistema',
    time: '15 min atrás',
    status: 'success'
  },
  {
    id: 3,
    type: 'error',
    message: 'Falha na resposta - documento não encontrado',
    user: 'Maria Costa',
    time: '1h atrás',
    status: 'error'
  },
  {
    id: 4,
    type: 'conversation',
    message: 'Conversa sobre suporte técnico finalizada',
    user: 'Pedro Oliveira',
    time: '2h atrás',
    status: 'success'
  },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">
          Acompanhe o desempenho do seu chatbot RAG em tempo real
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`rounded-full p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    {stat.value}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                    <TrendingUp className="h-3 w-3 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Performance Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Performance dos Últimos 7 Dias</span>
            </CardTitle>
            <CardDescription>
              Conversas, taxa de sucesso e tempo de resposta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock chart data */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Segunda-feira</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">142 conversas</span>
                    <Progress value={85} className="w-20 h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Terça-feira</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">156 conversas</span>
                    <Progress value={92} className="w-20 h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Quarta-feira</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">134 conversas</span>
                    <Progress value={78} className="w-20 h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Quinta-feira</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">167 conversas</span>
                    <Progress value={94} className="w-20 h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Sexta-feira</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">189 conversas</span>
                    <Progress value={96} className="w-20 h-2" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Hoje</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">127 conversas</span>
                    <Progress value={87} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Atividade Recente</span>
            </CardTitle>
            <CardDescription>
              Últimas interações e eventos do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`rounded-full p-1 ${
                    activity.status === 'success' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    {activity.status === 'success' ? (
                      <CheckCircle className="h-3 w-3 text-success" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{activity.user}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{activity.time}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="outline" className="w-full" size="sm">
                Ver todas as atividades
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Acesse as principais funcionalidades rapidamente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
              <Database className="h-6 w-6" />
              <span>Adicionar Documento</span>
            </Button>
            <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
              <Zap className="h-6 w-6" />
              <span>Configurar API</span>
            </Button>
            <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
              <MessageCircle className="h-6 w-6" />
              <span>Ver Conversas</span>
            </Button>
            <Button className="h-auto p-4 flex-col space-y-2" variant="outline">
              <BarChart3 className="h-6 w-6" />
              <span>Relatórios</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
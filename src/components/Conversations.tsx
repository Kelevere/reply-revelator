import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Filter,
  MessageCircle,
  Clock,
  User,
  Bot,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Download,
  Eye
} from 'lucide-react';

const conversations = [
  {
    id: 1,
    user: {
      name: 'João Silva',
      phone: '+55 11 99999-1234',
      avatar: 'JS'
    },
    lastMessage: 'Obrigado pela ajuda com as informações do produto!',
    status: 'resolved',
    startTime: '2024-01-15T14:30:00Z',
    endTime: '2024-01-15T14:45:00Z',
    messageCount: 8,
    satisfaction: 5,
    tags: ['produto', 'suporte']
  },
  {
    id: 2,
    user: {
      name: 'Maria Costa',
      phone: '+55 11 98888-5678',
      avatar: 'MC'
    },
    lastMessage: 'Ainda aguardando informações sobre o pedido...',
    status: 'pending',
    startTime: '2024-01-15T13:15:00Z',
    endTime: null,
    messageCount: 12,
    satisfaction: null,
    tags: ['pedido', 'urgente']
  },
  {
    id: 3,
    user: {
      name: 'Pedro Oliveira',
      phone: '+55 11 97777-9012',
      avatar: 'PO'
    },
    lastMessage: 'Problema resolvido, muito obrigado!',
    status: 'resolved',
    startTime: '2024-01-15T11:20:00Z',
    endTime: '2024-01-15T11:35:00Z',
    messageCount: 6,
    satisfaction: 4,
    tags: ['técnico', 'instalação']
  },
  {
    id: 4,
    user: {
      name: 'Ana Santos',
      phone: '+55 11 96666-3456',
      avatar: 'AS'
    },
    lastMessage: 'Não consegui encontrar a resposta que preciso',
    status: 'failed',
    startTime: '2024-01-15T10:45:00Z',
    endTime: '2024-01-15T10:52:00Z',
    messageCount: 4,
    satisfaction: 2,
    tags: ['FAQ', 'insatisfação']
  },
];

const detailedConversation = {
  id: 1,
  user: {
    name: 'João Silva',
    phone: '+55 11 99999-1234',
    avatar: 'JS'
  },
  messages: [
    {
      id: 1,
      sender: 'user',
      content: 'Olá! Preciso de informações sobre o produto XYZ',
      timestamp: '2024-01-15T14:30:00Z'
    },
    {
      id: 2,
      sender: 'bot',
      content: 'Olá! Posso ajudá-lo com informações sobre o produto XYZ. O que gostaria de saber especificamente?',
      timestamp: '2024-01-15T14:30:15Z'
    },
    {
      id: 3,
      sender: 'user',
      content: 'Qual é o preço e as especificações técnicas?',
      timestamp: '2024-01-15T14:31:00Z'
    },
    {
      id: 4,
      sender: 'bot',
      content: 'Com base nas informações da nossa base de conhecimento, o produto XYZ custa R$ 299,90 e possui as seguintes especificações:\n\n• Processador: Intel Core i5\n• Memória: 8GB RAM\n• Armazenamento: 256GB SSD\n• Garantia: 12 meses\n\nPosso ajudá-lo com mais alguma informação?',
      timestamp: '2024-01-15T14:31:20Z',
      documents: ['Catálogo Produtos 2024.pdf', 'Especificações Técnicas.pdf']
    },
    {
      id: 5,
      sender: 'user',
      content: 'Perfeito! Como posso fazer o pedido?',
      timestamp: '2024-01-15T14:42:00Z'
    },
    {
      id: 6,
      sender: 'bot',
      content: 'Para fazer o pedido do produto XYZ, você pode:\n\n1. Acessar nosso site: www.exemplo.com\n2. Ligar para (11) 3333-4444\n3. Visitar uma de nossas lojas físicas\n\nO prazo de entrega é de 5-7 dias úteis. Precisa de mais alguma informação?',
      timestamp: '2024-01-15T14:42:10Z',
      documents: ['Política de Vendas.pdf']
    },
    {
      id: 7,
      sender: 'user',
      content: 'Obrigado pela ajuda com as informações do produto!',
      timestamp: '2024-01-15T14:45:00Z'
    },
    {
      id: 8,
      sender: 'bot',
      content: 'Foi um prazer ajudá-lo! Se precisar de mais alguma coisa, estarei aqui. Tenha um ótimo dia! 😊',
      timestamp: '2024-01-15T14:45:05Z'
    }
  ]
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'resolved':
      return 'bg-success text-success-foreground';
    case 'pending':
      return 'bg-warning text-warning-foreground';
    case 'failed':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'resolved':
      return CheckCircle;
    case 'pending':
      return Clock;
    case 'failed':
      return XCircle;
    default:
      return AlertCircle;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getDuration = (start: string, end: string | null) => {
  if (!end) return 'Em andamento';
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffInMinutes = Math.floor((endTime.getTime() - startTime.getTime()) / (1000 * 60));
  return `${diffInMinutes} min`;
};

export const Conversations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);

  const filteredConversations = conversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.user.phone.includes(searchTerm) ||
    conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalConversations = conversations.length;
  const resolvedConversations = conversations.filter(conv => conv.status === 'resolved').length;
  const pendingConversations = conversations.filter(conv => conv.status === 'pending').length;
  const avgSatisfaction = conversations
    .filter(conv => conv.satisfaction !== null)
    .reduce((sum, conv) => sum + (conv.satisfaction || 0), 0) / 
    conversations.filter(conv => conv.satisfaction !== null).length;

  if (selectedConversation) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Button variant="ghost" onClick={() => setSelectedConversation(null)}>
              ← Voltar para lista
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Conversa com {detailedConversation.user.name}
            </h1>
            <p className="text-muted-foreground">
              {detailedConversation.user.phone}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Conversation Detail */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {detailedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[70%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                  }`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className={
                        message.sender === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-success text-success-foreground'
                      }>
                        {message.sender === 'user' ? (
                          <User className="h-4 w-4" />
                        ) : (
                          <Bot className="h-4 w-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>

                    <div className={`space-y-2 ${
                      message.sender === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      <div className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      
                      {message.documents && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Documentos consultados:</p>
                          {message.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground">
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Histórico de Conversas</h1>
        <p className="text-muted-foreground text-lg">
          Acompanhe todas as interações do seu chatbot
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Conversas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConversations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Resolvidas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{resolvedConversations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pendentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{pendingConversations}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Satisfação Média
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSatisfaction.toFixed(1)}/5</div>
          </CardContent>
        </Card>
      </div>

      {/* Conversations List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Conversas Recentes</CardTitle>
              <CardDescription>Histórico de todas as interações</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar conversas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredConversations.map((conversation) => {
              const StatusIcon = getStatusIcon(conversation.status);
              return (
                <div
                  key={conversation.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedConversation(conversation.id)}
                >
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conversation.user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{conversation.user.name}</h3>
                        <Badge className={getStatusColor(conversation.status)} variant="secondary">
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {conversation.status === 'resolved' && 'Resolvida'}
                          {conversation.status === 'pending' && 'Pendente'}
                          {conversation.status === 'failed' && 'Falhou'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {conversation.lastMessage}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>{conversation.user.phone}</span>
                        <span>•</span>
                        <span>{conversation.messageCount} mensagens</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(conversation.startTime)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{getDuration(conversation.startTime, conversation.endTime)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        {conversation.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {conversation.satisfaction && (
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {conversation.satisfaction}/5
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Satisfação
                        </p>
                      </div>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
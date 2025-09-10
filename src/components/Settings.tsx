import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Key,
  Bot,
  MessageSquare,
  Shield,
  Zap,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Smartphone
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk-...');
  const [whatsappToken, setWhatsappToken] = useState('');
  const [isConnected, setIsConnected] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground text-lg">
          Configure as APIs e personalize o comportamento do seu chatbot
        </p>
      </div>

      <Tabs defaultValue="api" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api" className="flex items-center space-x-2">
            <Key className="h-4 w-4" />
            <span>APIs</span>
          </TabsTrigger>
          <TabsTrigger value="bot" className="flex items-center space-x-2">
            <Bot className="h-4 w-4" />
            <span>Chatbot</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4" />
            <span>WhatsApp</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* API Configuration */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5" />
                    <span>OpenAI API Key</span>
                  </CardTitle>
                  <CardDescription>
                    Configure sua chave da API OpenAI para geração de respostas
                  </CardDescription>
                </div>
                <Badge variant={apiKey ? "default" : "secondary"}>
                  {apiKey ? "Configurada" : "Não configurada"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="openai-key">Chave da API</Label>
                <div className="relative">
                  <Input
                    id="openai-key"
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">Configurações do Modelo</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="model">Modelo</Label>
                    <Input id="model" value="gpt-4-turbo" disabled />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input id="temperature" type="number" value="0.7" min="0" max="2" step="0.1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-tokens">Max Tokens</Label>
                    <Input id="max-tokens" type="number" value="2000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="top-p">Top P</Label>
                    <Input id="top-p" type="number" value="1" min="0" max="1" step="0.1" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Button variant="outline">
                  Testar Conexão
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bot Configuration */}
        <TabsContent value="bot" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Personalização do Chatbot</span>
              </CardTitle>
              <CardDescription>
                Configure a personalidade e comportamento do seu assistente virtual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="bot-name">Nome do Bot</Label>
                <Input id="bot-name" value="Assistente Virtual" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="system-prompt">Prompt do Sistema</Label>
                <Textarea
                  id="system-prompt"
                  rows={6}
                  value="Você é um assistente virtual útil e prestativo. Sua função é ajudar os usuários com informações precisas baseadas na base de conhecimento disponível. Seja sempre cordial, profissional e direto em suas respostas."
                  className="resize-none"
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Configurações de Resposta</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Respostas Automáticas</Label>
                      <p className="text-sm text-muted-foreground">
                        Enviar respostas instantâneas quando possível
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Indicador de Digitação</Label>
                      <p className="text-sm text-muted-foreground">
                        Mostrar "digitando..." enquanto processa
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Log de Conversas</Label>
                      <p className="text-sm text-muted-foreground">
                        Salvar histórico para análise e melhorias
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fallback-message">Mensagem de Fallback</Label>
                <Textarea
                  id="fallback-message"
                  rows={3}
                  value="Desculpe, não consegui encontrar uma resposta para sua pergunta na minha base de conhecimento. Você poderia reformular ou tentar uma pergunta diferente?"
                  className="resize-none"
                />
              </div>

              <Button className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* WhatsApp Configuration */}
        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5" />
                    <span>Integração WhatsApp</span>
                  </CardTitle>
                  <CardDescription>
                    Configure a conexão com a API do WhatsApp Business
                  </CardDescription>
                </div>
                <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center space-x-1">
                  {isConnected ? (
                    <CheckCircle className="h-3 w-3" />
                  ) : (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  <span>{isConnected ? "Conectado" : "Desconectado"}</span>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-token">Token de Acesso</Label>
                <div className="relative">
                  <Input
                    id="whatsapp-token"
                    type="password"
                    value={whatsappToken}
                    onChange={(e) => setWhatsappToken(e.target.value)}
                    placeholder="EAABsB..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone-number">Número do Telefone</Label>
                <Input id="phone-number" value="+55 11 99999-9999" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" value="https://sua-api.com/webhook" disabled />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Configurações de Mensagem</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Confirmação de Leitura</Label>
                      <p className="text-sm text-muted-foreground">
                        Marcar mensagens como lidas automaticamente
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Mensagens de Mídia</Label>
                      <p className="text-sm text-muted-foreground">
                        Aceitar imagens e documentos
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="welcome-message">Mensagem de Boas-vindas</Label>
                <Textarea
                  id="welcome-message"
                  rows={3}
                  value="Olá! 👋 Sou seu assistente virtual. Como posso ajudá-lo hoje?"
                  className="resize-none"
                />
              </div>

              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  Testar Webhook
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Configurações
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Configuration */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Configurações de Segurança</span>
              </CardTitle>
              <CardDescription>
                Configure políticas de segurança e controle de acesso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Controle de Acesso</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rate Limiting</Label>
                      <p className="text-sm text-muted-foreground">
                        Limitar número de mensagens por usuário
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Lista de Bloqueio</Label>
                      <p className="text-sm text-muted-foreground">
                        Bloquear números ou palavras específicas
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Privacidade de Dados</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Criptografia de Mensagens</Label>
                      <p className="text-sm text-muted-foreground">
                        Criptografar conversas armazenadas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Retenção de Dados</Label>
                      <p className="text-sm text-muted-foreground">
                        Excluir conversas automaticamente após 30 dias
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="max-messages">Limite de Mensagens por Hora</Label>
                <Input id="max-messages" type="number" value="60" />
              </div>

              <Button className="w-full sm:w-auto">
                <Save className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
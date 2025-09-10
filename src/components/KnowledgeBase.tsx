import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Upload,
  File,
  Trash2,
  Search,
  Filter,
  FileText,
  FileImage,
  Calendar,
  Eye,
  Download,
  Plus,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const documents = [
  {
    id: 1,
    name: 'FAQ Produtos.pdf',
    type: 'pdf',
    size: '2.3 MB',
    chunks: 45,
    status: 'processed',
    uploadDate: '2024-01-15T10:30:00Z',
    lastUpdate: '2024-01-15T10:45:00Z',
    accuracy: 95
  },
  {
    id: 2,
    name: 'Manual Técnico.docx',
    type: 'document',
    size: '1.8 MB',
    chunks: 32,
    status: 'processing',
    uploadDate: '2024-01-15T09:15:00Z',
    lastUpdate: '2024-01-15T09:15:00Z',
    accuracy: 0
  },
  {
    id: 3,
    name: 'Políticas de Atendimento.md',
    type: 'text',
    size: '0.5 MB',
    chunks: 18,
    status: 'processed',
    uploadDate: '2024-01-14T14:22:00Z',
    lastUpdate: '2024-01-14T14:25:00Z',
    accuracy: 98
  },
  {
    id: 4,
    name: 'Catálogo Produtos 2024.pdf',
    type: 'pdf',
    size: '5.2 MB',
    chunks: 87,
    status: 'error',
    uploadDate: '2024-01-14T11:10:00Z',
    lastUpdate: '2024-01-14T11:12:00Z',
    accuracy: 0
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case 'pdf':
      return FileText;
    case 'document':
      return FileText;
    case 'text':
      return FileText;
    case 'image':
      return FileImage;
    default:
      return File;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'processed':
      return 'bg-success text-success-foreground';
    case 'processing':
      return 'bg-warning text-warning-foreground';
    case 'error':
      return 'bg-destructive text-destructive-foreground';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState<number[]>([]);

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDocuments = documents.length;
  const processedDocuments = documents.filter(doc => doc.status === 'processed').length;
  const totalChunks = documents.reduce((sum, doc) => sum + doc.chunks, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Base de Conhecimento</h1>
        <p className="text-muted-foreground text-lg">
          Gerencie os documentos que alimentam seu chatbot RAG
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Documentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDocuments}</div>
            <p className="text-xs text-muted-foreground">
              {processedDocuments} processados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Chunks Indexados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChunks}</div>
            <p className="text-xs text-muted-foreground">
              Pronto para busca
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((processedDocuments / totalDocuments) * 100)}%
            </div>
            <Progress 
              value={(processedDocuments / totalDocuments) * 100} 
              className="mt-2 h-2"
            />
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload de Documentos</span>
          </CardTitle>
          <CardDescription>
            Arraste e solte arquivos ou clique para selecionar. Formatos suportados: PDF, DOC, TXT, MD
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium">Adicione novos documentos</p>
                <p className="text-sm text-muted-foreground">
                  Clique para selecionar ou arraste arquivos aqui
                </p>
              </div>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Selecionar Arquivos
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>Gerencie seus documentos indexados</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar documentos..."
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
            {filteredDocuments.map((doc) => {
              const FileIcon = getFileIcon(doc.type);
              return (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <FileIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{doc.name}</h3>
                        <Badge className={getStatusColor(doc.status)} variant="secondary">
                          {doc.status === 'processed' && 'Processado'}
                          {doc.status === 'processing' && 'Processando'}
                          {doc.status === 'error' && 'Erro'}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                        <span>{doc.size}</span>
                        <span>•</span>
                        <span>{doc.chunks} chunks</span>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(doc.uploadDate)}</span>
                        </div>
                        {doc.status === 'processed' && (
                          <>
                            <span>•</span>
                            <span>{doc.accuracy}% precisão</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {doc.status === 'processing' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                        <span className="text-sm text-muted-foreground">Processando...</span>
                      </div>
                    )}
                    {doc.status === 'error' && (
                      <div className="flex items-center space-x-2 text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Falha no processamento</span>
                      </div>
                    )}
                    {doc.status === 'processed' && (
                      <div className="flex items-center space-x-2 text-success">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">Pronto</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
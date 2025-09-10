import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Database, 
  Settings, 
  MessageCircle, 
  Menu,
  X,
  Bot,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'knowledge', name: 'Base de Conhecimento', icon: Database },
  { id: 'conversations', name: 'Histórico', icon: MessageCircle },
  { id: 'settings', name: 'Configurações', icon: Settings },
];

export const Layout: React.FC<LayoutProps> = ({ children, currentSection, onSectionChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">ChatBot RAG</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 px-4 transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-primary" 
                    : "hover:bg-accent text-muted-foreground hover:text-accent-foreground"
                )}
                onClick={() => {
                  onSectionChange(item.id);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.name}
                {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
              </Button>
            );
          })}
        </nav>

        {/* Status Card */}
        <div className="p-4">
          <Card className="p-4 bg-gradient-to-r from-success/10 to-success-glow/10 border-success/20">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              <div>
                <p className="text-sm font-medium text-success">Bot Online</p>
                <p className="text-xs text-muted-foreground">Conectado ao WhatsApp</p>
              </div>
            </div>
          </Card>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-primary">
                {user?.email?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {user?.email}
              </p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="w-full justify-start text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center justify-between bg-background/80 backdrop-blur-sm border-b border-border px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <p className="text-sm text-muted-foreground">
                {new Date().toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
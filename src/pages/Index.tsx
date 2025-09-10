import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Dashboard } from '../components/Dashboard';
import { KnowledgeBase } from '../components/KnowledgeBase';
import { Conversations } from '../components/Conversations';
import { Settings } from '../components/Settings';

const Index = () => {
  const [currentSection, setCurrentSection] = useState('dashboard');

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'knowledge':
        return <KnowledgeBase />;
      case 'conversations':
        return <Conversations />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentSection={currentSection} onSectionChange={setCurrentSection}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
// Layout components
import Sidebar from './components/layout/Sidebar';

// Pages
import DocumentsPage from './pages/documents/DocumentsPage';
import AccessControlPage from './pages/documents/AccessControlPage';
import SyncDataPage from './pages/sync/SyncDataPage';

// Settings components
import ServicenowSettings from './components/settings/ServicenowSettings';
import AzureSettings from './components/settings/AzureSettings';
import SlackSettings from './components/settings/SlackSettings';

import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedPage, setSelectedPage] = useState('documents');

  const renderContent = () => {
    switch (selectedPage) {
      case 'documents':
        return <DocumentsPage />;
      case 'access-control':
        return <AccessControlPage />;
      case 'sync-data':
        return <SyncDataPage />;
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">ServiceNow Settings</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <ServicenowSettings />
            </div>
          </div>
        );
      case 'azure-settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Azure Settings</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <AzureSettings />
            </div>
          </div>
        );
      case 'slack-settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">Slack Settings</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <SlackSettings />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Side Navigation */}
      <Sidebar 
        selectedPage={selectedPage} 
        onSelect={setSelectedPage} 
      />
      
      {/* Dashboard */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;
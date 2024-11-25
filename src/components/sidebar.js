import React from 'react';
import { FileText, Settings, Shield, Database } from 'react-feather';

const Sidebar = ({ selectedPage, onSelect }) => {
  const navItems = [
    {
      id: 'documents',
      name: 'RAG Documents',
      icon: FileText
    },
    {
      id: 'access-control',
      name: 'RAG Access Control',
      icon: Shield
    },
    {
      id: 'sync-data',
      name: 'Sync Data',
      icon: Database
    },
    {
      id: 'settings',
      name: 'ServiceNow Settings',
      icon: Settings
    }
  ];

  const renderNavItem = (item) => {
    const isSelected = selectedPage === item.id;
    return (
      <button
        key={item.id}
        onClick={() => onSelect(item.id)}
        className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors
          ${isSelected 
            ? 'bg-blue-50 text-blue-600' 
            : 'text-gray-600 hover:bg-gray-50'}`}
      >
        <item.icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
        <span className="font-medium">{item.name}</span>
      </button>
    );
  };

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      {/* Top headline */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Agent UI</h1>
      </div>

      {/* Navigation list */}
      <nav className="space-y-1">
        {/* Document management group */}
        <div className="mb-4">
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Document Management
          </h2>
          {navItems.slice(0, 2).map(renderNavItem)}
        </div>

        {/* ServiceNow group */}
        <div className="mb-4">
          <h2 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            ServiceNow Integration
          </h2>
          {navItems.slice(2).map(renderNavItem)}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
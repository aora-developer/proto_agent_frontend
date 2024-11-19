import React from 'react';
import { FileText, Settings } from 'react-feather';

const Sidebar = ({ selectedPage, onSelect }) => {
  const navItems = [
    {
      id: 'documents',
      name: 'RAG Documents',
      icon: FileText
    },
    {
      id: 'settings',
      name: 'ServiceNow Settings',
      icon: Settings
    }
  ];

  return (
    <div className="w-64 min-h-screen bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-800">Agent UI</h1>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const isSelected = selectedPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors
                ${isSelected 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <item.icon className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-medium">{item.name}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
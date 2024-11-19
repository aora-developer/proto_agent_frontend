import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import FileUpload from './components/fileUpload';
import FileList from './components/fileList';
import UserSettings from './components/userSettings';
import './App.css';

function App() {
  const [selectedPage, setSelectedPage] = useState('documents');

  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Sample Document',
      type: 'PDF',
      status: 'Active',
      created: '2024-02-19',
      content: 'Sample content'
    }
  ]);

  const handleFileUpload = (newFile) => {
    setDocuments(prev => [...prev, newFile]);
    // TODO: Add backend API integration
  };

  const handleDelete = async (id) => {
    try {
      // TODO: Add backend API
      // await deleteDocumentFromServer(id);
      
      // Update local statement
      setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
      // TODO: Add UI for Error Message
      alert('Failed to delete document. Please try again.');
    }
  };

  const renderContent = () => {
    switch (selectedPage) {
      case 'documents':
        return (
          <div className="space-y-6">
            {/* Title */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">
                {selectedPage === 'documents' ? 'RAG Documents' : 'ServiceNow Settings'}
              </h1>
            </div>
            
            {/* File Upload */}
            <div className="bg-white rounded-lg shadow-sm">
              <FileUpload 
                onUpload={handleFileUpload}  
              />
            </div>

            {/* File List */}
            <div className="bg-white rounded-lg shadow-sm">
              <FileList 
                documents={documents} 
                onDelete={handleDelete}
              />
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-900">ServiceNow Settings</h1>
            </div>
            <div className="bg-white rounded-lg shadow-sm">
              <UserSettings />
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
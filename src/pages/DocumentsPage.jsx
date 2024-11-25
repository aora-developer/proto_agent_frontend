import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import FileList from '../components/FileList';

function DocumentsPage() {
    const [documents, setDocuments] = useState([
        {
            id: 1,
            name: "Introduction to ServiceNow.pdf",
            type: "PDF",
            status: "Complete",
            uploadDate: "2024-11-25T10:30:00",
            content: "A brief introduction to ServiceNow..."
        },
        {
            id: 2,
            name: "ServiceNow Basic Guildline.docx",
            type: "DOCX",
            status: "Processing",
            uploadDate: "2024-11-24T15:45:00",
            content: "A basic guildline for using your first ServiceNow instance..."
        },
        {
            id: 3,
            name: "Feature List.xlsx",
            type: "XLSX",
            status: "Complete",
            uploadDate: "2024-11-23T09:15:00",
            content: "A feature list for ServiceNow..."
        }
    ]);

    const handleFileUpload = (newFile) => {
        const fileWithDate = {
          ...newFile,
          uploadDate: new Date().toISOString()
        };
        setDocuments(prev => [...prev, fileWithDate]);
      };
    
      const handleDelete = async (id) => {
        try {
          setDocuments(prevDocs => prevDocs.filter(doc => doc.id !== id));
        } catch (error) {
          console.error('Delete error:', error);
          alert('Failed to delete document. Please try again.');
        }
      };
    
      return (
        <div className="space-y-6">
          {/* Title */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              RAG Documents
            </h1>
          </div>
          
          {/* File Upload */}
          <div className="bg-white rounded-lg shadow-sm">
            <FileUpload onUpload={handleFileUpload} />
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
    }
    
    export default DocumentsPage;
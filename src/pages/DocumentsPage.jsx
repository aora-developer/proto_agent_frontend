import React, { useState, useEffect } from 'react';
import FileList from '../components/FileList';

const sampleDocuments = [
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
];

function DocumentsPage() {
  // Statement managment
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get data from backend
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // TODO: real backend API
        // const response = await fetch('/api/documents');
        // const data = await response.json();
        
        // Using sample data
        setDocuments(sampleDocuments);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch documents');
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  // Processing file delete
  const handleDelete = async (id) => {
    try {
      // TODO: real backend API
      // await fetch(`/api/documents/${id}`, { method: 'DELETE' });
      
      // Update local statment
      setDocuments(documents.filter(doc => doc.id !== id));
    } catch (err) {
      console.error('Failed to delete document:', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading documents...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="p-4">
      <FileList 
        documents={documents}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default DocumentsPage;
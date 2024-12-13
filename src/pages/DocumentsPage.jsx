import React, { useState, useEffect } from "react"; 
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/documents/list");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleFileUpload = async (newFile) => {
    try {
      const formData = new FormData();
      formData.append("file", newFile);

      const response = await fetch(
        "http://localhost:3001/api/documents/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setDocuments((prev) => [...prev, data]);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload file. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/documents/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== id));
      } else {
        throw new Error("Failed to delete document");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete document. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">RAG Documents</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <FileUpload onUpload={handleFileUpload} />
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <FileList documents={documents} onDelete={handleDelete} />
      </div>
    </div>
  );
}

export default DocumentsPage;

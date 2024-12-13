import React, { useState, useRef } from 'react';
import { Upload } from 'react-feather';
import Button from '@/components/ui/Button';

function FileUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleFile = async (files) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    try {
      const validFiles = Array.from(files).filter(file => 
        allowedTypes.includes(file.type)
      );

      if (validFiles.length === 0) {
        throw new Error('No valid files selected. Please upload PDF, TXT, or Word documents.');
      }

      for (const file of validFiles) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          onUpload(file);
        } catch (error) {
          console.error('Error processing file:', error);
        }
      }

    } catch (error) {
      console.error('Upload error:', error);
      alert(error.message);
    } finally {
      setUploading(false);
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    handleFile(files);
  };

  const handleButtonUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Upload Documents</h2>
      </div>
      
      <div
        className={`p-6 ${uploading ? 'pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div
          className={`border-2 border-dashed rounded-lg p-8 transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
            ${uploading ? 'opacity-50' : ''}`}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload 
              className={`w-12 h-12 mb-4 transition-colors ${
                isDragging ? 'text-blue-500' : 'text-gray-400'
              }`}
            />
            
            <p className="mb-2 text-gray-600">
              {uploading ? 'Uploading...' : 'Drag and drop your files here'}
            </p>
            
            <span className="text-sm text-gray-500 mb-4">or</span>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => handleFile(e.target.files)}
              accept=".pdf,.doc,.docx,.txt"
            />
            
            <Button
              onClick={handleButtonUpload}
              disabled={uploading}
              className={`transition-colors ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Browse Files
            </Button>
            
            <p className="mt-2 text-xs text-gray-500">
              Supported formats: PDF, DOC, DOCX, TXT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
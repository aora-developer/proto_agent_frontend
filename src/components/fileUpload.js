import React from 'react';
import { Upload } from 'react-feather';

const FileUpload = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Upload Documents</h2>
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="flex flex-col items-center justify-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2">Drag and drop your files here</p>
          <span className="text-sm text-gray-500">or</span>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
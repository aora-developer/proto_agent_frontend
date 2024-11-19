import React, { useState } from 'react';
import { Eye, Trash2, FileText } from 'react-feather';
import Button from './button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './alertDialog';

function FileList({ documents = [] }) {
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDocumentId, setDeleteDocumentId] = useState(null);

  const handlePreview = (doc) => {
    setPreviewDoc(doc);
  };

  const handleDelete = (id) => {
    // Logic for file delete
    setIsDeleteDialogOpen(false);
    setDeleteDocumentId(null);
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-dashed border-gray-300 p-8">
        <div className="text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900">No documents</h3>
          <p className="mt-1 text-sm text-gray-500">Upload documents to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Documents List</h2>
      </div>

      {/* Table */}
      <div className="min-w-full">
        {/* Table Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-5 gap-4 px-6 py-3">
            <div className="text-xs font-medium text-gray-500 uppercase">File Name</div>
            <div className="text-xs font-medium text-gray-500 uppercase">File Type</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Status</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Uploaded Date</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <div key={doc.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-900 font-medium truncate cursor-pointer hover:text-blue-600"
                      onClick={() => handlePreview(doc)}>
                  {doc.name}
                </span>
              </div>
              <div className="text-sm text-gray-500">{doc.type}</div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                               bg-green-100 text-green-800">
                  {doc.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">{doc.created}</div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-blue-600"
                  onClick={() => handlePreview(doc)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <AlertDialog open={isDeleteDialogOpen && deleteDocumentId === doc.id}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Document</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this document? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(doc.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Dialog */}
      {previewDoc && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Preview: {previewDoc.name}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewDoc(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </Button>
            </div>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{previewDoc.content}</p>
            </div>
            <div className="mt-6 flex justify-end">
              <Button
                variant="ghost"
                onClick={() => setPreviewDoc(null)}
                className="text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FileList;
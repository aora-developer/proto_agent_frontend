import React, { useState } from 'react';
import { FileText, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
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
} from '@/components/ui/AlertDialog';
import FilePreview from './FilePreview';

function FileList({ documents = [], onDelete }) {
  const [previewDoc, setPreviewDoc] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteDocumentId, setDeleteDocumentId] = useState(null);

  const handlePreview = async (document) => {
    try {
      const response = await fetch(`/api/documents/${document._id}/content`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setPreviewDoc({
        ...document,
        url: url
      });
    } catch (error) {
      console.error('Preview error:', error);
    }
  };

  const openDeleteDialog = (id) => {
    setDeleteDocumentId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await onDelete(deleteDocumentId);
      setIsDeleteDialogOpen(false);
      setDeleteDocumentId(null);
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete document. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
    setDeleteDocumentId(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
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
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Documents List</h2>
      </div>

      <div className="min-w-full">
        {/* Title */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-6 gap-4 px-6 py-3">
            <div className="text-xs font-medium text-gray-500 uppercase col-span-2">File Name</div>
            <div className="text-xs font-medium text-gray-500 uppercase">File Type</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Status</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Upload Date</div>
            <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
          </div>
        </div>

        {/* Document List */}
        <div className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <div key={doc._id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="col-span-2">
                <button 
                  onClick={() => handlePreview(doc)}
                  className="flex items-center space-x-3 hover:text-blue-600 transition-colors"
                >
                  <FileText className="flex-shrink-0 h-5 w-5 text-gray-400" />
                  <span className="text-sm font-medium truncate">{doc.name}</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">{doc.type}</div>
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {doc.status}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {doc.uploadDate ? formatDate(doc.uploadDate) : '-'}
              </div>
              <div className="flex items-center">
                <AlertDialog 
                  open={isDeleteDialogOpen && deleteDocumentId === doc._id}
                  onOpenChange={(open) => {
                    if (!open) handleDeleteCancel();
                  }}
                >
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-400 hover:text-red-600"
                      onClick={() => openDeleteDialog(doc._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Document</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{doc.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={handleDeleteCancel}>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteConfirm}
                        className="bg-red-600 hover:bg-red-700"
                      >
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

      {/* Preview Modal */}
      {previewDoc && (
        <FilePreview
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
}

export default FileList;
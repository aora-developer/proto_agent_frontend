import React, { useState } from 'react';
import { Button, AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@components/ui';
import { Eye, Trash2 } from 'react-feather';

function FileList({ documents }) {
  const [previewDoc, setPreviewDoc] = useState(null);

  const handlePreview = (doc) => {
    setPreviewDoc(doc);
  };

  const handleDelete = (id) => {
    // Delete file
  };

  return (
    <div className="border rounded-lg">
      <div className="min-w-full divide-y">
        <div className="bg-gray-50">
          <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-gray-500">
            <div>File Name</div>
            <div>File Type</div>
            <div>File Status</div>
            <div>Uploaded Date</div>
            <div>Edit</div>
          </div>
        </div>
        <div className="bg-white divide-y">
          {documents.map((doc) => (
            <div key={doc.id} className="grid grid-cols-5 gap-4 px-6 py-4 text-sm text-gray-900">
              <div className="truncate" onClick={() => handlePreview(doc)}>{doc.name}</div>
              <div>{doc.type}</div>
              <div>{doc.status}</div>
              <div>{doc.created}</div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4 text-red-500" />
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
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
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
      {previewDoc && (
        <div className="preview-dialog">
          <h3>Preview: {previewDoc.name}</h3>
          <p>{previewDoc.content}</p>
          <Button onClick={() => setPreviewDoc(null)}>Close</Button>
        </div>
      )}
    </div>
  );
}

export default FileList;
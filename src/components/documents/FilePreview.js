import React, { useState, useEffect } from 'react';
import { FileText, AlertCircle, Loader, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/Alert';
import Button from '@/components/ui/Button';

const FilePreview = ({ document, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeKey, setIframeKey] = useState(0); 

  useEffect(() => {
    // reset statement
    setIsLoading(true);
    setError(null);
    setIframeKey(prev => prev + 1);
  }, [document?.url]);

  if (!document) {
    return null;
  }

  const handleIframeLoad = () => {
    console.log('Iframe loaded');
    setIsLoading(false);
  };

  const handleIframeError = () => {
    console.log('Iframe error');
    setError('Unable to load file preview. The file might be inaccessible or in an unsupported format.');
    setIsLoading(false);
  };

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setIframeKey(prev => prev + 1);
  };

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] flex flex-col" style={{ width: '1000px', height: '800px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-md">
              {document.name || 'Document Preview'}
            </h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6 relative" style={{ minHeight: '600px', minWidth: '1000px', height: '600px', width: '1000px' }}>
          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-10">
              <div className="flex flex-col items-center space-y-3">
                <Loader className="h-8 w-8 animate-spin text-blue-500" />
                <p className="text-sm text-gray-500">Loading preview...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="flex flex-col items-center space-y-4 max-w-md text-center px-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
                <Button onClick={handleRetry}>
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* Preview iframe */}
          {document.url && (
            <iframe
              key={iframeKey}
              src={document.url}
              className="w-full h-full border-0 rounded-md bg-gray-50"
              title={`Preview of ${document.name || 'document'}`}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              style={{ minHeight: '600px', minWidth: '900px' }} 
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilePreview;
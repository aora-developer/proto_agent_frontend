import React, { useState, useEffect } from "react";
import { FileText, AlertCircle, Loader, X } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import Button from "@/components/ui/Button";

const FilePreview = ({ document, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    // Reset state when document URL changes
    console.log("Document URL changed:", document?.url);
    console.log("Document type:", document?.type);
    setIsLoading(true);
    setError(null);
    setIframeKey((prev) => prev + 1);
  }, [document?.url]);

  // Cleanup URL when component unmounts or document changes
  useEffect(() => {
    return () => {
      if (document?.url) {
        console.log("Cleaning up URL:", document.url);
        URL.revokeObjectURL(document.url);
      }
    };
  }, [document?.url]);

  if (!document) {
    return null;
  }

  const handleIframeLoad = () => {
    console.log("Content loaded successfully");
    setIsLoading(false);
  };

  const handleIframeError = (e) => {
    console.error("Content load error:", e);
    setError(
      "Unable to load file preview. The file might be inaccessible or in an unsupported format."
    );
    setIsLoading(false);
  };

  const handleRetry = () => {
    console.log("Retrying preview");
    setIsLoading(true);
    setError(null);
    setIframeKey((prev) => prev + 1);
  };

  // Determine the type of preview to render
  const renderPreview = () => {
    if (!document?.url || !document?.type) {
      console.log('Missing document properties:', document);
      return null;
    }
  
    const documentType = document.type.toLowerCase();
    console.log('Rendering preview for type:', documentType);
  
    // PDF file
    if (documentType.includes('pdf')) {
      return (
        <iframe
          key={iframeKey}
          src={document.url}
          className="w-full h-full border-0 rounded-md bg-gray-50"
          title={`Preview of ${document.name}`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ minHeight: "600px", minWidth: "900px" }}
        />
      );
    }
  
    // Image file
    if (documentType.includes('image/') || 
        ['jpg', 'jpeg', 'png', 'gif'].some(ext => documentType.includes(ext))) {
      return (
        <div className="flex items-center justify-center h-full">
          <img
            src={document.url}
            alt={document.name}
            className="max-w-full max-h-full object-contain"
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      );
    }
  
    // Text file
    if (documentType.includes('text/') || 
        ['txt', 'json', 'md'].some(ext => documentType.includes(ext))) {
      return (
        <iframe
          key={iframeKey}
          src={document.url}
          className="w-full h-full border-0 rounded-md bg-gray-50"
          title={`Preview of ${document.name}`}
          onLoad={handleIframeLoad}
          onError={handleIframeError}
          style={{ minHeight: "600px", minWidth: "900px" }}
        />
      );
    }
  
    // Other document types
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">
            Preview not available for this file type ({document.type})
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Download the file to view its contents
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-500/75 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] flex flex-col"
        style={{ width: "1000px", height: "800px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="h-5 w-5 text-gray-400" />
            <h3 className="text-lg font-semibold text-gray-900 truncate max-w-md">
              {document.name || "Document Preview"}
            </h3>
            <span className="text-sm text-gray-500">
              ({document.type || "Unknown type"})
            </span>
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
        <div className="flex-1 overflow-auto p-6 relative">
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
                <Button onClick={handleRetry}>Try Again</Button>
              </div>
            </div>
          )}

          {/* Preview Content */}
          {!error && renderPreview()}
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

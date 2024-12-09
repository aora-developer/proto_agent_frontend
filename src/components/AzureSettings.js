import React, { useState } from 'react';
import { Save, Cloud, Key, Database, Edit2, Trash2 } from 'react-feather';
import Button from './Button';
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
} from './AlertDialog';

function AzureSettings() {
  const [newSettings, setNewSettings] = useState({
    clientId: '',
    clientSecret: '',
    tenantId: '',
    subscriptionId: ''
  });

  const [credentials, setCredentials] = useState([
    {
      id: 1,
      clientId: '8a4b9c3d2e1f',
      clientSecret: '********',
      tenantId: 'tenant123456',
      subscriptionId: 'sub789012'
    },
    {
      id: 2,
      clientId: '7b5a4c8d9e2f',
      clientSecret: '********',
      tenantId: 'tenant789012',
      subscriptionId: 'sub345678'
    }
  ]);

  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    credential: null,
    formData: {
      clientId: '',
      clientSecret: '',
      tenantId: '',
      subscriptionId: ''
    }
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    description: '',
    credentialId: null
  });

  const handleEdit = (credential) => {
    setEditDialog({
      isOpen: true,
      credential,
      formData: {
        clientId: credential.clientId,
        clientSecret: '',
        tenantId: credential.tenantId,
        subscriptionId: credential.subscriptionId
      }
    });
  };

  const handleDelete = (credential) => {
    setConfirmDialog({
      isOpen: true,
      action: 'delete',
      title: 'Delete Credential',
      description: `Are you sure you want to delete this Azure credential? This action cannot be undone.`,
      credentialId: credential.id
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newCredential = {
        id: Date.now(),
        ...newSettings,
        clientSecret: '********'
      };
      
      setCredentials(prev => [...prev, newCredential]);
      setNewSettings({
        clientId: '',
        clientSecret: '',
        tenantId: '',
        subscriptionId: ''
      });
      
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditDialog(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value
      }
    }));
  };

  const handleSaveEdit = () => {
    setConfirmDialog({
      isOpen: true,
      action: 'save-edit',
      title: 'Confirm Changes',
      description: 'Are you sure you want to save these changes to the Azure credential? This action will update the stored information.'
    });
  };

  const handleConfirmAction = () => {
    if (confirmDialog.action === 'save-edit') {
      setCredentials(prev => prev.map(cred => 
        cred.id === editDialog.credential.id
          ? { 
              ...cred, 
              ...editDialog.formData,
              clientSecret: editDialog.formData.clientSecret ? '********' : cred.clientSecret 
            }
          : cred
      ));
    } else if (confirmDialog.action === 'delete') {
      setCredentials(prev => prev.filter(cred => cred.id !== confirmDialog.credentialId));
    }
    handleCloseDialogs();
  };

  const handleCloseDialogs = () => {
    setEditDialog({
      isOpen: false,
      credential: null,
      formData: {
        clientId: '',
        clientSecret: '',
        tenantId: '',
        subscriptionId: ''
      }
    });
    setConfirmDialog({
      isOpen: false,
      action: null,
      title: '',
      description: '',
      credentialId: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Azure Configuration */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Azure Configuration</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client ID Input */}
          <div className="space-y-2">
            <label htmlFor="clientId" className="block text-sm font-medium text-gray-700">
              Client ID
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Cloud className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="clientId"
                name="clientId"
                value={newSettings.clientId}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Client ID"
                required
              />
            </div>
          </div>

          {/* Client Secret Input */}
          <div className="space-y-2">
            <label htmlFor="clientSecret" className="block text-sm font-medium text-gray-700">
              Client Secret
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="clientSecret"
                name="clientSecret"
                value={newSettings.clientSecret}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Client Secret"
                required
              />
            </div>
          </div>

          {/* Tenant ID Input */}
          <div className="space-y-2">
            <label htmlFor="tenantId" className="block text-sm font-medium text-gray-700">
              Tenant ID
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Database className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="tenantId"
                name="tenantId"
                value={newSettings.tenantId}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Tenant ID"
                required
              />
            </div>
          </div>

          {/* Subscription ID Input */}
          <div className="space-y-2">
            <label htmlFor="subscriptionId" className="block text-sm font-medium text-gray-700">
              Subscription ID
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Database className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="subscriptionId"
                name="subscriptionId"
                value={newSettings.subscriptionId}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Subscription ID"
                required
              />
            </div>
          </div>

          {/* Save */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </form>
      </div>

      {/* Credentials Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Credentials Management</h2>
        </div>
        
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-6 py-3">
              <div className="text-xs font-medium text-gray-500 uppercase">Client ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Client Secret</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Tenant ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Subscription ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {credentials.map((cred) => (
              <div key={cred.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="text-sm text-gray-900">{cred.clientId}</div>
                <div className="text-sm text-gray-900">{cred.clientSecret}</div>
                <div className="text-sm text-gray-900">{cred.tenantId}</div>
                <div className="text-sm text-gray-900">{cred.subscriptionId}</div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(cred)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(cred)}
                    className="text-gray-400 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <AlertDialog 
        open={editDialog.isOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleCloseDialogs();
        }}
      >
        <AlertDialogContent className="sm:max-w-md">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Edit Azure Credential
            </h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Client ID
              </label>
              <input
                type="text"
                name="clientId"
                value={editDialog.formData.clientId}
                onChange={handleEditFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                New Client Secret
              </label>
              <input
                type="password"
                name="clientSecret"
                value={editDialog.formData.clientSecret}
                onChange={handleEditFormChange}
                placeholder="Leave blank to keep current secret"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Tenant ID
              </label>
              <input
                type="text"
                name="tenantId"
                value={editDialog.formData.tenantId}
                onChange={handleEditFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Subscription ID
              </label>
              <input
                type="text"
                name="subscriptionId"
                value={editDialog.formData.subscriptionId}
                onChange={handleEditFormChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end px-6 py-4 border-t border-gray-200 gap-3">
            <Button
              variant="ghost"
              onClick={handleCloseDialogs}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
            >
              Save Changes
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm Dialog */}
    <AlertDialog 
      open={confirmDialog.isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) setConfirmDialog(prev => ({ ...prev, isOpen: false }));
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
          <AlertDialogDescription>
            {confirmDialog.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCloseDialogs}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirmAction}>
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
);

}

export default AzureSettings;
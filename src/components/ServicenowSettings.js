import React, { useState } from 'react';
import { Save, Key, Globe, User, Edit2, X, Trash2 } from 'react-feather';
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

function ServicenowSettings() {
  // Create new setting statement
  const [newSettings, setNewSettings] = useState({
    instanceUrl: '',
    username: '',
    password: '',
  });

  // Current credential statement
  const [credentials, setCredentials] = useState([
    {
      id: 1,
      instanceUrl: 'https://dev.service-now.com',
      username: 'admin.dev',
      password: '********',
    },
    {
      id: 2,
      instanceUrl: 'https://test.service-now.com',
      username: 'admin.test',
      password: '********',
    },
  ]);

  // Edit related statement
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    credential: null,
    formData: {
      instanceUrl: '',
      username: '',
      password: '',
    }
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    description: '',
    credentialId: null
  });

  // Open the edition dialog
  const handleEdit = (credential) => {
    setEditDialog({
      isOpen: true,
      credential,
      formData: {
        instanceUrl: credential.instanceUrl,
        username: credential.username,
        password: '', // Reset PW
      }
    });
  };

  const handleDelete = (credential) => {
    setConfirmDialog({
      isOpen: true,
      action: 'delete',
      title: 'Delete Credential',
      description: `Are you sure you want to delete the credential for ${credential.username}? This action cannot be undone.`,
      credentialId: credential.id
    });
  };

  // Precess new settings change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Precess new settings list submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Add backend API
      console.log('Saving new settings:', newSettings);
      
      // Add to credential list
      const newCredential = {
        id: Date.now(), // Timestamp as temporary ID
        ...newSettings,
        password: '********' // Unshown the actrual PW
      };
      
      setCredentials(prev => [...prev, newCredential]);
      
      // Clear the list
      setNewSettings({
        instanceUrl: '',
        username: '',
        password: '',
      });
      
    } catch (error) {
      console.error('Failed to save settings:', error);
      // TODO: Add UI for Error Message
      alert('Failed to save settings. Please try again.');
    }
  };

  // Process list change
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

  // Process edition saving
  const handleSaveEdit = () => {
    setConfirmDialog({
      isOpen: true,
      action: 'save-edit',
      title: 'Confirm Changes',
      description: 'Are you sure you want to save these changes to the credential? This action will update the stored information.'
    });
  };

  // Confirm action (save or delete)
  const handleConfirmAction = () => {
    if (confirmDialog.action === 'save-edit') {
      // Update credential
      setCredentials(prev => prev.map(cred => 
        cred.id === editDialog.credential.id
          ? { 
              ...cred, 
              ...editDialog.formData,
              password: editDialog.formData.password ? '********' : cred.password 
            }
          : cred
      ));
    } else if (confirmDialog.action === 'delete') {
      // Delete credential
      setCredentials(prev => prev.filter(cred => cred.id !== confirmDialog.credentialId));
    }
    // Clear dialogs
    handleCloseDialogs();
  };

  // Close all dialogs
  const handleCloseDialogs = () => {
    setEditDialog({
      isOpen: false,
      credential: null,
      formData: {
        instanceUrl: '',
        username: '',
        password: '',
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
      {/* ServiceNow Configuration */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">ServiceNow Configuration</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Instance URL Input */}
          <div className="space-y-2">
            <label htmlFor="instanceUrl" className="block text-sm font-medium text-gray-700">
              Instance URL
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                id="instanceUrl"
                name="instanceUrl"
                value={newSettings.instanceUrl}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://your-instance.service-now.com"
                required
              />
            </div>
          </div>

          {/* Username Input */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={newSettings.username}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={newSettings.password}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter password"
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

      {/* Credentials Management Module */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Credentials Management</h2>
        </div>
        
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-4 gap-4 px-6 py-3">
              <div className="text-xs font-medium text-gray-500 uppercase">Instance URL</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Username</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Password</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {credentials.map((cred) => (
              <div key={cred.id} className="grid grid-cols-4 gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="text-sm text-gray-900">{cred.instanceUrl}</div>
                <div className="text-sm text-gray-900">{cred.username}</div>
                <div className="text-sm text-gray-900">{cred.password}</div>
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
            Edit Credential
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleEdit(editDialog.credential)}
            className="text-gray-400 hover:text-blue-600"
          >
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Instance URL
            </label>
            <input
              type="url"
              name="instanceUrl"
              value={editDialog.formData.instanceUrl}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={editDialog.formData.username}
              onChange={handleEditFormChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={editDialog.formData.password}
              onChange={handleEditFormChange}
              placeholder="Leave blank to keep current password"
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

export default ServicenowSettings;
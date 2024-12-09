import React, { useState } from 'react';
import { Save, Hash, Key, Briefcase, Edit2, Trash2 } from 'react-feather'; 
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

function SlackSettings() {
  // New settings state
  const [newSettings, setNewSettings] = useState({
    botToken: '',
    appToken: '',
    channelId: '',
    workspaceName: '',
  });

  // Current settings state
  const [settings, setSettings] = useState([
    {
      id: 1,
      botToken: "xoxb-sample1",
      appToken: "xapp-sample1",
      channelId: "C0123ABC",
      workspaceName: "Team Workspace",
    },
    {
      id: 2,
      botToken: "xoxb-sample2",
      appToken: "xapp-sample2",
      channelId: "C0456DEF",
      workspaceName: "Project Workspace",
    },
  ]);

  // Edit dialog state
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    setting: null,
    formData: {
      botToken: '',
      appToken: '',
      channelId: '',
      workspaceName: '',
    }
  });

  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    action: null,
    title: '',
    description: '',
    settingId: null
  });

  // Handle edit button click
  const handleEdit = (setting) => {
    setEditDialog({
      isOpen: true,
      setting,
      formData: {
        botToken: setting.botToken,
        appToken: setting.appToken,
        channelId: setting.channelId,
        workspaceName: setting.workspaceName,
      }
    });
  };

  // Handle delete button click
  const handleDelete = (setting) => {
    setConfirmDialog({
      isOpen: true,
      action: 'delete',
      title: 'Delete Slack Connection',
      description: `Are you sure you want to delete the connection for workspace "${setting.workspaceName}"? This action cannot be undone.`,
      settingId: setting.id
    });
  };

  // Handle new settings input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle new settings form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Add backend API
      console.log('Saving new settings:', newSettings);
      
      // Add to settings list
      const newSetting = {
        id: Date.now(),
        ...newSettings,
      };
      
      setSettings(prev => [...prev, newSetting]);
      
      // Clear the form
      setNewSettings({
        botToken: '',
        appToken: '',
        channelId: '',
        workspaceName: '',
      });
      
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings. Please try again.');
    }
  };

  // Handle edit form input change
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

  // Handle save edit button click
  const handleSaveEdit = () => {
    setConfirmDialog({
      isOpen: true,
      action: 'save-edit',
      title: 'Confirm Changes',
      description: 'Are you sure you want to save these changes to the Slack connection? This action will update the stored information.'
    });
  };

  // Handle confirm action
  const handleConfirmAction = () => {
    if (confirmDialog.action === 'save-edit') {
      setSettings(prev => prev.map(setting => 
        setting.id === editDialog.setting.id
          ? { ...setting, ...editDialog.formData }
          : setting
      ));
    } else if (confirmDialog.action === 'delete') {
      setSettings(prev => prev.filter(setting => setting.id !== confirmDialog.settingId));
    }
    handleCloseDialogs();
  };

  // Close all dialogs
  const handleCloseDialogs = () => {
    setEditDialog({
      isOpen: false,
      setting: null,
      formData: {
        botToken: '',
        appToken: '',
        channelId: '',
        workspaceName: '',
      }
    });
    setConfirmDialog({
      isOpen: false,
      action: null,
      title: '',
      description: '',
      settingId: null
    });
  };

  return (
    <div className="space-y-6">
      {/* Slack Configuration */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Slack Configuration</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Bot Token Input */}
          <div className="space-y-2">
            <label htmlFor="botToken" className="block text-sm font-medium text-gray-700">
              Bot Token
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="botToken"
                name="botToken"
                value={newSettings.botToken}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Bot Token (xoxb-...)"
                required
              />
            </div>
          </div>

          {/* App Token Input */}
          <div className="space-y-2">
            <label htmlFor="appToken" className="block text-sm font-medium text-gray-700">
              App Token
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="appToken"
                name="appToken"
                value={newSettings.appToken}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter App Token (xapp-...)"
                required
              />
            </div>
          </div>

          {/* Channel ID Input */}
          <div className="space-y-2">
            <label htmlFor="channelId" className="block text-sm font-medium text-gray-700">
              Channel ID
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="channelId"
                name="channelId"
                value={newSettings.channelId}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Channel ID"
                required
              />
            </div>
          </div>

          {/* Workspace Name Input */}
          <div className="space-y-2">
            <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700">
              Workspace Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Briefcase className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="workspaceName"
                name="workspaceName"
                value={newSettings.workspaceName}
                onChange={handleInputChange}
                className="block w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Workspace Name"
                required
              />
            </div>
          </div>

          {/* Save Button */}
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

      {/* Slack Connections Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Slack Connections Management</h2>
        </div>
        
        <div className="min-w-full">
          {/* Table Header */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-6 py-3">
              <div className="text-xs font-medium text-gray-500 uppercase">Workspace</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Channel ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Bot Token</div>
              <div className="text-xs font-medium text-gray-500 uppercase">App Token</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {settings.map((setting) => (
              <div key={setting.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50">
                <div className="text-sm text-gray-900">{setting.workspaceName}</div>
                <div className="text-sm text-gray-900">{setting.channelId}</div>
                <div className="text-sm text-gray-900">{`${setting.botToken.substring(0, 8)}...`}</div>
                <div className="text-sm text-gray-900">{`${setting.appToken.substring(0, 8)}...`}</div>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(setting)}
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(setting)}
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

export default SlackSettings;
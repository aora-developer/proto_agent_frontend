import React, { useState } from 'react';
import AlertDialog from './AlertDialog';

const AzureSettings = () => {
  const [settings, setSettings] = useState([]);
  const [newSetting, setNewSetting] = useState({
    clientId: '',
    clientSecret: '',
    tenantId: '',
    subscriptionId: ''
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSetting(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    if (isEditing) {
      setSettings(settings.map(setting => 
        setting === selectedSetting ? newSetting : setting
      ));
      setIsEditing(false);
    } else {
      setSettings([...settings, newSetting]);
    }
    setNewSetting({
      clientId: '',
      clientSecret: '',
      tenantId: '',
      subscriptionId: ''
    });
  };

  const handleEdit = (setting) => {
    setNewSetting(setting);
    setSelectedSetting(setting);
    setIsEditing(true);
  };

  const handleDelete = (setting) => {
    setSelectedSetting(setting);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setSettings(settings.filter(setting => setting !== selectedSetting));
    setShowDeleteDialog(false);
  };

  return (
    <div className="p-6">
      {/* Input Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Azure Connection' : 'New Azure Connection'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client ID
            </label>
            <input
              type="text"
              name="clientId"
              value={newSetting.clientId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Client ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Client Secret
            </label>
            <input
              type="password"
              name="clientSecret"
              value={newSetting.clientSecret}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Client Secret"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant ID
            </label>
            <input
              type="text"
              name="tenantId"
              value={newSetting.tenantId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Tenant ID"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subscription ID
            </label>
            <input
              type="text"
              name="subscriptionId"
              value={newSetting.subscriptionId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Subscription ID"
            />
          </div>
          <button
            onClick={handleSave}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isEditing ? 'Update Settings' : 'Save Settings'}
          </button>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Saved Azure Connections</h2>
        <div className="space-y-4">
          {settings.map((setting, index) => (
            <div 
              key={index} 
              className="p-4 border border-gray-200 rounded-lg flex items-center justify-between"
            >
              <div>
                <p className="font-medium">Client ID: {setting.clientId}</p>
                <p className="text-gray-600">Tenant ID: {setting.tenantId}</p>
                <p className="text-gray-600">Subscription ID: {setting.subscriptionId}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(setting)}
                  className="px-3 py-1 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(setting)}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete Azure Connection"
        message="Are you sure you want to delete this Azure connection? This action cannot be undone."
      />
    </div>
  );
};

export default AzureSettings;
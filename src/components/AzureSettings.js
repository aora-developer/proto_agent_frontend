import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Azure Connection Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Client ID</label>
              <Input
                name="clientId"
                value={newSetting.clientId}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter Client ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Client Secret</label>
              <Input
                name="clientSecret"
                type="password"
                value={newSetting.clientSecret}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter Client Secret"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tenant ID</label>
              <Input
                name="tenantId"
                value={newSetting.tenantId}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter Tenant ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subscription ID</label>
              <Input
                name="subscriptionId"
                value={newSetting.subscriptionId}
                onChange={handleInputChange}
                className="w-full"
                placeholder="Enter Subscription ID"
              />
            </div>
            <Button onClick={handleSave}>
              {isEditing ? 'Update Settings' : 'Save Settings'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Saved Azure Connections</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded">
                <div>
                  <p className="font-medium">Client ID: {setting.clientId}</p>
                  <p>Tenant ID: {setting.tenantId}</p>
                  <p>Subscription ID: {setting.subscriptionId}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => handleEdit(setting)}>
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(setting)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
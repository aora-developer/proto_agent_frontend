import React from 'react';
import AzureSettings from '../components/AzureSettings';

const AzureSettingsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Azure Connection Settings</h1>
      <AzureSettings />
    </div>
  );
};

export default AzureSettingsPage;
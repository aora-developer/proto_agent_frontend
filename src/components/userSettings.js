import React, { useState } from 'react';

function UserSettings() {
  const [instanceUrl, setInstanceUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="card">
      <h3>User Settings</h3>
      <div>
        <label>ServiceNow Instance URL:</label>
        <input type="text" value={instanceUrl} onChange={(e) => setInstanceUrl(e.target.value)} />
      </div>
      <div>
        <label>username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
    </div>
  );
}

export default UserSettings;
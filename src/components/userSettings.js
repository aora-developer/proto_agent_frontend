import React from 'react';

function UserSettings() {
  return (
    <div className="user-settings">
      <h3>ServiceNow Settings</h3>
      <form>
        <label>
          Instance URL:
          <input type="text" name="instanceUrl" />
        </label>
        <label>
          Username:
          <input type="text" name="username" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserSettings;
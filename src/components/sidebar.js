import React from 'react';

function Sidebar({ onSelect }) {
  return (
    <div className="sidebar">
      <h2>RAG Management</h2>
      <ul>
        <li onClick={() => onSelect('documents')}>RAG Documents</li>
        <li onClick={() => onSelect('settings')}>ServiceNow Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;
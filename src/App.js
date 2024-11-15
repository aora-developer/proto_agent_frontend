import React from 'react';
import Sidebar from './components/sidebar.js';
import FileUpload from './components/fileUpload.js';
import FileList from './components/fileList.js';
import UserSettings from './components/userSettings.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="content">
        <FileUpload />
        <FileList />
        <UserSettings />
      </div>
    </div>
  );
}

export default App;
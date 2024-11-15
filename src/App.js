import React from 'react';
import Sidebar from './components/Sidebar';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import UserSettings from './components/UserSettings';
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
import React, { useState } from 'react';
import Sidebar from './components/sidebar';
import FileUpload from './components/fileUpload';
import FileList from './components/fileList';
import UserSettings from './components/userSettings';
import './App.css';

function App() {
  const [selectedPage, setSelectedPage] = useState('documents');

  const renderContent = () => {
    switch (selectedPage) {
      case 'documents':
        return (
          <>
            <FileUpload />
            <FileList />
          </>
        );
      case 'settings':
        return <UserSettings />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Sidebar onSelect={setSelectedPage} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
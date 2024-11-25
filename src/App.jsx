import React from 'react';
import Sidebar from './components/Sidebar';
import DocumentsPage from './pages/DocumentsPage';
import AccessControlPage from './pages/AccessControlPage';
import SyncDataPage from './pages/SyncDataPage';

const App = () => {
  const [selectedPage, setSelectedPage] = React.useState('documents');

  const renderPage = () => {
    switch (selectedPage) {
      case 'documents':
        return <DocumentsPage />;
      case 'access-control':
        return <AccessControlPage />;
      case 'sync-data':
        return <SyncDataPage />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row">
      <Sidebar selectedPage={selectedPage} onSelect={setSelectedPage} />
      <main className="flex-1 ml-64 p-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
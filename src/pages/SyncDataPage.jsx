import React, { useState } from 'react';
import { Database, RefreshCw, Search, Eye } from 'react-feather';
import Button from '../components/Button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../components/AlertDialog';

function SyncDataPage() {
  // Sync data list
  const [syncData, setSyncData] = useState([
    {
      id: 1,
      recordId: 'INC0010001',
      type: 'Incident',
      summary: 'System performance',
      syncStatus: 'success',
      lastSync: '2024-11-25T10:30:00',
      details: {
        priority: 'High',
        assignedTo: 'John Doe',
        createdAt: '2024-11-24T09:00:00',
        description: 'Too long reaction time for user report'
      }
    },
    {
      id: 2,
      recordId: 'CHG0010002',
      type: 'Change',
      summary: 'Database Update',
      syncStatus: 'pending',
      lastSync: '2024-11-24T15:45:00',
      details: {
        priority: 'Medium',
        assignedTo: 'Jane Smith',
        createdAt: '2024-11-23T14:30:00',
        description: 'On schedule'
      }
    }
  ]);

  // Search statement
  const [searchTerm, setSearchTerm] = useState('');
  
  // Detailed dialog statement
  const [detailsDialog, setDetailsDialog] = useState({
    isOpen: false,
    record: null
  });

  // Manually sync
  const handleSync = async () => {
    try {
      // TODO: syn logic
      console.log('Syncing data...');
      
      // Simulation
      setSyncData(prev => prev.map(record => ({
        ...record,
        lastSync: new Date().toISOString(),
        syncStatus: 'success'
      })));
    } catch (error) {
      console.error('Sync failed:', error);
      alert('Failed to sync data. Please try again.');
    }
  };

  // Check the details
  const handleViewDetails = (record) => {
    setDetailsDialog({
      isOpen: true,
      record
    });
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-');
  };

  return (
    <div className="space-y-6">
      {/* Header and title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
          <Database className="mr-2 h-6 w-6 text-blue-500" />
          ServiceNow Sync Data
        </h1>
        <Button
          onClick={handleSync}
          className="flex items-center"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Sync Now
        </Button>
      </div>

      {/* Search box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by record ID or type..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Sync data list */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Synchronized Records</h2>
        </div>
        
        <div className="min-w-full">
          {/* Table title */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-6 gap-4 px-6 py-3">
              <div className="text-xs font-medium text-gray-500 uppercase">Record ID</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Type</div>
              <div className="text-xs font-medium text-gray-500 uppercase col-span-2">Summary</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Status</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
            </div>
          </div>

          {/* Ttable content */}
          <div className="divide-y divide-gray-200">
            {syncData
              .filter(record => 
                record.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                record.type.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(record => (
                <div key={record.id} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50">
                  <div className="text-sm font-medium text-blue-600">{record.recordId}</div>
                  <div className="text-sm text-gray-900">{record.type}</div>
                  <div className="text-sm text-gray-500 col-span-2">{record.summary}</div>
                  <div className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${record.syncStatus === 'success' 
                        ? 'bg-green-100 text-green-800'
                        : record.syncStatus === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'}`}>
                      {record.syncStatus}
                    </span>
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(record)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Dialog details */}
      <AlertDialog
        open={detailsDialog.isOpen}
        onOpenChange={(isOpen) => !isOpen && setDetailsDialog({ isOpen: false, record: null })}
      >
        <AlertDialogContent className="sm:max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>{detailsDialog.record?.recordId} Details</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${detailsDialog.record?.syncStatus === 'success' 
                  ? 'bg-green-100 text-green-800'
                  : detailsDialog.record?.syncStatus === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'}`}>
                {detailsDialog.record?.syncStatus}
              </span>
            </AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500">Summary</h4>
              <p className="mt-1 text-sm text-gray-900">{detailsDialog.record?.summary}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Priority</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsDialog.record?.details.priority}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Assigned To</h4>
                <p className="mt-1 text-sm text-gray-900">{detailsDialog.record?.details.assignedTo}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500">Description</h4>
              <p className="mt-1 text-sm text-gray-900">{detailsDialog.record?.details.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Created At</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {detailsDialog.record?.details.createdAt && formatDate(detailsDialog.record.details.createdAt)}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Last Synced</h4>
                <p className="mt-1 text-sm text-gray-900">
                  {detailsDialog.record?.lastSync && formatDate(detailsDialog.record.lastSync)}
                </p>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDetailsDialog({ isOpen: false, record: null })}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default SyncDataPage;
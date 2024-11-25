import React, { useState } from 'react';
import { Shield, UserPlus, Search, Edit2, Save } from 'react-feather';
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

function AccessControlPage() {
  // Access control list
  const [permissions, setPermissions] = useState([
    {
      id: 1,
      documentId: 'doc-001',
      documentName: 'Introduction to ServiceNow.pdf',
      role: 'admin',
      accessLevel: 'full',
      lastModified: '2024-11-25T10:30:00'
    },
    {
      id: 2,
      documentId: 'doc-002',
      documentName: 'ServiceNow Basic Guildline.docx',
      role: 'viewer',
      accessLevel: 'read',
      lastModified: '2024-11-24T15:45:00'
    }
  ]);

  // Edit dialog statment
  const [editDialog, setEditDialog] = useState({
    isOpen: false,
    permission: null
  });

  // Create new dialog statement
  const [newPermissionDialog, setNewPermissionDialog] = useState(false);

  // Search statement
  const [searchTerm, setSearchTerm] = useState('');

  // Processing edit
  const handleEdit = (permission) => {
    setEditDialog({
      isOpen: true,
      permission: { ...permission }
    });
  };

  // Processing save
  const handleSave = (updatedPermission) => {
    setPermissions(prev => 
      prev.map(p => p.id === updatedPermission.id ? updatedPermission : p)
    );
    setEditDialog({ isOpen: false, permission: null });
  };

  // Processing add admission
  const handleAddPermission = (newPermission) => {
    setPermissions(prev => [...prev, {
      id: Date.now(),
      ...newPermission,
      lastModified: new Date().toISOString()
    }]);
    setNewPermissionDialog(false);
  };

  return (
    <div className="space-y-6">
      {/* Header and action bar */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-blue-500" />
          RAG Access Control
        </h1>
        <Button
          onClick={() => setNewPermissionDialog(true)}
          className="flex items-center"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Add Permission
        </Button>
      </div>

      {/* Search box */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search documents or roles..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Admission list */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Permission Settings</h2>
        </div>
        
        <div className="min-w-full">
          {/* Table title */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="grid grid-cols-5 gap-4 px-6 py-3">
              <div className="text-xs font-medium text-gray-500 uppercase">Document</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Role</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Access Level</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Last Modified</div>
              <div className="text-xs font-medium text-gray-500 uppercase">Actions</div>
            </div>
          </div>

          {/* Table content */}
          <div className="divide-y divide-gray-200">
            {permissions
              .filter(p => 
                p.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.role.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(permission => (
                <div key={permission.id} className="grid grid-cols-5 gap-4 px-6 py-4 hover:bg-gray-50">
                  <div className="text-sm text-gray-900">{permission.documentName}</div>
                  <div className="text-sm text-gray-900">{permission.role}</div>
                  <div className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${permission.accessLevel === 'full' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'}`}>
                      {permission.accessLevel}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(permission.lastModified).toLocaleString()}
                  </div>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(permission)}
                      className="text-gray-400 hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Edit dialog */}
      <AlertDialog
        open={editDialog.isOpen}
        onOpenChange={(isOpen) => !isOpen && setEditDialog({ isOpen: false, permission: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Edit Permission</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={editDialog.permission?.role || ''}
                onChange={(e) => setEditDialog(prev => ({
                  ...prev,
                  permission: { ...prev.permission, role: e.target.value }
                }))}
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Access Level</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={editDialog.permission?.accessLevel || ''}
                onChange={(e) => setEditDialog(prev => ({
                  ...prev,
                  permission: { ...prev.permission, accessLevel: e.target.value }
                }))}
              >
                <option value="full">Full Access</option>
                <option value="read">Read Only</option>
              </select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleSave(editDialog.permission)}
            >
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Create new permission dialog */}
      <AlertDialog
        open={newPermissionDialog}
        onOpenChange={setNewPermissionDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Permission</AlertDialogTitle>
            <AlertDialogDescription>
              Configure access permissions for RAG documents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* Add new permission to list */}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AccessControlPage;
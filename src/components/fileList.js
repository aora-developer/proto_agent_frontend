import React, { useState } from 'react';

function FileList() {
  const [files, setFiles] = useState([
    { name: 'file1.txt', type: 'text', status: 'uploaded', date: '2024-11-15' },
    { name: 'file2.jpg', type: 'image', status: 'uploaded', date: '2024-11-14' }
  ]);

  const handleDelete = (fileName) => {
    if (window.confirm(`Are you sure to delete ${fileName} ?`)) {
      setFiles(files.filter(file => file.name !== fileName));
    }
  };

  const handlePreview = (fileName) => {
    alert(`Preview: ${fileName}`);
  };

  return (
    <div className="card">
      <h3>Uploaded Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.name}>
            <span onClick={() => handlePreview(file.name)}>{file.name}</span>
            <button onClick={() => handleDelete(file.name)}>Delete</button>
            <div>File Type: {file.type}</div>
            <div>File Status: {file.status}</div>
            <div>Uploaded Date: {file.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
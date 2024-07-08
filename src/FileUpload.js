import React, { useState, useEffect } from 'react';
import './FileUpload.css';
import fileIcon from './file-icon.png'; // Ensure the path is correct
import uploadIcon from './upload-icon.png'; // Add your upload icon path

const FileUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (newFiles) => {
    if (files.length + newFiles.length > 10) {
      alert('Maximum upload limit is 10 documents');
      return;
    }

    const allowedTypes = ['txt', 'pdf', 'doc', 'docx'];
    const filteredFiles = newFiles.filter(file => {
      const fileType = file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(fileType)) {
        alert('Only text, PDF, or Word documents should be uploaded');
        return false;
      }
      return true;
    });

    const mappedFiles = filteredFiles.map(file => ({
      name: file.name,
      type: file.name.split('.').pop(),
      progress: 0,
      status: 'Uploading'
    }));

    setFiles([...files, ...mappedFiles]);
  };

  const handleRemoveFile = (fileName) => {
    setFiles(files.filter(file => file.name !== fileName));
  };

  const onDrop = (e) => {
    e.preventDefault();
    const newFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(newFiles);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFiles(files => 
        files.map(file => {
          if (file.status === 'Uploading' && file.progress < 100) {
            const newProgress = Math.min(file.progress + Math.random() * 10, 100);
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? 'Completed' : 'Uploading'
            };
          }
          return file;
        })
      );
    }, 500);
    
    return () => clearInterval(interval);
  }, []);

  const handleClassify = () => {
    // Add classification logic here
    alert("Classify button clicked!");
  };

  return (
    <div className="upload-container">
      <h1 className="title">Judicial Case Classifier</h1>
      <div className="content">
        <div className="card upload-box" onDrop={onDrop} onDragOver={onDragOver}>
          <img src={uploadIcon} alt="upload icon" className="upload-icon"/>
          <div className="upload-prompt">
            <p>Drag and drop files here</p>
            <p>- OR -</p>
            <input 
              type="file" 
              multiple 
              className="browse-button" 
              onChange={(e) => handleFileUpload(Array.from(e.target.files))}
              accept=".txt,.pdf,.doc,.docx"
            />
            <p className="warning">* Only text, PDF, or Word documents should be uploaded</p>
          </div>
        </div>
        <div className="card uploaded-files">
          <h2>Uploaded Files</h2>
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={index} className="file-item">
                <div className="file-icon">
                  <img src={fileIcon} alt="file icon" className="file-icon-image"/>
                </div>
                <div className="file-details">
                  <p>{file.name}</p>
                  <div className="progress-bar">
                    <div
                      className={`progress ${file.status === 'File size is too large' ? 'error' : ''}`}
                      style={{ width: `${file.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="file-status">
                  <p>{file.status}</p>
                </div>
                <button className="remove-button" onClick={() => handleRemoveFile(file.name)}>Remove</button>
              </div>
            ))
          ) : (
            <p>No files uploaded yet.</p>
          )}
          {files.length > 0 && (
            <button className="classify-button" onClick={handleClassify}>Classify</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
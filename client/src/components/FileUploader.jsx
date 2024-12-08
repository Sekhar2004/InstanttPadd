import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !['image/png', 'image/jpeg', 'application/pdf'].includes(selectedFile.type)) {
      alert('Only PNG, JPEG, or PDF files are allowed.');
      return;
    }
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://instanttpadd.onrender.com/api/files/upload', formData);
      setQrCode(response.data.qrCode);
    } catch (err) {
      console.error('File upload failed:', err);
      alert('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h1>InstantPad - File Sharing</h1>
      <input type="file" style={{ margin: '10px' }} onChange={handleFileChange} />
      <button
        style={{ padding: '10px 20px', cursor: 'pointer' }}
        onClick={handleUpload}
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {qrCode ? (
        <img src={qrCode} alt="QR Code" style={{ marginTop: '20px', maxWidth: '200px' }} />
      ) : (
        <p>QR Code will appear here after a successful upload.</p>
      )}
    </div>
  );
};

export default FileUploader;

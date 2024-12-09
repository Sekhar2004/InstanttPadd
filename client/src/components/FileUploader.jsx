import React, { useState } from 'react';
import axios from 'axios';
import './FileUploader.css'; // Import the CSS for styling

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://instanttpadd.onrender.com/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setQrCode(response.data.qrCode); // Set the QR code image
      console.log('File uploaded successfully:', response.data.fileUrl); // File URL from Cloudinary
    } catch (err) {
      console.error('File upload failed:', err);
    }
  };

  return (
    <div className="file-uploader-container">
      <h1>InstantPad - File Sharing</h1>
      <div className="file-upload-box">
        <input type="file" onChange={handleFileChange} className="file-input" />
        <button onClick={handleUpload} className="upload-btn">Upload</button>
      </div>
      {qrCode && <div className="qr-code-container"><img src={qrCode} alt="QR Code" className="qr-code" /></div>}
    </div>
  );
};

export default FileUploader;
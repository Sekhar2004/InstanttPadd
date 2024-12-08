import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://instanttpadd.onrender.com/api/files/upload', formData);
      setQrCode(response.data.qrCode);
    } catch (err) {
      console.error('File upload failed:', err);
    }
  };

  return (
    <div>
      <h1>InstantPad - File Sharing</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default FileUploader;

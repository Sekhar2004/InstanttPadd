import React, { useState } from 'react';
import axios from 'axios';

const QRCodeScanner = () => {
  const [fileDetails, setFileDetails] = useState(null);
  const [qrCodeURL, setQRCodeURL] = useState('');

  const fetchFile = async () => {
    try {
      const response = await axios.get(qrCodeURL);
      setFileDetails(response.data);
    } catch (err) {
      console.error('Failed to fetch file details:', err);
    }
  };

  return (
    <div>
      {/* <h2>Scan QR Code</h2> */}
      {/* <input
        type="text"
        placeholder="Enter QR Code URL"
        value={qrCodeURL}
        onChange={(e) => setQRCodeURL(e.target.value)}
      />
      <button onClick={fetchFile}>Fetch File</button>
      {fileDetails && <div>File Name: {fileDetails.fileName}</div>} */}
    </div>
  );
};

export default QRCodeScanner;

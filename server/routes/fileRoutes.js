const express = require('express');
const cloudinary = require('cloudinary').v2;
const QRCode = require('qrcode');
const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: 'dgyxq7g5g',
  api_key: '232528834217566',
  api_secret: '6MvepldqWkjylOJUSzFxWhzVjpc',
});

// API endpoint to upload a file
router.post('/upload', async (req, res) => {
  try {
    // Check if any file was uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.file;

    cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'auto' }, async (err, result) => {
      if (err) {
        return res.status(500).send('Error uploading file to Cloudinary.');
      }

      const qrCodeDataUrl = await generateQrCode(result.secure_url);

      res.status(200).json({
        message: 'File uploaded successfully!',
        fileUrl: result.secure_url,
        publicId: result.public_id, 
        qrCode: qrCodeDataUrl, 
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading file.');
  }
});

const generateQrCode = async (url) => {
  try {
    return await QRCode.toDataURL(url); 
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

module.exports = router;
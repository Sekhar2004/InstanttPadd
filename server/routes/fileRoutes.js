const express = require('express');
const multer = require('multer');
const QRCode = require('qrcode');
const File = require('../models/File');
const path = require('path');
const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const qrCode = await QRCode.toDataURL(fileUrl);

    // Save metadata to MongoDB
    const newFile = new File({
      fileName: req.file.originalname,
      fileUrl,
    });
    const savedFile = await newFile.save();

    res.json({ fileUrl, qrCode, fileId: savedFile._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Fetch File Metadata
router.get('/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) return res.status(404).json({ error: 'File not found' });

    res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch file details' });
  }
});

module.exports = router;

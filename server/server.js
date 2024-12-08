
const express = require('express');
const path = require('path');

const connectDB = require('./db');
const cors = require('cors');
const fileRoutes = require('./routes/fileRoutes');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

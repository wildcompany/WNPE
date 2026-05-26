const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/db');

const inquiryRoutes = require('./routes/inquiryRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/inquiry', inquiryRoutes);

app.get('/', (req, res) => {
  res.send('API Running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
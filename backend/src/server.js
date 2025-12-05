const express = require('express');
const cors = require('cors');
const path = require('path');

const notesRoutes = require('./routes/notesRoutes.js');
const connectDB = require('./config/db.js');

const dotenv = require('dotenv');
const rateLimiter = require('./middleware/rateLimiter.js');

dotenv.config();

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
  })); 
} 
app.use(rateLimiter);
const PORT = process.env.PORT || 5001;

app.use('/api/notes', notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});

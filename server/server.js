const exp = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connect = require('./config/db');

const app = exp();
const PORT = process.env.PORT || 5000;

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));
app.use(exp.json());
app.use(cookieParser());

// Routes
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// Connect DB, then start server
connect().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

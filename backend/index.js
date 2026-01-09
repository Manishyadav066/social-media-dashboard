const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const chatRoutes = require('./routes/chat');

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/chat', chatRoutes);

app.use('/api/chat', chatRoutes);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Handle SPA routing: serve index.html for any unknown routes
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const { getOverviewStats, getPlatformStats, getAllPlatforms } = require('../controllers/dashboardController');

// In a real app, add middleware like authenticateToken here
router.get('/stats', getOverviewStats);
router.get('/platforms', getAllPlatforms);
router.get('/platform/:id', getPlatformStats);

module.exports = router;

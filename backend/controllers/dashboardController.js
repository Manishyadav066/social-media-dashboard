const db = require('../db');

const getOverviewStats = async (req, res) => {
    try {
        // Aggregate stats across all platforms for the latest date available
        // For simplicity, we just sum up everything from the metrics table for the most recent entry per platform
        // This is a simplified query; in production you'd want window functions or specific date filtering

        // First, let's just get the total platforms
        const platformCount = await db.query('SELECT COUNT(*) FROM platforms');

        // Get total followers sum (very basic approximation)
        const metricsParams = await db.query('SELECT SUM(followers) as total_followers, SUM(engagement) as total_engagement FROM metrics');

        res.json({
            platforms: platformCount.rows[0].count,
            totalFollowers: metricsParams.rows[0].total_followers || 0,
            totalEngagement: metricsParams.rows[0].total_engagement || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPlatformStats = async (req, res) => {
    try {
        const { id } = req.params;
        const platform = await db.query('SELECT * FROM platforms WHERE id = $1', [id]);

        if (platform.rows.length === 0) {
            return res.status(404).json({ message: 'Platform not found' });
        }

        const metrics = await db.query('SELECT * FROM metrics WHERE platform_id = $1 ORDER BY date DESC LIMIT 30', [id]);

        res.json({
            platform: platform.rows[0],
            history: metrics.rows
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllPlatforms = async (req, res) => {
    try {
        const platforms = await db.query('SELECT * FROM platforms');
        res.json(platforms.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getOverviewStats, getPlatformStats, getAllPlatforms };

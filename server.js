const dashboardRoutes = require('./routes/dashboard.routes');
require('dotenv').config();
const authRoutes = require('./routes/auth.routes');
const certificateRoutes = require('./routes/certificates.routes');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/certificates', certificateRoutes);


// 1. Health API
app.get('/api/health', (req, res) => {
    res.json({
        status: "success",
        message: "RETRACK Backend is alive!"
    });
});

// 2. Database Test API
app.get('/api/db-test', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW()');

        res.json({
            status: "success",
            message: "Database connected successfully!",
            time: result.rows[0]
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: "error",
            message: "Database connection failed!"
        });
    }
});






// 5. Target Prediction API
app.post('/api/predict-target', (req, res) => {
    console.log("Prediction API called!");

    const brandId = req.body.brandId;
    const year = req.body.year;

    console.log("Brand:", brandId, "Year:", year);

    res.json({
        status: "success",
        brandId: brandId,
        year: year,
        predictedTarget: 600,
        message: "Target predicted successfully!"
    });
});

// Start Server (ONLY ONCE)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

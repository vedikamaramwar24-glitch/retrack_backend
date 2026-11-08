
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

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

// 3. Dashboard API
app.get('/api/dashboard', (req, res) => {
    const brandId = req.query.brandId;

    res.json({
        status: "success",
        brandId: brandId,
        totalCertificates: 10,
        totalRecycled: 250,
        recyclingTarget: 500,
        message: "Dashboard data fetched successfully!"
    });
});

// 4. Certificate Verification API
app.post('/api/certificates/verify', (req, res) => {
    const certificateId = req.body.certificateId;

    res.json({
        status: "success",
        certificateId: certificateId,
        verificationStatus: "verified",
        message: "Certificate verified successfully!"
    });
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

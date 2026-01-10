import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
// import helmet from 'helmet'; // Tambahan untuk keamanan

import connectDB from './config/configDB.js';
import resumeRoute from './route/resumeRoute.js';
import userRoute from './route/userRoute.js';
import aiRoute from './route/aiRoute.js';

const app = express();
const port = process.env.PORT || 6000;

// Hubungkan Database
connectDB();

// --- GLOBAL MIDDLEWARE ---
// app.use(helmet()); // Mengamankan HTTP headers
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// --- ROUTES ---
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is Working' });
});

app.use('/api/user', userRoute);
app.use('/api/resume', resumeRoute);
app.use('/api/ai', aiRoute);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(`[Error] ${err.message}`);
    
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    });
});

// --- SERVER START ---
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
    console.log(`Allowed Origin: ${process.env.FRONTEND_URL}`);
});
import express from 'express';
import multer from 'multer';

import { 
    saveResume, 
    getUserResumes, 
    getResumeById, 
    deleteResume,
    renameResume
} from '../controller/resumeController.js'; 
import userAuth from '../middleware/userAuth.js';

const resumeRoute = express.Router();
// --- Konfigurasi Multer ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ 
    storage,
    limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

// --- Routes ---
resumeRoute.post('/save', userAuth, upload.single('image'), saveResume);
resumeRoute.get('/all', userAuth, getUserResumes);
resumeRoute.get('/:id', userAuth, getResumeById);
resumeRoute.post('/delete', userAuth, deleteResume); 
resumeRoute.post('/rename', userAuth, renameResume);

export default resumeRoute;
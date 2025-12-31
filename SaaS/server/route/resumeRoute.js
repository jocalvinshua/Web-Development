import express from 'express';
import { 
    createResume, 
    getUserResumes, 
    getResumeById, 
    updateResume, 
    deleteResume 
} from '../controller/resumeController.js'; 
import userAuth from '../middleware/userAuth.js';

const resumeRoute = express.Router();

resumeRoute.post('/create', userAuth, createResume);
resumeRoute.get('/all', userAuth, getUserResumes);
resumeRoute.get('/:id', userAuth, getResumeById);
resumeRoute.put('/update/:id', userAuth, updateResume);
resumeRoute.delete('/delete/:id', userAuth, deleteResume);

export default resumeRoute;
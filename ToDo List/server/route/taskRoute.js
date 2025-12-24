import express from 'express';
import { addTask, deleteTask, getAllTask, getTaskById, updateTask, } from '../controller/taskController.js';


const router = express.Router();

router.post('/tasks', addTask);
router.get('/tasks', getAllTask);
router.get('/tasks/:id', getTaskById);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

export default router;

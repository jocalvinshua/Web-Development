import express from 'express';
import { loginUser, userRegister, getUserId, getUserResume} from '../controller/userController.js'; 
import userAuth from '../middleware/userAuth.js';

const userRoute = express.Router();

userRoute.post('/register', userRegister)
userRoute.post('/login', loginUser)
userRoute.get('/data', userAuth, getUserId)
userRoute.get('/resumes', userAuth, getUserResume)

export default userRoute;
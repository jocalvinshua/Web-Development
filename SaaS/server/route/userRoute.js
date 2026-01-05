import express from 'express';
import { loginUser, userRegister, logoutUser, getUserId, getUserResume } from '../controller/userController.js'; 
import userAuth from '../middleware/userAuth.js';

const userRoute = express.Router();

userRoute.post('/register', userRegister);
userRoute.post('/login', loginUser);
userRoute.get('/logout', userAuth, logoutUser); 
userRoute.get('/is-auth', userAuth, getUserId);
userRoute.get('/resume', userAuth, getUserResume)

export default userRoute;
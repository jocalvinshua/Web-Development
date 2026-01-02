import express from 'express';
import { isAuthenticated, loginUser, userRegister, logoutUser } from '../controller/userController.js'; 
import userAuth from '../middleware/userAuth.js';

const userRoute = express.Router();

userRoute.post('/register', userRegister);
userRoute.post('/login', loginUser);
userRoute.get('/logout', userAuth, logoutUser); 
userRoute.get('/is-auth', userAuth, isAuthenticated);

export default userRoute;
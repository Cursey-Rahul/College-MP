import express from 'express';
import {signupUser,loginUser,logoutUser,getUser} from '../controllers/auth.controller.js'
import {authenticateUser} from '../middlewares/authenticateUser.js'
import {loginLimiter} from "../services/rateLimiter.js"



const route = express.Router()

route.post('/signup',signupUser);
route.post('/login',loginLimiter,loginUser);
route.post('/logout',logoutUser);
route.post('/me',authenticateUser,getUser)



export default route;

import express from 'express';
import { AuthController } from '../controllers/AuthController.js';
import {verifyToken} from "../controllers/middlewareController.js"

const router = express.Router();

router.post('/register', AuthController.RegisterUser);

router.post('/login', AuthController.LoginUser);

router.get('/getusers',verifyToken,AuthController.LoadUsers);

router.get('/auth/refresh',AuthController.RefreshToken);

export default router;
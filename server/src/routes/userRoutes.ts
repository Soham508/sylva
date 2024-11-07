import { Router } from 'express';
import { checkUser, createUser, getUser } from '../controllers/userController';

const router = Router();
     
router.post('/user', getUser);  
router.get('/check-user', checkUser)   
router.post('/register', createUser);              

export default router;
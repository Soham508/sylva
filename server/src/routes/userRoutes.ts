import { Router } from 'express';
import { checkUser, createUser, getUser, getUserPortfolio, updateUserPortfolio } from '../controllers/userController';

const router = Router();
     
router.post('/user', getUser);  
router.get('/check-user', checkUser);   
router.post('/register', createUser);   
router.post('/update-portfolio', updateUserPortfolio);
router.post('/get-portfolio', getUserPortfolio)           

export default router;
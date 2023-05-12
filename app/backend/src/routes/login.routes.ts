import { Router } from 'express';
import * as Login from '../controllers/login.controller';

const router = Router();
router.post(
  '/login',
  Login.checkFieldsFilled,
  Login.checkFieldsValid,
  Login.checkEmailInDatabase,
  Login.checkPasswordInDatabase,
  Login.getToken,
);
router.get('/login/role', Login.checkTokenExist);

export default router;

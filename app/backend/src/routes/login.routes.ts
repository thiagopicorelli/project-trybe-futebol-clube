import { Router } from 'express';
import * as Login from '../controllers/login.controller';
import * as Token from '../middleware/token.middleware';

const router = Router();
router.post(
  '/login',
  Login.checkFieldsFilled,
  Login.checkFieldsValid,
  Login.checkEmailInDatabase,
  Login.checkPasswordInDatabase,
  Login.createToken,
);
router.get(
  '/login/role',
  Token.checkTokenExists,
  Token.checkTokenValid,
  Login.getRole,
);

export default router;

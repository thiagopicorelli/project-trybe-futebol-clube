import { Router } from 'express';
import * as Matches from '../controllers/matches.controller';
import * as Token from '../middleware/token.middleware';

const router = Router();
router.get('/matches', Matches.query);
router.patch(
  '/matches/:id',
  Token.checkTokenExists,
  Token.checkTokenValid,
  Matches.changeGoals,
);
router.patch(
  '/matches/:id/finish',
  Token.checkTokenExists,
  Token.checkTokenValid,
  Matches.finishMatch,
);

export default router;

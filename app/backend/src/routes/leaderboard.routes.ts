import { Router } from 'express';
import * as Leaderboard from '../controllers/leaderboard.controller';

const router = Router();
router.get('/leaderboard/home', Leaderboard.getLeaderboard);

export default router;

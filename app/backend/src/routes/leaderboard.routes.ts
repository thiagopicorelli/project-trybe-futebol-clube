import { Router } from 'express';
import * as Leaderboard from '../controllers/leaderboard.controller';

const router = Router();
router.get('/leaderboard', Leaderboard.getLeaderboard);
router.get('/leaderboard/home', Leaderboard.getLeaderboardHome);
router.get('/leaderboard/away', Leaderboard.getLeaderboardAway);

export default router;

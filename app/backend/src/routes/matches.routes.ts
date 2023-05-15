import { Router } from 'express';
import * as Matches from '../controllers/matches.controller';

const router = Router();
router.get('/matches', Matches.query);

export default router;

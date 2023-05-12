import { Router } from 'express';
import * as Team from '../controllers/teams.controller';

const router = Router();
router.get('/teams', async (req, res) => res.status(200).json(await Team.findAll()));

export default router;

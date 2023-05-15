import { Router } from 'express';
import * as Team from '../controllers/teams.controller';

const router = Router();
router.get('/teams', Team.getAll);
router.get('/teams/:id', Team.get);

export default router;

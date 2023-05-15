import { Router } from 'express';
import * as Team from '../controllers/teams.controller';

const router = Router();
router.get('/teams', Team.findAll);
router.get('/teams/:id', Team.find);

export default router;

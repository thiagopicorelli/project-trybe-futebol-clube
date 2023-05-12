import { Router } from 'express';
import * as Team from '../controllers/teams.controller';

const router = Router();
router.get('/teams', async (req, res) => res.status(200).json(await Team.findAll()));
router.get('/teams/:id', async (req, res) => {
  const team = await Team.find(req.params.id);
  if (team === null) {
    res.status(404);
    res.end();
  }
  res.status(200).json(team);
});

export default router;

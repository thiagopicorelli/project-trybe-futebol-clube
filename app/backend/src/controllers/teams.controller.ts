import { Request, Response } from 'express';
import * as Team from '../services/teams.service';

export async function getAll(req: Request, res: Response) {
  res.status(200).json(await Team.listAll());
}

export async function get(req: Request, res: Response) {
  const team = await Team.find(req.params.id);
  if (team === null) {
    res.status(404);
    res.end();
  }
  res.status(200).json(team);
}

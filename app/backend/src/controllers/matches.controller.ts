import { Request, Response } from 'express';
import * as Matches from '../services/matches.service';

export async function getAll(req: Request, res: Response) {
  res.status(200).json(await Matches.listAll());
}

export async function get(req: Request, res: Response) {
  const match = await Matches.find(req.params.id);
  if (match === null) {
    res.status(404);
    res.end();
  }
  res.status(200).json(match);
}

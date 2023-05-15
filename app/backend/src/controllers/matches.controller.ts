import { Request, Response } from 'express';
import * as Matches from '../services/matches.service';

export async function getAll(req: Request, res: Response) {
  res.status(200).json(await Matches.listAll());
}

export async function query(req: Request, res: Response) {
  const progressQuery = req.query.inProgress;

  if (progressQuery) {
    res.status(200).json(await Matches.query(progressQuery === 'true'));
  } else {
    res.status(200).json(await Matches.listAll());
  }
}

import { Request, Response } from 'express';
import * as Matches from '../services/matches.service';

export async function query(req: Request, res: Response) {
  const progressQuery = req.query.inProgress;

  if (progressQuery) {
    res.status(200).json(await Matches.query(progressQuery === 'true'));
  } else {
    res.status(200).json(await Matches.listAll());
  }
}

export async function changeGoals(req: Request, res: Response) {
  const { homeTeamGoals, awayTeamGoals } = req.body;
  await Matches.changeGoals(req.params.id, homeTeamGoals, awayTeamGoals);
  res.status(200).json({ message: 'Finished' });
}

export async function finishMatch(req: Request, res: Response) {
  await Matches.finishMatch(req.params.id);
  res.status(200).json({ message: 'Finished' });
}

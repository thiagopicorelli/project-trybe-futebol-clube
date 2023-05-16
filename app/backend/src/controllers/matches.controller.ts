import { Request, Response } from 'express';
import * as Matches from '../services/matches.service';
import * as Teams from '../services/teams.service';

export async function query(req: Request, res: Response) {
  const progressQuery = req.query.inProgress;

  if (progressQuery) {
    res.status(200).json(await Matches.query(progressQuery === 'true'));
  } else {
    res.status(200).json(await Matches.listAll());
  }
}

export async function createMatch(req: Request, res: Response) {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;

  if (homeTeamId === awayTeamId) {
    res.status(422).json({ message: 'It is not possible to create a match with two equal teams' });
    res.end();
    return;
  }
  if (!(await Teams.findTwo([homeTeamId, awayTeamId]))) {
    res.status(404).json({ message: 'There is no team with such id!' });
    res.end();
    return;
  }

  const info = await Matches.createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
  res.status(201).json(info);
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

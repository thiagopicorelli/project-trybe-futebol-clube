import { Request, Response } from 'express';
import * as Leaderboard from '../services/leaderboard.service';

export async function getLeaderboard(req: Request, res: Response) {
  const leaderboard = await Leaderboard.createLeaderboard();
  res.status(200).json(leaderboard);
}

import { Request, Response } from 'express';
import createLeaderboard from '../services/leaderboard.service';

export async function getLeaderboard(req: Request, res: Response) {
  const leaderboard = await createLeaderboard('default');
  res.status(200).json(leaderboard);
}

export async function getLeaderboardHome(req: Request, res: Response) {
  const leaderboard = await createLeaderboard('home');
  res.status(200).json(leaderboard);
}

export async function getLeaderboardAway(req: Request, res: Response) {
  const leaderboard = await createLeaderboard('away');
  res.status(200).json(leaderboard);
}

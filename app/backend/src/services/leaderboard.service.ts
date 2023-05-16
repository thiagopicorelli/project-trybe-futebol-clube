import * as Matches from '../services/matches.service';
import * as Teams from '../services/teams.service';

class TeamInfo {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  constructor(id: number, name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }
}

export async function createLeaderboard() {
  const teams = await Teams.listAll();
  const leaderboard = [];
  for (let i = 0; i < teams.length; i += 1) {
    const team = new TeamInfo(teams[i].id, teams[i].teamName);
    leaderboard.push(team);
  }
  
  return leaderboard;
}

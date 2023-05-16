import MatchModel from '../database/models/Matches';
import * as Matches from './matches.service';
import * as Teams from './teams.service';

type MatchType = 'default' | 'home' | 'away';

class TeamInfo {
  name: string;
  totalPoints = 0;
  totalGames = 0;
  totalVictories = 0;
  totalDraws = 0;
  totalLosses = 0;
  goalsFavor = 0;
  goalsOwn = 0;
  goalsBalance = 0;
  efficiency = 0;

  constructor(id: number, name: string, matches: MatchModel[]) {
    this.name = name;
    this.totalGames = matches.length;
    matches.forEach((match) => {
      let myGoals;
      let otherGoals;
      if (match.homeTeamId === id) {
        myGoals = match.homeTeamGoals;
        otherGoals = match.awayTeamGoals;
      } else {
        myGoals = match.awayTeamGoals;
        otherGoals = match.homeTeamGoals;
      }
      this.setTotals(myGoals, otherGoals);
    });
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = +((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2);
  }

  setTotals(myGoals: number, otherGoals: number) {
    if (myGoals > otherGoals) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    } else if (myGoals === otherGoals) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    } else {
      this.totalLosses += 1;
    }
    this.goalsFavor += myGoals;
    this.goalsOwn += otherGoals;
  }
}

async function matchFindSwitch(type: MatchType, id: number) {
  switch (type) {
    case 'home':
      return Matches.findByTeamHome(id);
    case 'away':
      return Matches.findByTeamAway(id);
    default:
      return Matches.findByTeam(id);
  }
}

function sortLeaderboard(a: TeamInfo, b: TeamInfo) {
  if (a.totalPoints !== b.totalPoints) {
    return b.totalPoints - a.totalPoints;
  }
  if (a.totalVictories !== b.totalVictories) {
    return b.totalVictories - a.totalVictories;
  }
  if (a.goalsBalance !== b.goalsBalance) {
    return b.goalsBalance - a.goalsBalance;
  }
  return b.goalsFavor - a.goalsFavor;
}

export default async function createLeaderboard(type: MatchType) {
  const teams = await Teams.listAll();
  const leaderboard : TeamInfo[] = [];
  await Promise.all(teams.map(async (team) => {
    const matches = await matchFindSwitch(type, team.id);
    const teamInfo = new TeamInfo(team.id, team.teamName, matches);
    leaderboard.push(teamInfo);
  }));

  leaderboard.sort(sortLeaderboard);

  return leaderboard;
}

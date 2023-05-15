import Matches from '../database/models/Matches';
import Teams from '../database/models/Team';

const matchConfig = {
  include: [{
    model: Teams,
    as: 'homeTeam',
    attributes: ['teamName'],
  },
  {
    model: Teams,
    as: 'awayTeam',
    attributes: ['teamName'],
  }],
  raw: true,
  nest: true,
};

export async function listAll() {
  const matches = await Matches.findAll(matchConfig);
  return matches;
}

export async function query(inProgress: boolean) {
  const match = await Matches.findAll({
    ...matchConfig,
    where: {
      inProgress,
    },
  });
  return match;
}

export async function changeGoals(id: string, homeTeamGoals: string, awayTeamGoals: string) {
  await Matches.update(
    { homeTeamGoals, awayTeamGoals },
    { where: { id } },
  );
}

export async function finishMatch(id: string) {
  await Matches.update(
    { inProgress: false },
    { where: { id } },
  );
}

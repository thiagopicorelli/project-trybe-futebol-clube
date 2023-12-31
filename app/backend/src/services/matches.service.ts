import { Op } from 'sequelize';
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

export async function findByTeam(id: number) {
  const match = await Matches.findAll({
    where: {
      [Op.or]: [
        {
          homeTeamId: id,
        },
        {
          awayTeamId: id,
        },
      ],
      inProgress: false,
    },
  });
  return match;
}

export async function findByTeamHome(id: number) {
  const match = await Matches.findAll({
    where: {
      homeTeamId: id,
      inProgress: false,
    },
  });
  return match;
}

export async function findByTeamAway(id: number) {
  const match = await Matches.findAll({
    where: {
      awayTeamId: id,
      inProgress: false,
    },
  });
  return match;
}

export async function createMatch(
  homeTeamId: string,
  awayTeamId: string,
  homeTeamGoals: string,
  awayTeamGoals: string,
) {
  return Matches.create(
    { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
  );
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

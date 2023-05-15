import Matches from '../database/models/Matches';
import Teams from '../database/models/Team';

export async function listAll() {
  const matches = await Matches.findAll({
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
  });
  return matches;
}

export async function find(id: string) {
  const match = await Matches.findByPk(id);
  return match;
}

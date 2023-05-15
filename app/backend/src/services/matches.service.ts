import Matches from '../database/models/Matches';
import Teams from '../database/models/Team';

export async function listAll() {
  try {
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
    });
    return matches;
  } catch (e) {
    return ({ error: e });
  }
}

export async function find(id: string) {
  const match = await Matches.findByPk(id);
  return match;
}

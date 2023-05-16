import Team from '../database/models/Team';

export async function listAll() {
  const teams = await Team.findAll();
  return teams;
}

export async function find(id: string) {
  const team = await Team.findByPk(id);
  return team;
}

export async function findTwo(id: string[]) {
  const team = await Team.findAll({ where: { id } });
  if (team === null) {
    return false;
  }
  if (team.length === 2) {
    return true;
  }
  return false;
}

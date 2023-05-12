import Team from '../database/models/Team';

export async function listAll() {
  const teams = await Team.findAll();
  return teams;
}

export async function find(id: string) {
  const team = await Team.findByPk(id);
  return team;
}

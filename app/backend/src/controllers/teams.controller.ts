import * as Team from '../services/teams.service';

export async function findAll() {
  return Team.listAll();
}

export async function find(id: string) {
  return Team.find(id);
}

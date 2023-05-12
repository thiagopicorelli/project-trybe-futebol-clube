import * as Team from '../services/teams.service';

export async function findAll() {
  return Team.listAll();
};
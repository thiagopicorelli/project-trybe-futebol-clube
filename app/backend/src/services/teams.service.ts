import Team from "../database/models/Team";

export async function listAll () {
  const teams = await Team.findAll({ raw: true });
  return teams;
}

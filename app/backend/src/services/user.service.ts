import User from '../database/models/User';

export async function listAll() {
  const teams = await User.findAll();
  return teams;
}

export async function find(email: string) {
  const team = await User.findOne({
    where: {
      email,
    },
  });
  return team;
}

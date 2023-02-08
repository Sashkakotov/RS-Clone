import { User } from '../data/types';

const getInactiveUsers = (users: User[], boardMembers: string[]) => {
  const result: User[] = [];
  for (let i = 0; i < users.length; i += 1) {
    if (!boardMembers.includes(users[i]._id)) {
      result.push(users[i]);
    }
  }

  return result;
};

export default getInactiveUsers;

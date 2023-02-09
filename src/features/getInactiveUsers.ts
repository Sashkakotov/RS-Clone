import { User } from '../data/types';

const getInactiveUsers = (users: User[], boardMembers: string[]) => {
  const result: User[] = [];
  users.map((el) => {
    if (!boardMembers.includes(el._id)) {
      result.push(el);
    }
  });

  return result;
};

export default getInactiveUsers;

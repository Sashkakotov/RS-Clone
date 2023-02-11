import state from '../../state/state';
import { MEMBERS_ON_PAGE } from '../../constants/constants';
import { User } from '../../data/types';
import { getUserById } from '../../API/users';
import getUserIcon from '../../services/getUserIcon';

const getMembersContainer = async () => {
  const membersContainer = document.createElement('section');
  membersContainer.classList.add('member-cards');

  state.members
    .slice((state.membersPage - 1) * MEMBERS_ON_PAGE, state.membersPage * MEMBERS_ON_PAGE)
    .forEach(async (el) => {
      const card = document.createElement('a');
      card.classList.add('member-card');
      card.href = `#/members/${el}`;
      const user: User = await getUserById(state.authToken, el);
      const icon = getUserIcon(user.name);
      icon.classList.remove('user-icon');
      icon.classList.add('member-icon');
      const name = document.createElement('h5');
      name.classList.add('member-name');
      name.textContent = user.name;
      card.append(icon, name);
      membersContainer.appendChild(card);
    });

  return membersContainer;
};

export default getMembersContainer;

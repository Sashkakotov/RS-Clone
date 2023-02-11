import { getAllBoards } from '../../API/boards';
import { getUserById } from '../../API/users';
import { Board, User } from '../../data/types';
import state from '../../state/state';
import getAsideHtml from '../home/getAsideHtml';
import drawProjectsList from '../../features/drawProjectsList';
import getUserIcon from '../../services/getUserIcon';

const Members = {
  render: async () => `
    <div class="main_home">
      ${getAsideHtml()}
      <div class="main-members"></div>
    </div>
    `,
  after_render: async () => {
    if (state.authToken) {
      drawProjectsList();
    }
    const main = document.querySelector('.main-members');
    const allBoards: Board[] = await getAllBoards(state.authToken);
    const userBoards = allBoards.filter((el) => el.users.includes(state.id));
    const members = Array.from(new Set(userBoards.map((el) => el.users).flat())).filter((el) => el !== state.id);

    const membersContainer = document.createElement('section');
    membersContainer.classList.add('member-cards');
    main?.append(membersContainer);

    members.forEach(async (el) => {
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
  },
};

export default Members;

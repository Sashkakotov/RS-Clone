import { getBoardsById, updateBoard } from '../API/boards';
import getBoardId from '../services/getBoardId';
import state from '../state/state';
import { getUsers } from '../API/users';
import { User } from '../data/types';
import getUserIcon from '../services/getUserIcon';
import getBoardIcons from '../pages/boards/getBoardIcons';

const invite = async () => {
  const membersSelect = document.querySelector('.members-select');
  const boardId = getBoardId();
  const board = await getBoardsById(state.authToken, boardId);
  const members = await getUsers(state.authToken);
  const options = <NodeListOf<HTMLOptionElement>>document.querySelectorAll('option');
  const array = board.users;
  let id = '';
  if (membersSelect instanceof HTMLSelectElement) {
    const user = membersSelect.value;
    members.forEach(async (el: User) => {
      if (el.name === user) {
        id = el._id;
        if (!array.includes(id)) {
          array.push(id);
          await updateBoard(state.authToken, boardId, { title: board.title, owner: id, users: array });
          const icon = getUserIcon(user);
          getBoardIcons(array);
          options.forEach((item) => {
            if (item.textContent === el.name) {
              item.remove();
            }
          });
        }
      }
    });
  }
};

export default invite;

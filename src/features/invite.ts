import { getBoardsById, updateBoard } from '../API/boards';
import getBoardId from '../services/getBoardId';
import state from '../state/state';
import getBoardIcons from '../pages/boards/getBoardIcons';

const invite = async () => {
  const membersSelect = document.querySelector('.members-select');
  const boardId = getBoardId();
  const board = await getBoardsById(state.authToken, boardId);
  const options = <NodeListOf<HTMLOptionElement>>document.querySelectorAll('option');
  const array = board.users;

  if (membersSelect instanceof HTMLSelectElement) {
    const id = state.selectedUserId;
    if (!array.includes(id)) {
      array.push(id);
      await updateBoard(state.authToken, boardId, { title: board.title, owner: id, users: array });
      getBoardIcons(array);
      options.forEach((item) => {
        const dataId = item.getAttribute('data-member-id');
        if (dataId === id) {
          item.remove();
        }
      });
    }
  }
};

export default invite;

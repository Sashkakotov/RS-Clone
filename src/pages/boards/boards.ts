import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import drawProjectsList from '../../features/drawProjectsList';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns, getColumnsInBoard } from '../../API/columns';
import { getBoardsById } from '../../API/boards';
import getBoardControlHtml from './getBoardControlHtml';

const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-board"></div>
  </div>
  `,
  after_render: async () => {
    const array = window.location.hash.split('/').reverse().join('/');
    const boardId = array.slice(0, array.indexOf('/'));
    const main = document.querySelector('.main-board');
    const columns = await getColumnsInBoard(state.authToken, boardId);
    const board = await getBoardsById(state.authToken, boardId);
    const boardControlHtml = getBoardControlHtml(board.title);

    if (main) {
      if (columns.length !== 0) {
        const result = await getColumnHTML(state.authToken, boardId);
        main.innerHTML = `${boardControlHtml}${result}`;
      } else {
        const firstColumn = await createColumns(state.authToken, state.boardId, { title: 'Todo', order: 0 });
        const secondColumn = await createColumns(state.authToken, state.boardId, { title: 'In progress', order: 0 });
        const thirdColumn = await createColumns(state.authToken, state.boardId, { title: 'Done', order: 0 });
        const result = await getColumnHTML(state.authToken, state.boardId);
        main.innerHTML = `${boardControlHtml}${result}`;
      }
    }

    const plusBtn = document.querySelector('.plus-img');
    if (plusBtn) {
      plusBtn.addEventListener('click', createNewBoard);
    }
    if (state.authToken) {
      drawProjectsList();
    }
  },
};

export default Boards;

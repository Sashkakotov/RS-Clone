import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import drawProjectsList from '../../features/drawProjectsList';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns, getColumnsInBoard } from '../../API/columns';
import { getBoardsById } from '../../API/boards';
import getBoardControlHtml from './getBoardControlHtml';
import UI from '../../data/UI';
import drawColumnPlus from './drawColumnPlus';

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
      let result = '';
      if (columns.length !== 0) {
        result = await getColumnHTML(state.authToken, boardId);
      } else {
        await createColumns(state.authToken, state.boardId, { title: UI.firstColumnName, order: 0 });
        await createColumns(state.authToken, state.boardId, { title: UI.secondColumnName, order: 0 });
        await createColumns(state.authToken, state.boardId, { title: UI.thirdColumnName, order: 0 });
        result = await getColumnHTML(state.authToken, state.boardId);
      }
      main.innerHTML = `${boardControlHtml}${result}`;
      drawColumnPlus(boardId);
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

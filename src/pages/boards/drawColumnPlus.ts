import { createColumns } from '../../API/columns';
import { getBoardsById } from '../../API/boards';
import UI from '../../data/UI';
import state from '../../state/state';
import getColumnHTML from '../columns/columnsHtml';
import getBoardControlHtml from './getBoardControlHtml';

const drawColumnPlus = async (boardId: string) => {
  const columnList = document.querySelector('.colums-list');
  const board = await getBoardsById(state.authToken, boardId);
  const boardControlHtml = getBoardControlHtml(board.title);
  const boardLayout = document.querySelector('.main-board');
  if (boardLayout) {
    const plusColumn = document.createElement('button');
    plusColumn.classList.add('plus-column');
    boardLayout.append(plusColumn);
    plusColumn.addEventListener('click', async () => {
      await createColumns(state.authToken, boardId, {
        title: UI.newColumnName,
        order: 0,
      });
      const result = await getColumnHTML(state.authToken, boardId);
      if (columnList) {
        columnList.innerHTML = result;
      }
    });
  }
};
export default drawColumnPlus;

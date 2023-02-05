import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import { signIn } from '../../API/users';
import drawProjectsList from '../../features/drawProjectsList';
import getColumnHTML from '../columns/columnsHtml';
import { createColumns } from '../../API/columns';

const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-board"></div>
  </div>
  `,
  after_render: async () => {
    //await signIn({ login: 'IMask', password: 'Tesla4ever' }); // LATER REMOVE THIS LINE
    const main = document.querySelector('.main-board');
    if (main) {
      const firstColumn = await createColumns(state.authToken, state.boardId, { title: 'Todo', order: 0 });
      const secondColumn = await createColumns(state.authToken, state.boardId, { title: 'In progress', order: 0 });
      const thirdColumn = await createColumns(state.authToken, state.boardId, { title: 'Done', order: 0 });
      const result = await getColumnHTML(state.authToken, state.boardId);
      main.innerHTML = result;
    }

    console.log(state.authToken);
    console.log(state.boardId);
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

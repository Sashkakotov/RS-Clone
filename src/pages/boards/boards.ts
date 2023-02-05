import getAsideHtml from '../home/getAsideHtml';
import createNewBoard from '../../features/createNewBoard';
import state from '../../state/state';
import { signIn } from '../../API/users';
import drawProjectsList from '../../features/drawProjectsList';

const Boards = {
  render: async () => `
  <div class="main_home">
    ${getAsideHtml()}
  </div>
  `,
  after_render: async () => {
    await signIn({ login: 'IMask', password: 'Tesla4ever' }); // LATER REMOVE THIS LINE
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

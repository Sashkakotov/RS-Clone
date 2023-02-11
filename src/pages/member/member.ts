import state from '../../state/state';
import getAsideHtml from '../home/getAsideHtml';
import drawProjectsList from '../../features/drawProjectsList';

const Member = {
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
  },
};

export default Member;

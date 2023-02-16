import getAsideHtml from '../home/getAsideHtml';

const Settings = {
  render: async () => `
        <div class="main_home">
          ${getAsideHtml()}
          <div class="main-projects"></div>
        </div>
        `,
  after_render: async () => {
    document.body.classList.remove('body_home');
  },
};

export default Settings;

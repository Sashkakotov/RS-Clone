import UI from '../../data/UI';
import getAsideHtml from '../home/getAsideHtml';

const Settings = {
  render: async () => `
        <div class="main_home">
          ${getAsideHtml()}
          <div class="main-settings">
            <section class="theme-section">
              <h4 class="settings-header">${UI.chooseTheme}</h4>
              <form class="theme-form">
                <label class="radio-label">
                  <input type="radio" name="question">
                  <span></span>
                  <img src="" class="theme-image" alt="Dark theme">
                </label>
                <label class="radio-label">
                  <input type="radio" name="question" checked>
                  <span></span>
                  <img src="../assets/img/light_theme.png" class="theme-image" alt="Light theme">
                </label>
              </form>
            </section>
            <section class="language-section">
              <h4 class="settings-header">${UI.chooseLanguage}</h4>
              <form class="language-form">
                <label class="radio-label">
                  <input type="radio" name="question">
                  <span class="lang">RU</span>
                </label>
                <label class="radio-label">
                  <input type="radio" name="question" checked>
                  <span class="lang">EN</span>
                </label>
              </form>
            </section>
          </div>
        </div>
        `,
  after_render: async () => {
    document.body.classList.remove('body_home');
  },
};

export default Settings;

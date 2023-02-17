import getSettingsHtml from './getSettingsHtml';
import changeTheme from '../../features/settings/changeTheme';
import changeLanguage from '../../features/settings/changeLanguage';
import state from '../../state/state';

const Settings = {
  render: async () => {
    const view = getSettingsHtml();
    return view;
  },
  after_render: async () => {
    document.body.classList.remove('body_home');

    const inputLight = document.querySelector('.light');
    const inputDark = document.querySelector('.dark');
    if (inputLight instanceof HTMLInputElement && inputDark instanceof HTMLInputElement) {
      if (state.theme === 'dark') {
        inputLight.checked = false;
        inputDark.checked = true;
      }
      if (state.theme === 'light') {
        inputLight.checked = true;
        inputDark.checked = false;
      }
    }

    const themeForm = document.querySelector('.theme-form');
    themeForm?.addEventListener('change', (event) => changeTheme(event));

    const languageForm = document.querySelector('.language-form');
    languageForm?.addEventListener('change', (event) => changeLanguage(event));
  },
};

export default Settings;

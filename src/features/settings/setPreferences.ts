import state from '../../state/state';

const setPreferences = () => {
  if (state.theme === 'dark') {
    document.body.classList.add('dark-theme');
    const main = document.body.children[1];
    main.classList.add('dark-theme');
  }
};

export default setPreferences;

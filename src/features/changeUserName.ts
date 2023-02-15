import { getUserById, updateUser } from '../API/users';
import { User } from '../data/types';
import state from '../state/state';

const changeUserName = async (event: Event) => {
  const { target } = event;
  if (target && target instanceof HTMLButtonElement) {
    const input = document.querySelector('.new-name-input');
    if (input instanceof HTMLInputElement) {
      const { value } = input;
      const user: User = await getUserById(state.authToken, state.id);
      await updateUser(state.authToken, state.id, { name: value, login: user.login, password: state.password });
      state.name = value;
      const userName = document.querySelector('.user-name');
      if (userName instanceof HTMLHeadingElement) {
        userName.textContent = value;
      }
      document.querySelector('.shadow')?.remove();
      document.querySelector('.popup')?.remove();
    }
  }
};
export default changeUserName;

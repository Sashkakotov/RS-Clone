import { getUserById, updateUser } from '../API/users';
import { User } from '../data/types';
import state from '../state/state';

const changeUserName = async () => {
  const input = document.querySelector('.new-name-input');
  if (input instanceof HTMLInputElement) {
    const { value } = input;
    const user: User = await getUserById(state.authToken, state.id);
    await updateUser(state.authToken, state.id, { name: value, login: user.login, password: state.password });
    state.name = value;
    document.querySelector('.shadow')?.remove();
    document.querySelector('.popup')?.remove();
    window.location.href = '#';
  }
};
export default changeUserName;

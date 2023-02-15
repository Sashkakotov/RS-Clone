import { getUserById, updateUser } from '../API/users';
import { User } from '../data/types';
import state from '../state/state';

const changeUserLogin = async () => {
  const input = document.querySelector('.new-login-input');
  if (input instanceof HTMLInputElement) {
    const { value } = input;
    const user: User = await getUserById(state.authToken, state.id);
    await updateUser(state.authToken, state.id, { name: user.name, login: value, password: state.password });
    document.querySelector('.shadow')?.remove();
    document.querySelector('.popup')?.remove();
    window.location.href = '#';
  }
};

export default changeUserLogin;

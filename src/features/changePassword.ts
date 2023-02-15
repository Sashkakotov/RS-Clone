import { getUserById, updateUser } from '../API/users';
import { User } from '../data/types';
import state from '../state/state';

const changePassword = async () => {
  const firstInput = document.querySelector('.new-password-input');
  const secondInput = document.querySelector('.repeat-new-password');
  const regularExpression = /[0-9a-zA-Z!@#$%^&*]{6,}/;
  if (firstInput instanceof HTMLInputElement && secondInput instanceof HTMLInputElement) {
    if (regularExpression.test(firstInput.value) && firstInput.value === secondInput.value) {
      const user: User = await getUserById(state.authToken, state.id);
      await updateUser(state.authToken, state.id, { name: user.name, login: user.login, password: secondInput.value });
      state.password = secondInput.value;
      document.querySelector('.shadow')?.remove();
      document.querySelector('.popup')?.remove();
      window.location.href = '#';
    }
  }
};
export default changePassword;

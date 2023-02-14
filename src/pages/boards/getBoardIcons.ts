import { getUserById } from '../../API/users';
import getUserIcon from '../../services/getUserIcon';
import state from '../../state/state';

const getBoardIcons = async (userIds: string[]) => {
  const ABSOLUTE_POSITION_IN_REMS = 2.3;
  const MAX_VISIBLE_MEMBERS = 5;
  const memberIcons = document.querySelector('.member-icons');
  if (memberIcons && userIds.length > 0) {
    const zIndex = userIds.length;
    const right = '0';
    const limit = userIds.length <= MAX_VISIBLE_MEMBERS ? userIds.length : MAX_VISIBLE_MEMBERS;

    for (let i = 0; i < limit; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const user = await getUserById(state.authToken, userIds[i]);
      const icon = getUserIcon(user.name);
      memberIcons.append(icon);
      icon.style.right = `${Number(right) + i * ABSOLUTE_POSITION_IN_REMS}rem`;
      icon.style.zIndex = (zIndex - i).toString();
    }

    if (userIds.length > MAX_VISIBLE_MEMBERS) {
      const rest = document.createElement('div');
      rest.classList.add('rest-icon');
      rest.textContent = `+${userIds.length - MAX_VISIBLE_MEMBERS + 1}`;
      memberIcons.append(rest);
    }
  }
};

export default getBoardIcons;

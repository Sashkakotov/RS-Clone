import { User } from '../../data/types';
// import { getUsers } from '../../API/users';
// import getInactiveUsers from '../../features/getInactiveUsers';
// import state from '../../state/state';
// import getBoardId from '../../services/getBoardId';

const invitetoTaskHTML = (users: User[]) =>
  // const users = await getUsers(state.authToken);
  // const boardId = getBoardId();
  // const board = await getBoardsById(state.authToken, boardId);
  // getBoardId
  // const inactiveUsers = getInactiveUsers(users, board.users);
  `
<div class="board-control">
    <div class="invite-block">
      <select class="members-select">
        ${users.map((el) => `<option data-member-id=${el._id}>${el.name}</option>`)}
      </select>
      <button class="button invite-button">Invite</button>
      <div class="member-icons"></div>
    </div>
  </div>
`;
export default invitetoTaskHTML;

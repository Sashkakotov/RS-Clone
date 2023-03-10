import i18next from 'i18next';
import Boards from '../pages/boards/boards';
import state from '../state/state';
import { deleteTask } from '../API/tasks';
import { tsQuerySelector } from '../helpers/helpers';
import formsParam from '../pages/taskForm/setTaskParams';
import editTask from '../pages/taskForm/editTask';
import { taskForm, Board, User, ToastrType } from '../data/types';
import getActiveUsers from './getActiveUsers';
import { getBoardsById } from '../API/boards';
import invitetoTaskHTML from '../pages/taskForm/invitetoTask';
import { getUsers } from '../API/users';
import getBoardIcons from '../pages/boards/getBoardIcons';
import popUpMessages from './popUpMessages/popupMessages';
import { MAX_VISIBLE_MEMBERS } from '../constants/constants';

export const showDropDownMenu = (target: HTMLElement) => {
  const task = target.closest<HTMLElement>('.task');
  if (!task) return;
  tsQuerySelector(task, '.task-menu__list').classList.toggle('hide');
};

export const reloadBoard = async () => {
  await Boards.after_render();
};

export const deleteThisTask = async (target: HTMLElement) => {
  const boardId = target.closest<HTMLElement>('.main-board')?.id;
  const columnId = target.closest<HTMLElement>('.column')?.id;
  const taskId = target.closest<HTMLElement>('.task')?.id;
  const task = target.closest<HTMLElement>('.task');
  if (!boardId || !columnId || !taskId) return;
  showDropDownMenu(target);
  await deleteTask(state.authToken, boardId, columnId, taskId);
  popUpMessages(ToastrType.success, i18next.t('taskDeleted'));
  task?.remove();
};

export const editThisTask = async (target: HTMLElement) => {
  showDropDownMenu(target);
  const boardId = target.closest<HTMLElement>('.main-board')?.id;
  const task = target.closest<HTMLElement>('.task');
  if (!boardId || !task) return;
  const board: Board = await getBoardsById(state.authToken, boardId);
  const users: User[] = await getUsers(state.authToken);
  const memberContainer = tsQuerySelector(document, '.create-card__members');
  const activeUsers = getActiveUsers(users, board.users);
  const usersContainer = tsQuerySelector(task, '.task-assignees__container');
  const form = tsQuerySelector<HTMLFormElement>(document, '.new-card__form');
  const usersForm = form.querySelector<HTMLDivElement>('.member-icons__task');
  if (!usersForm) return;
  if (!usersContainer) return;
  const usersInvited = usersContainer.dataset.users ? usersContainer.dataset.users.split(',') : [''];
  const inActiveUsers = activeUsers.filter((el) => !usersInvited.includes(el._id));
  const usersInvitedArray = usersInvited.join(', ');
  memberContainer.innerHTML = invitetoTaskHTML(inActiveUsers, usersInvitedArray);
  if (usersInvited.length > 0) {
    await getBoardIcons(usersInvited, `.member-icons__task`, MAX_VISIBLE_MEMBERS);
  }
  formsParam(target, taskForm.edit);
  editTask(target);
};

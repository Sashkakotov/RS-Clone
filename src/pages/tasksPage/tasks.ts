import i18next from 'i18next';
import { getTasksSetByUserId } from '../../API/tasks';
import { ITasks } from '../../data/types';
import state from '../../state/state';
import getTaskContainer from './getTaskContainer';
import getTaskHtml from './getTaskHtml';
import goToTaskBoard from '../member/goToTaskBoard';
import reverseTaskList from '../../features/reverseTaskList';

const Tasks = {
  render: async () => {
    const view = getTaskHtml();
    return view;
  },
  after_render: async () => {
    const main = document.querySelector('.main-tasks');
    const table = document.querySelector('.tasks-table');
    const userTasks: ITasks[] = await getTasksSetByUserId(state.authToken, state.id);

    if (userTasks.length) {
      getTaskContainer(userTasks);

      const priorityField = document.querySelector('.priority-field');
      priorityField?.addEventListener('click', () => reverseTaskList(userTasks));
      table?.addEventListener('click', goToTaskBoard);
    } else {
      const noTasks = document.createElement('h2');
      noTasks.classList.add('no-tasks');
      noTasks.textContent = i18next.t('noTasks');
      main?.append(noTasks);
    }
  },
};

export default Tasks;

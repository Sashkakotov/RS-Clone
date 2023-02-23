import i18next from 'i18next';
import { getTasksSetByUserId } from '../../API/tasks';
import { ITasks, Arrows } from '../../data/types';
import state from '../../state/state';
import getTasksHtml from './getTasksHtml';
import getTaskRowHtml from './getTaskRowHtml';

const Tasks = {
  render: async () => {
    const view = getTasksHtml();
    return view;
  },
  after_render: async () => {
    const main = document.querySelector('.main-tasks');
    const table = document.querySelector('.tasks-table');
    const userTasks: ITasks[] = await getTasksSetByUserId(state.authToken, state.id);
    if (userTasks.length) {
      userTasks.forEach(async (el) => {
        const row = document.createElement('div');
        row.classList.add('task-row');
        row.innerHTML = await getTaskRowHtml(el, userTasks.indexOf(el));
        table?.append(row);

        const priority = row.lastChild?.previousSibling;

        if (priority instanceof HTMLSpanElement) {
          const text = priority.textContent?.toLowerCase();
          if (text === 'low' || text === 'низкий') {
            priority.style.color = '#2ba700';
          } else if (text === 'medium' || text === 'средний') {
            priority.style.color = '#ffba53';
          } else {
            priority.style.color = '#ff7979';
          }
        }
      });

      const orderSign = state.order === 'ASC' ? Arrows.up : Arrows.down;
      const priorityHeader = document.querySelector('.priority-field');
      if (priorityHeader instanceof HTMLSpanElement) {
        priorityHeader.textContent =
          state.sort === 'priority' ? `${priorityHeader.textContent} ${orderSign}` : priorityHeader.textContent;
      }
    } else {
      const noTasks = document.createElement('h2');
      noTasks.classList.add('no-tasks');
      noTasks.textContent = i18next.t('noTasks');
      main?.append(noTasks);
    }
  },
};

export default Tasks;

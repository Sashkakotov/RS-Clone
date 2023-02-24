import { ITasks } from '../data/types';
import state from '../state/state';

import getTaskContainer from '../pages/tasksPage/getTaskContainer';
import { getSpinner, removeSpinner } from './spinner/spinner';

const reverseTaskList = async (userTasks: ITasks[]) => {
  try {
    getSpinner();
    state.order = state.order === 'ASC' ? 'DESC' : 'ASC';
    const rows = document.querySelectorAll('.task-row');
    rows.forEach((el) => el?.remove());

    getTaskContainer(userTasks);
  } finally {
    removeSpinner();
  }
};

export default reverseTaskList;

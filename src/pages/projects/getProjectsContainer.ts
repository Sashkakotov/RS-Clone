import i18next from 'i18next';
import { getColumnsInBoard } from '../../API/columns';
import { getTasksSetByBoardId } from '../../API/tasks';
import { Board, IColumns, ITasks } from '../../data/types';
import state from '../../state/state';
import getProjectStatsItem from './getProjectStatsItem';

const getProjectsContainer = async (projects: Board[]) => {
  const membersContainer = document.createElement('section');
  membersContainer.classList.add('project-cards');

  projects.forEach(async (el) => {
    const card = document.createElement('a');
    card.classList.add('project-card');
    card.href = `#/projects/${el._id}`;

    const title = document.createElement('h5');
    title.classList.add('project-title');
    title.textContent = el.title.toUpperCase();

    const stats = document.createElement('div');
    stats.classList.add('project-stats');

    const tasks: ITasks[] = await getTasksSetByBoardId(state.authToken, el._id);
    const totalTasks = document.createElement('p');
    totalTasks.classList.add('project-stats-item', 'project-stats-total');
    totalTasks.textContent = `${i18next.t('tasksTotal')}: ${tasks.length}`;

    const columns: IColumns[] = await getColumnsInBoard(state.authToken, el._id);

    const todoColumn = await getProjectStatsItem(columns, i18next.t('toDo'), i18next.t('firstColumnName'), el._id);
    const inProgressColumn = await getProjectStatsItem(
      columns,
      i18next.t('inProgress'),
      i18next.t('secondColumnName'),
      el._id
    );
    const doneColumn = await getProjectStatsItem(columns, i18next.t('done'), i18next.t('thirdColumnName'), el._id);

    stats.append(totalTasks, todoColumn, inProgressColumn, doneColumn);
    card.append(title, stats);
    membersContainer.appendChild(card);
  });

  return membersContainer;
};

export default getProjectsContainer;

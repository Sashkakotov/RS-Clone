import state from '../../state/state';
import { getTasksSetByBoardId } from '../../API/tasks';
import { ITasks } from '../../data/types';
import getBoardId from '../../services/getBoardId';
import { DELAY } from '../../constants/constants';

const highlightTask = async () => {
  const boardId = getBoardId();
  const tasksInBoard: ITasks[] = await getTasksSetByBoardId(state.authToken, boardId);
  const targetTask = tasksInBoard.filter((el) => el._id === state.selectedTask);
  const targetTaskElement = document.getElementById(targetTask[0]._id);
  targetTaskElement?.setAttribute('name', 'target');

  targetTaskElement?.classList.add('highlighted');
  setTimeout(() => targetTaskElement?.classList.remove('highlighted'), DELAY);
};

export default highlightTask;

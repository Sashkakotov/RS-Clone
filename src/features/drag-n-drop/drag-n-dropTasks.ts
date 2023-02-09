import Sortable from 'sortablejs';
import { updateSetOfTasks } from '../../API/tasks';
import state from '../../state/state';
import { tsQuerySelectorAll } from '../../helpers/helpers';
import { DRAG_N_DROP_ANIMATION_TIME, DRAG_N_DROP_GROUP_TASK } from '../../constants/constants';

const dragNdropTasks = () => {
  const tasksList = tsQuerySelectorAll(document, '.tasks-list');
  tasksList.forEach((el) =>
    Sortable.create(el as HTMLElement, {
      animation: DRAG_N_DROP_ANIMATION_TIME,
      group: {
        name: DRAG_N_DROP_GROUP_TASK,
      },
      onEnd: async function (e) {
        console.log(e)
        const prevTaskListArray = [...e.from.children].map((task, index) => ({
          _id: task.id,
          order: index,
          columnId: e.from.id.split('-')[1],
        }));
        const currentTaskListArray = [...e.to.children].map((task, index) => ({
          _id: task.id,
          order: index,
          columnId: e.to.id.split('-')[1],
        }));

        const resultTasksArray = [...prevTaskListArray, ...currentTaskListArray];
        console.log(resultTasksArray)
        await updateSetOfTasks(state.authToken, resultTasksArray);
      },
    })
  );
};
export default dragNdropTasks;

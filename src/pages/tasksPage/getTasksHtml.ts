import i18next from 'i18next';
import getAsideHtml from '../home/getAsideHtml';

const getTasksHtml = () =>
  `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-tasks">
      <div class="tasks-table">
        <div class="fields">
          <span class="table-field number-field">${i18next.t('tableTaskNumber')}</span>
          <span class="table-field title-field">${i18next.t('tableTaskTitle')}</span>
          <span class="table-field status-field">${i18next.t('tableTaskStatus')}</span>
          <span class="table-field start-field">${i18next.t('tableTaskStartDate')}</span>
          <span class="table-field end-field">${i18next.t('tableTaskEndDate')}</span>
          <span class="table-field duration-field">${i18next.t('tableTaskDuration')}</span>
          <span class="table-field priority-field">${i18next.t('tableTaskPriority')}</span>
        </div>
      </div>
    </div>
  </div>
`;

export default getTasksHtml;

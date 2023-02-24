import i18next from 'i18next';
import { Arrows } from '../../data/types';
import getAsideHtml from '../home/getAsideHtml';

const getTaskHtml = () =>
  `
  <div class="main_home">
    ${getAsideHtml()}
    <div class="main-tasks">
      <div class="tasks-table">
        <div class="fields">
          <span class="table-field number-field">№</span>
          <span class="table-field title-field">${i18next.t('tableTaskTitle')}</span>
          <span class="table-field status-field">${i18next.t('tableTaskStatus')}</span>
          <span class="table-field start-field">${i18next.t('tableTaskStartDate')}</span>
          <span class="table-field end-field">${i18next.t('tableTaskEndDate')}</span>
          <span class="table-field duration-field">${i18next.t('tableTaskDuration')}</span>
          <span class="table-field priority-field">${i18next.t('tableTaskPriority')} ${Arrows.up}</span>
        </div>
      </div>
    </div>
  </div>
`;

export default getTaskHtml;

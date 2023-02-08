import { FUNCTIONS } from '../constants/constants';

const listen = (event: MouseEvent) => {
  const entries = Object.entries(FUNCTIONS);
  const target = event.target;
  if (target && target instanceof HTMLButtonElement) {
    entries.forEach(async (el) => {
      if (target.classList.contains(el[0])) {
        await el[1]();
      }
    });
  }
};

export default listen;

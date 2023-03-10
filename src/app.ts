import './styles/style.scss';
import i18next from 'i18next';
import Navbar from './pages/navBar/Navbar';
import Bottombar from './pages/bottomBar/Bottombar';
import LogIn from './pages/login/loginPage';
import Utils from './services/Utils';
import { tsQuerySelector } from './helpers/helpers';
import Boards from './pages/boards/boards';
import Home from './pages/home/home';
import Error404 from './pages/error404/error404';
import Projects from './pages/projects/projects';
import Members from './pages/members/members';
import Member from './pages/member/member';
import Settings from './pages/settings/settings';
import Tasks from './pages/tasksPage/tasks';
import en from './data/en.json';
import ru from './data/ru.json';
import state from './state/state';
import Statistics from './pages/statistics/statistics';
import StatisticsId from './pages/statistics/statisticsId';

const routes: { [key: string]: typeof Home | typeof Boards } = {
  '/': Home,
  '/projects': Projects,
  '/projects/:id': Boards,
  '/signin': LogIn,
  '/signup': LogIn,
  '/members': Members,
  '/members/:id': Member,
  '/statistics': Statistics,
  '/statistics/:id': StatisticsId,
  '/settings': Settings,
  '/tasks': Tasks,
};

const router = async () => {
  const header = tsQuerySelector(document, '#header_container');
  const content = tsQuerySelector(document, '#page_container');
  const footer = tsQuerySelector(document, '#footer_container');

  const request = Utils.parseRequestURL();

  const parsedURL =
    (request.resource ? `/${request.resource}` : '/') +
    (request.id ? '/:id' : '') +
    (request.verb ? `/${request.verb}` : '');

  i18next.init({
    fallbackLng: 'en',
    lng: state.language,
    resources: {
      en: {
        translation: en,
      },
      ru: {
        translation: ru,
      },
    },
  });

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  const page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);

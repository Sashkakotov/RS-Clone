import './styles/style.scss';

import Navbar from './pages/navBar/Navbar';
import Bottombar from './pages/bottomBar/Bottombar';
import Utils from './services/Utils';
import { tsQuerySelector } from './helpers/helpers';
import Board from './pages/boards/board';
import Home from './pages/home/home';
import Error404 from './pages/error404/error404';

const routes = {
  '/': Home,
  '/project/:id': Board,
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

  header.innerHTML = await Navbar.render();
  await Navbar.after_render();
  footer.innerHTML = await Bottombar.render();
  await Bottombar.after_render();

  const page = routes[parsedURL as keyof object] ? routes[parsedURL as keyof object] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener('hashchange', router);

window.addEventListener('load', router);

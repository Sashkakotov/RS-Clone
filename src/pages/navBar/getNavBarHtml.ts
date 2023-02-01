import UI from '../../data/UI';

const getNavBarHtml = () =>
  `
  <div class="header__wrapper">
    <a class="logo">
      <h1 class="logo-header">${UI.headerLogo}</h1>
    </a>
    <div class="navbar">
      <input class="input search-input" placeholder=${UI.searchInputText}>
      <div class="user">
        <h3 class="user-name">Ivan Ivanov</h3>
        <div class="user-img"></div>
      </div>
    </div>
  </div>
  `;

export default getNavBarHtml;

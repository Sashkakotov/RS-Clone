import UI from '../../data/UI';

const getNavBarHtml = () =>
  `
  <div class="header__wrapper">
<<<<<<< HEAD
    <a href="/" class="logo">
=======
    <a class="logo" href="/#">
>>>>>>> 8d765697bd9a3de5f7e391d5a2056e833c27f9b0
      <h1 class="logo-header">${UI.headerLogo}</h1>
    </a>
    <div class="navbar">
      <input class="input search-input" placeholder=${UI.searchInputText}>
      <div class="hidden">
        <h3 class="user-name">Ivan Ivanov</h3>
        <div class="user-img"></div>
      </div>
      <div class="sign">
        <a class="sign-in" href="/#/signin">${UI.signIn}</a>
        <a class="button sign-up-button" href="/#/signup">${UI.signUp}</a>
      </div>
    </div>
  </div>
  `;

export default getNavBarHtml;

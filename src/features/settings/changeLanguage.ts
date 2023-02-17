const changeLanguage = (event: Event) => {
  event.stopPropagation();
  console.log(event.target);
};

export default changeLanguage;

//* set evebts when page loaded
window.addEventListener('DOMContentLoaded', function () {
  const sidenav = document.querySelector('.sidebar .sidebar__nav');

  // functions
  const isSelectableBtn = (el) => {
    return el.classList.contains('nav__btn') && !el.classList.contains('is-active');
  };

  const removeActiveClass = (cls) => {
    const activeElm = document.querySelector(cls);
    activeElm.classList.remove('is-active');
  };

  sidenav.addEventListener('click', (el) => {
    let target = isSelectableBtn(el.target) ? el.target : null;

    target = isSelectableBtn(el.target.parentNode) ? el.target.parentNode : target;

    if (target) {
      // remove active button and page
      removeActiveClass('.sidebar__nav .nav__btn.is-active');
      removeActiveClass('.sidebar__pages>.is-active');

      // active clicked button
      target.classList.add('is-active');

      // active page based on button data-page
      const page = document.getElementById(target.dataset.page);
      page.classList.add('is-active');
    }
  });
});

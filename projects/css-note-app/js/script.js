document.querySelectorAll('.head > .toggle').forEach((menu_toggle) => {
  const head = menu_toggle.parentNode;
  const menu_items = head.querySelector('.head > .menu');
  const head_title = head.querySelector('.head > .title');

  // head toogle
  menu_toggle.addEventListener('click', (event) => {
    // toggle head title
    menu_toggle.classList.toggle('change');
    menu_items.classList.toggle('show');
    head_title.classList.toggle('hide');
    head.classList.toggle('shadow');
  });
});

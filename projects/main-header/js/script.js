const links = document.querySelector('.links');
let lastActive = links.querySelector('.active');

links.addEventListener('click', (el) => {
  // select li from a
  const elm = el.target.parentNode;

  if (elm.tagName.toLowerCase() === 'li') {
    // active new btn
    elm.classList.add('active');

    // remove last btn
    if (lastActive) lastActive.classList.remove('active');

    // save active btn
    lastActive = elm;
  }
});

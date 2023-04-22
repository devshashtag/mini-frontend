const redirect_Page = function(element, url) {
  const messageElement = document.getElementById ('msg')
  element.disabled = true;

  let timeout = 3;

  let interval = setInterval(function () {
    messageElement.innerHTML = 'درحال انتقال، بعد از ' + timeout + ' ثانیه دیگر';

    if (timeout === 0) {
      const linkElement = document.createElement('a');
      linkElement.target = '_blank';
      linkElement.href = url;
      linkElement.click();

      setTimeout(() => { element.disabled = false; }, 1000);
      clearInterval(interval);
    }

    timeout--;
  }, 1000);
}

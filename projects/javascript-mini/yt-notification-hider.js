function closeNotification() {
  document.querySelector('ytd-notification-renderer').querySelector('button > yt-icon').click();
  setTimeout(() => document.querySelector('yt-formatted-string.style-scope.ytd-menu-service-item-renderer').click(), 200);
}

for (let i = -1; i < 100; i++) setTimeout(() => closeNotification(), i * 500);

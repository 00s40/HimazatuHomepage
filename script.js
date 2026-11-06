// 公開前に、ここへ実際のURLを入力してください。
// 例: invite: 'https://discord.gg/xxxxxxxx'
const siteLinks = {
  invite: '',
  cyber: '',
  x: ''
};

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');
    navigation.classList.remove('is-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    navigation.classList.toggle('is-open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
}

for (const [key, value] of Object.entries(siteLinks)) {
  const url = value.trim();
  const valid = /^https:\/\//i.test(url);
  document.querySelectorAll(`[data-link="${key}"]`).forEach((link) => {
    if (valid) {
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    } else {
      link.removeAttribute('href');
      link.classList.add('is-unavailable');
      link.setAttribute('aria-disabled', 'true');
    }
  });
  if (valid) {
    document.querySelectorAll(`[data-link-note="${key}"]`).forEach((note) => {
      note.textContent = key === 'invite' ? '別タブでDiscordを開きます' : '外部サイトへ移動します';
    });
  }
}

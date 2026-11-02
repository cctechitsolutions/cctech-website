(() => {
  const menu = document.getElementById('ccMobileMenu');
  const navigation = document.getElementById('ccSiteNav');

  if (menu && navigation) {
    if (!navigation.querySelector('a[href="laptop-inspector.html"]')) {
      const inspectorLink = document.createElement('a');
      inspectorLink.href = 'laptop-inspector.html';
      inspectorLink.textContent = 'Laptop Inspector';
      const cta = navigation.querySelector('.cc-nav-cta');
      navigation.insertBefore(inspectorLink, cta || null);
    }
    menu.addEventListener('click', () => {
      const isOpen = navigation.classList.toggle('open');
      menu.setAttribute('aria-expanded', String(isOpen));
      menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menu.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
    });

    navigation.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navigation.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-label', 'Open navigation');
        menu.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      });
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navigation.querySelectorAll('a[href]').forEach(link => {
      const [linkPath, linkHash] = link.getAttribute('href').split('#');
      const linkPage = linkPath.split('?')[0];
      const isCurrent = linkPage === currentPage && (!linkHash || window.location.hash === `#${linkHash}`);
      if (isCurrent) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
  }

  const cartBadge = document.getElementById('cartCount');
  if (cartBadge) {
    try {
      const cart = JSON.parse(localStorage.getItem('cctech_cart') || '[]');
      cartBadge.textContent = cart.reduce((count, item) => count + Number(item.qty || 1), 0);
    } catch {
      cartBadge.textContent = '0';
    }
  }
})();

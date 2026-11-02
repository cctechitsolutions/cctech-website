(() => {
  const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
  const iconRules = [
    [/laptop|desktop/i, 'fa-laptop'], [/workstation|server/i, 'fa-server'],
    [/cctv|security/i, 'fa-video'], [/ups|power/i, 'fa-bolt'],
    [/storage|memory/i, 'fa-hard-drive'], [/raspberry|electronics/i, 'fa-microchip'],
    [/accessor|parts/i, 'fa-plug']
  ];
  const data = typeof CCData !== 'undefined' ? CCData : {};
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const seen = new Set();
  const uniqueCategories = categories.filter(category => {
    if (!category?.name || seen.has(category.name)) return false;
    seen.add(category.name);
    return true;
  });
  const findIcon = name => iconRules.find(([pattern]) => pattern.test(name))?.[1] || 'fa-box-open';

  const categoryCards = uniqueCategories.map((category, index) => {
    const name = escapeHtml(category.name);
    const image = escapeHtml(category.image || data.categoryImages?.default || 'images/sales/default.webp');
    const description = escapeHtml(category.description || 'Browse products and ask our team for help.');
    const link = `sales-dynamic.html?category=${encodeURIComponent(category.name)}`;
    return `<a class="category-card" href="${link}"><img src="${image}" alt="" loading="lazy" decoding="async"><span class="card-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></span><div class="cat-copy"><small>${String(index + 1).padStart(2, '0')} / catalog</small><h3>${name}</h3><p>${description}</p></div></a>`;
  }).join('');
  const serviceCard = '<a class="category-card" href="service-dynamic.html"><span class="card-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></span><div class="cat-copy"><small>Support catalog</small><h3>IT Services</h3><p>Repairs, installation and business support</p></div></a>' + '<a class="category-card" href="amc.html"><span class="card-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></span><div class="cat-copy"><small>Business support</small><h3>AMC Plans</h3><p>Planned maintenance and ongoing IT care</p></div></a>';
  const sellCard = '<a class="category-card catalog-card-buyback" href="sell-used-laptop.html"><span class="card-arrow"><i class="fa-solid fa-arrow-up-right-from-square"></i></span><div class="cat-copy"><small>Sell or trade in</small><h3>Sell Your Used Laptop</h3><p>Get an assessment from our team on WhatsApp</p></div></a>';
  document.getElementById('categoryGrid').innerHTML = categoryCards + serviceCard + sellCard;
  document.getElementById('heroCatalogGrid').innerHTML = uniqueCategories.map(category => {
    const link = `sales-dynamic.html?category=${encodeURIComponent(category.name)}`;
    return `<a class="hero-catalog-link" href="${link}"><i class="fa-solid ${findIcon(category.name)}"></i><span>${escapeHtml(category.name)}</span></a>`;
  }).join('') + '<a class="hero-catalog-link" href="service-dynamic.html"><i class="fa-solid fa-screwdriver-wrench"></i><span>IT Services</span></a><a class="hero-catalog-link" href="amc.html"><i class="fa-solid fa-arrows-rotate"></i><span>AMC Plans</span></a><a class="hero-catalog-link buyback" href="sell-used-laptop.html"><i class="fa-solid fa-arrow-rotate-left"></i><span>Sell or trade in your used laptop</span></a>';
})();

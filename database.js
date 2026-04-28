// CCTech IT Solutions - Central Database v9.0
const CCData = {
  version: "9.0",
  whatsapp: "916364253615",
  
  // ✅ Category-specific images from images/sales folder
  categoryImages: {
    "Laptops": "images/sales/laptops.jpg",
    "Desktops": "images/sales/desktops.jpg",
    "Workstations": "images/sales/workstations.jpg",
    "Servers": "images/sales/servers.jpg",
    "CCTV & Security": "images/sales/cctv-security.jpg",
    "UPS & Power Backup": "images/sales/ups-power.jpg",
    "Electronics & Embedded": "images/sales/electronics-embedded.jpg",
    "Accessories & Spare Parts": "images/sales/accessories.jpg",
    "default": "images/sales/default.jpg"
  },
  
  products: [
    // Your existing products...
    { id: 1, name: "HP Laptop 15s - i5-1235U, 8GB, 512GB SSD", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "NEW", price: 52999, originalPrice: 46086, type: "NEW", image: "images/sales/laptops.jpg", desc: "Intel 12th Gen i5 • 8GB DDR4 • 512GB NVMe SSD • 15.6\" FHD • Windows 11" },
    // ... rest of products
  ],
  
  services: [
    // Your services...
  ]
};

// Cache-busting & LocalStorage sync
if(typeof window !== 'undefined') {
  const saved = localStorage.getItem('cctech_db_version');
  if(saved !== CCData.version) {
    localStorage.removeItem('cctech_db');
    localStorage.setItem('cctech_db_version', CCData.version);
  }
  if(localStorage.getItem('cctech_db')) {
    try {
      const local = JSON.parse(localStorage.getItem('cctech_db'));
      if(Array.isArray(local.products)) CCData.products = local.products;
      if(Array.isArray(local.services)) CCData.services = local.services;
    } catch(e) {}
  }
}

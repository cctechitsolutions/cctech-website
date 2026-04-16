// CC Tech IT Solutions - Central Database
const CCData = {
  whatsapp: "916364253615",
  
  salesCategories: ["Software", "Laptops", "Desktops", "Servers", "CCTV & Security", "Networking", "Accessories", "Components"],
  serviceCategories: ["OS Installation", "Software Repair", "Hardware Repair", "Networking Setup", "Data Recovery", "AMC Plans", "Virus Removal", "Display & Hardware Fix"],
  
  products: [
    { id: 1, name: "Windows 11 Pro", category: "Software", price: 8499, type: "One-time", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Windows_11_logo.svg/1200px-Windows_11_logo.svg.png", desc: "Genuine OEM license • Digital delivery • Lifetime activation", versions: [] },
    { id: 2, name: "CCTech Billing Software", category: "Software", price: 6000, type: "Lifetime", image: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png", desc: "GST compliant • Inventory • Multi-user • Free support", versions: [] },
    { id: 3, name: "HP Laptop 15s (i5, 8GB, 512GB)", category: "Laptops", price: 42999, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png", desc: "Intel i5 11th Gen • 8GB RAM • 512GB SSD • 15.6\" FHD", versions: [] },
    { id: 4, name: "Dell PowerEdge T150 Server", category: "Servers", price: 85000, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2621/2621644.png", desc: "Xeon E-2314 • 16GB ECC RAM • 2TB HDD • RAID", versions: [] },
    { id: 5, name: "Hikvision 4-Camera CCTV Kit", category: "CCTV & Security", price: 18500, type: "Kit", image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png", desc: "2MP Cameras • 4ch DVR • 1TB HDD • Mobile View", versions: [] }
  ],

  services: [
    { id: 101, name: "Windows 11 Clean Installation", category: "OS Installation", price: 1500, image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png", desc: "Full backup • Fresh install • All drivers • Optimization" },
    { id: 102, name: "Virus & Malware Removal", category: "Virus Removal", price: 1200, image: "https://cdn-icons-png.flaticon.com/512/2040/2040545.png", desc: "Deep scan • Quarantine • Cleanup • Antivirus setup" },
    { id: 103, name: "Laptop Display Replacement", category: "Display & Hardware Fix", price: 3500, image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png", desc: "Cracked/broken screen fix • Genuine/OEM panels • 30min-1hr service (panel cost extra)" },
    { id: 104, name: "Laptop Keyboard & Hinge Repair", category: "Display & Hardware Fix", price: 1500, image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png", desc: "Sticky keys • Broken hinge • Trackpad fix • Alignment (parts extra)" },
    { id: 105, name: "Data Recovery (HDD/SSD)", category: "Data Recovery", price: 3000, image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Deleted files • Formatted drive • Corrupted data (success depends on damage)" },
    { id: 106, name: "Home/Office Network Setup", category: "Networking Setup", price: 2500, image: "https://cdn-icons-png.flaticon.com/512/2884/2884368.png", desc: "Router config • WiFi setup • Printer sharing • Security" },
    { id: 107, name: "Annual Maintenance Contract (AMC)", category: "AMC Plans", price: 5000, image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png", desc: "Quarterly visits • Priority support • Updates • Hardware check • 1 year" }
  ]
};

// Safely merge localStorage data
if(typeof window !== 'undefined' && localStorage.getItem('cctech_db')) {
  try {
    const local = JSON.parse(localStorage.getItem('cctech_db'));
    if(Array.isArray(local.products)) CCData.products = local.products;
    if(Array.isArray(local.services)) CCData.services = local.services;
    if(Array.isArray(local.salesCategories)) CCData.salesCategories = local.salesCategories;
    if(Array.isArray(local.serviceCategories)) CCData.serviceCategories = local.serviceCategories;
  } catch(e) {
    console.error("LocalStorage merge error:", e);
  }
}

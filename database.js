// CCTech IT Solutions - Central Database v7.0
const CCData = {
  version: "7.0",
  whatsapp: "916364253615",
  
  products: [
    { id: 1, name: "HP Laptop 15s - i5, 8GB, 512GB", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "NEW", price: 42999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 11th Gen • 8GB RAM • 512GB SSD • 15.6\" FHD • Windows 11" },
    { id: 2, name: "Dell Inspiron 15 - i7, 16GB, 1TB", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Dell", condition: "NEW", price: 62999, type: "NEW", image: "images/laptop.png", desc: "Intel i7 12th Gen • 16GB RAM • 1TB SSD • Backlit Keyboard" },
    { id: 3, name: "Lenovo ThinkPad E14 - Business", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Lenovo", condition: "NEW", price: 54999, type: "NEW", image: "images/laptop.png", desc: "i5 11th Gen • 8GB RAM • 512GB SSD • Fingerprint • 3yr Warranty" },
    { id: 4, name: "Custom Desktop PC - i3, 8GB, 256GB", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "Custom Build", condition: "NEW", price: 28999, type: "NEW", image: "images/laptop.png", desc: "Intel i3 10th Gen • 8GB RAM • 256GB SSD • Keyboard+Mouse" },
    { id: 5, name: "HP ProDesk 400 G6 - i5, 8GB, 1TB", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "HP", condition: "NEW", price: 38999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 10th Gen • 8GB RAM • 1TB HDD • Windows 11 Pro" },
    { id: 6, name: "HP Z240 Workstation - Xeon, 16GB", mainCategory: "Computers & Servers", subCategory: "Workstations", brand: "HP", condition: "NEW", price: 75999, type: "NEW", image: "images/laptop.png", desc: "Xeon E3-1240 • 16GB ECC • 512GB SSD • Quadro GPU • CAD Ready" },
    { id: 7, name: "Dell PowerEdge T150 - Xeon, 16GB", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "Dell", condition: "NEW", price: 95000, type: "NEW", image: "images/server.png", desc: "Xeon E-2314 • 16GB ECC • 2TB HDD • Tower • 3yr Warranty" },
    { id: 8, name: "Dell Latitude E7450 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Dell", condition: "REFURBISHED", price: 24999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • Grade A • 3 Mo Warranty" },
    { id: 9, name: "HP EliteBook 840 G3 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "REFURBISHED", price: 28999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • FHD • Excellent Condition" },
    { id: 10, name: "Dell OptiPlex 3040 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "Dell", condition: "REFURBISHED", price: 18999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 500GB HDD • SFF • Grade A" },
    { id: 11, name: "HP ProLiant DL380 G7 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "HP", condition: "REFURBISHED", price: 65000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon X5650 • 32GB RAM • 4x 300GB SAS • 2U Rack" },
    { id: 12, name: "Hikvision 2MP Dome Camera", mainCategory: "CCTV & Security", subCategory: "Cameras", brand: "Hikvision", condition: "NEW", price: 2200, type: "NEW", image: "images/cctv.png", desc: "2MP • Dome • IR 20m • Weatherproof • CCTV camera" },
    { id: 13, name: "Hikvision 4-Camera CCTV Kit", mainCategory: "CCTV & Security", subCategory: "DVR/NVR Kits", brand: "Hikvision", condition: "NEW", price: 18500, type: "NEW", image: "images/cctv.png", desc: "2MP Cameras • 4ch DVR • 1TB HDD • Mobile View" },
    { id: 14, name: "APC Back-UPS 600VA", mainCategory: "UPS & Power Backup", subCategory: "UPS Units", brand: "APC", condition: "NEW", price: 4500, type: "NEW", image: "images/accessories.png", desc: "600VA/360W • 4 Outlets • Surge Protection • 2yr Warranty" },
    { id: 15, name: "Luminous RC18000 Battery", mainCategory: "UPS & Power Backup", subCategory: "Batteries", brand: "Luminous", condition: "NEW", price: 14500, type: "NEW", image: "images/accessories.png", desc: "150Ah • Tall Tubular • 60 Months Warranty" },
    { id: 16, name: "Arduino Uno R3", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Arduino", condition: "NEW", price: 605, type: "BOARD", image: "images/embedded-board.png", desc: "ATmega328P • 16MHz • 14 Digital I/O • 6 Analog • USB" },
    { id: 17, name: "Raspberry Pi 4 Model B 4GB", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Raspberry Pi", condition: "NEW", price: 6589, type: "BOARD", image: "images/embedded-board.png", desc: "Quad-core Cortex-A72 • 4GB RAM • WiFi • BT • GigE" },
    { id: 18, name: "HC-SR04 Ultrasonic Sensor", mainCategory: "Electronics & Embedded", subCategory: "Sensors & Modules", brand: "Generic", condition: "NEW", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "2cm-400cm range • 5V • Trigger/Echo • Distance measurement" },
    { id: 19, name: "Samsung 970 EVO Plus 1TB NVMe", mainCategory: "Accessories & Spare Parts", subCategory: "Storage", brand: "Samsung", condition: "NEW", price: 6499, type: "STORAGE", image: "images/accessories.png", desc: "Read: 3500MB/s • Write: 3300MB/s • 5yr Warranty" },
    { id: 20, name: "Logitech Wireless Keyboard & Mouse", mainCategory: "Accessories & Spare Parts", subCategory: "Peripherals", brand: "Logitech", condition: "NEW", price: 1499, type: "ACCESSORY", image: "images/accessories.png", desc: "2.4GHz Wireless • 10m Range • Long Battery • Spill Resistant" }
  ],

  services: [
    { id: 101, name: "Windows 11 Clean Installation", category: "OS Installation", price: 1500, image: "images/service-os.png", desc: "Full backup • Fresh install • All drivers • Optimization" },
    { id: 102, name: "Virus & Malware Removal", category: "Virus Removal", price: 1200, image: "images/service-virus.png", desc: "Deep scan • Quarantine • Cleanup • Antivirus setup" },
    { id: 103, name: "Laptop Display Replacement", category: "Display & Hardware Fix", price: 3500, image: "images/service-hardware.png", desc: "Cracked/broken screen • Genuine panels • 30min-1hr (panel extra)" },
    { id: 104, name: "Data Recovery HDD/SSD", category: "Data Recovery", price: 3000, image: "images/service-data-recovery.png", desc: "Deleted files • Formatted drive • Corrupted data" },
    { id: 105, name: "Home/Office Network Setup", category: "Networking Setup", price: 2500, image: "images/service-network.png", desc: "Router config • WiFi setup • Printer sharing • Security" },
    { id: 106, name: "Annual Maintenance Contract AMC", category: "AMC Plans", price: 5000, image: "images/service-amc.png", desc: "Quarterly visits • Priority support • Updates • 1 year" }
  ]
};

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

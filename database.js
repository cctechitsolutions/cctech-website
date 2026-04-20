// CCTech IT Solutions - Central Database v8.0
const CCData = {
  version: "8.0",
  whatsapp: "916364253615",
  
  products: [
    // ==================== COMPUTERS & SERVERS ====================
    { id: 1, name: "HP Laptop 15s - i5, 8GB, 512GB", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "NEW", price: 42999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 11th Gen • 8GB RAM • 512GB SSD • 15.6\" FHD • Windows 11" },
    { id: 2, name: "Dell Inspiron 15 - i7, 16GB, 1TB", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Dell", condition: "NEW", price: 62999, type: "NEW", image: "images/laptop.png", desc: "Intel i7 12th Gen • 16GB RAM • 1TB SSD • Backlit Keyboard" },
    { id: 3, name: "Lenovo ThinkPad E14 - Business", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Lenovo", condition: "NEW", price: 54999, type: "NEW", image: "images/laptop.png", desc: "i5 11th Gen • 8GB RAM • 512GB SSD • Fingerprint • 3yr Warranty" },
    { id: 4, name: "Dell Latitude E7450 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Dell", condition: "REFURBISHED", price: 24999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • Grade A • 3 Mo Warranty" },
    { id: 5, name: "HP EliteBook 840 G3 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "REFURBISHED", price: 28999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • FHD • Excellent Condition" },
    { id: 6, name: "Custom Desktop PC - i3, 8GB, 256GB", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "Custom Build", condition: "NEW", price: 28999, type: "NEW", image: "images/laptop.png", desc: "Intel i3 10th Gen • 8GB RAM • 256GB SSD • Keyboard+Mouse" },
    { id: 7, name: "HP ProDesk 400 G6 - i5, 8GB, 1TB", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "HP", condition: "NEW", price: 38999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 10th Gen • 8GB RAM • 1TB HDD • Windows 11 Pro" },
    { id: 8, name: "Dell OptiPlex 3040 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "Dell", condition: "REFURBISHED", price: 18999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 500GB HDD • SFF • Grade A" },
    { id: 9, name: "HP Z240 Workstation - Xeon, 16GB", mainCategory: "Computers & Servers", subCategory: "Workstations", brand: "HP", condition: "NEW", price: 75999, type: "NEW", image: "images/laptop.png", desc: "Xeon E3-1240 • 16GB ECC • 512GB SSD • Quadro GPU • CAD Ready" },
    { id: 10, name: "Dell Precision 3520 - i7, 32GB", mainCategory: "Computers & Servers", subCategory: "Workstations", brand: "Dell", condition: "NEW", price: 95999, type: "NEW", image: "images/laptop.png", desc: "Intel i7 7th Gen • 32GB RAM • 1TB SSD • Quadro • Engineering" },
    { id: 11, name: "Dell PowerEdge T150 - Xeon, 16GB", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "Dell", condition: "NEW", price: 95000, type: "NEW", image: "images/server.png", desc: "Xeon E-2314 • 16GB ECC • 2TB HDD • Tower • 3yr Warranty" },
    { id: 12, name: "HP ProLiant DL380 G7 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "HP", condition: "REFURBISHED", price: 65000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon X5650 • 32GB RAM • 4x 300GB SAS • 2U Rack" },
    { id: 13, name: "Dell PowerEdge R720 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "Dell", condition: "REFURBISHED", price: 75000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon E5-2650 • 64GB RAM • 4x 600GB SAS • 2U" },

    // ==================== CCTV & SECURITY ====================
    { id: 14, name: "Hikvision 2MP Dome Camera", mainCategory: "CCTV & Security", subCategory: "Cameras", brand: "Hikvision", condition: "NEW", price: 2200, type: "NEW", image: "images/cctv.png", desc: "2MP • Dome • IR 20m • Weatherproof • CCTV camera" },
    { id: 15, name: "CP Plus 2MP Bullet Camera", mainCategory: "CCTV & Security", subCategory: "Cameras", brand: "CP Plus", condition: "NEW", price: 1900, type: "NEW", image: "images/cctv.png", desc: "2MP • Bullet • IR 30m • Metal Body • Outdoor" },
    { id: 16, name: "Hikvision 4-Camera CCTV Kit", mainCategory: "CCTV & Security", subCategory: "DVR/NVR Kits", brand: "Hikvision", condition: "NEW", price: 18500, type: "NEW", image: "images/cctv.png", desc: "2MP Cameras • 4ch DVR • 1TB HDD • Mobile View" },
    { id: 17, name: "CP Plus 8-Camera CCTV Kit", mainCategory: "CCTV & Security", subCategory: "DVR/NVR Kits", brand: "CP Plus", condition: "NEW", price: 32000, type: "NEW", image: "images/cctv.png", desc: "2MP Dome • 8ch DVR • 2TB HDD • Night Vision" },
    { id: 18, name: "CCTV DVR 8-Channel", mainCategory: "CCTV & Security", subCategory: "DVR/NVR Kits", brand: "Hikvision", condition: "NEW", price: 4500, type: "NEW", image: "images/cctv.png", desc: "8ch • 1080p • HDMI/VGA • Mobile View" },
    { id: 19, name: "CCTV Power Supply & BNC Connectors", mainCategory: "CCTV & Security", subCategory: "Security Accessories", brand: "Generic", condition: "NEW", price: 1200, type: "NEW", image: "images/cctv.png", desc: "12V 5A PSU • 10x BNC Connectors • CCTV Installation Kit" },

    // ==================== UPS & POWER BACKUP ====================
    { id: 20, name: "APC Back-UPS 600VA", mainCategory: "UPS & Power Backup", subCategory: "UPS Units", brand: "APC", condition: "NEW", price: 4500, type: "NEW", image: "images/accessories.png", desc: "600VA/360W • 4 Outlets • Surge Protection • 2yr Warranty" },
    { id: 21, name: "Microtek UPS 1100VA", mainCategory: "UPS & Power Backup", subCategory: "UPS Units", brand: "Microtek", condition: "NEW", price: 3200, type: "NEW", image: "images/accessories.png", desc: "1100VA • 1 Battery • Pure Sine Wave • LCD Display" },
    { id: 22, name: "Luminous Zelio+ 1100VA", mainCategory: "UPS & Power Backup", subCategory: "UPS Units", brand: "Luminous", condition: "NEW", price: 5800, type: "NEW", image: "images/accessories.png", desc: "1100VA/900W • Pure Sine Wave • 3yr Warranty" },
    { id: 23, name: "Luminous RC18000 Battery", mainCategory: "UPS & Power Backup", subCategory: "Batteries", brand: "Luminous", condition: "NEW", price: 14500, type: "NEW", image: "images/accessories.png", desc: "150Ah • Tall Tubular • 60 Months Warranty" },
    { id: 24, name: "Exide Invatubular IT500", mainCategory: "UPS & Power Backup", subCategory: "Batteries", brand: "Exide", condition: "NEW", price: 13800, type: "NEW", image: "images/accessories.png", desc: "150Ah • Tubular • 66 Months Warranty • Maintenance Free" },
    { id: 25, name: "V-Guard VG 500 Stabilizer", mainCategory: "UPS & Power Backup", subCategory: "Stabilizers", brand: "V-Guard", condition: "NEW", price: 2800, type: "NEW", image: "images/accessories.png", desc: "500VA • AC to DC • TV/Fridge Compatible • 3yr Warranty" },

    // ==================== ELECTRONICS & EMBEDDED ====================
    { id: 26, name: "Arduino Uno R3", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Arduino", condition: "NEW", price: 605, type: "BOARD", image: "images/embedded-board.png", desc: "ATmega328P • 16MHz • 14 Digital I/O • 6 Analog • USB" },
    { id: 27, name: "Raspberry Pi 4 Model B 4GB", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Raspberry Pi", condition: "NEW", price: 6589, type: "BOARD", image: "images/embedded-board.png", desc: "Quad-core Cortex-A72 • 4GB RAM • WiFi • BT • GigE" },
    { id: 28, name: "ESP32-WROOM-32D", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Espressif", condition: "NEW", price: 385, type: "MODULE", image: "images/embedded-board.png", desc: "Dual-core • WiFi+Bluetooth • 4MB Flash • IoT ready" },
    { id: 29, name: "HC-SR04 Ultrasonic Sensor", mainCategory: "Electronics & Embedded", subCategory: "Sensors & Modules", brand: "Generic", condition: "NEW", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "2cm-400cm range • 5V • Trigger/Echo • Distance measurement" },
    { id: 30, name: "DHT11 Temperature & Humidity", mainCategory: "Electronics & Embedded", subCategory: "Sensors & Modules", brand: "Generic", condition: "NEW", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "20-90% RH • 0-50°C • Digital output • Low cost" },
    { id: 31, name: "L298N Dual H-Bridge Motor Driver", mainCategory: "Electronics & Embedded", subCategory: "Motor Drivers", brand: "Generic", condition: "NEW", price: 198, type: "DRIVER", image: "images/motor-driver.png", desc: "Dual motor • 2A/channel • 5-35V • Heat sink • Robotics" },
    { id: 32, name: "16x2 LCD with I2C", mainCategory: "Electronics & Embedded", subCategory: "Displays", brand: "Generic", condition: "NEW", price: 330, type: "DISPLAY", image: "images/display.png", desc: "16x2 • I2C backpack • 2-wire interface • Easy wiring" },
    { id: 33, name: "OLED 0.96\" I2C 128x64", mainCategory: "Electronics & Embedded", subCategory: "Displays", brand: "Generic", condition: "NEW", price: 275, type: "DISPLAY", image: "images/display.png", desc: "0.96\" • 128x64 pixels • I2C • White/Blue/Yellow" },
    { id: 34, name: "Breadboard 830 Tie-Points", mainCategory: "Electronics & Embedded", subCategory: "Components", brand: "Generic", condition: "NEW", price: 110, type: "COMPONENT", image: "images/components.png", desc: "830 holes • Solderless • Adhesive backing • Power rails" },
    { id: 35, name: "Jumper Wires M-M 120pcs", mainCategory: "Electronics & Embedded", subCategory: "Components", brand: "Generic", condition: "NEW", price: 165, type: "COMPONENT", image: "images/components.png", desc: "Male-to-Male • 20cm • 120 pieces • Assorted colors" },
    { id: 36, name: "Resistor Kit 1/4W 600pcs", mainCategory: "Electronics & Embedded", subCategory: "Components", brand: "Generic", condition: "NEW", price: 275, type: "COMPONENT", image: "images/components.png", desc: "10Ω-1MΩ • 30 values • 5% tolerance • Storage box" },
    { id: 37, name: "LED Kit 5mm 200pcs", mainCategory: "Electronics & Embedded", subCategory: "Components", brand: "Generic", condition: "NEW", price: 165, type: "COMPONENT", image: "images/components.png", desc: "Red/Green/Blue/Yellow/White • 40pcs each • 3-5V" },
    { id: 38, name: "Raspberry Pi 4 Case with Fan", mainCategory: "Electronics & Embedded", subCategory: "Enclosures", brand: "Generic", condition: "NEW", price: 495, type: "ENCLOSURE", image: "images/enclosure.png", desc: "Dual fan • Heat sinks • Easy access • ABS • Black/Red" },
    { id: 39, name: "Digital Multimeter DT830D", mainCategory: "Electronics & Embedded", subCategory: "Tools & Equipment", brand: "Generic", condition: "NEW", price: 259, type: "TOOL", image: "images/tools.png", desc: "DC/AC Voltage • Current • Resistance • Diode • Buzzer" },
    { id: 40, name: "Soldering Iron 60W Adjustable", mainCategory: "Electronics & Embedded", subCategory: "Tools & Equipment", brand: "Generic", condition: "NEW", price: 605, type: "TOOL", image: "images/tools.png", desc: "200-450°C • Temperature control • 5 tips • Stand • ON/OFF" },
    { id: 41, name: "Arduino Robot Car Chassis Kit", mainCategory: "Electronics & Embedded", subCategory: "Robotics Kits", brand: "Generic", condition: "NEW", price: 1649, type: "KIT", image: "images/robotics.png", desc: "2WD • Acrylic chassis • Motors • Wheels • Ultrasonic sensor" },

    // ==================== ACCESSORIES & SPARE PARTS ====================
    { id: 42, name: "Samsung 970 EVO Plus 1TB NVMe", mainCategory: "Accessories & Spare Parts", subCategory: "Storage", brand: "Samsung", condition: "NEW", price: 6499, type: "STORAGE", image: "images/accessories.png", desc: "Read: 3500MB/s • Write: 3300MB/s • 5yr Warranty" },
    { id: 43, name: "Corsair Vengeance 16GB DDR4", mainCategory: "Accessories & Spare Parts", subCategory: "RAM", brand: "Corsair", condition: "NEW", price: 3299, type: "RAM", image: "images/accessories.png", desc: "3200MHz • CL16 • Desktop • Lifetime Warranty" },
    { id: 44, name: "LG 24\" IPS Monitor FHD", mainCategory: "Accessories & Spare Parts", subCategory: "Monitors", brand: "LG", condition: "NEW", price: 9999, type: "MONITOR", image: "images/accessories.png", desc: "1920x1080 • IPS Panel • HDMI + VGA • Eye Care • 3yr" },
    { id: 45, name: "Logitech Wireless Keyboard & Mouse", mainCategory: "Accessories & Spare Parts", subCategory: "Peripherals", brand: "Logitech", condition: "NEW", price: 1499, type: "ACCESSORY", image: "images/accessories.png", desc: "2.4GHz Wireless • 10m Range • Long Battery • Spill Resistant" },
    { id: 46, name: "HDMI Cable 2.0 3m", mainCategory: "Accessories & Spare Parts", subCategory: "Cables & Adapters", brand: "Generic", condition: "NEW", price: 350, type: "CABLE", image: "images/accessories.png", desc: "HDMI 2.0 • 4K@60Hz • 3 meter • Gold plated" },
    { id: 47, name: "USB 3.0 Extension Cable 3m", mainCategory: "Accessories & Spare Parts", subCategory: "Cables & Adapters", brand: "Generic", condition: "NEW", price: 250, type: "CABLE", image: "images/accessories.png", desc: "USB 3.0 • 3 meter • Male to Female • High speed" },
    { id: 48, name: "Webcam HD 1080p with Mic", mainCategory: "Accessories & Spare Parts", subCategory: "Peripherals", brand: "Generic", condition: "NEW", price: 1899, type: "ACCESSORY", image: "images/accessories.png", desc: "1080p Full HD • Built-in mic • USB • Auto focus" },
    { id: 49, name: "External HDD 1TB USB 3.0", mainCategory: "Accessories & Spare Parts", subCategory: "Storage", brand: "WD", condition: "NEW", price: 3999, type: "STORAGE", image: "images/accessories.png", desc: "1TB • USB 3.0 • Portable • Plug & play" },
    { id: 50, name: "Dell 24\" Monitor (REFURBISHED)", mainCategory: "Accessories & Spare Parts", subCategory: "Monitors", brand: "Dell", condition: "REFURBISHED", price: 6500, type: "REFURBISHED", image: "images/accessories.png", desc: "24\" FHD • IPS • HDMI/VGA • Grade A • 3 Mo Warranty" },
    { id: 51, name: "HP 65W Laptop Adapter (REFURBISHED)", mainCategory: "Accessories & Spare Parts", subCategory: "Cables & Adapters", brand: "HP", condition: "REFURBISHED", price: 800, type: "REFURBISHED", image: "images/accessories.png", desc: "19.5V 3.34A • Tested • Working condition • Multiple tips" }
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

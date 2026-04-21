// CCTech IT Solutions - Central Database v9.0
const CCData = {
  version: "9.0",
  whatsapp: "916364253615",
  
  products: [
    // COMPUTERS & SERVERS
    { id: 1, name: "HP Laptop 15s - i5-1235U, 8GB, 512GB SSD", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "NEW", price: 52999, originalPrice: 46086, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i5 • 8GB DDR4 • 512GB NVMe SSD • 15.6\" FHD • Windows 11" },
    { id: 2, name: "Dell Inspiron 15 3520 - i5-1235U, 16GB, 512GB", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Dell", condition: "NEW", price: 64999, originalPrice: 56521, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i5 • 16GB DDR4 • 512GB SSD • Backlit Keyboard • FHD Display" },
    { id: 3, name: "Lenovo IdeaPad Slim 3 - i5-12450H, 16GB, 512GB", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Lenovo", condition: "NEW", price: 58999, originalPrice: 51303, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i5 • 16GB DDR4 • 512GB SSD • 15.6\" FHD • Thin & Light" },
    { id: 4, name: "Dell Latitude E7450 (REFURBISHED) - i5-1135G7", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "Dell", condition: "REFURBISHED", price: 34999, originalPrice: 30434, type: "REFURBISHED", image: "images/laptop.png", desc: "Intel 11th Gen i5 • 8GB RAM • 256GB SSD • Grade A • 3 Mo Warranty" },
    { id: 5, name: "HP EliteBook 840 G8 (REFURBISHED) - i5-1135G7", mainCategory: "Computers & Servers", subCategory: "Laptops", brand: "HP", condition: "REFURBISHED", price: 42999, originalPrice: 37391, type: "REFURBISHED", image: "images/laptop.png", desc: "Intel 11th Gen i5 • 8GB RAM • 256GB SSD • FHD • Excellent Condition" },
    { id: 6, name: "HP Desktop M01 - i3-12100, 8GB, 256GB SSD", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "HP", condition: "NEW", price: 34999, originalPrice: 30434, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i3 • 8GB DDR4 • 256GB NVMe SSD • Keyboard + Mouse • Windows 11" },
    { id: 7, name: "Dell Inspiron 3910 - i5-12400, 8GB, 512GB", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "Dell", condition: "NEW", price: 48999, originalPrice: 42608, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i5 • 8GB DDR4 • 512GB SSD • Tower • Windows 11 Home" },
    { id: 8, name: "Dell OptiPlex 3040 (REFURBISHED) - i5-6500", mainCategory: "Computers & Servers", subCategory: "Desktops", brand: "Dell", condition: "REFURBISHED", price: 22999, originalPrice: 19999, type: "REFURBISHED", image: "images/laptop.png", desc: "Intel 6th Gen i5 • 8GB RAM • 500GB HDD • SFF • Grade A" },
    { id: 9, name: "HP Z2 G9 Tower - i7-12700, 32GB, 512GB SSD", mainCategory: "Computers & Servers", subCategory: "Workstations", brand: "HP", condition: "NEW", price: 124999, originalPrice: 108695, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i7 • 32GB DDR4 • 512GB NVMe • Quadro T600 4GB • CAD/3D Ready" },
    { id: 10, name: "Dell Precision 3660 - i7-12700, 32GB, 1TB", mainCategory: "Computers & Servers", subCategory: "Workstations", brand: "Dell", condition: "NEW", price: 134999, originalPrice: 117391, type: "NEW", image: "images/laptop.png", desc: "Intel 12th Gen i7 • 32GB DDR4 • 1TB NVMe • RTX A2000 • Engineering Workstation" },
    { id: 11, name: "Dell PowerEdge T150 - Xeon E-2314, 16GB, 2TB", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "Dell", condition: "NEW", price: 114999, originalPrice: 99999, type: "NEW", image: "images/server.png", desc: "Intel Xeon E-2314 • 16GB ECC DDR4 • 2TB HDD • Tower • 3yr Warranty • iDRAC9" },
    { id: 12, name: "HP ProLiant DL380 G7 (REFURBISHED)", mainCategory: "Computers & Servers", subCategory: "Servers", brand: "HP", condition: "REFURBISHED", price: 74999, originalPrice: 65217, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon X5650 • 32GB RAM • 4x 300GB SAS • 2U Rack • Tested" },

    // CCTV & SECURITY
    { id: 13, name: "Hikvision 2MP Dome Camera DS-2CE56H0T-ITPF", mainCategory: "CCTV & Security", subCategory: "Cameras", brand: "Hikvision", condition: "NEW", price: 2530, originalPrice: 2200, type: "NEW", image: "images/cctv.png", desc: "2MP • 1080p • Dome • IR 20m • Weatherproof • CCTV camera" },
    { id: 14, name: "CP Plus 2MP Bullet Camera CP-VC-B20DLR", mainCategory: "CCTV & Security", subCategory: "Cameras", brand: "CP Plus", condition: "NEW", price: 2185, originalPrice: 1900, type: "NEW", image: "images/cctv.png", desc: "2MP • Bullet • IR 30m • Metal Body • Outdoor • 1080p" },
    { id: 15, name: "Hikvision 4-Camera 2MP Kit DS-J14A1", mainCategory: "CCTV & Security", subCategory: "DVR/NVR Kits", brand: "Hikvision", condition: "NEW", price: 21275, originalPrice: 18500, type: "NEW", image: "images/cctv.png", desc: "4x 2MP Cameras • 4ch DVR • 1TB HDD • Mobile View • Installation Kit" },
    { id: 16, name: "CP Plus 8-Camera 2MP Kit CP-PLUS-8CH", mainCategory: "CCTV & Security", subCategory: "DVR/NVR Kits", brand: "CP Plus", condition: "NEW", price: 36800, originalPrice: 32000, type: "NEW", image: "images/cctv.png", desc: "8x 2MP Dome • 8ch DVR • 2TB HDD • Night Vision • Mobile App" },

    // UPS & POWER BACKUP
    { id: 17, name: "APC Back-UPS 600VA BX600C-IN", mainCategory: "UPS & Power Backup", subCategory: "UPS Units", brand: "APC", condition: "NEW", price: 5175, originalPrice: 4500, type: "NEW", image: "images/accessories.png", desc: "600VA/360W • 4 Outlets • Surge Protection • 2yr Warranty • AVR" },
    { id: 18, name: "Microtek UPS SEBz 1100VA", mainCategory: "UPS & Power Backup", subCategory: "UPS Units", brand: "Microtek", condition: "NEW", price: 3680, originalPrice: 3200, type: "NEW", image: "images/accessories.png", desc: "1100VA • 1 Battery • Pure Sine Wave • LCD Display • 2yr Warranty" },
    { id: 19, name: "Luminous RC18000 Tall Tubular Battery", mainCategory: "UPS & Power Backup", subCategory: "Batteries", brand: "Luminous", condition: "NEW", price: 16675, originalPrice: 14500, type: "NEW", image: "images/accessories.png", desc: "150Ah • Tall Tubular • 60 Months Warranty • Fast Charging • Low Maintenance" },

    // ELECTRONICS & EMBEDDED
    { id: 20, name: "Arduino Uno R3 (Original)", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Arduino", condition: "NEW", price: 690, originalPrice: 600, type: "BOARD", image: "images/embedded-board.png", desc: "ATmega328P • 16MHz • 14 Digital I/O • 6 Analog • USB • Official" },
    { id: 21, name: "Raspberry Pi 4 Model B 4GB", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Raspberry Pi", condition: "NEW", price: 7590, originalPrice: 6600, type: "BOARD", image: "images/embedded-board.png", desc: "Quad-core Cortex-A72 • 4GB RAM • WiFi • BT • GigE • USB 3.0" },
    { id: 22, name: "ESP32-WROOM-32D WiFi+BT", mainCategory: "Electronics & Embedded", subCategory: "Development Boards", brand: "Espressif", condition: "NEW", price: 460, originalPrice: 400, type: "MODULE", image: "images/embedded-board.png", desc: "Dual-core • WiFi+Bluetooth • 4MB Flash • IoT Ready • Low Power" },
    { id: 23, name: "HC-SR04 Ultrasonic Sensor", mainCategory: "Electronics & Embedded", subCategory: "Sensors & Modules", brand: "Generic", condition: "NEW", price: 138, originalPrice: 120, type: "SENSOR", image: "images/sensor.png", desc: "2cm-400cm Range • 5V • Trigger/Echo • Distance Measurement • Arduino" },
    { id: 24, name: "DHT11 Temperature & Humidity", mainCategory: "Electronics & Embedded", subCategory: "Sensors & Modules", brand: "Generic", condition: "NEW", price: 138, originalPrice: 120, type: "SENSOR", image: "images/sensor.png", desc: "20-90% RH • 0-50°C • Digital Output • Low Cost • Weather Station" },
    { id: 25, name: "L298N Dual H-Bridge Motor Driver", mainCategory: "Electronics & Embedded", subCategory: "Motor Drivers", brand: "Generic", condition: "NEW", price: 230, originalPrice: 200, type: "DRIVER", image: "images/motor-driver.png", desc: "Dual Motor • 2A/Channel • 5-35V • Heat Sink • Robotics • Arduino" },
    { id: 26, name: "16x2 LCD with I2C Interface", mainCategory: "Electronics & Embedded", subCategory: "Displays", brand: "Generic", condition: "NEW", price: 391, originalPrice: 340, type: "DISPLAY", image: "images/display.png", desc: "16x2 • I2C Backpack • 2-Wire Interface • Easy Wiring • Arduino" },
    { id: 27, name: "Breadboard 830 Tie-Points", mainCategory: "Electronics & Embedded", subCategory: "Components", brand: "Generic", condition: "NEW", price: 138, originalPrice: 120, type: "COMPONENT", image: "images/components.png", desc: "830 Holes • Solderless • Adhesive Backing • Power Rails • Prototyping" },
    { id: 28, name: "Raspberry Pi 4 Case with Fan", mainCategory: "Electronics & Embedded", subCategory: "Enclosures", brand: "Generic", condition: "NEW", price: 575, originalPrice: 500, type: "ENCLOSURE", image: "images/enclosure.png", desc: "Dual Fan • Heat Sinks • Easy Access • ABS • Black/Red • Cooling" },
    { id: 29, name: "Digital Multimeter DT830D", mainCategory: "Electronics & Embedded", subCategory: "Tools & Equipment", brand: "Generic", condition: "NEW", price: 311, originalPrice: 270, type: "TOOL", image: "images/tools.png", desc: "DC/AC Voltage • Current • Resistance • Diode • Buzzer • Testing" },
    { id: 30, name: "Arduino Robot Car Chassis Kit", mainCategory: "Electronics & Embedded", subCategory: "Robotics Kits", brand: "Generic", condition: "NEW", price: 1898, originalPrice: 1650, type: "KIT", image: "images/robotics.png", desc: "2WD • Acrylic Chassis • Motors • Wheels • Ultrasonic Sensor • Arduino" },

    // ACCESSORIES & SPARE PARTS
    { id: 31, name: "Samsung 970 EVO Plus 1TB NVMe", mainCategory: "Accessories & Spare Parts", subCategory: "Storage", brand: "Samsung", condition: "NEW", price: 7475, originalPrice: 6500, type: "STORAGE", image: "images/accessories.png", desc: "Read: 3500MB/s • Write: 3300MB/s • 5yr Warranty • NVMe • Fast" },
    { id: 32, name: "Corsair Vengeance 16GB DDR4 3200MHz", mainCategory: "Accessories & Spare Parts", subCategory: "RAM", brand: "Corsair", condition: "NEW", price: 3795, originalPrice: 3300, type: "RAM", image: "images/accessories.png", desc: "3200MHz • CL16 • Desktop • Lifetime Warranty • Gaming • RGB" },
    { id: 33, name: "LG 24\" IPS Monitor FHD 75Hz", mainCategory: "Accessories & Spare Parts", subCategory: "Monitors", brand: "LG", condition: "NEW", price: 11499, originalPrice: 9999, type: "MONITOR", image: "images/accessories.png", desc: "1920x1080 • IPS Panel • HDMI + VGA • Eye Care • 3yr • 75Hz" },
    { id: 34, name: "Logitech Wireless Keyboard & Mouse", mainCategory: "Accessories & Spare Parts", subCategory: "Peripherals", brand: "Logitech", condition: "NEW", price: 1725, originalPrice: 1500, type: "ACCESSORY", image: "images/accessories.png", desc: "2.4GHz Wireless • 10m Range • Long Battery • Spill Resistant • Combo" },
    { id: 35, name: "Dell 24\" Monitor (REFURBISHED)", mainCategory: "Accessories & Spare Parts", subCategory: "Monitors", brand: "Dell", condition: "REFURBISHED", price: 7475, originalPrice: 6500, type: "REFURBISHED", image: "images/accessories.png", desc: "24\" FHD • IPS • HDMI/VGA • Grade A • 3 Mo Warranty • Dell" }
  ],

  services: [
    { id: 101, name: "Windows 11 Clean Installation", category: "OS Installation", price: 1500, image: "images/service-os.png", desc: "Full Backup • Fresh Install • All Drivers • Optimization" },
    { id: 102, name: "Virus & Malware Removal", category: "Virus Removal", price: 1200, image: "images/service-virus.png", desc: "Deep Scan • Quarantine • Cleanup • Antivirus Setup" },
    { id: 103, name: "Laptop Display Replacement", category: "Display & Hardware Fix", price: 3500, image: "images/service-hardware.png", desc: "Cracked/Broken Screen • Genuine Panels • 30min-1hr (Panel Extra)" },
    { id: 104, name: "Data Recovery HDD/SSD", category: "Data Recovery", price: 3000, image: "images/service-data-recovery.png", desc: "Deleted Files • Formatted Drive • Corrupted Data • Professional" },
    { id: 105, name: "Home/Office Network Setup", category: "Networking Setup", price: 2500, image: "images/service-network.png", desc: "Router Config • WiFi Setup • Printer Sharing • Security" },
    { id: 106, name: "Annual Maintenance Contract AMC", category: "AMC Plans", price: 5000, image: "images/service-amc.png", desc: "Quarterly Visits • Priority Support • Updates • 1 Year" },
    { id: 107, name: "Laptop Motherboard Repair", category: "Hardware Repair", price: 2500, image: "images/service-hardware.png", desc: "Chip-Level Repair • Power Issue • No Display • Component Replacement" },
    { id: 108, name: "Desktop Motherboard Repair", category: "Hardware Repair", price: 2000, image: "images/service-hardware.png", desc: "Chip-Level Repair • Power Issue • No Boot • Component Replacement" },
    { id: 109, name: "Server Hardware Repair", category: "Hardware Repair", price: 5000, image: "images/service-hardware.png", desc: "Server Motherboard • RAID Controller • PSU • HDD/SSD Replacement" },
    { id: 110, name: "Workstation Repair", category: "Hardware Repair", price: 3500, image: "images/service-hardware.png", desc: "Workstation Motherboard • GPU • RAM • Professional Repair" }
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

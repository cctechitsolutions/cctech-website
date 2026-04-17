// CCTech IT Solutions - Central Database v5.0
// Last updated: 2026-04-17
const CCData = {
  version: "5.0",
  whatsapp: "916364253615",
  
  salesCategories: [
    "Software",
    "Laptops",
    "Desktops",
    "Workstations",
    "Servers",
    "Refurbished - Laptops",
    "Refurbished - Desktops",
    "Refurbished - Servers",
    "Refurbished - Accessories",
    "Networking",
    "CCTV & Security",
    "Electronics - Development Boards",
    "Electronics - Sensors & Modules",
    "Electronics - Motor Drivers",
    "Electronics - Displays",
    "Electronics - Power Supplies",
    "Electronics - Components",
    "Electronics - Enclosures",
    "Electronics - Tools & Equipment",
    "Electronics - Robotics Kits",
    "Accessories & Spare Parts"
  ],
  
  serviceCategories: [
    "OS Installation",
    "Software Repair",
    "Hardware Repair",
    "Networking Setup",
    "Data Recovery",
    "AMC Plans",
    "Virus Removal",
    "Display & Hardware Fix"
  ],
  
  products: [
    // ==================== SOFTWARE ====================
    { id: 1, name: "Windows 11 Pro - OEM License", category: "Software", price: 8499, type: "One-time", image: "images/windows-11-pro.png", desc: "Genuine OEM license • Digital delivery • Lifetime activation", versions: [] },
    { id: 2, name: "CCTech Billing Software", category: "Software", price: 6000, type: "Lifetime", image: "images/billing-software.png", desc: "GST compliant • Inventory • Multi-user • Free support", versions: [] },
    { id: 3, name: "MS Office 2021 Professional", category: "Software", price: 4999, type: "One-time", image: "images/ms-office-2021.png", desc: "Word, Excel, PowerPoint, Outlook • Lifetime license", versions: [] },
    
    // ==================== LAPTOPS - NEW ====================
    { id: 4, name: "HP Laptop 15s - i5, 8GB, 512GB SSD", category: "Laptops", price: 42999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 11th Gen • 8GB RAM • 512GB SSD • 15.6\" FHD • Windows 11", versions: [] },
    { id: 5, name: "Dell Inspiron 15 - i7, 16GB, 1TB SSD", category: "Laptops", price: 62999, type: "NEW", image: "images/laptop.png", desc: "Intel i7 12th Gen • 16GB RAM • 1TB SSD • Backlit Keyboard • FHD", versions: [] },
    { id: 101, name: "Lenovo ThinkPad E14 - Business Laptop", category: "Laptops", price: 54999, type: "NEW", image: "images/laptop.png", desc: "i5 11th Gen • 8GB RAM • 512GB SSD • Fingerprint • 3yr Warranty", versions: [] },
    { id: 102, name: "HP Pavilion 15 - i5, 16GB, 512GB", category: "Laptops", price: 58999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 12th Gen • 16GB RAM • 512GB SSD • FHD Display", versions: [] },
    
    // ==================== LAPTOPS - REFURBISHED ====================
    { id: 201, name: "Dell Latitude E7450 - i5, 8GB, 256GB SSD", category: "Refurbished - Laptops", price: 24999, type: "REFURBISHED", image: "images/laptop.png", desc: "Intel i5 6th Gen • 8GB RAM • 256GB SSD • Grade A • 3 Mo Warranty", versions: [] },
    { id: 202, name: "HP EliteBook 840 G3 - i5, 8GB, 256GB SSD", category: "Refurbished - Laptops", price: 28999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • FHD • Excellent Condition", versions: [] },
    { id: 203, name: "Lenovo ThinkPad T460 - i5, 8GB, 256GB SSD", category: "Refurbished - Laptops", price: 26999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • Business Grade", versions: [] },
    
    // ==================== LAPTOP SPARE PARTS ====================
    { id: 301, name: "15.6\" Laptop Screen FHD IPS Replacement", category: "Laptops", price: 3500, type: "SPARE PART", image: "images/laptop.png", desc: "1920x1080 • IPS Panel • 40-pin • Compatible with most laptops", versions: [] },
    { id: 302, name: "Laptop Keyboard (HP/Dell/Lenovo)", category: "Laptops", price: 1200, type: "SPARE PART", image: "images/laptop.png", desc: "Original/OEM • Backlit option • Multiple models", versions: [] },
    { id: 303, name: "Laptop Battery 4000-5000mAh", category: "Laptops", price: 1800, type: "SPARE PART", image: "images/laptop.png", desc: "Original/OEM • 6-8 hours backup • Multiple models", versions: [] },
    { id: 304, name: "Laptop Adapter 65W", category: "Laptops", price: 800, type: "SPARE PART", image: "images/laptop.png", desc: "19.5V 3.34A • Original/OEM • Multiple tips", versions: [] },
    { id: 305, name: "Laptop RAM 8GB DDR4 SODIMM", category: "Laptops", price: 2200, type: "SPARE PART", image: "images/laptop.png", desc: "DDR4 2666MHz • Laptop • Upgrade option", versions: [] },
    
    // ==================== DESKTOPS - NEW ====================
    { id: 6, name: "Custom Desktop PC - i3, 8GB, 256GB SSD", category: "Desktops", price: 28999, type: "NEW", image: "images/laptop.png", desc: "Intel i3 10th Gen • 8GB RAM • 256GB SSD • Keyboard + Mouse • Office Ready", versions: [] },
    { id: 401, name: "HP Desktop ProDesk - i5, 8GB, 1TB HDD", category: "Desktops", price: 38999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 10th Gen • 8GB RAM • 1TB HDD • Windows 11 Pro", versions: [] },
    { id: 402, name: "Dell OptiPlex Desktop - i5, 16GB, 512GB SSD", category: "Desktops", price: 45999, type: "NEW", image: "images/laptop.png", desc: "Intel i5 11th Gen • 16GB RAM • 512GB SSD • Business Desktop", versions: [] },
    
    // ==================== DESKTOPS - REFURBISHED ====================
    { id: 501, name: "Dell OptiPlex 3040 - i5, 8GB, 500GB HDD", category: "Refurbished - Desktops", price: 18999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 500GB HDD • SFF • Grade A", versions: [] },
    { id: 502, name: "HP EliteDesk 800 G2 - i5, 8GB, 256GB SSD", category: "Refurbished - Desktops", price: 21999, type: "REFURBISHED", image: "images/laptop.png", desc: "i5 6th Gen • 8GB RAM • 256GB SSD • Tower • Excellent", versions: [] },
    
    // ==================== DESKTOP SPARE PARTS ====================
    { id: 801, name: "Desktop RAM 8GB DDR4 DIMM", category: "Desktops", price: 2000, type: "SPARE PART", image: "images/laptop.png", desc: "DDR4 3200MHz • Desktop • Upgrade option", versions: [] },
    { id: 802, name: "Desktop SSD 256GB SATA", category: "Desktops", price: 2200, type: "SPARE PART", image: "images/laptop.png", desc: "2.5\" SATA • 550MB/s read • Upgrade storage", versions: [] },
    { id: 803, name: "Desktop Power Supply 500W", category: "Desktops", price: 2500, type: "SPARE PART", image: "images/laptop.png", desc: "80+ Bronze • 500W • Standard ATX", versions: [] },
    
    // ==================== WORKSTATIONS - NEW ====================
    { id: 601, name: "HP Z240 Workstation - Xeon, 16GB ECC", category: "Workstations", price: 75999, type: "NEW", image: "images/laptop.png", desc: "Xeon E3-1240 • 16GB ECC • 512GB SSD • Quadro GPU • CAD Ready", versions: [] },
    { id: 602, name: "Dell Precision 3520 - i7, 32GB RAM", category: "Workstations", price: 95999, type: "NEW", image: "images/laptop.png", desc: "Intel i7 7th Gen • 32GB RAM • 1TB SSD • Quadro • Engineering", versions: [] },
    
    // ==================== WORKSTATIONS - REFURBISHED ====================
    { id: 701, name: "HP Z420 Workstation - Xeon E5-1620", category: "Refurbished - Accessories", price: 45999, type: "REFURBISHED", image: "images/laptop.png", desc: "Xeon E5-1620 • 16GB ECC • 500GB HDD • Quadro 2000", versions: [] },
    
    // ==================== SERVERS - NEW ====================
    { id: 901, name: "Dell PowerEdge T150 - Xeon, 16GB ECC", category: "Servers", price: 95000, type: "NEW", image: "images/server.png", desc: "Xeon E-2314 • 16GB ECC • 2TB HDD • Tower • 3yr Warranty", versions: [] },
    { id: 902, name: "HP ProLiant ML350 Gen10 - Xeon Silver", category: "Servers", price: 125000, type: "NEW", image: "images/server.png", desc: "Xeon Silver • 32GB ECC • 4TB HDD • Tower Server", versions: [] },
    
    // ==================== SERVERS - REFURBISHED ====================
    { id: 7, name: "HP ProLiant DL380 G7 - Dual Xeon", category: "Refurbished - Servers", price: 65000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon X5650 • 32GB RAM • 4x 300GB SAS • 2U Rack", versions: [] },
    { id: 8, name: "Dell PowerEdge R720 - Dual Xeon", category: "Refurbished - Servers", price: 75000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon E5-2650 • 64GB RAM • 4x 600GB SAS • 2U", versions: [] },
    { id: 9, name: "Dell PowerEdge T150 Tower - Xeon", category: "Servers", price: 75000, type: "NEW", image: "images/server.png", desc: "Xeon E-2314 • 16GB ECC • 2TB HDD • Tower", versions: [] },
    { id: 1001, name: "HP ProLiant ML350 G6 Tower", category: "Refurbished - Servers", price: 72000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon E5620 • 24GB RAM • 3x 500GB SATA • Tower", versions: [] },
    { id: 1002, name: "IBM System x3650 M4 - Dual Xeon", category: "Refurbished - Servers", price: 88000, type: "REFURBISHED", image: "images/server.png", desc: "Dual Xeon E5-2620 • 32GB RAM • 4x 300GB SAS • 2U", versions: [] },
    
    // ==================== SERVER COMPONENTS ====================
    { id: 1101, name: "Server NIC Card 1Gbps Dual Port", category: "Servers", price: 3500, type: "COMPONENT", image: "images/server.png", desc: "Intel-based • Dual port • PCIe • Server network card", versions: [] },
    { id: 1102, name: "Server NIC Card 10Gbps SFP+", category: "Servers", price: 8500, type: "COMPONENT", image: "images/server.png", desc: "10Gbps • SFP+ • PCIe x8 • High-speed networking", versions: [] },
    { id: 1103, name: "SFP Module 1Gbps Multi-mode", category: "Servers", price: 800, type: "COMPONENT", image: "images/server.png", desc: "1Gbps • 850nm • LC connector • Fiber optic", versions: [] },
    { id: 1104, name: "SFP+ Module 10Gbps Single-mode", category: "Servers", price: 1500, type: "COMPONENT", image: "images/server.png", desc: "10Gbps • 1310nm • 10km • LC connector", versions: [] },
    { id: 1105, name: "Server RAM 16GB DDR3 ECC", category: "Servers", price: 3500, type: "COMPONENT", image: "images/server.png", desc: "DDR3 1333MHz • ECC Registered • Server memory", versions: [] },
    { id: 1106, name: "Server HDD 600GB 10K SAS", category: "Servers", price: 4500, type: "COMPONENT", image: "images/server.png", desc: "600GB • 10K RPM • SAS 6Gbps • 2.5\" • Enterprise", versions: [] },
    { id: 1107, name: "RAID Controller Card with Battery", category: "Servers", price: 6500, type: "COMPONENT", image: "images/server.png", desc: "Hardware RAID • Battery backup • SAS/SATA", versions: [] },
    
    // ==================== NETWORKING ====================
    { id: 13, name: "TP-Link Gigabit WiFi 6 Router", category: "Networking", price: 3499, type: "NEW", image: "images/networking.png", desc: "Dual Band • AX1500 • 4 LAN • MU-MIMO • WiFi 6", versions: [] },
    { id: 1201, name: "TP-Link 8-Port Gigabit Switch", category: "Networking", price: 2499, type: "NEW", image: "images/networking.png", desc: "8x Gigabit ports • Unmanaged • Plug & play", versions: [] },
    { id: 1202, name: "D-Link 16-Port Gigabit Switch", category: "Networking", price: 4999, type: "NEW", image: "images/networking.png", desc: "16x Gigabit • Unmanaged • Rack mountable", versions: [] },
    { id: 1301, name: "LAN Cable Cat6 100m Roll", category: "Networking", price: 2500, type: "CABLE", image: "images/networking.png", desc: "Cat6 • 100m roll • Copper • Gigabit ready", versions: [] },
    { id: 1302, name: "LAN Cable Cat6 Patch 3m", category: "Networking", price: 150, type: "CABLE", image: "images/networking.png", desc: "Cat6 • 3 meter • RJ45 • Molded boot", versions: [] },
    { id: 1303, name: "Fiber Optic Cable Single-mode (per meter)", category: "Networking", price: 45, type: "CABLE", image: "images/networking.png", desc: "Single-mode • OS2 • Indoor/Outdoor", versions: [] },
    { id: 1304, name: "Fiber Patch Cable LC-LC 3m", category: "Networking", price: 250, type: "CABLE", image: "images/networking.png", desc: "Single-mode • LC-LC • 3m • Duplex", versions: [] },
    { id: 1401, name: "PCIe Gigabit NIC Card Desktop", category: "Networking", price: 800, type: "ADAPTER", image: "images/networking.png", desc: "Gigabit Ethernet • PCIe x1 • RJ45 • Desktop", versions: [] },
    { id: 1402, name: "USB 3.0 to Gigabit Adapter", category: "Networking", price: 650, type: "ADAPTER", image: "images/networking.png", desc: "USB 3.0 • Gigabit • RJ45 • Laptop/Desktop", versions: [] },
    { id: 1403, name: "WiFi USB Adapter Dual Band AC600", category: "Networking", price: 850, type: "ADAPTER", image: "images/networking.png", desc: "AC600 • Dual band • USB • WiFi adapter", versions: [] },
    { id: 1404, name: "Back Box & IO Ports Kit", category: "Networking", price: 450, type: "ACCESSORY", image: "images/networking.png", desc: "Modular • RJ45/RJ11 • Wall mounting • Office setup", versions: [] },
    
    // ==================== CCTV & SECURITY ====================
    { id: 12, name: "Hikvision 4-Camera CCTV Kit", category: "CCTV & Security", price: 18500, type: "NEW", image: "images/cctv.png", desc: "2MP Cameras • 4ch DVR • 1TB HDD • Mobile View • Installation", versions: [] },
    { id: 1501, name: "Hikvision 8-Camera CCTV Kit", category: "CCTV & Security", price: 32000, type: "NEW", image: "images/cctv.png", desc: "2MP Dome • 8ch DVR • 2TB HDD • Night Vision", versions: [] },
    { id: 1502, name: "CP Plus 2MP Dome Camera", category: "CCTV & Security", price: 2200, type: "NEW", image: "images/cctv.png", desc: "2MP • Dome • IR 20m • Weatherproof", versions: [] },
    { id: 1503, name: "CCTV DVR 8-Channel", category: "CCTV & Security", price: 4500, type: "NEW", image: "images/cctv.png", desc: "8ch • 1080p • HDMI/VGA • Mobile View", versions: [] },
    
    // ==================== ELECTRONICS - DEVELOPMENT BOARDS ====================
    { id: 1601, name: "Arduino Uno R3 Original", category: "Electronics - Development Boards", price: 605, type: "BOARD", image: "images/embedded-board.png", desc: "ATmega328P • 16MHz • 14 Digital I/O • 6 Analog • USB", versions: [] },
    { id: 1602, name: "Arduino Nano", category: "Electronics - Development Boards", price: 495, type: "BOARD", image: "images/embedded-board.png", desc: "ATmega328 • Compact size • USB mini • Breadboard friendly", versions: [] },
    { id: 1603, name: "Arduino Mega 2560 R3", category: "Electronics - Development Boards", price: 1100, type: "BOARD", image: "images/embedded-board.png", desc: "ATmega2560 • 54 Digital I/O • 16 Analog • 256KB Flash", versions: [] },
    { id: 1604, name: "ESP32-WROOM-32D WiFi+BT", category: "Electronics - Development Boards", price: 385, type: "MODULE", image: "images/embedded-board.png", desc: "Dual-core • WiFi+Bluetooth • 4MB Flash • IoT ready", versions: [] },
    { id: 1605, name: "ESP8266 NodeMCU V3", category: "Electronics - Development Boards", price: 385, type: "MODULE", image: "images/embedded-board.png", desc: "WiFi module • Lua firmware • USB-Serial • IoT projects", versions: [] },
    { id: 1606, name: "Raspberry Pi 4 Model B 2GB", category: "Electronics - Development Boards", price: 5489, type: "BOARD", image: "images/embedded-board.png", desc: "Quad-core Cortex-A72 • 2GB RAM • WiFi • BT • GigE", versions: [] },
    { id: 1607, name: "Raspberry Pi 4 Model B 4GB", category: "Electronics - Development Boards", price: 6589, type: "BOARD", image: "images/embedded-board.png", desc: "Quad-core Cortex-A72 • 4GB RAM • WiFi • BT • GigE", versions: [] },
    { id: 1608, name: "Raspberry Pi 4 Model B 8GB", category: "Electronics - Development Boards", price: 8789, type: "BOARD", image: "images/embedded-board.png", desc: "Quad-core Cortex-A72 • 8GB RAM • WiFi • BT • GigE", versions: [] },
    { id: 1609, name: "Raspberry Pi Zero W", category: "Electronics - Development Boards", price: 1649, type: "BOARD", image: "images/embedded-board.png", desc: "1GHz Single-core • 512MB RAM • WiFi • BT • Compact", versions: [] },
    { id: 1610, name: "NodeMCU ESP-12E", category: "Electronics - Development Boards", price: 330, type: "MODULE", image: "images/embedded-board.png", desc: "ESP8266 • WiFi • 4MB Flash • Lua/Arduino IDE", versions: [] },
    { id: 1611, name: "Wemos D1 Mini", category: "Electronics - Development Boards", price: 330, type: "BOARD", image: "images/embedded-board.png", desc: "ESP8266 • WiFi • Compact • Arduino compatible", versions: [] },
    { id: 1612, name: "STM32F103C8T6 Blue Pill", category: "Electronics - Development Boards", price: 385, type: "BOARD", image: "images/embedded-board.png", desc: "ARM Cortex-M3 • 72MHz • 64KB Flash • 20KB SRAM", versions: [] },
    { id: 1613, name: "Teensy 4.0", category: "Electronics - Development Boards", price: 2749, type: "BOARD", image: "images/embedded-board.png", desc: "ARM Cortex-M7 • 600MHz • 2MB Flash • Arduino compatible", versions: [] },
    
    // ==================== ELECTRONICS - SENSORS & MODULES ====================
    { id: 1614, name: "HC-SR04 Ultrasonic Sensor", category: "Electronics - Sensors & Modules", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "2cm-400cm range • 5V • Trigger/Echo • Distance measurement", versions: [] },
    { id: 1615, name: "DHT11 Temperature & Humidity", category: "Electronics - Sensors & Modules", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "20-90% RH • 0-50°C • Digital output • Low cost", versions: [] },
    { id: 1616, name: "DHT22 Temperature & Humidity", category: "Electronics - Sensors & Modules", price: 385, type: "SENSOR", image: "images/sensor.png", desc: "0-100% RH • -40 to 80°C • Higher accuracy • Digital", versions: [] },
    { id: 1617, name: "PIR Motion Sensor HC-SR501", category: "Electronics - Sensors & Modules", price: 165, type: "SENSOR", image: "images/sensor.png", desc: "Infrared motion • 3-7m range • Adjustable delay • 5V", versions: [] },
    { id: 1618, name: "MPU6050 Gyroscope Accelerometer", category: "Electronics - Sensors & Modules", price: 220, type: "SENSOR", image: "images/sensor.png", desc: "6-axis • I2C • 3-axis gyro + 3-axis accel • Robotics", versions: [] },
    { id: 1619, name: "BMP180 Barometric Pressure", category: "Electronics - Sensors & Modules", price: 220, type: "SENSOR", image: "images/sensor.png", desc: "Pressure & temperature • I2C • 300-1100 hPa • Weather", versions: [] },
    { id: 1620, name: "MQ-2 Gas Sensor", category: "Electronics - Sensors & Modules", price: 165, type: "SENSOR", image: "images/sensor.png", desc: "LPG/Smoke/CO detection • Analog output • Heater • Safety", versions: [] },
    { id: 1621, name: "MQ-135 Air Quality Sensor", category: "Electronics - Sensors & Modules", price: 220, type: "SENSOR", image: "images/sensor.png", desc: "NH3/NOx/Alcohol/Benzene • Air quality monitoring", versions: [] },
    { id: 1622, name: "Soil Moisture Sensor", category: "Electronics - Sensors & Modules", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "Capacitive • Analog output • Agriculture • Gardening", versions: [] },
    { id: 1623, name: "Water Level Sensor", category: "Electronics - Sensors & Modules", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "8-level detection • Analog • Water tank monitoring", versions: [] },
    { id: 1624, name: "Flame Sensor", category: "Electronics - Sensors & Modules", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "IR detection • Flame/fire detection • Digital/Analog", versions: [] },
    { id: 1625, name: "IR Obstacle Avoidance Sensor", category: "Electronics - Sensors & Modules", price: 110, type: "SENSOR", image: "images/sensor.png", desc: "IR reflection • 2-40cm • Robot obstacle detection", versions: [] },
    { id: 1626, name: "IR Remote Control Kit", category: "Electronics - Sensors & Modules", price: 165, type: "MODULE", image: "images/sensor.png", desc: "38kHz IR • Remote + receiver • Arduino compatible", versions: [] },
    { id: 1627, name: "RFID-RC522 Module with Card", category: "Electronics - Sensors & Modules", price: 275, type: "MODULE", image: "images/sensor.png", desc: "13.56MHz • SPI • Card+keychain • Access control", versions: [] },
    { id: 1628, name: "NFC PN532 Module", category: "Electronics - Sensors & Modules", price: 880, type: "MODULE", image: "images/sensor.png", desc: "NFC reader/writer • I2C/SPI/UART • Mobile payment", versions: [] },
    { id: 1629, name: "GPS NEO-6M Module", category: "Electronics - Sensors & Modules", price: 605, type: "MODULE", image: "images/sensor.png", desc: "UART • Location tracking • Antenna included • Logging", versions: [] },
    { id: 1630, name: "Real Time Clock DS3231", category: "Electronics - Sensors & Modules", price: 220, type: "MODULE", image: "images/sensor.png", desc: "I2C • High accuracy • Battery backup • Timekeeping", versions: [] },
    { id: 1631, name: "Relay Module 1-Channel 5V", category: "Electronics - Sensors & Modules", price: 110, type: "MODULE", image: "images/sensor.png", desc: "10A 250VAC • Optocoupler • Arduino control • Home auto", versions: [] },
    { id: 1632, name: "Relay Module 4-Channel 5V", category: "Electronics - Sensors & Modules", price: 330, type: "MODULE", image: "images/sensor.png", desc: "4x 10A relays • Optocoupler • Multi-device control", versions: [] },
    { id: 1633, name: "Relay Module 8-Channel 5V", category: "Electronics - Sensors & Modules", price: 550, type: "MODULE", image: "images/sensor.png", desc: "8x 10A relays • Optocoupler • Industrial control", versions: [] },
    
    // ==================== ELECTRONICS - MOTOR DRIVERS ====================
    { id: 1634, name: "L298N Dual H-Bridge Motor Driver", category: "Electronics - Motor Drivers", price: 198, type: "DRIVER", image: "images/motor-driver.png", desc: "Dual motor • 2A/channel • 5-35V • Heat sink • Robotics", versions: [] },
    { id: 1635, name: "L293D Motor Driver Shield", category: "Electronics - Motor Drivers", price: 220, type: "DRIVER", image: "images/motor-driver.png", desc: "Arduino shield • 4 motors • 600mA/channel • Easy mount", versions: [] },
    { id: 1636, name: "TB6612FNG Dual Motor Driver", category: "Electronics - Motor Drivers", price: 275, type: "DRIVER", image: "images/motor-driver.png", desc: "Dual motor • 1.2A/channel • Efficient • Compact • PWM", versions: [] },
    { id: 1637, name: "A4988 Stepper Motor Driver", category: "Electronics - Motor Drivers", price: 165, type: "DRIVER", image: "images/motor-driver.png", desc: "Stepper control • Microstepping • 2A • 3D printers", versions: [] },
    { id: 1638, name: "DRV8825 Stepper Driver", category: "Electronics - Motor Drivers", price: 220, type: "DRIVER", image: "images/motor-driver.png", desc: "Stepper control • 1/32 microstepping • 2.5A • CNC", versions: [] },
    { id: 1639, name: "ESC 30A Brushless Motor Controller", category: "Electronics - Motor Drivers", price: 495, type: "DRIVER", image: "images/motor-driver.png", desc: "30A • Brushless motor • BEC 5V • Drone/RC applications", versions: [] },
    { id: 1640, name: "Servo Motor SG90 9g Micro", category: "Electronics - Motor Drivers", price: 110, type: "MOTOR", image: "images/motor-driver.png", desc: "9g • 1.8kg-cm torque • 0-180° • Arduino compatible", versions: [] },
    { id: 1641, name: "Servo Motor MG996R High Torque", category: "Electronics - Motor Drivers", price: 385, type: "MOTOR", image: "images/motor-driver.png", desc: "55g • 10kg-cm torque • Metal gear • Robotics", versions: [] },
    { id: 1642, name: "Stepper Motor NEMA 17", category: "Electronics - Motor Drivers", price: 440, type: "MOTOR", image: "images/motor-driver.png", desc: "1.8° step • 1.7A • 40N-cm • 3D printers • CNC", versions: [] },
    { id: 1643, name: "DC Gear Motor 12V 100 RPM", category: "Electronics - Motor Drivers", price: 220, type: "MOTOR", image: "images/motor-driver.png", desc: "12V • 100 RPM • High torque • Robot wheels", versions: [] },
    
    // ==================== ELECTRONICS - DISPLAYS ====================
    { id: 1644, name: "16x2 LCD Display HD44780", category: "Electronics - Displays", price: 220, type: "DISPLAY", image: "images/display.png", desc: "16x2 characters • HD44780 • Blue backlight • Parallel", versions: [] },
    { id: 1645, name: "16x2 LCD with I2C Interface", category: "Electronics - Displays", price: 330, type: "DISPLAY", image: "images/display.png", desc: "16x2 • I2C backpack • 2-wire interface • Easy wiring", versions: [] },
    { id: 1646, name: "20x4 LCD Display with I2C", category: "Electronics - Displays", price: 440, type: "DISPLAY", image: "images/display.png", desc: "20x4 characters • I2C • More display area", versions: [] },
    { id: 1647, name: "OLED 0.96\" I2C 128x64", category: "Electronics - Displays", price: 275, type: "DISPLAY", image: "images/display.png", desc: "0.96\" • 128x64 pixels • I2C • White/Blue/Yellow", versions: [] },
    { id: 1648, name: "OLED 1.3\" I2C 128x64", category: "Electronics - Displays", price: 385, type: "DISPLAY", image: "images/display.png", desc: "1.3\" • 128x64 • I2C • Larger display • White/Blue", versions: [] },
    { id: 1649, name: "TFT 2.4\" Touch Screen Shield", category: "Electronics - Displays", price: 605, type: "DISPLAY", image: "images/display.png", desc: "2.4\" • 240x320 • Touch • Arduino shield • SD card", versions: [] },
    { id: 1650, name: "TFT 2.8\" Touch Screen", category: "Electronics - Displays", price: 770, type: "DISPLAY", image: "images/display.png", desc: "2.8\" • 240x320 • Resistive touch • SPI interface", versions: [] },
    { id: 1651, name: "Nextion 2.4\" HMI Display", category: "Electronics - Displays", price: 2199, type: "DISPLAY", image: "images/display.png", desc: "2.4\" • Touch • UART • GUI builder • Professional HMI", versions: [] },
    { id: 1652, name: "LED Matrix 8x8 MAX7219", category: "Electronics - Displays", price: 165, type: "DISPLAY", image: "images/display.png", desc: "8x8 LED • MAX7219 driver • SPI • Daisy-chainable", versions: [] },
    { id: 1653, name: "7-Segment Display 4-Digit", category: "Electronics - Displays", price: 110, type: "DISPLAY", image: "images/display.png", desc: "4-digit • Common cathode • Time display • Counter", versions: [] },
    
    // ==================== ELECTRONICS - POWER SUPPLIES ====================
    { id: 1654, name: "Breadboard Power Supply 5V/3.3V", category: "Electronics - Power Supplies", price: 165, type: "POWER", image: "images/power-supply.png", desc: "Dual voltage • Breadboard compatible • USB/DC input", versions: [] },
    { id: 1655, name: "LM2596 DC-DC Buck Converter", category: "Electronics - Power Supplies", price: 110, type: "POWER", image: "images/power-supply.png", desc: "Step-down • 3A • 4-40V to 1.25-37V • Adjustable", versions: [] },
    { id: 1656, name: "MT3608 DC-DC Boost Converter", category: "Electronics - Power Supplies", price: 110, type: "POWER", image: "images/power-supply.png", desc: "Step-up • 2A • 2-24V input • Compact • Efficient", versions: [] },
    { id: 1657, name: "USB Power Bank Module 5V 2A", category: "Electronics - Power Supplies", price: 220, type: "POWER", image: "images/power-supply.png", desc: "18650 battery holder • 5V 2A output • Charging circuit", versions: [] },
    { id: 1658, name: "TP4056 Li-ion Battery Charger", category: "Electronics - Power Supplies", price: 55, type: "POWER", image: "images/power-supply.png", desc: "1A charging • Micro USB • Protection • 18650 compatible", versions: [] },
    { id: 1659, name: "18650 Li-ion Battery 3.7V 2600mAh", category: "Electronics - Power Supplies", price: 220, type: "BATTERY", image: "images/power-supply.png", desc: "3.7V • 2600mAh • Rechargeable • Protected", versions: [] },
    { id: 1660, name: "9V Battery Snap Connector", category: "Electronics - Power Supplies", price: 22, type: "ACCESSORY", image: "images/power-supply.png", desc: "9V battery clip • Snap connector • Arduino projects", versions: [] },
    { id: 1661, name: "DC Power Jack 5.5mm x 2.1mm", category: "Electronics - Power Supplies", price: 22, type: "CONNECTOR", image: "images/power-supply.png", desc: "DC jack • 5.5x2.1mm • PCB mount • Power input", versions: [] },
    
    // ==================== ELECTRONICS - COMPONENTS ====================
    { id: 1662, name: "Breadboard 830 Tie-Points", category: "Electronics - Components", price: 110, type: "COMPONENT", image: "images/components.png", desc: "830 holes • Solderless • Adhesive backing • Power rails", versions: [] },
    { id: 1663, name: "Mini Breadboard 400 Points", category: "Electronics - Components", price: 55, type: "COMPONENT", image: "images/components.png", desc: "400 holes • Compact • Portable • Prototyping", versions: [] },
    { id: 1664, name: "Jumper Wires M-M 120pcs", category: "Electronics - Components", price: 165, type: "COMPONENT", image: "images/components.png", desc: "Male-to-Male • 20cm • 120 pieces • Assorted colors", versions: [] },
    { id: 1665, name: "Jumper Wires M-F 120pcs", category: "Electronics - Components", price: 165, type: "COMPONENT", image: "images/components.png", desc: "Male-to-Female • 20cm • 120 pieces • Breadboard to module", versions: [] },
    { id: 1666, name: "Jumper Wires F-F 120pcs", category: "Electronics - Components", price: 165, type: "COMPONENT", image: "images/components.png", desc: "Female-to-Female • 20cm • 120 pieces • Module to module", versions: [] },
    { id: 1667, name: "Resistor Kit 1/4W 600pcs", category: "Electronics - Components", price: 275, type: "COMPONENT", image: "images/components.png", desc: "10Ω-1MΩ • 30 values • 5% tolerance • Storage box", versions: [] },
    { id: 1668, name: "Capacitor Kit 240pcs", category: "Electronics - Components", price: 330, type: "COMPONENT", image: "images/components.png", desc: "Ceramic & Electrolytic • 12 values • 0.1uF-100uF", versions: [] },
    { id: 1669, name: "LED Kit 5mm 200pcs", category: "Electronics - Components", price: 165, type: "COMPONENT", image: "images/components.png", desc: "Red/Green/Blue/Yellow/White • 40pcs each • 3-5V", versions: [] },
    { id: 1670, name: "Push Button Tactile 100pcs", category: "Electronics - Components", price: 110, type: "COMPONENT", image: "images/components.png", desc: "12x12x7mm • 6-pin • Through-hole • Momentary", versions: [] },
    { id: 1671, name: "Slide Switch SPDT 50pcs", category: "Electronics - Components", price: 110, type: "COMPONENT", image: "images/components.png", desc: "SPDT • 3-pin • Through-hole • ON/OFF switch", versions: [] },
    { id: 1672, name: "Potentiometer 10K 10pcs", category: "Electronics - Components", price: 110, type: "COMPONENT", image: "images/components.png", desc: "10KΩ • Rotary • Variable resistor • Analog input", versions: [] },
    { id: 1673, name: "LM7805 5V Voltage Regulator", category: "Electronics - Components", price: 12, type: "COMPONENT", image: "images/components.png", desc: "5V output • 1.5A • TO-220 • Thermal protection", versions: [] },
    { id: 1674, name: "LM7812 12V Voltage Regulator", category: "Electronics - Components", price: 12, type: "COMPONENT", image: "images/components.png", desc: "12V output • 1.5A • TO-220 • Linear regulator", versions: [] },
    { id: 1675, name: "NE555 Timer IC 10pcs", category: "Electronics - Components", price: 55, type: "COMPONENT", image: "images/components.png", desc: "Timer IC • DIP-8 • Oscillator • Pulse generation", versions: [] },
    { id: 1676, name: "LM358 Dual Op-Amp 10pcs", category: "Electronics - Components", price: 55, type: "COMPONENT", image: "images/components.png", desc: "Dual op-amp • DIP-8 • Low power • Signal conditioning", versions: [] },
    { id: 1677, name: "Diode 1N4007 100pcs", category: "Electronics - Components", price: 55, type: "COMPONENT", image: "images/components.png", desc: "1A 1000V • Rectifier • Through-hole • General purpose", versions: [] },
    { id: 1678, name: "Zener Diode Kit 50pcs", category: "Electronics - Components", price: 110, type: "COMPONENT", image: "images/components.png", desc: "3.3V-24V • 10 values • Voltage regulation", versions: [] },
    { id: 1679, name: "Transistor BC547 100pcs", category: "Electronics - Components", price: 55, type: "COMPONENT", image: "images/components.png", desc: "NPN • 45V 100mA • TO-92 • General purpose", versions: [] },
    { id: 1680, name: "MOSFET IRF540N 10pcs", category: "Electronics - Components", price: 110, type: "COMPONENT", image: "images/components.png", desc: "N-channel • 100V 33A • TO-220 • Switching", versions: [] },
    { id: 1681, name: "Crystal Oscillator 16MHz 10pcs", category: "Electronics - Components", price: 55, type: "COMPONENT", image: "images/components.png", desc: "16MHz • HC-49S • Arduino • Microcontroller clock", versions: [] },
    
    // ==================== ELECTRONICS - ENCLOSURES ====================
    { id: 1682, name: "CircuitX PES01 Plastic Box Small", category: "Electronics - Enclosures", price: 55, type: "ENCLOSURE", image: "images/enclosure.png", desc: "95x65x35mm • ABS plastic • Screw holes • PCB mounting", versions: [] },
    { id: 1683, name: "CircuitX PES02 Plastic Box Medium", category: "Electronics - Enclosures", price: 110, type: "ENCLOSURE", image: "images/enclosure.png", desc: "115x90x55mm • ABS plastic • Durable • Project box", versions: [] },
    { id: 1684, name: "CircuitX PES03 Plastic Box Large", category: "Electronics - Enclosures", price: 165, type: "ENCLOSURE", image: "images/enclosure.png", desc: "158x108x62mm • ABS plastic • Spacious • Electronics", versions: [] },
    { id: 1685, name: "Aluminum Enclosure Box Small", category: "Electronics - Enclosures", price: 385, type: "ENCLOSURE", image: "images/enclosure.png", desc: "115x90x55mm • Die-cast aluminum • IP54 • EMI shielding", versions: [] },
    { id: 1686, name: "Aluminum Enclosure Box Medium", category: "Electronics - Enclosures", price: 550, type: "ENCLOSURE", image: "images/enclosure.png", desc: "158x108x62mm • Aluminum • Heat dissipation • Professional", versions: [] },
    { id: 1687, name: "Raspberry Pi 4 Case with Fan", category: "Electronics - Enclosures", price: 495, type: "ENCLOSURE", image: "images/enclosure.png", desc: "Dual fan • Heat sinks • Easy access • ABS • Black/Red", versions: [] },
    { id: 1688, name: "Arduino Uno Case", category: "Electronics - Enclosures", price: 220, type: "ENCLOSURE", image: "images/enclosure.png", desc: "Acrylic • Laser cut • Screw assembly • Protection", versions: [] },
    { id: 1689, name: "Waterproof Junction Box IP65", category: "Electronics - Enclosures", price: 440, type: "ENCLOSURE", image: "images/enclosure.png", desc: "190x140x70mm • IP65 • Outdoor • Cable glands", versions: [] },
    { id: 1690, name: "DIN Rail Mount Enclosure", category: "Electronics - Enclosures", price: 550, type: "ENCLOSURE", image: "images/enclosure.png", desc: "DIN rail • Industrial • PLC mounting • Modular", versions: [] },
    { id: 1691, name: "Project Box with Transparent Lid", category: "Electronics - Enclosures", price: 275, type: "ENCLOSURE", image: "images/enclosure.png", desc: "150x100x50mm • Clear lid • ABS • LED visible", versions: [] },
    
    // ==================== ELECTRONICS - TOOLS & EQUIPMENT ====================
    { id: 1692, name: "Digital Multimeter DT830D", category: "Electronics - Tools & Equipment", price: 259, type: "TOOL", image: "images/tools.png", desc: "DC/AC Voltage • Current • Resistance • Diode • Buzzer", versions: [] },
    { id: 1693, name: "Soldering Iron 60W Adjustable", category: "Electronics - Tools & Equipment", price: 605, type: "TOOL", image: "images/tools.png", desc: "200-450°C • Temperature control • 5 tips • Stand • ON/OFF", versions: [] },
    { id: 1694, name: "Soldering Station 936 60W", category: "Electronics - Tools & Equipment", price: 1649, type: "TOOL", image: "images/tools.png", desc: "Temperature controlled • Digital display • ESD safe", versions: [] },
    { id: 1695, name: "Solder Wire 0.8mm 100g", category: "Electronics - Tools & Equipment", price: 330, type: "TOOL", image: "images/tools.png", desc: "60/40 Tin/Lead • Rosin core • 0.8mm • 100g spool", versions: [] },
    { id: 1696, name: "Solder Wire Lead-Free 0.8mm", category: "Electronics - Tools & Equipment", price: 440, type: "TOOL", image: "images/tools.png", desc: "Lead-free • 0.8mm • RoHS compliant • 100g", versions: [] },
    { id: 1697, name: "Desoldering Pump Solder Sucker", category: "Electronics - Tools & Equipment", price: 165, type: "TOOL", image: "images/tools.png", desc: "Spring-loaded • Aluminum • Heat-resistant • PCB repair", versions: [] },
    { id: 1698, name: "Desoldering Braid Wick", category: "Electronics - Tools & Equipment", price: 110, type: "TOOL", image: "images/tools.png", desc: "2.5mm x 1.5m • Copper braid • Flux coated • Solder removal", versions: [] },
    { id: 1699, name: "Helping Hands with Magnifier", category: "Electronics - Tools & Equipment", price: 385, type: "TOOL", image: "images/tools.png", desc: "Adjustable arms • Magnifying glass • LED light • Soldering", versions: [] },
    { id: 1700, name: "Wire Stripper Tool", category: "Electronics - Tools & Equipment", price: 275, type: "TOOL", image: "images/tools.png", desc: "Automatic • 10-24 AWG • Strip/Crimp/Cut • Multi-function", versions: [] },
    { id: 1701, name: "Precision Screwdriver Set 32pcs", category: "Electronics - Tools & Equipment", price: 495, type: "TOOL", image: "images/tools.png", desc: "32 bits • Phillips/Flathead/Torx • Electronics repair", versions: [] },
    { id: 1702, name: "Tweezers Set 5pcs", category: "Electronics - Tools & Equipment", price: 165, type: "TOOL", image: "images/tools.png", desc: "Stainless steel • Anti-static • Curved/Straight • SMD", versions: [] },
    { id: 1703, name: "PCB Holder Vise", category: "Electronics - Tools & Equipment", price: 550, type: "TOOL", image: "images/tools.png", desc: "Adjustable • Helping hands • PCB soldering • Stable", versions: [] },
    { id: 1704, name: "Hot Air Rework Station", category: "Electronics - Tools & Equipment", price: 3299, type: "TOOL", image: "images/tools.png", desc: "SMD/SMT • Temperature control • Air flow • Desoldering", versions: [] },
    { id: 1705, name: "USB Logic Analyzer 8-Channel", category: "Electronics - Tools & Equipment", price: 495, type: "TOOL", image: "images/tools.png", desc: "24MHz • 8-channel • USB • Protocol debugging", versions: [] },
    { id: 1706, name: "Oscilloscope Probe Set", category: "Electronics - Tools & Equipment", price: 550, type: "TOOL", image: "images/tools.png", desc: "100MHz • 1X/10X • BNC • Signal measurement", versions: [] },
    
    // ==================== ELECTRONICS - ROBOTICS KITS ====================
    { id: 1707, name: "Arduino Robot Car Chassis Kit", category: "Electronics - Robotics Kits", price: 1649, type: "KIT", image: "images/robotics.png", desc: "2WD • Acrylic chassis • Motors • Wheels • Ultrasonic sensor", versions: [] },
    { id: 1708, name: "4WD Robot Car Chassis", category: "Electronics - Robotics Kits", price: 2199, type: "KIT", image: "images/robotics.png", desc: "4-wheel drive • Metal chassis • High torque • Obstacle avoid", versions: [] },
    { id: 1709, name: "Hexapod Robot Spider Kit", category: "Electronics - Robotics Kits", price: 3299, type: "KIT", image: "images/robotics.png", desc: "6-leg • 18 servos • Arduino control • Walking robot", versions: [] },
    { id: 1710, name: "Robot Arm Kit 6-DOF", category: "Electronics - Robotics Kits", price: 4399, type: "KIT", image: "images/robotics.png", desc: "6 degrees • Metal • Servos • Gripper • Arduino", versions: [] },
    { id: 1711, name: "Line Follower Sensor Array", category: "Electronics - Robotics Kits", price: 275, type: "SENSOR", image: "images/robotics.png", desc: "8-channel • IR sensors • Line tracking • Robot navigation", versions: [] },
    { id: 1712, name: "Wheel Encoder DC Motor", category: "Electronics - Robotics Kits", price: 440, type: "MOTOR", image: "images/robotics.png", desc: "With encoder • 12V • 210 RPM • Precise control", versions: [] },
    { id: 1713, name: "Omni Wheel 60mm", category: "Electronics - Robotics Kits", price: 220, type: "WHEEL", image: "images/robotics.png", desc: "60mm • 3-roller • Mecanum • Omni-directional movement", versions: [] },
    { id: 1714, name: "Robot Caster Wheel", category: "Electronics - Robotics Kits", price: 110, type: "WHEEL", image: "images/robotics.png", desc: "Free rotating • Support wheel • Robot balance", versions: [] },
    
    // ==================== ACCESSORIES & SPARE PARTS ====================
    { id: 14, name: "Samsung 970 EVO Plus 1TB NVMe SSD", category: "Accessories & Spare Parts", price: 6499, type: "STORAGE", image: "images/accessories.png", desc: "Read: 3500MB/s • Write: 3300MB/s • 5yr Warranty", versions: [] },
    { id: 15, name: "Corsair Vengeance 16GB DDR4 3200MHz", category: "Accessories & Spare Parts", price: 3299, type: "RAM", image: "images/accessories.png", desc: "3200MHz • CL16 • Desktop • Lifetime Warranty", versions: [] },
    { id: 1701, name: "LG 24\" IPS Monitor FHD 75Hz", category: "Accessories & Spare Parts", price: 9999, type: "MONITOR", image: "images/accessories.png", desc: "1920x1080 • IPS Panel • HDMI + VGA • Eye Care • 3yr", versions: [] },
    { id: 1702, name: "Logitech Wireless Keyboard & Mouse", category: "Accessories & Spare Parts", price: 1499, type: "ACCESSORY", image: "images/accessories.png", desc: "2.4GHz Wireless • 10m Range • Long Battery • Spill Resistant", versions: [] },
    { id: 1703, name: "HDMI Cable 2.0 3m", category: "Accessories & Spare Parts", price: 350, type: "CABLE", image: "images/accessories.png", desc: "HDMI 2.0 • 4K@60Hz • 3 meter • Gold plated", versions: [] },
    { id: 1704, name: "USB 3.0 Extension Cable 3m", category: "Accessories & Spare Parts", price: 250, type: "CABLE", image: "images/accessories.png", desc: "USB 3.0 • 3 meter • Male to Female • High speed", versions: [] },
    { id: 1705, name: "Webcam HD 1080p with Mic", category: "Accessories & Spare Parts", price: 1899, type: "ACCESSORY", image: "images/accessories.png", desc: "1080p Full HD • Built-in mic • USB • Auto focus", versions: [] },
    { id: 1706, name: "External HDD 1TB USB 3.0", category: "Accessories & Spare Parts", price: 3999, type: "STORAGE", image: "images/accessories.png", desc: "1TB • USB 3.0 • Portable • Plug & play", versions: [] },
    { id: 1707, name: "Refurbished Laptop Adapter 65W", category: "Refurbished - Accessories", price: 500, type: "REFURBISHED", image: "images/accessories.png", desc: "19.5V 3.34A • Tested • Working condition", versions: [] }
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

// Cache-busting: Force reload if version changed
if(typeof window !== 'undefined') {
  const savedVersion = localStorage.getItem('cctech_db_version');
  const currentVersion = CCData.version;
  
  if(savedVersion !== currentVersion) {
    localStorage.removeItem('cctech_db');
    localStorage.setItem('cctech_db_version', currentVersion);
    console.log(`✅ Database updated to v${currentVersion}`);
  }
  
  // Load admin edits if available
  if(localStorage.getItem('cctech_db')) {
    try {
      const local = JSON.parse(localStorage.getItem('cctech_db'));
      if(Array.isArray(local.products)) CCData.products = local.products;
      if(Array.isArray(local.services)) CCData.services = local.services;
      if(Array.isArray(local.salesCategories)) CCData.salesCategories = local.salesCategories;
      if(Array.isArray(local.serviceCategories)) CCData.serviceCategories = local.serviceCategories;
    } catch(e) {
      console.error("Error loading local ", e);
    }
  }
}

// CC Tech IT Solutions - Central Database
const CCData = {
  whatsapp: "916364253615",
  
  salesCategories: ["Software", "Laptops", "Desktops", "Servers", "Embedded Systems", "Robotics", "Sensors & Modules", "Components", "Tools & Equipment", "Enclosures", "CCTV & Security", "Networking", "Accessories"],
  serviceCategories: ["OS Installation", "Software Repair", "Hardware Repair", "Networking Setup", "Data Recovery", "AMC Plans", "Virus Removal", "Display & Hardware Fix"],
  
  products: [
    // SOFTWARE
    { id: 1, name: "Windows 11 Pro", category: "Software", price: 8499, type: "One-time", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Windows_11_logo.svg/1200px-Windows_11_logo.svg.png", desc: "Genuine OEM license • Digital delivery • Lifetime activation", versions: [] },
    { id: 2, name: "CCTech Billing Software", category: "Software", price: 6000, type: "Lifetime", image: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png", desc: "GST compliant • Inventory • Multi-user • Free support", versions: [] },
    { id: 3, name: "MS Office 2021 Professional", category: "Software", price: 4999, type: "One-time", image: "https://cdn-icons-png.flaticon.com/512/888/888858.png", desc: "Word, Excel, PowerPoint, Outlook • Lifetime license", versions: [] },
    
    // LAPTOPS
    { id: 4, name: "HP Laptop 15s (i5, 8GB, 512GB)", category: "Laptops", price: 42999, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png", desc: "Intel i5 11th Gen • 8GB RAM • 512GB SSD • 15.6\" FHD", versions: [] },
    { id: 5, name: "Dell Inspiron 15 (i7, 16GB, 1TB)", category: "Laptops", price: 62999, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png", desc: "Intel i7 12th Gen • 16GB RAM • 1TB SSD • Backlit Keyboard", versions: [] },
    
    // SERVERS (from impss.in)
    { id: 6, name: "HP ProLiant DL380 G7 Server", category: "Servers", price: 85000, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2621/2621644.png", desc: "Dual Xeon X5650 • 32GB RAM • 4x 300GB SAS • 2U Rack", versions: [] },
    { id: 7, name: "Dell PowerEdge R720 Server", category: "Servers", price: 95000, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2621/2621644.png", desc: "Dual Xeon E5-2650 • 64GB RAM • 4x 600GB SAS • 2U Rack", versions: [] },
    { id: 8, name: "Dell PowerEdge T150 Tower", category: "Servers", price: 75000, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2621/2621644.png", desc: "Xeon E-2314 • 16GB ECC • 2TB HDD • Tower", versions: [] },
    
    // EMBEDDED SYSTEMS - Development Boards (from probots.co.in with 10% margin)
    { id: 101, name: "Arduino Uno R3 (Original)", category: "Embedded Systems", price: 605, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ATmega328P • 16MHz • 14 Digital I/O • 6 Analog • USB", versions: [] },
    { id: 102, name: "Arduino Nano", category: "Embedded Systems", price: 495, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ATmega328 • Compact size • USB mini • Breadboard friendly", versions: [] },
    { id: 103, name: "Arduino Mega 2560 R3", category: "Embedded Systems", price: 1100, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ATmega2560 • 54 Digital I/O • 16 Analog • 256KB Flash", versions: [] },
    { id: 104, name: "ESP32-WROOM-32D WiFi+BT", category: "Embedded Systems", price: 385, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Dual-core • WiFi+Bluetooth • 4MB Flash • IoT ready", versions: [] },
    { id: 105, name: "ESP8266 NodeMCU V3", category: "Embedded Systems", price: 385, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "WiFi module • Lua firmware • USB-Serial • IoT projects", versions: [] },
    { id: 106, name: "Raspberry Pi 4 Model B (2GB)", category: "Embedded Systems", price: 5489, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Quad-core Cortex-A72 • 2GB RAM • WiFi • BT • GigE", versions: [] },
    { id: 107, name: "Raspberry Pi 4 Model B (4GB)", category: "Embedded Systems", price: 6589, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Quad-core Cortex-A72 • 4GB RAM • WiFi • BT • GigE", versions: [] },
    { id: 108, name: "Raspberry Pi 4 Model B (8GB)", category: "Embedded Systems", price: 8789, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Quad-core Cortex-A72 • 8GB RAM • WiFi • BT • GigE", versions: [] },
    { id: 109, name: "Raspberry Pi Zero W", category: "Embedded Systems", price: 1649, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "1GHz Single-core • 512MB RAM • WiFi • BT • Compact", versions: [] },
    { id: 110, name: "NodeMCU ESP-12E", category: "Embedded Systems", price: 330, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ESP8266 • WiFi • 4MB Flash • Lua/Arduino IDE", versions: [] },
    { id: 111, name: "Wemos D1 Mini", category: "Embedded Systems", price: 330, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ESP8266 • WiFi • Compact • Arduino compatible", versions: [] },
    { id: 112, name: "STM32F103C8T6 (Blue Pill)", category: "Embedded Systems", price: 385, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ARM Cortex-M3 • 72MHz • 64KB Flash • 20KB SRAM", versions: [] },
    { id: 113, name: "Teensy 4.0", category: "Embedded Systems", price: 2749, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ARM Cortex-M7 • 600MHz • 2MB Flash • Arduino compatible", versions: [] },
    { id: 114, name: "Particle Photon WiFi Module", category: "Embedded Systems", price: 2199, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ARM Cortex-M3 • WiFi • Cloud connectivity • IoT", versions: [] },
    { id: 115, name: "BBC micro:bit V2", category: "Embedded Systems", price: 2199, type: "Board", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "ARM Cortex-M4 • LED matrix • Sensors • Bluetooth", versions: [] },
    
    // SENSORS (from probots.co.in with 10% margin)
    { id: 201, name: "HC-SR04 Ultrasonic Sensor", category: "Sensors & Modules", price: 110, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "2cm-400cm range • 5V • Trigger/Echo • Distance measurement", versions: [] },
    { id: 202, name: "DHT11 Temperature & Humidity", category: "Sensors & Modules", price: 110, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "20-90% RH • 0-50°C • Digital output • Low cost", versions: [] },
    { id: 203, name: "DHT22 Temperature & Humidity", category: "Sensors & Modules", price: 385, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "0-100% RH • -40 to 80°C • Higher accuracy • Digital", versions: [] },
    { id: 204, name: "PIR Motion Sensor HC-SR501", category: "Sensors & Modules", price: 165, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Infrared motion • 3-7m range • Adjustable delay • 5V", versions: [] },
    { id: 205, name: "MPU6050 Gyroscope Accelerometer", category: "Sensors & Modules", price: 220, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "6-axis • I2C • 3-axis gyro + 3-axis accel • Robotics", versions: [] },
    { id: 206, name: "BMP180 Barometric Pressure", category: "Sensors & Modules", price: 220, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Pressure & temperature • I2C • 300-1100 hPa • Weather", versions: [] },
    { id: 207, name: "MQ-2 Gas Sensor", category: "Sensors & Modules", price: 165, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "LPG/Smoke/CO detection • Analog output • Heater • Safety", versions: [] },
    { id: 208, name: "MQ-135 Air Quality Sensor", category: "Sensors & Modules", price: 220, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "NH3/NOx/Alcohol/Benzene • Air quality monitoring", versions: [] },
    { id: 209, name: "Soil Moisture Sensor", category: "Sensors & Modules", price: 110, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Capacitive • Analog output • Agriculture • Gardening", versions: [] },
    { id: 210, name: "Water Level Sensor", category: "Sensors & Modules", price: 110, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "8-level detection • Analog • Water tank monitoring", versions: [] },
    { id: 211, name: "Flame Sensor", category: "Sensors & Modules", price: 110, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "IR detection • Flame/fire detection • Digital/Analog", versions: [] },
    { id: 212, name: "IR Obstacle Avoidance Sensor", category: "Sensors & Modules", price: 110, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "IR reflection • 2-40cm • Robot obstacle detection", versions: [] },
    { id: 213, name: "IR Remote Control Kit", category: "Sensors & Modules", price: 165, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "38kHz IR • Remote + receiver • Arduino compatible", versions: [] },
    { id: 214, name: "RFID-RC522 Module with Card", category: "Sensors & Modules", price: 275, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "13.56MHz • SPI • Card+keychain • Access control", versions: [] },
    { id: 215, name: "NFC PN532 Module", category: "Sensors & Modules", price: 880, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "NFC reader/writer • I2C/SPI/UART • Mobile payment", versions: [] },
    { id: 216, name: "GPS NEO-6M Module", category: "Sensors & Modules", price: 605, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "UART • Location tracking • Antenna included • Logging", versions: [] },
    { id: 217, name: "Real Time Clock DS3231", category: "Sensors & Modules", price: 220, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "I2C • High accuracy • Battery backup • Timekeeping", versions: [] },
    { id: 218, name: "Relay Module 1-Channel 5V", category: "Sensors & Modules", price: 110, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "10A 250VAC • Optocoupler • Arduino control • Home auto", versions: [] },
    { id: 219, name: "Relay Module 4-Channel 5V", category: "Sensors & Modules", price: 330, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "4x 10A relays • Optocoupler • Multi-device control", versions: [] },
    { id: 220, name: "Relay Module 8-Channel 5V", category: "Sensors & Modules", price: 550, type: "Module", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "8x 10A relays • Optocoupler • Industrial control", versions: [] },
    
    // MOTOR DRIVERS & CONTROLLERS
    { id: 301, name: "L298N Dual H-Bridge Motor Driver", category: "Embedded Systems", price: 198, type: "Driver", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Dual motor • 2A/channel • 5-35V • Heat sink • Robotics", versions: [] },
    { id: 302, name: "L293D Motor Driver Shield", category: "Embedded Systems", price: 220, type: "Driver", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Arduino shield • 4 motors • 600mA/channel • Easy mount", versions: [] },
    { id: 303, name: "TB6612FNG Dual Motor Driver", category: "Embedded Systems", price: 275, type: "Driver", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Dual motor • 1.2A/channel • Efficient • Compact • PWM", versions: [] },
    { id: 304, name: "A4988 Stepper Motor Driver", category: "Embedded Systems", price: 165, type: "Driver", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Stepper control • Microstepping • 2A • 3D printers", versions: [] },
    { id: 305, name: "DRV8825 Stepper Driver", category: "Embedded Systems", price: 220, type: "Driver", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Stepper control • 1/32 microstepping • 2.5A • CNC", versions: [] },
    { id: 306, name: "ESC 30A Brushless Motor Speed Controller", category: "Embedded Systems", price: 495, type: "Driver", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "30A • Brushless motor • BEC 5V • Drone/RC applications", versions: [] },
    { id: 307, name: "Servo Motor SG90 9g (Micro)", category: "Embedded Systems", price: 110, type: "Motor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "9g • 1.8kg-cm torque • 0-180° • Arduino compatible", versions: [] },
    { id: 308, name: "Servo Motor MG996R (High Torque)", category: "Embedded Systems", price: 385, type: "Motor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "55g • 10kg-cm torque • Metal gear • Robotics", versions: [] },
    { id: 309, name: "Stepper Motor NEMA 17", category: "Embedded Systems", price: 440, type: "Motor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "1.8° step • 1.7A • 40N-cm • 3D printers • CNC", versions: [] },
    { id: 310, name: "DC Gear Motor 12V 100 RPM", category: "Embedded Systems", price: 220, type: "Motor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "12V • 100 RPM • High torque • Robot wheels", versions: [] },
    
    // DISPLAYS
    { id: 401, name: "16x2 LCD Display (HD44780)", category: "Embedded Systems", price: 220, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "16x2 characters • HD44780 • Blue backlight • Parallel", versions: [] },
    { id: 402, name: "16x2 LCD with I2C Interface", category: "Embedded Systems", price: 330, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "16x2 • I2C backpack • 2-wire interface • Easy wiring", versions: [] },
    { id: 403, name: "20x4 LCD Display with I2C", category: "Embedded Systems", price: 440, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "20x4 characters • I2C • More display area", versions: [] },
    { id: 404, name: "OLED 0.96\" I2C 128x64", category: "Embedded Systems", price: 275, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "0.96\" • 128x64 pixels • I2C • White/Blue/Yellow", versions: [] },
    { id: 405, name: "OLED 1.3\" I2C 128x64", category: "Embedded Systems", price: 385, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "1.3\" • 128x64 • I2C • Larger display • White/Blue", versions: [] },
    { id: 406, name: "TFT 2.4\" Touch Screen Shield", category: "Embedded Systems", price: 605, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "2.4\" • 240x320 • Touch • Arduino shield • SD card", versions: [] },
    { id: 407, name: "TFT 2.8\" Touch Screen", category: "Embedded Systems", price: 770, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "2.8\" • 240x320 • Resistive touch • SPI interface", versions: [] },
    { id: 408, name: "Nextion 2.4\" HMI Display", category: "Embedded Systems", price: 2199, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "2.4\" • Touch • UART • GUI builder • Professional HMI", versions: [] },
    { id: 409, name: "LED Matrix 8x8 (MAX7219)", category: "Embedded Systems", price: 165, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "8x8 LED • MAX7219 driver • SPI • Daisy-chainable", versions: [] },
    { id: 410, name: "7-Segment Display 4-Digit", category: "Embedded Systems", price: 110, type: "Display", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "4-digit • Common cathode • Time display • Counter", versions: [] },
    
    // POWER SUPPLIES & BATTERIES
    { id: 501, name: "Breadboard Power Supply 5V/3.3V", category: "Embedded Systems", price: 165, type: "Power", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Dual voltage • Breadboard compatible • USB/DC input", versions: [] },
    { id: 502, name: "LM2596 DC-DC Buck Converter", category: "Embedded Systems", price: 110, type: "Power", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Step-down • 3A • 4-40V to 1.25-37V • Adjustable", versions: [] },
    { id: 503, name: "MT3608 DC-DC Boost Converter", category: "Embedded Systems", price: 110, type: "Power", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Step-up • 2A • 2-24V input • Compact • Efficient", versions: [] },
    { id: 504, name: "USB Power Bank Module 5V 2A", category: "Embedded Systems", price: 220, type: "Power", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "18650 battery holder • 5V 2A output • Charging circuit", versions: [] },
    { id: 505, name: "TP4056 Li-ion Battery Charger", category: "Embedded Systems", price: 55, type: "Power", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "1A charging • Micro USB • Protection • 18650 compatible", versions: [] },
    { id: 506, name: "18650 Li-ion Battery 3.7V 2600mAh", category: "Embedded Systems", price: 220, type: "Battery", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "3.7V • 2600mAh • Rechargeable • Protected", versions: [] },
    { id: 507, name: "9V Battery Snap Connector", category: "Embedded Systems", price: 22, type: "Accessory", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "9V battery clip • Snap connector • Arduino projects", versions: [] },
    { id: 508, name: "DC Power Jack 5.5mm x 2.1mm", category: "Embedded Systems", price: 22, type: "Connector", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "DC jack • 5.5x2.1mm • PCB mount • Power input", versions: [] },
    
    // COMPONENTS
    { id: 601, name: "Breadboard 830 Tie-Points", category: "Components", price: 110, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "830 holes • Solderless • Adhesive backing • Power rails", versions: [] },
    { id: 602, name: "Mini Breadboard 400 Points", category: "Components", price: 55, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "400 holes • Compact • Portable • Prototyping", versions: [] },
    { id: 603, name: "Jumper Wires M-M (120pcs)", category: "Components", price: 165, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Male-to-Male • 20cm • 120 pieces • Assorted colors", versions: [] },
    { id: 604, name: "Jumper Wires M-F (120pcs)", category: "Components", price: 165, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Male-to-Female • 20cm • 120 pieces • Breadboard to module", versions: [] },
    { id: 605, name: "Jumper Wires F-F (120pcs)", category: "Components", price: 165, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Female-to-Female • 20cm • 120 pieces • Module to module", versions: [] },
    { id: 606, name: "Resistor Kit 1/4W (600pcs)", category: "Components", price: 275, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "10Ω-1MΩ • 30 values • 5% tolerance • Storage box", versions: [] },
    { id: 607, name: "Capacitor Kit (240pcs)", category: "Components", price: 330, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Ceramic & Electrolytic • 12 values • 0.1uF-100uF", versions: [] },
    { id: 608, name: "LED Kit 5mm (200pcs)", category: "Components", price: 165, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Red/Green/Blue/Yellow/White • 40pcs each • 3-5V", versions: [] },
    { id: 609, name: "Push Button Tactile (100pcs)", category: "Components", price: 110, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "12x12x7mm • 6-pin • Through-hole • Momentary", versions: [] },
    { id: 610, name: "Slide Switch SPDT (50pcs)", category: "Components", price: 110, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "SPDT • 3-pin • Through-hole • ON/OFF switch", versions: [] },
    { id: 611, name: "Potentiometer 10K (10pcs)", category: "Components", price: 110, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "10KΩ • Rotary • Variable resistor • Analog input", versions: [] },
    { id: 612, name: "LM7805 5V Voltage Regulator", category: "Components", price: 12, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "5V output • 1.5A • TO-220 • Thermal protection", versions: [] },
    { id: 613, name: "LM7812 12V Voltage Regulator", category: "Components", price: 12, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "12V output • 1.5A • TO-220 • Linear regulator", versions: [] },
    { id: 614, name: "NE555 Timer IC (10pcs)", category: "Components", price: 55, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Timer IC • DIP-8 • Oscillator • Pulse generation", versions: [] },
    { id: 615, name: "LM358 Dual Op-Amp (10pcs)", category: "Components", price: 55, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Dual op-amp • DIP-8 • Low power • Signal conditioning", versions: [] },
    { id: 616, name: "Diode 1N4007 (100pcs)", category: "Components", price: 55, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "1A 1000V • Rectifier • Through-hole • General purpose", versions: [] },
    { id: 617, name: "Zener Diode Kit (50pcs)", category: "Components", price: 110, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "3.3V-24V • 10 values • Voltage regulation", versions: [] },
    { id: 618, name: "Transistor BC547 (100pcs)", category: "Components", price: 55, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "NPN • 45V 100mA • TO-92 • General purpose", versions: [] },
    { id: 619, name: "MOSFET IRF540N (10pcs)", category: "Components", price: 110, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "N-channel • 100V 33A • TO-220 • Switching", versions: [] },
    { id: 620, name: "Crystal Oscillator 16MHz (10pcs)", category: "Components", price: 55, type: "Component", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "16MHz • HC-49S • Arduino • Microcontroller clock", versions: [] },
    
    // ENCLOSURES (from probots.co.in)
    { id: 701, name: "CircuitX PES01 Plastic Box - Small", category: "Enclosures", price: 55, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "95x65x35mm • ABS plastic • Screw holes • PCB mounting", versions: [] },
    { id: 702, name: "CircuitX PES02 Plastic Box - Medium", category: "Enclosures", price: 110, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "115x90x55mm • ABS plastic • Durable • Project box", versions: [] },
    { id: 703, name: "CircuitX PES03 Plastic Box - Large", category: "Enclosures", price: 165, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "158x108x62mm • ABS plastic • Spacious • Electronics", versions: [] },
    { id: 704, name: "Aluminum Enclosure Box - Small", category: "Enclosures", price: 385, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "115x90x55mm • Die-cast aluminum • IP54 • EMI shielding", versions: [] },
    { id: 705, name: "Aluminum Enclosure Box - Medium", category: "Enclosures", price: 550, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "158x108x62mm • Aluminum • Heat dissipation • Professional", versions: [] },
    { id: 706, name: "Raspberry Pi 4 Case with Fan", category: "Enclosures", price: 495, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Dual fan • Heat sinks • Easy access • ABS • Black/Red", versions: [] },
    { id: 707, name: "Arduino Uno Case", category: "Enclosures", price: 220, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Acrylic • Laser cut • Screw assembly • Protection", versions: [] },
    { id: 708, name: "Waterproof Junction Box IP65", category: "Enclosures", price: 440, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "190x140x70mm • IP65 • Outdoor • Cable glands", versions: [] },
    { id: 709, name: "DIN Rail Mount Enclosure", category: "Enclosures", price: 550, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "DIN rail • Industrial • PLC mounting • Modular", versions: [] },
    { id: 710, name: "Project Box with Transparent Lid", category: "Enclosures", price: 275, type: "Enclosure", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "150x100x50mm • Clear lid • ABS • LED visible", versions: [] },
    
    // TOOLS & EQUIPMENT
    { id: 801, name: "Digital Multimeter DT830D", category: "Tools & Equipment", price: 259, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "DC/AC Voltage • Current • Resistance • Diode • Buzzer", versions: [] },
    { id: 802, name: "Soldering Iron 60W Adjustable", category: "Tools & Equipment", price: 605, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "200-450°C • Temperature control • 5 tips • Stand • ON/OFF", versions: [] },
    { id: 803, name: "Soldering Station 936 60W", category: "Tools & Equipment", price: 1649, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Temperature controlled • Digital display • ESD safe", versions: [] },
    { id: 804, name: "Solder Wire 0.8mm (100g)", category: "Tools & Equipment", price: 330, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "60/40 Tin/Lead • Rosin core • 0.8mm • 100g spool", versions: [] },
    { id: 805, name: "Solder Wire Lead-Free 0.8mm", category: "Tools & Equipment", price: 440, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Lead-free • 0.8mm • RoHS compliant • 100g", versions: [] },
    { id: 806, name: "Desoldering Pump (Solder Sucker)", category: "Tools & Equipment", price: 165, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Spring-loaded • Aluminum • Heat-resistant • PCB repair", versions: [] },
    { id: 807, name: "Desoldering Braid Wick", category: "Tools & Equipment", price: 110, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "2.5mm x 1.5m • Copper braid • Flux coated • Solder removal", versions: [] },
    { id: 808, name: "Helping Hands with Magnifier", category: "Tools & Equipment", price: 385, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Adjustable arms • Magnifying glass • LED light • Soldering", versions: [] },
    { id: 809, name: "Wire Stripper Tool", category: "Tools & Equipment", price: 275, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Automatic • 10-24 AWG • Strip/Crimp/Cut • Multi-function", versions: [] },
    { id: 810, name: "Precision Screwdriver Set (32pcs)", category: "Tools & Equipment", price: 495, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "32 bits • Phillips/Flathead/Torx • Electronics repair", versions: [] },
    { id: 811, name: "Tweezers Set (5pcs)", category: "Tools & Equipment", price: 165, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Stainless steel • Anti-static • Curved/Straight • SMD", versions: [] },
    { id: 812, name: "PCB Holder Vise", category: "Tools & Equipment", price: 550, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Adjustable • Helping hands • PCB soldering • Stable", versions: [] },
    { id: 813, name: "Hot Air Rework Station", category: "Tools & Equipment", price: 3299, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "SMD/SMT • Temperature control • Air flow • Desoldering", versions: [] },
    { id: 814, name: "USB Logic Analyzer 8-Channel", category: "Tools & Equipment", price: 495, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "24MHz • 8-channel • USB • Protocol debugging", versions: [] },
    { id: 815, name: "Oscilloscope Probe Set", category: "Tools & Equipment", price: 550, type: "Tool", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "100MHz • 1X/10X • BNC • Signal measurement", versions: [] },
    
    // ROBOTICS
    { id: 901, name: "Arduino Robot Car Chassis Kit", category: "Robotics", price: 1649, type: "Kit", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "2WD • Acrylic chassis • Motors • Wheels • Ultrasonic sensor", versions: [] },
    { id: 902, name: "4WD Robot Car Chassis", category: "Robotics", price: 2199, type: "Kit", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "4-wheel drive • Metal chassis • High torque • Obstacle avoid", versions: [] },
    { id: 903, name: "Hexapod Robot Spider Kit", category: "Robotics", price: 3299, type: "Kit", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "6-leg • 18 servos • Arduino control • Walking robot", versions: [] },
    { id: 904, name: "Robot Arm Kit 6-DOF", category: "Robotics", price: 4399, type: "Kit", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "6 degrees • Metal • Servos • Gripper • Arduino", versions: [] },
    { id: 905, name: "Line Follower Sensor Array", category: "Robotics", price: 275, type: "Sensor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "8-channel • IR sensors • Line tracking • Robot navigation", versions: [] },
    { id: 906, name: "Wheel Encoder DC Motor", category: "Robotics", price: 440, type: "Motor", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "With encoder • 12V • 210 RPM • Precise control", versions: [] },
    { id: 907, name: "Omni Wheel 60mm", category: "Robotics", price: 220, type: "Wheel", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "60mm • 3-roller • Mecanum • Omni-directional movement", versions: [] },
    { id: 908, name: "Robot Caster Wheel", category: "Robotics", price: 110, type: "Wheel", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Free rotating • Support wheel • Robot balance", versions: [] },
    
    // CCTV & NETWORKING (existing)
    { id: 1001, name: "Hikvision 4-Camera CCTV Kit", category: "CCTV & Security", price: 18500, type: "Kit", image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png", desc: "2MP Cameras • 4ch DVR • 1TB HDD • Mobile View", versions: [] },
    { id: 1002, name: "TP-Link Gigabit WiFi 6 Router", category: "Networking", price: 3499, type: "Hardware", image: "https://cdn-icons-png.flaticon.com/512/2884/2884368.png", desc: "Dual Band • AX1500 • 4 LAN • MU-MIMO", versions: [] },
    
    // ACCESSORIES & COMPONENTS
    { id: 1101, name: "Samsung 970 EVO Plus 1TB NVMe", category: "Accessories", price: 6499, type: "Storage", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Read: 3500MB/s • Write: 3300MB/s • 5yr Warranty", versions: [] },
    { id: 1102, name: "Corsair Vengeance 16GB DDR4", category: "Accessories", price: 3299, type: "RAM", image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "3200MHz • CL16 • Desktop • Lifetime Warranty", versions: [] }
  ],

  services: [
    { id: 101, name: "Windows 11 Clean Installation", category: "OS Installation", price: 1500, image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png", desc: "Full backup • Fresh install • All drivers • Optimization" },
    { id: 102, name: "Virus & Malware Removal", category: "Virus Removal", price: 1200, image: "https://cdn-icons-png.flaticon.com/512/2040/2040545.png", desc: "Deep scan • Quarantine • Cleanup • Antivirus setup" },
    { id: 103, name: "Laptop Display Replacement", category: "Display & Hardware Fix", price: 3500, image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png", desc: "Cracked/broken screen • Genuine panels • 30min-1hr (panel extra)" },
    { id: 104, name: "Data Recovery (HDD/SSD)", category: "Data Recovery", price: 3000, image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png", desc: "Deleted files • Formatted drive • Corrupted data" },
    { id: 105, name: "Home/Office Network Setup", category: "Networking Setup", price: 2500, image: "https://cdn-icons-png.flaticon.com/512/2884/2884368.png", desc: "Router config • WiFi setup • Printer sharing • Security" },
    { id: 106, name: "Annual Maintenance Contract (AMC)", category: "AMC Plans", price: 5000, image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png", desc: "Quarterly visits • Priority support • Updates • 1 year" }
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

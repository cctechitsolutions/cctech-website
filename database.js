// CC Tech IT Solutions - Central Database
const CCData = {
  whatsapp: "916364253615",
  
  salesCategories: ["Software", "Laptops", "Desktops", "Servers", "CCTV & Security", "Networking", "Accessories", "Components"],
  
  serviceCategories: ["OS Installation", "Software Repair", "Hardware Repair", "Networking Setup", "Data Recovery", "AMC Plans", "Virus Removal"],
  
  products: [
    {
      id: 1,
      name: "Windows 11 Pro",
      category: "Software",
      price: 8499,
      type: "One-time",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Windows_11_logo.svg/1200px-Windows_11_logo.svg.png",
      desc: "Genuine OEM license • Digital delivery • Lifetime activation",
      versions: ["Home", "Pro", "Enterprise"]
    },
    {
      id: 2,
      name: "CCTech Billing Software",
      category: "Software",
      price: 6000,
      type: "Lifetime",
      image: "https://cdn-icons-png.flaticon.com/512/2910/2910768.png",
      desc: "GST compliant • Inventory • Multi-user • Free support",
      versions: ["Basic", "Professional"]
    },
    {
      id: 3,
      name: "MS Office 2021 Professional",
      category: "Software",
      price: 4999,
      type: "One-time",
      image: "https://cdn-icons-png.flaticon.com/512/888/888858.png",
      desc: "Word, Excel, PowerPoint, Outlook • Lifetime license",
      versions: []
    },
    {
      id: 4,
      name: "HP Laptop 15s (i5, 8GB, 512GB SSD)",
      category: "Laptops",
      price: 42999,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png",
      desc: "Intel i5 11th Gen • 8GB RAM • 512GB SSD • 15.6\" FHD • Windows 11",
      versions: []
    },
    {
      id: 5,
      name: "Dell Inspiron 15 (i7, 16GB, 1TB SSD)",
      category: "Laptops",
      price: 62999,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png",
      desc: "Intel i7 12th Gen • 16GB RAM • 1TB SSD • Backlit Keyboard",
      versions: []
    },
    {
      id: 6,
      name: "Lenovo ThinkPad E14 (Business)",
      category: "Laptops",
      price: 54999,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png",
      desc: "i5 11th Gen • 8GB RAM • 512GB SSD • Fingerprint • 3yr Warranty",
      versions: []
    },
    {
      id: 7,
      name: "Custom Desktop PC (Office Use)",
      category: "Desktops",
      price: 28999,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190357.png",
      desc: "Intel i3 10th Gen • 8GB RAM • 256GB SSD • Keyboard + Mouse",
      versions: []
    },
    {
      id: 8,
      name: "Gaming Desktop (RTX 3060)",
      category: "Desktops",
      price: 75999,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190357.png",
      desc: "i5 12th Gen • 16GB RAM • RTX 3060 12GB • 1TB NVMe • RGB",
      versions: []
    },
    {
      id: 9,
      name: "Dell PowerEdge T150 Server",
      category: "Servers",
      price: 85000,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2621/2621644.png",
      desc: "Xeon E-2314 • 16GB ECC RAM • 2TB HDD • RAID • 3yr Warranty",
      versions: []
    },
    {
      id: 10,
      name: "Hikvision 4-Camera CCTV Kit",
      category: "CCTV & Security",
      price: 18500,
      type: "Kit",
      image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png",
      desc: "2MP Bullet Cameras • 4ch DVR • 1TB HDD • Mobile View • Installation",
      versions: []
    },
    {
      id: 11,
      name: "TP-Link Gigabit WiFi 6 Router",
      category: "Networking",
      price: 3499,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2884/2884368.png",
      desc: "Dual Band • AX1500 • 4 LAN Ports • MU-MIMO • Parental Controls",
      versions: []
    },
    {
      id: 12,
      name: "Samsung 970 EVO Plus 1TB NVMe SSD",
      category: "Components",
      price: 6499,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png",
      desc: "Read: 3500MB/s • Write: 3300MB/s • 5yr Warranty",
      versions: []
    },
    {
      id: 13,
      name: "Corsair Vengeance 16GB DDR4 (3200MHz)",
      category: "Components",
      price: 3299,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png",
      desc: "Desktop RAM • CL16 • Lifetime Warranty",
      versions: []
    },
    {
      id: 14,
      name: "LG 24\" IPS Monitor (FHD, 75Hz)",
      category: "Accessories",
      price: 9999,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190387.png",
      desc: "1920x1080 • IPS Panel • HDMI + VGA • Eye Care • 3yr Warranty",
      versions: []
    },
    {
      id: 15,
      name: "Logitech Wireless Keyboard & Mouse Combo",
      category: "Accessories",
      price: 1499,
      type: "Hardware",
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190391.png",
      desc: "2.4GHz Wireless • 10m Range • Long Battery • Spill Resistant",
      versions: []
    }
  ],

  services: [
    {
      id: 101,
      name: "Windows 11 Clean Installation",
      category: "OS Installation",
      price: 1500,
      image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
      desc: "Full backup • Fresh install • All drivers • Software setup • Optimization"
    },
    {
      id: 102,
      name: "Windows 10 Installation",
      category: "OS Installation",
      price: 1200,
      image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
      desc: "Clean install • Drivers • Basic software • 1 hour service"
    },
    {
      id: 103,
      name: "macOS Installation/Upgrade",
      category: "OS Installation",
      price: 2000,
      image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
      desc: "macOS Ventura/Sonoma • Time Machine backup • Migration assistant"
    },
    {
      id: 104,
      name: "Ubuntu/Fedora Linux Install",
      category: "OS Installation",
      price: 1000,
      image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
      desc: "Dual boot or single • All drivers • Essential software setup"
    },
    {
      id: 105,
      name: "Virus & Malware Removal",
      category: "Virus Removal",
      price: 1200,
      image: "https://cdn-icons-png.flaticon.com/512/2040/2040545.png",
      desc: "Deep scan • Quarantine • Cleanup • Security hardening • Antivirus setup"
    },
    {
      id: 106,
      name: "Blue Screen/Boot Error Fix",
      category: "Software Repair",
      price: 1500,
      image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png",
      desc: "Diagnosis • Repair • Data recovery if needed • System restore"
    },
    {
      id: 107,
      name: "MS Office Installation & Setup",
      category: "Software Repair",
      price: 800,
      image: "https://cdn-icons-png.flaticon.com/512/888/888858.png",
      desc: "Install • Activate • Configure • Template setup • 30min support"
    },
    {
      id: 108,
      name: "Laptop Hardware Repair",
      category: "Hardware Repair",
      price: 1500,
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190333.png",
      desc: "Screen replacement • Keyboard repair • Hinge fix • Port repair (parts extra)"
    },
    {
      id: 109,
      name: "Desktop PC Repair",
      category: "Hardware Repair",
      price: 1000,
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190357.png",
      desc: "Diagnostics • Component replacement • Cleaning • Thermal paste (parts extra)"
    },
    {
      id: 110,
      name: "Home/Office Network Setup",
      category: "Networking Setup",
      price: 2500,
      image: "https://cdn-icons-png.flaticon.com/512/2884/2884368.png",
      desc: "Router config • WiFi setup • Printer sharing • Security • Cable management"
    },
    {
      id: 111,
      name: "CCTV Installation & Configuration",
      category: "Networking Setup",
      price: 3500,
      image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png",
      desc: "Camera mounting • DVR setup • Mobile app • Remote viewing (cables extra)"
    },
    {
      id: 112,
      name: "Data Recovery (HDD/SSD)",
      category: "Data Recovery",
      price: 3000,
      image: "https://cdn-icons-png.flaticon.com/512/2190/2190371.png",
      desc: "Deleted files • Formatted drive • Corrupted data • External drives (success not guaranteed)"
    },
    {
      id: 113,
      name: "Annual Maintenance Contract (AMC)",
      category: "AMC Plans",
      price: 5000,
      image: "https://cdn-icons-png.flaticon.com/512/3067/3067258.png",
      desc: "Quarterly visits • Priority support • Software updates • Hardware check • 1 year"
    }
  ]
};

// Load from localStorage if available
if(typeof window !== 'undefined' && localStorage.getItem('cctech_db')) {
  try {
    const localData = JSON.parse(localStorage.getItem('cctech_db'));
    if(localData.products) CCData.products = localData.products;
    if(localData.services) CCData.services = localData.services;
    if(localData.salesCategories) CCData.salesCategories = localData.salesCategories;
    if(localData.serviceCategories) CCData.serviceCategories = localData.serviceCategories;
  } catch(e) {
    console.error("Error loading local data:", e);
  }
}

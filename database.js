const CCData = {
  whatsapp: "916364253615",
  salesCategories: ["Software", "Hardware", "Servers", "CCTV & Security", "Networking", "Accessories"],
  serviceCategories: ["OS Installation", "Software Repair", "Networking Setup", "Data Recovery", "AMC Plans"],
  
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
      versions: ["Basic", "Professional", "Enterprise"]
    }
  ],

  services: [
    {
      id: 101,
      name: "Windows 11 Clean Install",
      category: "OS Installation",
      price: 1500,
      image: "https://cdn-icons-png.flaticon.com/512/2721/2721269.png",
      desc: "Full backup + fresh install + driver setup + optimization"
    }
  ]
};

if(localStorage.getItem('cctech_db')) {
  Object.assign(CCData, JSON.parse(localStorage.getItem('cctech_db')));
}

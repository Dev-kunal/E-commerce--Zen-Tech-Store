const faker = require("faker");

faker.seed(123);
export const productData = [
  {
    id: faker.datatype.uuid(),
    name: "Apple iPhone 11 (64 GB)-Black",
    price: 44_999,
    oldPrice: 47_800,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71i2XhHU3pL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71DjxIGy0ZL._SL1500_.jpg"
    ],

    features: [
      "6.1-inch (15.5 cm diagonal) Liquid Retina HD LCD display",
      "Water and dust resistant (2 meters for up to 30 minutes, IP68)",
      "Dual-camera system with 12MP Ultra Wide and Wide cameras",
      "Night mode, Portrait mode, and 4K video up to 60fps",
      "12MP TrueDepth front camera with Portrait mode, 4K video, and Slo-Mo",
      "Face ID for secure authentication",
      "A13 Bionic chip with third-generation Neural Engine",
      "Fast-charge capable",
      "Wireless charging"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Apple iPhone 12 Mini (64 GB)-Green",
    price: 67_100,
    oldPrice: 68_400,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71uuDYxn3XL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81tTUnJ3AXL._SL1500_.jpg"
    ],
    features: [
      "5.4-inch (13.7 cm diagonal) Super Retina XDR display",
      "Ceramic Shield, tougher than any smartphone glass",
      "A14 Bionic chip, the fastest chip ever in a smartphone",
      "Advanced dual - camera system with 12MP Ultra Wide and Wide cameras",
      "Night mode, Deep Fusion, Smart HDR 3, 4K Dolby Vision HDR recording",
      "12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording",
      "Industry-leading IP68 water resistance",
      "Supports MagSafe accessories for easy attach and faster wireless charging",
      "iOS with redesigned widgets on the Home screen, all-new App Library, App Clips"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Google Pixel 4a (6GB, 128GB )-Just Black",
    price: 36_920,
    oldPrice: 37_200,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/7199N-Uz2AL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71Mrsvx4CpL._SL1500_.jpg"
    ],
    features: [
      "12 MP dual pixel rear camera with features like Live HDR ",
      "Night Sight, and Portrait Mode",
      "The Adaptive Battery lasts up to 24 hours ",
      "HDR+ makes your photos look better by automatically adjusting for color and lighting",
      "Night Sight lets you capture rich detail and color even in the dark",
      "Get things done with just your voice: Send texts, get directions and reminders, and multitask on the go on your mobile phone"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Google Pixel 5 5G 128GB - Just Black",
    price: 62_580,
    oldPrice: 63_800,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/81-fNmQqlLL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/711faiYLapL._SL1500_.jpg"
    ],
    features: [
      "5G capable smartphone gives you an extra boost of speed so you can download a movie in seconds, enjoy smooth streaming in ultra clear HD, play games at home and on the go, and even share your 5G speed with friends",
      "Your phone will automatically receive the latest OS and security updates for at least 3 years; the custom-made Titan M chip helps secure the operating system and sensitive data, like passwords",
      "Take vibrant photos on your phone even in the dark with Night Sight, bring studio quality light to your pictures of people with Portrait Light, and get more scenery and people in the shot with the rear facing ultrawide lens",
      "Pixel 5 is a water resistant smart phone; the metal unibody can handle being submerged in 1.5 meters of fresh water for 30 minutes"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },

  {
    id: faker.datatype.uuid(),
    name: "Apple iPhone 12 Pro (128GB) - Pacific Blue",
    price: 1_19_900,
    oldPrice: 1_21_100,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71DVgBTdyLL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81KcqNGQIsL._SL1500_.jpg"
    ],
    features: [
      "6.1-inch (15.5 cm diagonal) Super Retina XDR display",
      "Ceramic Shield, tougher than any smartphone glass",
      "A14 Bionic chip, the fastest chip ever in a smartphone",
      "Pro camera system with 12MP Ultra Wide, Wide and Telephoto cameras;4x optical zoom range;",
      "Night mode, Deep Fusion, Smart HDR 3, Apple ProRAW, 4K Dolby Vision HDR recording",
      "LiDAR Scanner for improved AR experiences, Night mode portraits",
      "12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording",
      "Industry-leading IP68 water resistance"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "OPPO Find X2 (Black, 12GB RAM, 256GB)",
    price: 54_999,
    oldPrice: 55_250,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/91-2d0XeliL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/81PbRgDh%2BPL._SL1500_.jpg"
    ],
    features: [
      "48MP (Sony IMX586 Sensor) wide-angle lens (f/1.7 aperture) rear camera, 12MP (Sony IMX708 Sensor) ultra-wide-angle lens (f/2.2 aperture), 13MP (f/2.4 aperture) telephoto camera | 32MP front facing camera",
      "17.01 centimeters (6.7-inch) OLED curved screen with 120Hz ultra-high refresh rate, QHD+ display 3168 x 1440 pixels resolution, 513 ppi pixel density",
      "Memory, Storage & SIM: 12GB RAM (LPDDR5) | 256GB (UFS 3.0) internal memory | Dual Nano SIM",
      "Color OS 7.1 based on Android v10.0 operating system with 2.8GHz Qualcomm Snapdragon 865 octa core processor, Adreno 650 GPU",
      "Innovative 65W SuperVOOC flash charging brings the 4260 mAh battery to 40% in just 10 minutes, fully charging in 38 minutes providing talk-time of 37.8 hours and standby time of 378 hours",
      "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
      "Box also includes: Type-C cable, earphone, adapter, SIM tray ejector, protective case, booklet with warranty card and quick guide"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Redmi K20 (Flame Red, 6GB RAM, 128GB Storage)",
    price: 20_589,
    oldPrice: 19_999,
    images: [
      "https://www.reliancedigital.in/medias/Xiaomi-K20-Smart-Phones-491584265-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wyMTQyNTd8aW1hZ2UvanBlZ3xpbWFnZXMvaDhhL2gzZC85Mjg5Njg5NzI3MDA2LmpwZ3xlZTQ5N2NhYTA3ODNhZjZkM2U0MzllMDgwODY4MmU3MGU0YjExMzhmNzdkYWMzMmMyMjU5NTUwNzc0ZWMzZjUy",
      "https://www.reliancedigital.in/medias/Xiaomi-K20-Smart-Phones-491584265-i-9-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wyMDAwMDF8aW1hZ2UvanBlZ3xpbWFnZXMvaGIwL2g0OC85Mjg5Njk2NDc3MjE0LmpwZ3xmZWNlNWQ5OWQzM2I2MTBmMTk0YjNmNjVmNzliODIyNmNjYzUwMjNlZDFhNjJlNmJlNDhmNzEyZjk5MzFlNzFl"
    ],
    features: [
      "48+13+8MP primary camera with 20MP front facing camera",
      "16.23 centimeters (6.39-inch) AMOLED capacitive touchscreen with 2340 x 1080 pixels resolution 403 ppi pixel density",
      "Memory Storage & SIM 6GB RAM | 128GB storage | Dual SIM with dual standby (4G+4G)",
      "Android v9 Pie operating system (Upgradable to Android Q) with 2.2GHz Qualcomm Snapdragon 730 Octa core processor, Adreno 618 GPU",
      "4000mAH lithium-polymer battery",
      "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Apple iPhone 12 Pro Max (128GB) - Silver",
    price: 1_39_900,
    oldPrice: 1_40_800,
    images: [
      "https://m.media-amazon.com/images/I/71umuN8XVeL._SL1500_.jpg",
      "https://m.media-amazon.com/images/I/81N-FmzQNoL._SL1500_.jpg"
    ],
    features: [
      "Triple rear camera setup- Main Camera 12MP Dual Pixel + Ultra Wide 12MP Camera + Tele1 3X 64MP Camera | 10MP front Dual Pixel Camera",
      "(6.2-inch) Dynamic AMOLED 2X Display, FHD+ resolution with 2400 X 1080 pixels resolution, 421 PPI with 16M colours",
      "8GB RAM | 128GB internal Storage | Dual SIM (nano+nano) dual-standby (5G+5G)",
      "Android Pie v10.0 operating system with 2.9GHz Exynos 2100 octa core processor",
      "4000mAH lithium-ion battery, 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Redmi Note 10 Pro Max (Glacial Blue, 6GB RAM, 128GB)",
    price: 19_999,
    oldPrice: 20_800,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71yAmNw6l6L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71WJjfuEf7L._SL1200_.jpg"
    ],
    features: [
      "Processor: Qualcomm Snapdragon 732G with Kryo 470 Octa-core; 8nm process; Up to 2.3GHz clock speed",
      "Camera: 64 MP Quad Rear camera with 8MP Ultra-wide, 5MP Telemacro and Portrait lens| 16 MP Front camera",
      "Display: 120Hz high refresh rate FHD+ (1080x2400) AMOLED Dot display; 16.9 centimeters (6.67 inch); 20:9 aspect ratio; HDR 10 support",
      "Battery: 5020 mAH large battery with 33W fast charger in-box and Type-C connectivity",
      "Memory, Storage & SIM: 6GB RAM | 128GB UFS 2.2 storage expandable up to 512GB with dedicated SD card slot | Dual SIM (nano+nano) dual standby (4G+4G)"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "OnePlus Nord (256 GB, 12 GB RAM, Blue Marble)",
    price: 29_999,
    oldPrice: 31_000,
    images: [
      "https://www.reliancedigital.in/medias/OnePlus-Nord-Blue-Marble-12-256-491894435-i-1-1200Wx1200H?context=bWFzdGVyfGltYWdlc3w1NDg3MDR8aW1hZ2UvanBlZ3xpbWFnZXMvaGNhL2gxNS85MzM3MjE1NjgwNTQyLmpwZ3wxYTA0NGJmNTlmYjZiYWNmNjNhNjc4YmQ2NGQ5N2NkYTI4ZWNmNTU1Mjg3ZTEyNDMyMWE0ZWY4NDA5Y2RlNDkx",
      "https://www.reliancedigital.in/medias/OnePlus-Nord-Blue-Marble-12-256-491894435-i-3-1200Wx1200H?context=bWFzdGVyfGltYWdlc3wxMzY5MDl8aW1hZ2UvanBlZ3xpbWFnZXMvaDdiL2g0Yy85MzM5NzcxMzU1MTY2LmpwZ3w1NWQzYmFlNTBmZmVjNjNiM2RjY2QwMTJmZjhmYjBlZWJmN2U4NjVlYzliYjFkNjViYWYzMDVmOWYwYzgyOWFk"
    ],
    features: [
      "48MP+8MP+5MP+2MP quad rear camera with 1080P Video at 30/60 fps, 4k 30fps | 32MP+8MP front dual camera with 4K video capture at 30/60 fps and 1080 video capture at 30/60 fps",
      "6.44-inch 90Hz fluid Amoled display with 2400 x 1080 pixels resolution | 408ppi",
      "Memory, Storage & SIM: 12GB RAM | 256GB internal memory | OnePlus Nord currently support dual 4G SIM Cards or a Single 5G SIM. 5G+4G support will be available via OTA update at a future date.",
      "OxygenOS based on Android 10 operating system with 2.4GHz Kryo 475 Prime + 2.2GHz Kryo 475 Gold + 6x1.8GHz Kryo 475 Silver Qualcomm Snapdragon 765G 5G mobile platform octa core processor, Adreno 620 GPU",
      "4115mAH lithium-ion battery | In-Display fingerprint sensor",
      "1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
      "Corning Gorilla Glass 5 | 12GB GB LPDDR4X, 256GB UFS 2.1"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "OnePlus 9 Pro 5G (Stellar Black, 12GB RAM, 256GB Storage)",
    price: 69_999,
    oldPrice: 70_800,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71E%2BAgYDKtL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61X7tif5rzL._SL1500_.jpg"
    ],
    features: [
      "Rear Quad Camera Co - Developed by Hasselblad, 48 MP Main camera, 50 MP Ultra Wide Angle Camera with Sensor size of 1/1.56''",
      "8 MP Telepoto Lens, 2 MP Monochorme Lens, 16 MP Front Camera",
      "Qualcomm Snapdragon 888 Processor with Adreno 660 GPU",
      "6.7 Inches Fluid AMOLED Display with 120Hz refresh rate with Latest LTPO technology",
      "Oxygen OS based on Andriod 11",
      "Comes with 4500 mAh Battery with 65W Wired Charging and 50W Wireless Charging capability"
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  },
  {
    id: faker.datatype.uuid(),
    name: "Vivo X60 Pro+ (Emperor Blue, 12GB RAM, 256GB)",
    price: 69_990,
    oldPrice: 71_800,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/71WJjfuEf7L._SL1200_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71WJjfuEf7L._SL1200_.jpg"
    ],
    features: [
      "50MP+48MP+32MP+8MP Rear Camera | 32MP Selfie Camera",
      "16.65cm (6.56 inch) AMOLED Display with 120Hz Refresh Rate and 2376 x 1080 pixels resolution",
      "Memory & SIM: 12GB RAM | 256GB internal memory | Dual SIM (nano+nano) dual-standby (5G)",
      "Funtouch OS 11.1 (based on Android 11) operating system with Qualcomm Snapdragon 888 octa core processor",
      "55W flash charging with 4200mAh battery (Type-C)."
    ],
    inStock: faker.datatype.boolean(),
    fastDelivery: faker.datatype.boolean(),
    ratings: faker.random.arrayElement([3, 4, 5])
  }
];

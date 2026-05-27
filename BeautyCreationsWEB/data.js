const createVariantFamily = ({
  prefix,
  category,
  subcategory,
  baseName,
  price,
  image,
  productUrl,
  sourceStore = "Beauty Creations MX",
  description,
  variants
}) => variants.map((variant, index) => ({
  id: `${prefix}${String(index + 1).padStart(3, "0")}`,
  name: `${baseName} - ${variant}`,
  category,
  subcategory,
  price,
  image,
  productUrl,
  description: `${description} Tono o variante: ${variant}.`,
  available: true,
  sourceStore
}));

const standaloneProducts = [
  {
    id: "sk001",
    name: "Start Fresh Clarifying Foam Cleanser",
    category: "skincare",
    subcategory: "limpiador",
    price: 199,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/BCCBackup-Cosmetics-BeautyCreationsSkin-LimpiadorEnEspumaStartFreshClarifyingFoamCleanser-SkinCare-SK-SFF-792926.png?v=1741738608&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/beauty-creations-skin-limpiador-en-espuma-start-fresh-clarifying-foam-cleanser-skin-care",
    description: "Limpiador en espuma con lavanda y romero para remover maquillaje e impurezas.",
    available: true,
    sourceStore: "Beauty Creations MX"
  },
  {
    id: "sk002",
    name: "Skin Care Agua Micelar The Take Down",
    category: "skincare",
    subcategory: "limpiador",
    price: 199,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/bcc-backup-beauty-creations-skin-agua-micelar-the-take-down-skin-care-sk-tdm-680467.jpg?v=1741738640&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/beauty-creations-skin-agua-micelar-the-take-down-skin-care",
    description: "Agua micelar para retirar suciedad y dejar una sensacion fresca en la piel.",
    available: true,
    sourceStore: "Beauty Creations MX"
  },
  {
    id: "sk003",
    name: "Flawless Stay Primer Hidratante",
    category: "skincare",
    subcategory: "primer",
    price: 139,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/bcc-backup-beauty-creations-primer-hidratante-primer-pre-base-cosmetics-phs01-433923.jpg?v=1744307373&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/primer-pre-base-primer-hidratante",
    description: "Prebase hidratante que prepara la piel y ayuda a mejorar la aplicacion del maquillaje.",
    available: true,
    sourceStore: "Beauty Creations MX"
  },
  {
    id: "sk004",
    name: "Flawless Stay Fijador De Maquillaje",
    category: "skincare",
    subcategory: "fijador",
    price: 136,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/bcc-backup-beauty-creations-fijador-de-maquillaje-cosmetics-spf01-467931.jpg?v=1744064406&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/fijador-de-maquillaje",
    description: "Fijador ligero resistente al agua y al aire para prolongar el maquillaje por horas.",
    available: true,
    sourceStore: "Beauty Creations MX"
  },
  {
    id: "sk005",
    name: "Limpiador De Brochas One Step Brush Cleaner",
    category: "skincare",
    subcategory: "brocha",
    price: 108,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/BCCBackup-Cosmetics-BeautyCreations-LimpiadorDeBrochasOneStep-BrushCleaner-BCS-935816.png?v=1741738650&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/beauty-creations-limpiador-de-brochas-one-step-brush-cleaner",
    description: "Limpiador a base de agua para brochas que remueve residuos y mantiene las cerdas suaves.",
    available: true,
    sourceStore: "Beauty Creations MX"
  }
];

const matteFoundationVariants = [
  "1N", "2N", "3C", "4W", "5N", "6N", "7N", "8W", "9C", "10WG",
  "11NG", "12C", "13W", "14GO", "15N", "16N", "17W", "18WG", "19O", "20C",
  "21W", "22WO", "23NG", "24C", "25N", "26W", "27O", "28N", "29C", "30N"
];

const satinFoundationVariants = [
  "FS1.0", "FS1.5", "FS2.0", "FS2.5", "FS3.0", "FS3.5", "FS3.6", "FS4.0", "FS4.1", "FS4.5",
  "FS4.6", "FS5.0", "FS5.1", "FS5.5", "FS6.0", "FS6.5", "FS7.0", "FS7.5", "FS8.0", "FS8.5",
  "FS9.0", "FS9.5", "FS10.0", "FS10.5", "FS11", "FS11.5", "FS12", "FS12.5"
];

const glowySkinVariants = ["01", "02", "03", "04", "05", "06", "07", "08"];
const colorCorrectorVariants = ["Verde", "Lavanda", "Naranja", "Blanco", "Amarillo"];
const mineralizedBlushVariants = ["Bubbly", "Dreamy", "Sweetie", "Lovely", "Berrylicious", "Mimosa", "Bellini", "Peachy"];
const ultraDazzleVariants = [
  "Berry Dazzle", "BFF", "Born To Shine", "Bossy", "Brown Sugar", "Doll Face",
  "Exclusive", "Exposed", "Fairytale", "Foxy", "Get It Girl", "Go Getter",
  "Goal Digger", "Golden Girl", "Hello Darling", "Hot Shot", "Main Squeeze", "Millionaire",
  "Pretty Girl", "Royalty", "Status", "Sugar Daddy", "Vanity", "Whipped"
];
const classicMatteVariants = [
  "Pinky Promise", "Sugar Bomb", "Bite Me", "Love Me", "Kiss Me", "My Cherry",
  "Infatuated", "Angel", "Get Over It", "Tempted", "Sweet Hearth", "Totally Nude",
  "Barely Naked", "Obsessed", "Naked", "Bare Naked", "Naughty", "Berry Me",
  "Undressed", "Deep Romance"
];
const teaseMeVariants = [
  "Strings Attached", "All Yours", "So Its Mine", "Waiting For You", "My Weakness", "Hint Hint",
  "Dirty Thoughts", "Turn Me On", "Making You Crazy", "Late Date", "Tell Me More", "Fool In Love",
  "So Luscious", "Spice It Up", "So Deep", "Night Appointment"
];
const tintedLuxeVariants = ["Always", "Cherry", "Crush", "Guava", "Peach", "Pink", "Raspberry", "Watermelon"];
const allAboutYouVariants = ["My Fav Topper", "Sunday Funday", "Lovertini", "Drop It Low", "Pretty Fling", "Pop Bottles"];
const nudeXLinerVariants = [
  "Always Xtra", "Basic", "Essential", "Call Me Yours", "Cant Handle", "Comfort Zone",
  "Impulsive", "Love Letter", "Misbehaved", "Morning Peach", "My Necessity", "Next Level",
  "No Shame", "Nude Alert", "On Your Mind", "So Bare", "Stay The Night", "Still The One",
  "Taste Of Me", "Toxic", "Twisted Love", "Weekend Fling", "Whatever You Want", "Your Everyday"
];
const nudeXLipstickVariants = [
  "Best Of Me", "Better Off Alone", "Cant Blame You", "Casual Lover", "Get Into It", "Im Committed",
  "Keep Me Satisfied", "Miss Perfect", "Mixed Feelings", "Most Popular", "My Go To", "My Honey",
  "Never Tied Down", "Never Too Much", "On The Daily", "Sweet Tweet", "True Icon", "You Worth The Wait"
];
const woodenLipPencilVariants = [
  "UR A PEACH", "SORRY IM LATTE", "PUMPKINK", "2 TALK ABOUT", "BUTTA U UP", "BERRY ME",
  "TRUFFLE MAKER", "SHAKE IT LIKE JELLY", "DULCE A CARAMELO", "KEEP IT SAUCY", "NICE AND TOASTY",
  "UR CHERRY", "SWEET COCOA", "ME TOFFEE", "BITES LA VIDA", "MOCHA", "WINE ABOUT IT", "U HAD ME AT ESPRESSO"
];
const sealTheDealVariants = [
  "BCLP01", "BCLP02", "BCLP03", "BCLP04", "BCLP05", "BCLP06", "BCLP07", "BCLP08",
  "BCLP09", "BCLP10", "BCLP11", "BCLP12", "BCLP13", "BCLP14", "BCLP15", "BCLP16",
  "BCLP17", "BCLP18", "BCLP19", "BCLP20", "BCLP21", "BCLP22", "BCLP23", "BCLP24"
];

export const PRODUCTS_DB = [
  ...standaloneProducts,
  ...createVariantFamily({
    prefix: "mqf",
    category: "maquillaje",
    subcategory: "base",
    baseName: "Flawless Stay Matte Foundation",
    price: 325,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-base-de-maquillaje-1n-cosmetics-286420.jpg?v=1739224409&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/base-de-maquillaje",
    description: "Base liquida mate de larga duracion con niacinamida y acabado uniforme.",
    variants: matteFoundationVariants
  }),
  ...createVariantFamily({
    prefix: "mqs",
    category: "maquillaje",
    subcategory: "base",
    baseName: "Flawless Stay Base Liquida",
    price: 254,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-cosmetics-base-liquida-flawless-stay-fs1-0-271372.jpg?v=1739224576&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/base-liquida-flawless-stay",
    description: "Base liquida de cobertura construible con textura ligera y acabado natural.",
    variants: satinFoundationVariants
  }),
  ...createVariantFamily({
    prefix: "mgg",
    category: "maquillaje",
    subcategory: "primer",
    baseName: "Flawless Stay Glowy Skin Filter",
    price: 278,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/GLOW_SKIN_5_1.jpg?v=1739233014&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/flawless-stay-glowy-skin-filter",
    description: "Booster iluminador con acido hialuronico y escualano para suavizar y dar efecto filtro.",
    variants: glowySkinVariants
  }),
  ...createVariantFamily({
    prefix: "mcc",
    category: "maquillaje",
    subcategory: "corrector",
    baseName: "Flawless Stay Corrector De Color",
    price: 149,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-corrector-flawless-stay-color-cosmetics-fs-cg-695828.jpg?v=1739231930&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/corrector-flawless-stay-color-corrector",
    description: "Corrector de color para neutralizar ojeras, rojeces y zonas desiguales.",
    variants: colorCorrectorVariants
  }),
  ...createVariantFamily({
    prefix: "mrb",
    category: "maquillaje",
    subcategory: "rubor",
    baseName: "Mineralized Marble Blushes",
    price: 149,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/0640_RESIZED.jpg?v=1777417910&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/rubor-rubor-marmol-mineralizado",
    description: "Rubor marmoleado con acabado luminoso y pigmentacion modulable.",
    variants: mineralizedBlushVariants
  }),
  ...createVariantFamily({
    prefix: "mud",
    category: "maquillaje",
    subcategory: "labial",
    baseName: "Ultra Dazzle Gloss Labial",
    price: 110,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/bcc-backup-beauty-creations-ultra-dazzle-lipgloss-pretty-girl-gloss-cosmetics-bclg01-338019_a15b2737-e1ee-4bff-9ef2-e7b13194d329.jpg?v=1723583601&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/ultra-dazzle-gloss-labial",
    description: "Gloss de larga duracion con brillo intenso y textura cremosa.",
    variants: ultraDazzleVariants
  }),
  ...createVariantFamily({
    prefix: "mlc",
    category: "maquillaje",
    subcategory: "labial",
    baseName: "Labial Mate Clasico",
    price: 99,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/BCCBackup-Cosmetics-BeautyCreations-LabialMateClasicoPinkyPromise-Cosmetics-LS01-621076.png?v=1743552528&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/labial-mate-clasico",
    description: "Labial ultramate de alta pigmentacion con aplicacion precisa y comoda.",
    variants: classicMatteVariants
  }),
  ...createVariantFamily({
    prefix: "mtm",
    category: "maquillaje",
    subcategory: "labial",
    baseName: "Tease Me Labial Matte En Barra",
    price: 109,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/bcc-backup-beauty-creations-labial-en-barra-strings-attached-labial-tease-me-ltm01-675650.jpg?v=1741738521&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/tease-me-labial-en-barra",
    description: "Labial matte en barra con formula hidratante y pigmentacion construible.",
    variants: teaseMeVariants
  }),
  ...createVariantFamily({
    prefix: "mtl",
    category: "maquillaje",
    subcategory: "aceite",
    baseName: "Tinted Luxe Aceite De Labios",
    price: 159,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-cosmetics-tinted-lux-aceite-de-labios-lol07-642278.jpg?v=1739233813&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/tinted-lux-aceite-de-labios",
    description: "Aceite labial con vitamina E y color translcido para nutrir y suavizar.",
    variants: tintedLuxeVariants
  }),
  ...createVariantFamily({
    prefix: "maa",
    category: "maquillaje",
    subcategory: "aceite",
    baseName: "All About You Aceite De Labios pH",
    price: 109,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/BCCBackup-Cosmetics-BeautyCreations-AllAboutYouAceiteDeLabiospH-MyFavTopper-Gloss-LOPH01-961772.png?v=1741738585&width=600",
    productUrl: "https://beautycreationscosmetics.com.mx/products/beauty-creations-ph-lip-oil",
    description: "Aceite pH para labios con brillo suave y tono personalizado.",
    variants: allAboutYouVariants
  }),
  ...createVariantFamily({
    prefix: "mnl",
    category: "maquillaje",
    subcategory: "delineador",
    baseName: "Nude X Delineador De Labios",
    price: 99,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-cosmetics-delineador-de-labios-nude-x-nxlp08.webp?v=1739233709&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/delineador-de-labios-nude-x",
    description: "Delineador retracil mate para definir el contorno de labios con precision.",
    variants: nudeXLinerVariants
  }),
  ...createVariantFamily({
    prefix: "mnx",
    category: "maquillaje",
    subcategory: "labial",
    baseName: "Nude X Labial En Barra Matte",
    price: 109,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-cosmetics-labial-nude-x-collection-labial-en-barra-matte-nxls03-818883.jpg?v=1739233669&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/beauty-creations-labial-nude-x-collection-labial-en-barra-matte",
    description: "Labial nude matte en barra con acabado uniforme para todos los dias.",
    variants: nudeXLipstickVariants
  }),
  ...createVariantFamily({
    prefix: "mwl",
    category: "maquillaje",
    subcategory: "delineador",
    baseName: "Wooden Lip Pencils",
    price: 49,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/bcc-backup-lip-liner-beauty-creations-lapiz-de-labios-wooden-lip-pencils-bcwll-01.jpg?v=1741738517&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/beauty-creations-lapiz-de-labios-wooden-lip-pencils",
    description: "Lapiz delineador de labios de larga duracion con formula cremosa y facil de difuminar.",
    variants: woodenLipPencilVariants
  }),
  ...createVariantFamily({
    prefix: "msd",
    category: "maquillaje",
    subcategory: "labial",
    baseName: "Seal The Deal Labial Liquido Mate",
    price: 110,
    image: "https://beautycreationscosmetics.com.mx/cdn/shop/files/beauty-creations-mx-cosmetics-seal-the-deal-attractive-labial-liquido-mate-bclp18.jpg?v=1739233783&width=320",
    productUrl: "https://beautycreationscosmetics.com.mx/products/seal-the-deal-attractive-labial-liquido-mate",
    description: "Labial liquido mate de color opaco y larga duracion con acabado aterciopelado.",
    variants: sealTheDealVariants
  })
];

export const SIMULATED_STORES = [
  {
    name: "Walmart Supercenter",
    address: "Av. Venustiano Carranza 2345, SLP",
    distance: 1.2,
    lat: 22.1534,
    lng: -100.9855,
    mapsUrl: "https://maps.google.com/?q=Walmart+San+Luis+Potosi"
  },
  {
    name: "Soriana Hiper",
    address: "Blvd. del Ejercito 300, SLP",
    distance: 2.5,
    lat: 22.1421,
    lng: -100.9763,
    mapsUrl: "https://maps.google.com/?q=Soriana+San+Luis+Potosi"
  },
  {
    name: "Liverpool Plaza",
    address: "Av. Salvador Nava Martinez 3325, SLP",
    distance: 3.1,
    lat: 22.1389,
    lng: -100.9612,
    mapsUrl: "https://maps.google.com/?q=Liverpool+San+Luis+Potosi"
  },
  {
    name: "Farmacias Guadalajara",
    address: "Calle Galeana 100, SLP",
    distance: 0.8,
    lat: 22.151,
    lng: -100.9798,
    mapsUrl: "https://maps.google.com/?q=Farmacias+Guadalajara+San+Luis+Potosi"
  },
  {
    name: "Beauty Creations Partner Store",
    address: "Centro Comercial, SLP",
    distance: 1.7,
    lat: 22.1498,
    lng: -100.9821,
    mapsUrl: "https://maps.google.com/?q=Beauty+Creations+San+Luis+Potosi"
  }
];

export const FILTER_SUBCATS = {
  all: ["limpiador", "primer", "fijador", "base", "corrector", "rubor", "labial", "aceite", "delineador", "brocha"],
  skincare: ["limpiador", "primer", "fijador", "brocha"],
  maquillaje: ["base", "corrector", "rubor", "labial", "aceite", "delineador", "primer"]
};

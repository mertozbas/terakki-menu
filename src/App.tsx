import { useState, type FC } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, MapPin, Phone, Globe } from 'lucide-react';

const LOGO = '/terakki-menu/terakki-logo.png';

/* ═══════════════════════════════════════════════════════════════════════
   MENU DATA
════════════════════════════════════════════════════════════════════════ */

type Item = { name: string; description?: string; price?: string };
type Section = { category: string; note?: string; items: Item[] };

const FOOD_MENU_TR: Section[] = [
  {
    category: 'Başlangıç',
    items: [
      { name: 'Itırlı Tereyağ & Ekşi Mayalı Ekmek', price: '0 ₺' },
      { name: 'İsli Yoğurt ve Kızarmış Patron Biberi', price: '447,84 ₺' },
      { name: 'Rakılı Çıtır Ördek', description: 'Ekşi sote radika ile', price: '581,14 ₺' },
      { name: 'Izgara Ahtapot', description: 'Chimichurri soslu', price: '999,18 ₺' },
      { name: 'Portakallı Enginar', description: 'Arpacık soğan ile', price: '777,17 ₺' },
      { name: 'Pancar Carpaccio', description: 'Ricotta peyniri ile', price: '733,19 ₺' },
      { name: 'İsli Tahinli Izgara Patlıcan', price: '653,28 ₺' },
      { name: 'Şiş Karides', description: 'Izgara lime & chili mayonez', price: '892,48 ₺' },
      { name: 'Izgara Şiş Baby Kalamar', price: '892,48 ₺' },
      { name: 'Mangolu Levrek Marin', price: '810,45 ₺' },
      { name: 'Meze Trio I', description: 'Hardallı humus, girit ezme, cevizli muhammara', price: '739,58 ₺' },
      { name: 'Meze Trio II', description: 'Köpük haydari, pembe sultan, ayva reçelli süzme yoğurt', price: '739,58 ₺' },
      { name: 'Izgara Ciğer', price: '890,35 ₺' },
      { name: 'Atom Kokoreç', description: 'Avokado ile', price: '1.265,96 ₺' },
      { name: 'Yeşil Zeytinli Soğan Dolması', price: '521,25 ₺' },
      { name: 'Mersin Patates', description: 'Domuz pastırması, kıl biber ile', price: '1.170,51 ₺' },
    ],
  },
  {
    category: 'Salata',
    items: [
      { name: 'İstanbul Salata', price: '666,61 ₺' },
      { name: 'Kuru Bacon & Yedikule Salatası', price: '779,61 ₺' },
      { name: 'Çağla Yeşil Salata', price: '727,61 ₺' },
    ],
  },
  {
    category: 'Ana Yemek',
    items: [
      { name: 'Izgara Levrek', price: '1.162,85 ₺' },
      { name: 'Kuzu Sırt', description: 'Sıcak humus ve ege otları ile', price: '1.881,81 ₺' },
      { name: 'Vişne Reçelli Minekop', price: '1.111,41 ₺' },
      { name: 'Kuru Domatesli Uskumru', price: '1.162,85 ₺' },
      { name: 'Porçini Mantarlı Bonfile', price: '1.881,81 ₺' },
    ],
  },
  {
    category: 'Tatlı',
    items: [
      { name: 'Çıtır Baklava', price: '638,38 ₺' },
      { name: 'Tiramisu', price: '638,38 ₺' },
    ],
  },
];

const FOOD_MENU_EN: Section[] = [
  {
    category: 'Starters',
    items: [
      { name: 'Herb Butter & Sourdough Bread', price: '0 ₺' },
      { name: 'Smoked Yogurt with Fried Padrón Pepper', price: '447,84 ₺' },
      { name: 'Crispy Duck with Rakı', description: 'With sautéed radicchio', price: '581,14 ₺' },
      { name: 'Grilled Octopus', description: 'Chimichurri sauce', price: '999,18 ₺' },
      { name: 'Orange Artichoke', description: 'With pearl onion', price: '777,17 ₺' },
      { name: 'Beet Carpaccio', description: 'With ricotta cheese', price: '733,19 ₺' },
      { name: 'Smoked Tahini Grilled Eggplant', price: '653,28 ₺' },
      { name: 'Shrimp Skewer', description: 'Grilled with lime & chili mayo', price: '892,48 ₺' },
      { name: 'Grilled Baby Calamari Skewer', price: '892,48 ₺' },
      { name: 'Mango Marinated Sea Bass', price: '810,45 ₺' },
      { name: 'Mezze Trio I', description: 'Mustard hummus, Cretan spread, walnut muhammara', price: '739,58 ₺' },
      { name: 'Mezze Trio II', description: 'Foamy haydari, pink sultan, strained yogurt with quince jam', price: '739,58 ₺' },
      { name: 'Grilled Liver', price: '890,35 ₺' },
      { name: 'Atom Kokoreç', description: 'With avocado', price: '1.265,96 ₺' },
      { name: 'Green Olive Stuffed Onion', price: '521,25 ₺' },
      { name: 'Mersin Potato', description: 'Cured pork, hair pepper', price: '1.170,51 ₺' },
    ],
  },
  {
    category: 'Salad',
    items: [
      { name: 'Istanbul Salad', price: '666,61 ₺' },
      { name: 'Cured Bacon & Yedikule Salad', price: '779,61 ₺' },
      { name: 'Green Almond Salad', price: '727,61 ₺' },
    ],
  },
  {
    category: 'Mains',
    items: [
      { name: 'Grilled Sea Bass', price: '1.162,85 ₺' },
      { name: 'Lamb Loin', description: 'With warm hummus and Aegean herbs', price: '1.881,81 ₺' },
      { name: 'Meagre with Cherry Preserve', price: '1.111,41 ₺' },
      { name: 'Mackerel with Sun-dried Tomatoes', price: '1.162,85 ₺' },
      { name: 'Tenderloin with Porcini Mushrooms', price: '1.881,81 ₺' },
    ],
  },
  {
    category: 'Dessert',
    items: [
      { name: 'Crispy Baklava', price: '638,38 ₺' },
      { name: 'Tiramisu', price: '638,38 ₺' },
    ],
  },
];

const BAR_MENU_COMMON: Section[] = [
  {
    category: 'Kırmızı',
    note: 'Kadeh / Şişe',
    items: [
      { name: 'Ancyra Cabernet Sauvignon Syrah', price: '675 ₺ / 3.035 ₺' },
      { name: 'Urla Boğazkere', price: '4.375 ₺' },
      { name: 'Paşaeli Çalkarası', price: '5.115 ₺' },
      { name: 'Vinkara Kalecik Karası', price: '5.375 ₺' },
      { name: 'Urla Vourla', price: '1.110 ₺ / 5.535 ₺' },
      { name: 'Paşaeli Yaşlı Asma', price: '5.865 ₺' },
    ],
  },
  {
    category: 'Beyaz',
    note: 'Kadeh / Şişe',
    items: [
      { name: 'Ancyra Sauvignon Blanc', price: '675 ₺ / 3.275 ₺' },
      { name: 'Kavaklıdere Emir', price: '825 ₺ / 3.295 ₺' },
      { name: 'Kavaklıdere Misket', price: '3.295 ₺' },
      { name: 'Plato Narince', price: '3.900 ₺' },
      { name: "Sevilen Fronc de' Pied", price: '9.750 ₺' },
    ],
  },
  {
    category: 'Rose',
    note: 'Kadeh / Şişe',
    items: [
      { name: 'Ancyra Blush', price: '675 ₺ / 3.035 ₺' },
      { name: 'Smyrna Blush', price: '875 ₺ / 3.500 ₺' },
      { name: 'Sevilen Innocent Angel', price: '3.600 ₺' },
      { name: 'Urla Serendias', price: '3.950 ₺' },
    ],
  },
  {
    category: 'Single Malt',
    items: [
      { name: 'Talisker 10', price: '825 ₺' },
      { name: 'Singleton 12', price: '825 ₺' },
      { name: 'Glenlivet 12', price: '825 ₺' },
      { name: 'Lagavulin 8', price: '935 ₺' },
      { name: 'Macallan 12', price: '1.110 ₺' },
    ],
  },
  {
    category: 'Scotch',
    items: [
      { name: 'J.W. Black Label', price: '800 ₺' },
      { name: 'J.W. Double Black', price: '825 ₺' },
      { name: 'J.W. Gold Label', price: '1.000 ₺' },
      { name: 'J.W. Blue Label', price: '2.800 ₺' },
      { name: 'Chivas 18', price: '950 ₺' },
    ],
  },
  {
    category: 'Irish',
    items: [
      { name: 'Jameson', price: '790 ₺' },
      { name: 'Jameson Black Barrel', price: '825 ₺' },
    ],
  },
  {
    category: 'Bourbon',
    items: [
      { name: 'Gentleman Jack', price: '800 ₺' },
      { name: 'Woodford Reserve', price: '850 ₺' },
    ],
  },
  {
    category: 'Votka',
    items: [
      { name: 'Ketel One', price: '790 ₺' },
      { name: 'Beluga', price: '1.000 ₺' },
      { name: 'Belvedere', price: '950 ₺' },
      { name: 'Grey Goose', price: '950 ₺' },
    ],
  },
  {
    category: 'Cin',
    items: [
      { name: 'Tanqueray', price: '900 ₺' },
      { name: 'Tanqueray 10', price: '975 ₺' },
      { name: 'Gin Mare', price: '950 ₺' },
      { name: "Hendrick's", price: '990 ₺' },
      { name: 'Monkey 47', price: '950 ₺' },
      { name: 'Bombay', price: '790 ₺' },
    ],
  },
  {
    category: 'Tekila',
    items: [
      { name: 'Don Julio', price: '600 ₺' },
      { name: 'Casamigos', price: '600 ₺' },
    ],
  },
  {
    category: 'Likör (Shot)',
    items: [
      { name: 'Jägermeister', price: '440 ₺' },
      { name: 'Skinos', price: '440 ₺' },
    ],
  },
  {
    category: 'Rom',
    items: [
      { name: 'Captain Morgan White', price: '560 ₺' },
      { name: 'Captain Morgan Spiced', price: '560 ₺' },
      { name: 'Zacapa', price: '560 ₺' },
    ],
  },
  {
    category: 'Konyak',
    items: [
      { name: 'Rémy Martin VSOP', price: '1.165 ₺' },
      { name: 'Martell VS', price: '960 ₺' },
    ],
  },
  {
    category: 'Rakı',
    items: [
      { name: "Tekirdağ Altın '35", price: '2.400 ₺' },
      { name: "Tekirdağ Altın '50", price: '2.900 ₺' },
      { name: "Tekirdağ Altın '70", price: '4.050 ₺' },
      { name: "Tekirdağ Altın '100", price: '5.990 ₺' },
      { name: "Kulüp Rakı '35", price: '2.130 ₺' },
      { name: "Kulüp Rakı '70", price: '3.775 ₺' },
      { name: "Beylerbeyi '70", price: '4.335 ₺' },
      { name: "Beylerbeyi '100", price: '6.200 ₺' },
      { name: "Beylerbeyi Mavi '70", price: '4.250 ₺' },
      { name: "Beylerbeyi Teragold '35", price: '2.490 ₺' },
      { name: "Beylerbeyi Teragold '70", price: '4.475 ₺' },
      { name: "Yeni Rakı Yeni Seri '20", price: '1.325 ₺' },
      { name: "Yeni Rakı Yeni Seri '35", price: '1.925 ₺' },
      { name: "Yeni Rakı Yeni Seri '70", price: '3.750 ₺' },
    ],
  },
  {
    category: 'Şampanya',
    items: [
      { name: 'Dom Pérignon', price: '46.000 ₺' },
      { name: 'Moët', price: '11.000 ₺' },
      { name: 'Moët Rosé', price: '14.000 ₺' },
      { name: 'Moët Ice', price: '14.000 ₺' },
      { name: 'Ruffino Prosecco', price: '8.500 ₺' },
    ],
  },
];

const BAR_MENU_TR: Section[] = [
  {
    category: 'İmza Kokteyller',
    note: 'Tümü 975 ₺',
    items: [
      { name: 'Bloom', description: 'Jäger, limon suyu, yeşil elma suyu, yasemin çayı tonik' },
      { name: 'Medicine', description: 'Vodka, zencefil suyu, bal şurubu, lime suyu, sweet sour, soda' },
      { name: 'Pink Blush', description: 'Çilek, vodka, Smirnoff North, sweet sour' },
      { name: 'Terakki Flame', description: 'Tekila, aperol, passion fruit, citrus blend, chili Cardinal' },
      { name: 'Duck & Rush', description: 'Rakı, Cardinal, fesleğen, citrus blend, cin' },
    ],
  },
  {
    category: 'Dünya Klasikleri',
    note: 'Tümü 975 ₺',
    items: [
      { name: 'Negroni' },
      { name: 'Whiskey Sour' },
      { name: 'Margarita' },
      { name: 'Old Fashioned' },
      { name: 'Aperol Spritz' },
    ],
  },
  ...BAR_MENU_COMMON,
];

const BAR_MENU_EN: Section[] = [
  {
    category: 'Signature Cocktails',
    note: 'All 975 ₺',
    items: [
      { name: 'Bloom', description: 'Jäger, lemon juice, green apple juice, jasmine tea tonic' },
      { name: 'Medicine', description: 'Vodka, ginger juice, honey syrup, lime juice, sweet sour, soda' },
      { name: 'Pink Blush', description: 'Strawberry, vodka, Smirnoff North, sweet sour' },
      { name: 'Terakki Flame', description: 'Tequila, aperol, passion fruit, citrus blend, chili Cardinal' },
      { name: 'Duck & Rush', description: 'Rakı, Cardinal, basil, citrus blend, gin' },
    ],
  },
  {
    category: 'World Classics',
    note: 'All 975 ₺',
    items: [
      { name: 'Negroni' },
      { name: 'Whiskey Sour' },
      { name: 'Margarita' },
      { name: 'Old Fashioned' },
      { name: 'Aperol Spritz' },
    ],
  },
  ...BAR_MENU_COMMON.map((s) => ({
    ...s,
    category: s.category
      .replace('Kırmızı', 'Red Wine')
      .replace('Beyaz', 'White Wine')
      .replace('Rose', 'Rosé Wine')
      .replace('Cin', 'Gin')
      .replace('Votka', 'Vodka')
      .replace('Tekila', 'Tequila')
      .replace('Likör (Shot)', 'Liqueur (Shot)')
      .replace('Rom', 'Rum')
      .replace('Konyak', 'Cognac')
      .replace('Şampanya', 'Champagne'),
    note: s.note?.replace('Kadeh / Şişe', 'Glass / Bottle'),
  })),
];

type ChefMenu = { title: string; items: string[]; price: string };

const CHEF_MENUS_TR: ChefMenu[] = [
  {
    title: 'Şef Menü I',
    price: '5.181,21 ₺',
    items: [
      'Meze Trio I',
      'İsli Yoğurt ve Kızarmış Patron Biberi',
      'Portakallı Enginar (arpacık soğan ile)',
      'Izgara Şiş Baby Kalamar',
      'İstanbul Salata',
      'Izgara Levrek',
      'Çıtır Baklava / Tiramisu',
    ],
  },
  {
    title: 'Şef Menü II',
    price: '5.687,16 ₺',
    items: [
      'Meze Trio II',
      'Rakılı Çıtır Ördek (ekşi sote radika ile)',
      'Yeşil Zeytinli Soğan Dolması',
      'Izgara Ciğer',
      'İstanbul Salata',
      'Kuzu Sırtı (sıcak humus ve ege otları ile)',
      'Çıtır Baklava / Tiramisu',
    ],
  },
];

const CHEF_MENUS_EN: ChefMenu[] = [
  {
    title: "Chef's Menu I",
    price: '5.181,21 ₺',
    items: [
      'Mezze Trio I',
      'Smoked Yogurt with Fried Padrón Pepper',
      'Orange Artichoke (with pearl onion)',
      'Grilled Baby Calamari Skewer',
      'Istanbul Salad',
      'Grilled Sea Bass',
      'Crispy Baklava / Tiramisu',
    ],
  },
  {
    title: "Chef's Menu II",
    price: '5.687,16 ₺',
    items: [
      'Mezze Trio II',
      'Crispy Duck with Rakı (with sautéed radicchio)',
      'Green Olive Stuffed Onion',
      'Grilled Liver',
      'Istanbul Salad',
      'Lamb Loin (with warm hummus and Aegean herbs)',
      'Crispy Baklava / Tiramisu',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   UI TEXT
════════════════════════════════════════════════════════════════════════ */

const T = {
  tr: {
    tagline: "Ege'nin kalbinden samimi bir Alaçatı lezzeti",
    tabs: { food: 'Yemek', bar: 'Bar', chef: 'Şef Menü' },
    chef: {
      title: 'Şef Menüleri',
      subtitle: 'Şefimizden iki(2) kişilik özel seçki menüler',
      priceLabel: 'iki(2) kişi',
      badge: 'Şef Seçkisi',
    },
    footer: {
      address: 'Hacı Memiş Mah. 2012 Sokak No:12, Alaçatı / İzmir',
      phone: '+90 (232) 123 45 67',
      rights: '© 2026 Terakki Alaçatı · Tüm Hakları Saklıdır',
    },
  },
  en: {
    tagline: 'A sincere Alaçatı flavor from the heart of the Aegean',
    tabs: { food: 'Food', bar: 'Bar', chef: "Chef's Menu" },
    chef: {
      title: "Chef's Menus",
      subtitle: 'Curated tasting menus by our chef for two',
      priceLabel: 'For two',
      badge: "Chef's Selection",
    },
    footer: {
      address: 'Hacı Memiş Mah. 2012 Sokak No:12, Alaçatı / İzmir',
      phone: '+90 (232) 123 45 67',
      rights: '© 2026 Terakki Alaçatı · All Rights Reserved',
    },
  },
} as const;

type Lang = 'tr' | 'en';
type Tab = 'food' | 'bar' | 'chef';

/* ═══════════════════════════════════════════════════════════════════════
   SECTION RENDERER
════════════════════════════════════════════════════════════════════════ */

const SectionBlock: FC<{ section: Section; idx: number }> = ({ section, idx }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: Math.min(idx, 6) * 0.05, duration: 0.5 }}
    className="mb-14"
  >
    <div className="mb-6 flex items-baseline justify-between border-b border-stone-400/60 pb-3">
      <h3 className="font-serif italic text-stone-700 text-2xl tracking-wide">
        {section.category}
      </h3>
      {section.note && (
        <span className="font-serif text-stone-600 text-base tracking-wide italic">
          {section.note}
        </span>
      )}
    </div>
    <div className="space-y-5">
      {section.items.map((item, i) => (
        <div key={`${item.name}-${i}`} className="flex items-baseline gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline">
              <span className="font-serif text-stone-900 text-lg leading-snug">{item.name}</span>
              <span className="flex-1 mx-2 border-b border-dotted border-stone-300 translate-y-[-6px]" />
              {item.price && (
                <span className="font-serif text-stone-700 text-base shrink-0 tracking-wide">
                  {item.price}
                </span>
              )}
            </div>
            {item.description && (
              <p className="font-serif italic text-[14px] text-stone-500 leading-relaxed mt-1">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════════════════════ */

export default function App() {
  const [lang, setLang] = useState<Lang>('tr');
  const [tab, setTab] = useState<Tab>('food');
  const t = T[lang];
  const foodData = lang === 'tr' ? FOOD_MENU_TR : FOOD_MENU_EN;
  const barData = lang === 'tr' ? BAR_MENU_TR : BAR_MENU_EN;
  const chefData = lang === 'tr' ? CHEF_MENUS_TR : CHEF_MENUS_EN;

  return (
    <div className="min-h-screen bg-[#e9e8e3] text-stone-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#e9e8e3]/95 backdrop-blur-sm border-b border-stone-300/60">
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <img src={LOGO} alt="Terakki Alaçatı" className="h-11 w-auto object-contain" />
          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-1.5 text-[11px] tracking-[0.18em] uppercase text-stone-600 hover:text-stone-900 transition-colors border border-stone-300 px-3 py-1.5"
            aria-label="Language"
          >
            <Globe className="w-3 h-3" />
            {lang === 'tr' ? 'EN' : 'TR'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-3xl mx-auto w-full px-5 pt-10 pb-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-stone-500 text-lg tracking-wide"
        >
          {t.tagline}
        </motion.p>
        <div className="w-10 h-px bg-stone-300 mx-auto mt-5" />
      </section>

      {/* Tabs */}
      <nav className="sticky top-16 z-30 bg-[#e9e8e3]/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-5 pb-3 pt-2">
          <div className="grid grid-cols-3 border border-stone-300">
            {(['food', 'bar', 'chef'] as Tab[]).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-3 py-3 text-[10px] md:text-[11px] tracking-[0.15em] uppercase transition-all border-l first:border-l-0 border-stone-300 ${
                  tab === k
                    ? 'bg-stone-900 text-white'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                }`}
              >
                {t.tabs[k]}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-10">
        <AnimatePresence mode="wait">
          {tab === 'food' && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
            >
              {foodData.map((s, idx) => (
                <SectionBlock key={`${s.category}-${idx}`} section={s} idx={idx} />
              ))}
            </motion.div>
          )}

          {tab === 'bar' && (
            <motion.div
              key="bar"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
            >
              {barData.map((s, idx) => (
                <SectionBlock key={`${s.category}-${idx}`} section={s} idx={idx} />
              ))}
            </motion.div>
          )}

          {tab === 'chef' && (
            <motion.div
              key="chef"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-12">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3 font-sans">
                  {t.chef.badge}
                </p>
                <h2 className="font-serif italic text-4xl md:text-5xl text-stone-900 mb-4">
                  {t.chef.title}
                </h2>
                <p className="font-serif italic text-stone-500 text-base max-w-lg mx-auto leading-relaxed">
                  {t.chef.subtitle}
                </p>
                <div className="w-12 h-px bg-stone-300 mx-auto mt-6" />
              </div>

              <div className="max-w-xl mx-auto space-y-16">
                {chefData.map((menu, mIdx) => (
                  <motion.div
                    key={menu.title}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: mIdx * 0.1, duration: 0.4 }}
                  >
                    <h3 className="font-serif italic text-3xl md:text-4xl text-stone-900 mb-8 text-center">
                      {menu.title}
                    </h3>
                    <ol className="space-y-5 mb-8">
                      {menu.items.map((item, idx) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-baseline gap-4 pb-4 border-b border-stone-200"
                        >
                          <span className="font-serif italic text-stone-400 text-base shrink-0 w-6">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="font-serif text-stone-900 text-lg">{item}</span>
                        </motion.li>
                      ))}
                    </ol>

                    <div className="text-center border border-stone-300 py-7 px-6 bg-stone-100/40">
                      <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">
                        {t.chef.priceLabel}
                      </p>
                      <p className="font-serif text-3xl md:text-4xl text-stone-900">{menu.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-200 py-8 px-5 mt-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-4 text-center">
          <img src={LOGO} alt="Terakki Alaçatı" className="h-10 w-auto brightness-0 invert opacity-90" />
          <div className="flex flex-col gap-2 text-[12px] text-stone-400">
            <span className="flex items-center justify-center gap-2">
              <MapPin className="w-3.5 h-3.5" />
              {t.footer.address}
            </span>
            <span className="flex items-center justify-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              {t.footer.phone}
            </span>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mt-2">
            {t.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  );
}

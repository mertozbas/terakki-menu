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
    items: [{ name: 'Itırlı Tereyağ, Ekşi Mayalı Ekmek', price: '0 ₺' }],
  },
  {
    category: 'Paylaşımlıklar',
    items: [
      { name: 'Izgara Şiş Baby Kalamar', price: '817,18 ₺' },
      { name: 'Izgara Ahtapot', description: 'Chimichurri soslu', price: '888,34 ₺' },
      { name: 'Atom Kokoreç', description: 'Avokado ile', price: '951,19 ₺' },
      { name: 'Izgara Ciğer', price: '798,45 ₺' },
      { name: 'Dana Carpaccio', description: 'Zencefilli mayonez ve kızarmış kapari', price: '976,06 ₺' },
      { name: 'Şiş Karides Izgara', description: 'Lime chili mayo', price: '791,84 ₺' },
      { name: 'Portakallı Enginar ve Arpacık Soğan', price: '668,48 ₺' },
      { name: 'Meze Trio', description: 'Hardallı humus, girit ezme, muhammara ceviz reçeli', price: '681,19 ₺' },
      { name: 'Meze Trio', description: 'Köpük haydari, pembe sultan, ayva reçelli süzme yoğurt', price: '681,19 ₺' },
      { name: 'Rakılı Çıtır Ördek, Ekşi Sote Radika', price: '543,12 ₺' },
      { name: 'Mersin Patates, Domuz Pastırma, Kıl Biber', price: '999,99 ₺' },
      { name: 'İsli Yoğurt, Kızarmış Patron Biber', price: '392,71 ₺' },
      { name: 'Yeşil Zeytinli Soğan Dolması', price: '437,28 ₺' },
    ],
  },
  {
    category: 'Salata',
    items: [
      { name: 'İstanbul Salata', price: '589,12 ₺' },
      { name: 'Enginarlı ve Meyveli Semizotu Salata', price: '611,07 ₺' },
      { name: 'Kuru Bacon Yedikule Salata', price: '779,61 ₺' },
    ],
  },
  {
    category: 'Ana Yemekler',
    items: [
      { name: 'Porçini Mantarlı Bonfile', price: '1.881,81 ₺' },
      { name: 'Şiş Barbun', price: '1.414,14 ₺' },
      { name: 'Vişne Reçeli Minekop', price: '1.111,41 ₺' },
      { name: 'Çift Soslu Levrek', price: '1.162,85 ₺' },
      { name: 'Sıcak Humus, Ege Otları ve Kuzu Sırtı', price: '1.881,81 ₺' },
    ],
  },
  {
    category: 'Tatlı',
    items: [
      { name: 'Tiramisu', price: '517,95 ₺' },
      { name: 'Çıtır Baklava', price: '517,95 ₺' },
    ],
  },
];

const FOOD_MENU_EN: Section[] = [
  {
    category: 'Starters',
    items: [{ name: 'Herb Butter, Sourdough Bread', price: '0 ₺' }],
  },
  {
    category: 'To Share',
    items: [
      { name: 'Grilled Baby Calamari Skewer', price: '817,18 ₺' },
      { name: 'Grilled Octopus', description: 'Chimichurri sauce', price: '888,34 ₺' },
      { name: 'Atom Kokoreç', description: 'With avocado', price: '951,19 ₺' },
      { name: 'Grilled Liver', price: '798,45 ₺' },
      { name: 'Beef Carpaccio', description: 'Ginger mayonnaise and fried capers', price: '976,06 ₺' },
      { name: 'Grilled Prawn Skewer', description: 'Lime chili mayo', price: '791,84 ₺' },
      { name: 'Orange Artichoke and Pearl Onion', price: '668,48 ₺' },
      { name: 'Mezze Trio', description: 'Mustard hummus, Cretan spread, muhammara with walnut jam', price: '681,19 ₺' },
      { name: 'Mezze Trio', description: 'Foamy haydari, pink sultan, strained yoghurt with quince jam', price: '681,19 ₺' },
      { name: 'Crispy Duck with Rakı, Sautéed Radicchio', price: '543,12 ₺' },
      { name: 'Mersin Potato, Cured Pork, Hair Pepper', price: '999,99 ₺' },
      { name: 'Smoked Yoghurt, Fried Padrón Pepper', price: '392,71 ₺' },
      { name: 'Green Olive Stuffed Onion', price: '437,28 ₺' },
    ],
  },
  {
    category: 'Salad',
    items: [
      { name: 'Istanbul Salad', price: '589,12 ₺' },
      { name: 'Purslane Salad with Artichoke and Fruit', price: '611,07 ₺' },
      { name: 'Cured Bacon Yedikule Salad', price: '779,61 ₺' },
    ],
  },
  {
    category: 'Mains',
    items: [
      { name: 'Tenderloin with Porcini Mushrooms', price: '1.881,81 ₺' },
      { name: 'Red Mullet Skewer', price: '1.414,14 ₺' },
      { name: 'Meagre with Cherry Preserve', price: '1.111,41 ₺' },
      { name: 'Sea Bass with Double Sauce', price: '1.162,85 ₺' },
      { name: 'Warm Hummus, Aegean Herbs and Lamb Loin', price: '1.881,81 ₺' },
    ],
  },
  {
    category: 'Dessert',
    items: [
      { name: 'Tiramisu', price: '517,95 ₺' },
      { name: 'Crispy Baklava', price: '517,95 ₺' },
    ],
  },
];

const BAR_MENU_COMMON: Section[] = [
  {
    category: 'Kırmızı Şarap — Kadeh',
    items: [
      { name: 'Ancyra Cabernet Sauvignon', price: '650 ₺' },
      { name: 'Urla Tempus', price: '950 ₺' },
      { name: 'Urla Boğazkere', price: '850 ₺' },
      { name: 'Vinkara Kalecik Karası', price: '1.050 ₺' },
      { name: 'Paşaeli Yaşlı Asma', price: '1.050 ₺' },
      { name: 'Paşaeli Çalkarası', price: '950 ₺' },
    ],
  },
  {
    category: 'Beyaz Şarap — Kadeh',
    items: [
      { name: 'İsabey Chardonnay', price: '770 ₺' },
      { name: 'Ancyra Sauvignon Blanc', price: '650 ₺' },
      { name: 'Plato Narince', price: '795 ₺' },
      { name: 'Kavaklıdere Emir', price: '770 ₺' },
    ],
  },
  {
    category: 'Rose Şarap — Kadeh',
    items: [
      { name: 'Urla Serendias', price: '725 ₺' },
      { name: 'Vinkara Minoj', price: '650 ₺' },
    ],
  },
  {
    category: 'Kırmızı Şarap — Şişe',
    items: [
      { name: 'Ancyra Cabernet Sauvignon', price: '2.950 ₺' },
      { name: 'Urla Boğazkere', price: '4.250 ₺' },
      { name: 'Urla Tempus', price: '4.950 ₺' },
      { name: 'Vinkara Kalecik Karası', price: '5.250 ₺' },
      { name: 'Paşaeli Yaşlı Asma', price: '5.750 ₺' },
      { name: 'Paşaeli Çalkarası', price: '4.950 ₺' },
    ],
  },
  {
    category: 'Beyaz Şarap — Şişe',
    items: [
      { name: 'İsabey Chardonnay', price: '3.250 ₺' },
      { name: 'Ancyra Sauvignon Blanc', price: '3.150 ₺' },
      { name: 'Plato Narince', price: '3.600 ₺' },
      { name: 'Sevilen Froncde', price: '9.750 ₺' },
      { name: 'Kavaklıdere Emir', price: '3.250 ₺' },
      { name: 'Kavaklıdere Misket', price: '3.250 ₺' },
    ],
  },
  {
    category: 'Rose Şarap — Şişe',
    items: [
      { name: 'Urla Serendias', price: '3.250 ₺' },
      { name: 'Vinkara Minoj', price: '2.750 ₺' },
      { name: 'Sevilen Innocent', price: '3.300 ₺' },
    ],
  },
  {
    category: 'Rakı',
    items: [
      { name: 'Tekirdağ Altın 35cl', price: '2.100 ₺' },
      { name: 'Tekirdağ Altın 70cl', price: '3.850 ₺' },
      { name: 'Tekirdağ Altın 100cl', price: '5.290 ₺' },
      { name: 'Kulüp Rakı 35cl', price: '1.980 ₺' },
      { name: 'Kulüp Rakı 70cl', price: '3.585 ₺' },
      { name: 'Beylerbeyi 70cl', price: '3.985 ₺' },
      { name: 'Beylerbeyi 100cl', price: '5.780 ₺' },
      { name: 'Beylerbeyi Mavi 70cl', price: '3.870 ₺' },
      { name: 'Beylerbeyi Teragold 35cl', price: '2.240 ₺' },
      { name: 'Beylerbeyi Teragold 70cl', price: '3.980 ₺' },
      { name: 'Yeni Rakı Yeni Seri 20cl', price: '1.200 ₺' },
      { name: 'Yeni Rakı Yeni Seri 35cl', price: '1.850 ₺' },
      { name: 'Yeni Rakı Yeni Seri 70cl', price: '3.480 ₺' },
    ],
  },
  {
    category: 'Bourbon',
    items: [
      { name: 'Jack Daniels', price: '725 ₺' },
      { name: 'Gentleman Jack', price: '750 ₺' },
    ],
  },
  {
    category: 'Scotch Blended',
    items: [
      { name: 'Chivas 18', price: '1.100 ₺' },
      { name: 'J.W Blue Label', price: '2.800 ₺' },
      { name: 'J.W Gold Label', price: '750 ₺' },
      { name: 'J.W Double Black', price: '725 ₺' },
      { name: 'J.W Black Label', price: '730 ₺' },
    ],
  },
  {
    category: 'Single Malt',
    items: [
      { name: 'Ardbeg 12', price: '950 ₺' },
      { name: 'Oban 14', price: '850 ₺' },
      { name: 'Macallan', price: '1.750 ₺' },
      { name: 'Lagavulin', price: '950 ₺' },
      { name: 'Glenlivet', price: '950 ₺' },
      { name: 'Aberlour', price: '950 ₺' },
      { name: 'Singleton', price: '725 ₺' },
      { name: 'Talisker', price: '825 ₺' },
    ],
  },
  {
    category: 'Cin',
    items: [
      { name: 'Bombay', price: '790 ₺' },
      { name: 'Monkey 47', price: '825 ₺' },
      { name: 'Hendricks', price: '825 ₺' },
      { name: 'Gin Mare', price: '950 ₺' },
      { name: 'Tanqueray 10', price: '825 ₺' },
      { name: 'Tanqueray', price: '725 ₺' },
    ],
  },
  {
    category: 'Votka',
    items: [
      { name: 'Grey Goose', price: '830 ₺' },
      { name: 'Belvedere', price: '825 ₺' },
      { name: 'Beluga', price: '850 ₺' },
      { name: 'Ketel One', price: '725 ₺' },
    ],
  },
  {
    category: 'Tekila',
    items: [
      { name: 'Casamigos Mezcal', price: '625 ₺' },
      { name: 'Casamigos Reposado', price: '595 ₺' },
      { name: 'Casamigos Blanco', price: '577 ₺' },
      { name: 'Don Julio', price: '650 ₺' },
    ],
  },
  {
    category: 'Rom',
    items: [
      { name: 'Spiced', price: '495 ₺' },
      { name: 'Captain', price: '495 ₺' },
    ],
  },
  {
    category: 'Konyak',
    items: [
      { name: 'Hennessy X.O', price: '1.650 ₺' },
      { name: 'Martell V.S', price: '895 ₺' },
      { name: 'Rémy Martin V.S.O.P', price: '1.100 ₺' },
    ],
  },
  {
    category: 'Shots',
    items: [
      { name: 'Jameson Black Barrel', price: '725 ₺' },
      { name: 'Jameson', price: '550 ₺' },
      { name: 'Mezcal Casamigos', price: '625 ₺' },
      { name: 'Reposado Casamigos', price: '595 ₺' },
      { name: 'Casamigos', price: '577 ₺' },
      { name: 'Don Julio', price: '650 ₺' },
    ],
  },
  {
    category: 'Şampanya',
    items: [
      { name: 'Ruffino', price: '1.150 ₺' },
      { name: 'Moët Ice', price: '11.000 ₺' },
      { name: 'Moët Rose', price: '12.500 ₺' },
      { name: 'Moët', price: '9.000 ₺' },
      { name: 'Dom Pérignon', price: '42.000 ₺' },
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
      .replace('Kırmızı Şarap — Kadeh', 'Red Wine — Glass')
      .replace('Beyaz Şarap — Kadeh', 'White Wine — Glass')
      .replace('Rose Şarap — Kadeh', 'Rosé Wine — Glass')
      .replace('Kırmızı Şarap — Şişe', 'Red Wine — Bottle')
      .replace('Beyaz Şarap — Şişe', 'White Wine — Bottle')
      .replace('Rose Şarap — Şişe', 'Rosé Wine — Bottle')
      .replace('Rakı', 'Rakı')
      .replace('Cin', 'Gin')
      .replace('Votka', 'Vodka')
      .replace('Tekila', 'Tequila')
      .replace('Rom', 'Rum')
      .replace('Konyak', 'Cognac')
      .replace('Şampanya', 'Champagne'),
  })),
];

const OT_FESTIVAL_TR: Item[] = [
  { name: 'Domatesli Izgara Uskumru' },
  { name: 'Dere Otlu Mücver' },
  { name: 'İsli Tahinli Izgara Patlıcan' },
  { name: 'Mangolu Levrek Marin' },
  { name: 'Otlu Enginar Dolması' },
  { name: 'Pancar Carpaccio' },
  { name: 'Sıcak Ege Otları' },
];

const OT_FESTIVAL_EN: Item[] = [
  { name: 'Grilled Mackerel with Tomato' },
  { name: 'Dill Mücver (Zucchini Fritters)' },
  { name: 'Smoked Tahini Grilled Aubergine' },
  { name: 'Mango Marinated Sea Bass' },
  { name: 'Herbed Stuffed Artichoke' },
  { name: 'Beetroot Carpaccio' },
  { name: 'Warm Aegean Herbs' },
];

/* ═══════════════════════════════════════════════════════════════════════
   UI TEXT
════════════════════════════════════════════════════════════════════════ */

const T = {
  tr: {
    tagline: "Ege'nin kalbinden samimi bir Alaçatı lezzeti",
    tabs: { food: 'Yemek', bar: 'Bar', festival: 'Ot Festivali' },
    festival: {
      title: 'Ot Festivali Şef Menü',
      subtitle: 'Şefimizden mevsimin en taze otlarıyla hazırlanmış özel menü',
      priceLabel: 'Iki(2) kişi',
      price: '4.287,13 ₺',
      badge: 'Özel Etkinlik',
    },
    footer: {
      address: 'Hacı Memiş Mah. 2012 Sokak No:12, Alaçatı / İzmir',
      phone: '+90 (232) 123 45 67',
      rights: '© 2026 Terakki Alaçatı · Tüm Hakları Saklıdır',
    },
  },
  en: {
    tagline: 'A sincere Alaçatı flavour from the heart of the Aegean',
    tabs: { food: 'Food', bar: 'Bar', festival: 'Herb Festival' },
    festival: {
      title: "Herb Festival Chef's Menu",
      subtitle: 'A special menu by our chef with the freshest herbs of the season',
      priceLabel: 'For two',
      price: '4.287,13 ₺',
      badge: 'Special Event',
    },
    footer: {
      address: 'Hacı Memiş Mah. 2012 Sokak No:12, Alaçatı / İzmir',
      phone: '+90 (232) 123 45 67',
      rights: '© 2026 Terakki Alaçatı · All Rights Reserved',
    },
  },
} as const;

type Lang = 'tr' | 'en';
type Tab = 'food' | 'bar' | 'festival';

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
  const festivalData = lang === 'tr' ? OT_FESTIVAL_TR : OT_FESTIVAL_EN;

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
            {(['food', 'bar', 'festival'] as Tab[]).map((k) => (
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

          {tab === 'festival' && (
            <motion.div
              key="festival"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35 }}
            >
              <div className="text-center mb-10">
                <p className="text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-3 font-sans">
                  {t.festival.badge}
                </p>
                <h2 className="font-serif italic text-4xl md:text-5xl text-stone-900 mb-4">
                  {t.festival.title}
                </h2>
                <p className="font-serif italic text-stone-500 text-base max-w-lg mx-auto leading-relaxed">
                  {t.festival.subtitle}
                </p>
                <div className="w-12 h-px bg-stone-300 mx-auto mt-6" />
              </div>

              <div className="max-w-xl mx-auto">
                <ol className="space-y-6 mb-10">
                  {festivalData.map((item, idx) => (
                    <motion.li
                      key={item.name}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06 }}
                      className="flex items-baseline gap-4 pb-4 border-b border-stone-200"
                    >
                      <span className="font-serif italic text-stone-400 text-base shrink-0 w-6">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="font-serif text-stone-900 text-lg">{item.name}</span>
                    </motion.li>
                  ))}
                </ol>

                <div className="text-center border border-stone-300 py-8 px-6 bg-stone-100/40">
                  <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-stone-400 mb-2">
                    {t.festival.priceLabel}
                  </p>
                  <p className="font-serif text-4xl text-stone-900">{t.festival.price}</p>
                </div>
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

(function () {
  'use strict';

  var STORE_KEY = 'life-goals:state';
  var FILTERS_KEY = 'life-goals:filters';

  var GLYPHS = {
    mountain: '<path d="M2.5 20 L9.5 7 L13 13 L16 8.5 L21.5 20 Z" fill="currentColor"/>' +
      '<path d="M7.9 10 L9.5 7 L11.2 10.2" fill="none" stroke="rgba(255,255,255,.75)" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/>',
    ladder: '<path d="M8 3 V21 M16 3 V21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
      '<path d="M8 7.5 H16 M8 12 H16 M8 16.5 H16" stroke="currentColor" stroke-width="1.8" fill="none"/>',
    sky: '<path d="M3.5 11 A8.5 8.5 0 0 1 20.5 11 Z" fill="currentColor"/>' +
      '<path d="M3.8 11 L12 18.6 L20.2 11 M9 11 L12 18.6 L15 11" fill="none" stroke="currentColor" stroke-width="1.3"/>' +
      '<circle cx="12" cy="20" r="1.7" fill="currentColor"/>',
    water: '<path d="M2.5 9.5 q2.4 -2.6 4.75 0 t4.75 0 t4.75 0 t4.75 0 M2.5 15 q2.4 -2.6 4.75 0 t4.75 0 t4.75 0 t4.75 0" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>',
    road: '<path d="M8.5 3 L6 21 M15.5 3 L18 21" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/>' +
      '<path d="M7.6 7.5 H16.4 M7 12 H17 M6.4 16.5 H17.6" stroke="currentColor" stroke-width="1.7" fill="none"/>',
    moto: '<circle cx="6" cy="16" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="18" cy="16" r="3.6" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<path d="M6 16 L10 9.5 H14 L18 16 M12.2 9.5 L13.6 6.5 H16.2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round" stroke-linecap="round"/>',
    endurance: '<path d="M8 2.5 L12 9 L16 2.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/>' +
      '<circle cx="12" cy="15.2" r="5.6" fill="currentColor"/>',
    travel: '<circle cx="12" cy="12" r="8.6" fill="none" stroke="currentColor" stroke-width="1.9"/>' +
      '<ellipse cx="12" cy="12" rx="3.6" ry="8.6" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
      '<path d="M3.8 9 H20.2 M3.8 15 H20.2" stroke="currentColor" stroke-width="1.5"/>',
    donor: '<path d="M12 3 C12 3 5.5 10.5 5.5 14.8 A6.5 6.5 0 0 0 18.5 14.8 C18.5 10.5 12 3 12 3 Z" fill="currentColor"/>',
    status: '<path d="M12 3.2 L14.6 8.8 L20.7 9.5 L16.2 13.6 L17.4 19.6 L12 16.6 L6.6 19.6 L7.8 13.6 L3.3 9.5 L9.4 8.8 Z" fill="currentColor"/>',
    home: '<path d="M3.5 11.5 L12 4.5 L20.5 11.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round" stroke-linecap="round"/>' +
      '<path d="M6 10.5 V20 H18 V10.5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linejoin="round"/>' +
      '<path d="M10 20 V15 H14 V20" fill="none" stroke="currentColor" stroke-width="1.7"/>',
    whale: '<path d="M12 13.2 C10.4 9.6 7 7.6 2.6 7.8 C4.6 9.3 6.4 11.4 7.4 13.9 C8.9 12.9 10.5 12.9 12 13.2 C13.5 12.9 15.1 12.9 16.6 13.9 C17.6 11.4 19.4 9.3 21.4 7.8 C17 7.6 13.6 9.6 12 13.2 Z" fill="currentColor"/>' +
      '<path d="M12 13 V17.5" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>' +
      '<path d="M3 20.5 q2.25 -2 4.5 0 t4.5 0 t4.5 0 t4.5 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    aurora: '<path d="M2.5 8.5 C6 5 9 10.5 12 7 C15 3.5 18 9 21.5 5.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M5 9.5 V15.5 M8.5 10 V17 M12 9 V16.5 M15.5 7.5 V14.5 M19 8.5 V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity=".7"/>' +
      '<path d="M2.5 21 L7 18 L10 19.8 L14 17 L17 19 L21.5 16.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>',
    license: '<rect x="2.8" y="5.5" width="18.4" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/>' +
      '<rect x="5.6" y="8.6" width="4.6" height="5.8" rx="0.8" fill="currentColor"/>' +
      '<path d="M12.8 9.6 H18.2 M12.8 12.2 H18.2 M12.8 14.8 H16.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    tractor: '<circle cx="7.5" cy="16" r="4.3" fill="none" stroke="currentColor" stroke-width="2"/>' +
      '<circle cx="7.5" cy="16" r="1.2" fill="currentColor"/>' +
      '<circle cx="18.2" cy="17.6" r="2.5" fill="none" stroke="currentColor" stroke-width="1.9"/>' +
      '<path d="M4.6 12 V4.8 H10.8 L12.3 11.6 H20.6 V15.4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/>' +
      '<path d="M16.4 11.6 V7.8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    truck: '<rect x="4.4" y="6.6" width="9.6" height="8.8" rx="1" fill="currentColor"/>' +
      '<path d="M14.8 9 H18.4 L21.6 12.4 V15.4 H14.8 Z" fill="currentColor"/>' +
      '<circle cx="8" cy="17.8" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/>' +
      '<circle cx="17.8" cy="17.8" r="2" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    semi: '<rect x="1.4" y="6.4" width="13.4" height="8.4" rx="0.8" fill="currentColor"/>' +
      '<path d="M15.9 9 H19.3 L22.6 12.4 V14.8 H15.9 Z" fill="currentColor"/>' +
      '<circle cx="4.5" cy="17.2" r="1.7" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<circle cx="8.6" cy="17.2" r="1.7" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<circle cx="19.4" cy="17.2" r="1.7" fill="none" stroke="currentColor" stroke-width="1.6"/>',
    boat: '<path d="M2.5 13.2 H21.2 L18.6 17.4 H5.6 Z" fill="currentColor"/>' +
      '<path d="M7.8 13.2 V9.4 H13.6 L15.8 13.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>' +
      '<path d="M2.5 20.6 q2.25 -1.8 4.5 0 t4.5 0 t4.5 0 t4.5 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    volcano: '<path d="M2.8 20.6 L9.3 10 H14.7 L21.2 20.6 Z" fill="currentColor"/>' +
      '<path d="M9.3 10 L10.7 12.1 L12 10.9 L13.3 12.1 L14.7 10" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="1.3" stroke-linejoin="round"/>' +
      '<path d="M10.8 7.6 C9.4 6.6 10.2 4.5 12.1 4.9 C12.8 3.1 15.7 3.4 15.6 5.5 C17.1 5.5 17.4 7.5 15.9 7.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    raft: '<rect x="3" y="11.4" width="18" height="4.6" rx="2.3" fill="currentColor"/>' +
      '<path d="M16.4 4.6 L11.4 14.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path d="M16 2.9 L18.6 4.2 L17.6 6.8 L15.1 5.6 Z" fill="currentColor"/>' +
      '<path d="M2.5 20.4 q2.25 -1.8 4.5 0 t4.5 0 t4.5 0 t4.5 0" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    shark: '<path d="M4.5 15.8 C7.8 15 10.6 10.4 11.8 4.4 C13.4 8.8 15.9 12.9 19.5 15.8 Z" fill="currentColor"/>' +
      '<path d="M2.5 19.6 q2.25 -1.8 4.5 0 t4.5 0 t4.5 0 t4.5 0" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
    safari: '<circle cx="18.2" cy="4.9" r="2.1" fill="currentColor"/>' +
      '<path d="M2.8 10.4 C6.5 7.6 17.5 7.6 21.2 10.4 C17.4 12 6.6 12 2.8 10.4 Z" fill="currentColor"/>' +
      '<path d="M12 11.4 V20.2 M12 15.2 L8.2 11.6 M12 13.8 L15.6 11.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
      '<path d="M3 20.6 H21" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>',
    custom: '<path d="M6 21 V3.5" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>' +
      '<path d="M6.5 4 H18 L15.5 8 L18 12 H6.5 Z" fill="currentColor"/>'
  };

  var ENAMEL = {
    mountain: 'cobalt', ladder: 'cobalt', sky: 'sky', water: 'teal', road: 'ruby', moto: 'ruby',
    endurance: 'pine', travel: 'night', donor: 'ruby', status: 'brass', home: 'walnut', custom: 'night',
    whale: 'teal', aurora: 'pine', license: 'night', tractor: 'walnut', truck: 'cobalt', semi: 'cobalt', boat: 'teal', volcano: 'ruby', raft: 'teal', shark: 'night', safari: 'walnut'
  };

  var MONTHS = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

  var SIZES = [
    { id: 'quick', label: 'За день-два' },
    { id: 'week', label: 'До недели' },
    { id: 'twoweeks', label: 'Около двух недель' },
    { id: 'long', label: 'Три недели и больше' },
    { id: 'ongoing', label: 'Постепенно' }
  ];

  var CATS = [
    { id: 'mountains', title: 'Горы', glyph: 'mountain', enamel: 'cobalt' },
    { id: 'sky', title: 'Небо', glyph: 'aurora', enamel: 'sky' },
    { id: 'water', title: 'Вода', glyph: 'water', enamel: 'teal' },
    { id: 'roads', title: 'Дороги и страны', glyph: 'road', enamel: 'ruby' },
    { id: 'licenses', title: 'Права', glyph: 'license', enamel: 'night' },
    { id: 'endurance', title: 'Выносливость', glyph: 'endurance', enamel: 'pine' },
    { id: 'life', title: 'Не про спорт', glyph: 'donor', enamel: 'ruby' }
  ];

  var DONE = [
    { id: 'd-run10', label: 'Пробежал 10\u00a0км', num: '10', unit: 'км', pin: 'endurance' },
    { id: 'd-run21', label: 'Пробежал 21,1\u00a0км', num: '21,1', unit: 'км', pin: 'endurance' },
    { id: 'd-alt', label: '5100\u00a0м на Эльбрусе', num: '5100', unit: 'м', pin: 'mountain' },
    { id: 'd-ferrata', label: 'Via ferrata в Китае', pin: 'ladder' },
    { id: 'd-sky', label: 'Прыжок с парашютом', pin: 'sky' }
  ];

  var MILESTONES = [
    { key: 'countries', goal: 'countries', step: 5, target: 30, unit: 'стран', pin: 'travel' },
    { key: 'donations', goal: 'donor', step: 5, target: 40, unit: 'донаций', pin: 'donor',
      finalLabel: 'Почётный донор', finalPin: 'status' }
  ];

  function milestoneFor(itemId) {
    for (var i = 0; i < MILESTONES.length; i += 1) {
      if (MILESTONES[i].goal === itemId) return MILESTONES[i];
    }
    return null;
  }

  var ITEMS = [
    { id: 'elbrus', group: 'mountains', pin: 'mountain', title: 'Эльбрус, 5642 м', short: 'Эльбрус', size: 'twoweeks', months: [7],
      booked: 'Забронировано на 4 июля 2027', budget: [30, 60], note: 'Тур оплачен, сумма — на дорогу, страховку и прокат.' },
    { id: 'kazbek', group: 'mountains', pin: 'mountain', title: 'Казбек', short: 'Казбек', size: 'twoweeks', months: [7, 8, 9],
      budget: [120, 170], note: 'Технически сложнее Эльбруса: ледник с трещинами, ходят в связке. Логично после альпсборов.' },
    { id: 'kili', group: 'mountains', pin: 'mountain', title: 'Килиманджаро, 5895 м', short: 'Килиманджаро', size: 'twoweeks', months: [1, 2, 6, 7, 8, 9, 10],
      budget: [330, 420], note: 'Без технических участков. В январе–феврале за одну поездку в Танзанию можно закрыть ещё сафари и акул у острова Мафия.' },
    { id: 'volcano', group: 'mountains', pin: 'volcano', title: 'Побывать на действующем вулкане', short: 'Вулкан', size: 'quick',
      seasons: [{ label: 'Индонезия', months: [4, 5, 6, 7, 8, 9, 10] }, { label: 'Камчатка', months: [7, 8, 9] }],
      budget: [3, 6], note: 'На Яве — кратер Иджен с голубым пламенем: его видно только ночью, подъём 2–3 часа, идти лучше с гидом из-за газов. На Камчатке — Авачинский или Горелый. Бюджет — сам выход, если ты уже на месте. Эльбрус, Казбек и Килиманджаро — тоже вулканы, только спящие.' },
    { id: 'ebc', group: 'mountains', pin: 'mountain', title: 'Трек к базовому лагерю Эвереста', short: 'Базовый лагерь Эвереста', size: 'twoweeks', months: [3, 4, 5, 10, 11],
      budget: [200, 300], note: 'Две недели пешком по Непалу, до 5364 м.' },
    { id: 'np1', group: 'mountains', pin: 'status', title: 'Альпсборы НП-1', short: 'Альпинист России', size: 'twoweeks', months: [6, 7, 8],
      budget: [80, 120], badge: 'значок «Альпинист России»', note: '10 дней в альплагере. На Кавказе — летом, в Актру на Алтае — круглый год.' },
    { id: 'tourism', group: 'mountains', pin: 'status', title: 'Разряд по спортивному туризму', short: 'Разряд по туризму', size: 'twoweeks', months: [6, 7, 8, 9],
      badge: 'спортивный разряд', note: 'Поход 1-й категории — от 6 дней и 100 км, заявленный через маршрутно-квалификационную комиссию.' },
    { id: 'lenin', group: 'mountains', pin: 'mountain', title: 'Пик Ленина, 7134 м', short: 'Пик Ленина', size: 'long', months: [7, 8],
      budget: [400, 650], note: 'После Эльбруса и опыта на леднике. Экспедиция ~300–450 тыс ₽ плюс высотная экипировка, до вершины доходят не все.' },


    { id: 'aurora', group: 'sky', pin: 'aurora', title: 'Увидеть северное сияние', short: 'Северное сияние', size: 'week', months: [9, 10, 11, 12, 1, 2, 3],
      budget: [40, 80], note: 'Ближе всего — Мурманск и Териберка. С мая по август не увидеть: светлые ночи. Охота на сияние стоит 3–5 тыс ₽ за выезд; бери 3–4 ночи, чтобы переждать облачность.' },

    { id: 'whales', group: 'water', pin: 'whale', title: 'Увидеть китов', short: 'Киты', size: 'quick',
      seasons: [{ label: 'Шри-Ланка', months: [11, 12, 1, 2, 3, 4] }, { label: 'Териберка', months: [4, 5, 6, 7, 8, 9] }],
      budget: [5, 6], note: 'На юге Шри-Ланки лодки выходят из Мириссы около 6:30 и возвращаются к полудню — успеваешь до созвонов. В Териберке киты непредсказуемы, но в конце лета и сентябре там бывают и киты, и первое сияние.' },
    { id: 'surf', group: 'water', pin: 'water', title: 'Встать на доску', short: 'Сёрф', size: 'week', months: [11, 12, 1, 2, 3, 4],
      budget: [10, 10], note: 'Юг Шри-Ланки, 4–5 уроков.' },
    { id: 'sharks', group: 'water', pin: 'shark', title: 'Поплавать с акулами', short: 'Акулы', size: 'quick',
      seasons: [{ label: 'Мальдивы', months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }, { label: 'Мафия, Танзания', months: [10, 11, 12, 1, 2] }],
      budget: [5, 15], note: 'Сертификат не нужен: к китовым акулам плавают с маской. На юге атолла Ари на Мальдивах они держатся круглый год, больше всего — с декабря по апрель. У острова Мафия пик — с середины декабря до конца января. Бюджет — сама вылазка.' },
    { id: 'rafting', group: 'water', pin: 'raft', title: 'Рафтинг', short: 'Рафтинг', size: 'quick',
      budget: [2, 5], note: 'Китулгала на Шри-Ланке: пороги 2–3 категории на 5 км, лучше с мая по декабрь, но сплавляются круглый год. Ближе к дому — полуторачасовой сплав по Мзымте у Красной Поляны. Многодневная версия — Алтай.' },
    { id: 'iko', group: 'water', pin: 'water', title: 'Кайтсёрфинг с карточкой IKO', short: 'Кайт IKO', size: 'week', months: [12, 1, 2, 3],
      budget: [35, 45], badge: 'карточка IKO', note: 'Калпития на Шри-Ланке. Ветер поднимается к обеду, в окно созвонов, так что на выходные или в отпуск.' },
    { id: 'iyt', group: 'water', pin: 'water', title: 'Шкипер IYT Bareboat', short: 'Шкипер IYT', size: 'twoweeks',
      budget: [200, 260], badge: 'сертификат шкипера', note: 'Даёт право брать яхту до 24 м в чартер. В Мармарисе — 14 дней от €1 600, на Пхукете есть 10-дневный курс.' },
    { id: 'msd', group: 'water', pin: 'water', title: 'PADI Master Scuba Diver', short: 'Master Scuba Diver', size: 'ongoing',
      badge: 'Master Scuba Diver', note: 'Rescue, пять специализаций и 50 погружений — набирается поездками.' },

    { id: 'enduro', group: 'roads', pin: 'moto', title: 'Эндуро-тур', short: 'Эндуро', size: 'quick', months: [5, 6, 7, 8, 9, 10],
      budget: [10, 25], note: 'В эндуро часто падают, так что не ставь его за пару месяцев до восхождений.' },
    { id: 'ironore', group: 'roads', pin: 'road', title: 'Рудный поезд в Мавритании', short: 'Рудный поезд', size: 'week', months: [11, 12, 1, 2, 3],
      budget: [70, 120], note: 'Можно совместить с Марокко. К апрелю в Сахаре уже жарко.' },
    { id: 'transsib', group: 'roads', pin: 'road', title: 'Транссиб до Владивостока', short: 'Транссиб', size: 'twoweeks',
      budget: [130, 190], note: 'Отрезками с ночёвками в городах, а не шесть суток подряд. Зимой можно совместить с Байкалом.' },
    { id: 'baikal', group: 'roads', pin: 'travel', title: 'Поход по льду Байкала', short: 'Лёд Байкала', size: 'week', months: [2, 3],
      budget: [100, 150], note: 'Лёд самый прозрачный с начала февраля до середины марта. Вместе с Транссибом выйдет дешевле.' },
    { id: 'safari', group: 'roads', pin: 'safari', title: 'Сафари в Африке', short: 'Сафари', size: 'week',
      seasons: [{ label: 'Танзания', months: [1, 2, 6, 7, 8, 9, 10] }],
      budget: [140, 250], note: 'Лучше всего в сухой сезон, с июня по октябрь, или в январе–феврале, когда в Серенгети рождаются детёныши антилоп гну. Вместе с Килиманджаро выйдет заметно дешевле: перелёт общий.' },
    { id: 'kamchatka', group: 'roads', pin: 'travel', title: 'Камчатка: вулкан и медведи', short: 'Камчатка', size: 'twoweeks', months: [7, 8, 9],
      budget: [250, 400], note: 'Авачинский вулкан и Курильское озеро. Вертолёт к озеру — заметная часть бюджета.' },
    { id: 'ladakh', group: 'roads', pin: 'moto', title: 'Ладакх на мотоцикле', short: 'Ладакх', size: 'twoweeks', months: [6, 7, 8, 9],
      budget: [200, 300], note: 'Перевалы выше 5000 м. Опыт эндуро пригодится.' },
    { id: 'pamir', group: 'roads', pin: 'moto', title: 'Памирский тракт', short: 'Памирский тракт', size: 'twoweeks', months: [6, 7, 8, 9],
      budget: [200, 300], note: 'Высокогорная дорога через Таджикистан и Киргизию.' },
    { id: 'oymyakon', group: 'roads', pin: 'travel', title: 'Оймякон зимой', short: 'Оймякон', size: 'week', months: [12, 1, 2],
      budget: [150, 250], note: 'Полюс холода.' },
    { id: 'antarctica', group: 'roads', pin: 'travel', title: 'Антарктида', short: 'Антарктида', size: 'twoweeks', months: [11, 12, 1, 2, 3],
      budget: [800, 1200], note: 'Круизы из Ушуаи со скидкой — от ~$7 тыс, плюс перелёт. С дорогой — около двух недель.' },
    { id: 'countries', group: 'roads', pin: 'travel', title: '30 стран', short: '30 стран', size: 'ongoing', counter: { key: 'countries', target: 30 },
      note: 'Значок — за каждые 5 стран. Ориентир — к 2030, зимовки дают по 2–3 новые страны.' },

    { id: 'moto-a', group: 'licenses', pin: 'moto', title: 'Права на мотоцикл, категория A', short: 'Категория A', size: 'ongoing',
      active: 'Уже в процессе', badge: 'категория A', note: 'Сейчас — билеты ПДД. Дальше экзамены в школе, теория и площадка в ГИБДД: города для категории A нет.' },
    { id: 'tractor', group: 'licenses', pin: 'tractor', title: 'Права на трактор', short: 'Тракторист', size: 'ongoing',
      budget: [10, 30], badge: 'удостоверение тракториста-машиниста', note: 'Выдаёт Гостехнадзор после школы: около двух месяцев учёбы, потом теория и практика — на площадке и в реальных условиях. Обычные права для большинства категорий не нужны.' },
    { id: 'truck-c', group: 'licenses', pin: 'truck', title: 'Права на грузовик, категория C', short: 'Категория C', size: 'ongoing',
      budget: [40, 80], badge: 'категория C', note: 'Первый шаг к фуре. Категория B для неё не нужна, обучение — до полугода.' },
    { id: 'truck-ce', group: 'licenses', pin: 'semi', title: 'Права на фуру, категория CE', short: 'Категория CE', size: 'ongoing',
      budget: [30, 60], badge: 'категория CE', note: 'Только после года стажа на C. Сам курс — около месяца.' },
    { id: 'boat', group: 'licenses', pin: 'boat', title: 'Права на катер', short: 'Права на катер', size: 'ongoing', months: [5, 6, 7, 8, 9],
      budget: [20, 40], badge: 'удостоверение судоводителя', note: 'Аттестация в ГИМС: теория и практика на воде. С мая 2026 сдавать можно в любом регионе, права выдают на тип судна и район плавания.' },

    { id: 'heroes', group: 'endurance', pin: 'endurance', title: 'Гонка героев', short: 'Гонка героев', size: 'quick', months: [5, 6, 7, 8, 9],
      budget: [5, 10], note: 'Хотел в 2027. Не ставь прямо перед Эльбрусом.' },
    { id: 'trail', group: 'endurance', pin: 'endurance', title: 'Трейл 20–30 км', short: 'Трейл', size: 'quick', months: [5, 6, 7, 8, 9, 10, 11],
      budget: [5, 10], note: 'Под Москвой такие старты идут с мая по ноябрь.' },
    { id: 'marathon', group: 'endurance', pin: 'endurance', title: 'Первый марафон', short: 'Марафон', size: 'quick', months: [5, 7, 9],
      budget: [5, 30], note: 'Казань — начало мая, «Белые ночи» — начало июля, Москва — конец сентября. Взнос ~5–6 тыс ₽.' },
    { id: 'gto', group: 'endurance', pin: 'status', title: 'Золотой знак ГТО', short: 'Золотой ГТО', size: 'quick',
      badge: 'золотой знак ГТО', note: 'Налоговый вычет — до 2 340 ₽ на руки, если в том же году пройти диспансеризацию.' },

    { id: 'donor', group: 'life', pin: 'donor', title: 'Почётный донор России', short: 'Почётный донор', size: 'ongoing', counter: { key: 'donations', target: 40 },
      badge: 'знак и ежегодная выплата', note: 'Значок — за каждые 5 донаций, на 40-й — «Почётный донор». Для знака нужно 40 донаций крови или 60 плазмы; мужчинам цельную кровь можно сдавать до 5 раз в год.' }
  ];

  var BY_ID = {};
  ITEMS.forEach(function (it) { BY_ID[it.id] = it; });

  var ALIASES = {
    'l-kamchatka': ['kamchatka'], 'l-ebc': ['ebc'], 'l-pamir': ['pamir'], 'l-antarctica': ['antarctica'],
    'l-oymyakon': ['oymyakon'], 'r-gto': ['gto'], 'r-tourism': ['tourism'], 'r-iyt': ['iyt'], 'r-iko': ['iko'],
    'r-msd': ['msd'], transsib: ['transsib', 'baikal']
  };

  var MODE_TEXT = {
    writable: 'Отметки хранятся на этом телефоне.',
    nostore: 'Память браузера недоступна, отметки не сохранятся.'
  };

  var app = document.getElementById('app');
  var state = loadState();
  var filters = loadFilters();
  var nowMonth = new Date().getMonth() + 1;
  var mode = storageWorks() ? 'writable' : 'nostore';
  var armedDelete = null;
  var draft = '';
  var removedOpen = false;
  var awarded = null;
  var awardTimer = null;
  var statusEl = null;

  function cleanDate(v) {
    return typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null;
  }

  function normalize(raw) {
    var base = { v: 2, done: {}, hidden: {}, counters: { countries: 15, donations: 0 }, custom: [] };
    if (!raw || typeof raw !== 'object') return base;
    if (raw.done && typeof raw.done === 'object') {
      Object.keys(raw.done).forEach(function (k) {
        var date = cleanDate(raw.done[k]);
        if (!date) return;
        (ALIASES[k] || [k]).forEach(function (id) {
          if (BY_ID[id]) base.done[id] = date;
        });
      });
    }
    if (raw.hidden && typeof raw.hidden === 'object') {
      Object.keys(raw.hidden).forEach(function (k) {
        if (BY_ID[k] && raw.hidden[k]) base.hidden[k] = true;
      });
    }
    if (raw.counters && typeof raw.counters === 'object') {
      Object.keys(base.counters).forEach(function (k) {
        var n = Number(raw.counters[k]);
        if (isFinite(n) && n >= 0) base.counters[k] = Math.min(9999, Math.floor(n));
      });
    }
    if (Array.isArray(raw.custom)) {
      raw.custom.forEach(function (c) {
        if (c && typeof c.id === 'string' && typeof c.title === 'string' && c.title.trim()) {
          base.custom.push({
            id: c.id.replace(/[^a-z0-9-]/gi, '').slice(0, 24) || ('c' + base.custom.length),
            title: c.title.slice(0, 140),
            done: cleanDate(c.done)
          });
        }
      });
    }
    return base;
  }

  function loadState() {
    try {
      var saved = window.localStorage.getItem(STORE_KEY);
      if (saved) return normalize(JSON.parse(saved));
    } catch (e) { /* fall back to the bundled list */ }
    try {
      var node = document.getElementById('goals-state');
      return normalize(JSON.parse((node && node.textContent) || '{}'));
    } catch (e) {
      return normalize({});
    }
  }

  function storageWorks() {
    try {
      var probe = STORE_KEY + ':probe';
      window.localStorage.setItem(probe, '1');
      window.localStorage.removeItem(probe);
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadFilters() {
    var f = { size: 'all', now: false, status: false, hideDone: false };
    try {
      var raw = JSON.parse(window.localStorage.getItem(FILTERS_KEY) || 'null');
      if (raw && typeof raw === 'object') {
        if (raw.size === 'all' || SIZES.some(function (s) { return s.id === raw.size; })) f.size = raw.size;
        f.now = raw.now === true;
        f.status = raw.status === true;
        f.hideDone = raw.hideDone === true;
      }
    } catch (e) { /* defaults */ }
    return f;
  }

  function saveFilters() {
    try { window.localStorage.setItem(FILTERS_KEY, JSON.stringify(filters)); } catch (e) { /* storage unavailable */ }
  }

  function persist() {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      setStatus('Не сохранилось: память браузера недоступна.', true);
      return false;
    }
  }

  function award(id) {
    awarded = id;
    window.clearTimeout(awardTimer);
    awardTimer = window.setTimeout(function () { awarded = null; }, 1200);
  }

  function isDone(item) {
    if (item.counter) return (state.counters[item.counter.key] || 0) >= item.counter.target;
    return Boolean(state.done[item.id]);
  }

  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function today() {
    var d = new Date();
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  function monthLabel(iso) {
    var parts = String(iso).split('-');
    var year = Number(parts[0]);
    var month = Number(parts[1]);
    if (!year || !month || month < 1 || month > 12) return '';
    return MONTHS[month - 1] + ' ' + year;
  }

  function seasonText(months) {
    if (!months || !months.length) return '';
    if (months.length >= 12) return 'круглый год';
    var set = {};
    months.forEach(function (m) { set[m] = true; });
    var prev = function (m) { return m === 1 ? 12 : m - 1; };
    var next = function (m) { return m === 12 ? 1 : m + 1; };
    var parts = [];
    for (var m = 1; m <= 12; m += 1) {
      if (set[m] && !set[prev(m)]) {
        var end = m;
        while (set[next(end)] && next(end) !== m) end = next(end);
        parts.push(end === m ? MONTHS[m - 1] : MONTHS[m - 1] + '–' + MONTHS[end - 1]);
      }
    }
    return parts.join(', ');
  }

  function monthsOf(item) {
    if (item.months) return item.months;
    if (!item.seasons) return [];
    var all = [];
    item.seasons.forEach(function (sn) {
      sn.months.forEach(function (m) { if (all.indexOf(m) < 0) all.push(m); });
    });
    return all;
  }

  function inSeason(item) {
    var months = monthsOf(item);
    return !months.length || months.indexOf(nowMonth) >= 0;
  }

  function fmtMoney(min, max) {
    var nb = '\u00a0';
    if (max >= 1000) {
      var f = function (v) { return (v / 1000).toLocaleString('ru-RU', { maximumFractionDigits: 1 }); };
      return '~' + (min === max ? f(max) : f(min) + '–' + f(max)) + nb + 'млн' + nb + '₽';
    }
    return '~' + (min === max ? String(max) : min + '–' + max) + nb + 'тыс' + nb + '₽';
  }

  function sizeLabel(id) {
    for (var i = 0; i < SIZES.length; i += 1) {
      if (SIZES[i].id === id) return SIZES[i].label;
    }
    return '';
  }

  function h(tag, props, kids) {
    var el = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v === undefined || v === null || v === false) return;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'style') Object.keys(v).forEach(function (p) { el.style[p] = v[p]; });
        else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
        else if (v === true) el.setAttribute(k, '');
        else el.setAttribute(k, String(v));
      });
    }
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined || c === false) return;
      el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return el;
  }

  function merge(a, b) {
    var out = {};
    Object.keys(a).forEach(function (k) { out[k] = a[k]; });
    Object.keys(b).forEach(function (k) { out[k] = b[k]; });
    return out;
  }

  function glyph(cat) {
    return '<svg viewBox="0 0 24 24" focusable="false">' + (GLYPHS[cat] || GLYPHS.custom) + '<\/svg>';
  }

  function ctl(locked) {
    return { 'data-ctl': locked ? 'locked' : 'on', disabled: mode !== 'writable' || Boolean(locked) };
  }

  function pinEl(p, isNew) {
    var disc = h('span', { class: 'pin__disc', 'aria-hidden': 'true' });
    if (p.num) {
      disc.appendChild(h('span', { class: 'pin__num' + (p.num.length > 2 ? ' pin__num--long' : ''), text: p.num }));
      if (p.unit) disc.appendChild(h('span', { class: 'pin__unit', text: p.unit }));
    } else {
      disc.innerHTML = glyph(p.pin);
    }
    return h('li', { class: 'pin' + (isNew ? ' is-new' : ''), 'data-enamel': ENAMEL[p.pin] || 'night' }, [
      disc,
      h('span', { class: 'pin__label', text: p.label })
    ]);
  }

  function milestonePins() {
    var list = [];
    MILESTONES.forEach(function (ms) {
      var n = Math.min(state.counters[ms.key] || 0, 250);
      for (var m = ms.step; m <= n; m += ms.step) {
        var isFinal = m === ms.target && ms.finalLabel;
        list.push({
          id: ms.key + '-' + m,
          label: isFinal ? ms.finalLabel : m + '\u00a0' + ms.unit,
          num: String(m),
          unit: ms.unit,
          pin: isFinal ? ms.finalPin : ms.pin
        });
      }
    });
    return list;
  }

  function earnedPins() {
    var list = [];
    ITEMS.forEach(function (it) {
      if (milestoneFor(it.id)) return;
      if (isDone(it)) list.push({ id: it.id, label: it.short || it.title, pin: it.pin, at: state.done[it.id] || '' });
    });
    state.custom.forEach(function (c) {
      if (c.done) {
        list.push({ id: c.id, label: c.title.length > 28 ? c.title.slice(0, 27) + '…' : c.title, pin: 'custom', at: c.done });
      }
    });
    list.sort(function (a, b) { return a.at < b.at ? -1 : (a.at > b.at ? 1 : 0); });
    return list;
  }

  function activeItems() {
    return ITEMS.filter(function (it) { return !state.hidden[it.id]; });
  }

  function slots(ms) {
    var earned = Math.floor(Math.min(state.counters[ms.key] || 0, 250) / ms.step);
    return { earned: earned, total: Math.max(ms.target / ms.step, earned) };
  }

  function tally(items) {
    var total = 0;
    var done = 0;
    items.forEach(function (it) {
      var ms = milestoneFor(it.id);
      if (ms) {
        var sl = slots(ms);
        total += sl.total;
        done += sl.earned;
        return;
      }
      total += 1;
      if (isDone(it)) done += 1;
    });
    return { total: total, done: done };
  }

  function progress() {
    var t = tally(activeItems());
    var total = DONE.length + t.total;
    var done = DONE.length + t.done;
    MILESTONES.forEach(function (ms) {
      if (!state.hidden[ms.goal]) return;
      var sl = slots(ms);
      total += sl.earned;
      done += sl.earned;
    });
    state.custom.forEach(function (c) {
      total += 1;
      if (c.done) done += 1;
    });
    return { total: total, done: done };
  }

  function passes(it) {
    if (filters.size !== 'all' && it.size !== filters.size) return false;
    if (filters.now && !inSeason(it)) return false;
    if (filters.status && !it.badge) return false;
    if (filters.hideDone && isDone(it)) return false;
    return true;
  }

  function customPasses(c) {
    if (filters.size !== 'all' || filters.status) return false;
    if (filters.hideDone && c.done) return false;
    return true;
  }

  function filtersActive() {
    return filters.size !== 'all' || filters.now || filters.status || filters.hideDone;
  }

  function starTag(text) {
    var icon = h('span', { class: 'tag__icon', 'aria-hidden': 'true' });
    icon.innerHTML = glyph('status');
    return h('span', { class: 'tag tag--badge' }, [icon, text]);
  }

  function itemRow(it) {
    var done = isDone(it);
    var cid = 'chk-' + it.id;
    var tags = [];
    if (it.active) tags.push(h('span', { class: 'tag tag--active', text: it.active }));
    if (it.booked) {
      tags.push(h('span', { class: 'tag tag--booked', text: it.booked }));
    } else if (monthsOf(it).length) {
      if (inSeason(it)) tags.push(h('span', { class: 'tag tag--now', text: 'Сейчас сезон' }));
      if (it.seasons) {
        it.seasons.forEach(function (sn) {
          tags.push(h('span', { class: 'tag', text: sn.label + ': ' + seasonText(sn.months) }));
        });
      } else {
        tags.push(h('span', { class: 'tag', text: 'Сезон: ' + seasonText(it.months) }));
      }
    }
    tags.push(h('span', { class: 'tag', text: sizeLabel(it.size) }));
    if (it.badge) tags.push(starTag(it.badge));

    var main = h('div', { class: 'item__main' }, [
      it.counter
        ? h('span', { class: 'item__title', text: it.title })
        : h('label', { class: 'item__title', for: cid, text: it.title }),
      h('div', { class: 'tags' }, tags),
      done && state.done[it.id] ? h('span', { class: 'item__stamp', text: 'Закрыто: ' + monthLabel(state.done[it.id]) }) : null
    ]);

    var check;
    if (it.counter) {
      var val = state.counters[it.counter.key] || 0;
      main.appendChild(h('div', { class: 'counter' }, [
        h('button', merge(ctl(val <= 0), {
          type: 'button', class: 'counter__btn', 'aria-label': 'Убавить: ' + it.title, 'data-key': 'dec-' + it.id,
          onclick: function () { bump(it, -1); }
        }), ['−']),
        h('span', { class: 'counter__value', 'aria-live': 'polite' }, [
          val < it.counter.target ? val + ' из ' + it.counter.target : val + ', цель выполнена'
        ]),
        h('button', merge(ctl(false), {
          type: 'button', class: 'counter__btn', 'aria-label': 'Прибавить: ' + it.title, 'data-key': 'inc-' + it.id,
          onclick: function () { bump(it, 1); }
        }), ['+'])
      ]));
      check = h('span', { class: 'check check--auto' + (done ? ' is-on' : ''), 'aria-hidden': 'true' });
    } else {
      check = h('input', merge(ctl(false), {
        type: 'checkbox', class: 'check', id: cid, 'data-key': cid, checked: done,
        onchange: function (e) { toggle(it.id, e.target.checked); }
      }));
    }

    return h('li', { class: 'item' + (done ? ' is-done' : '') }, [
      h('div', { class: 'item__check' }, [check]),
      main,
      h('div', { class: 'item__side' }, [
        it.budget ? h('span', { class: 'item__budget', text: fmtMoney(it.budget[0], it.budget[1]) }) : null,
        h('button', merge(ctl(false), {
          type: 'button', class: 'link-btn', 'data-key': 'hide-' + it.id, 'aria-label': 'Убрать из списка: ' + it.title,
          onclick: function () { hideItem(it.id); }
        }), ['Убрать'])
      ]),
      it.note ? h('p', { class: 'item__note', text: it.note }) : null
    ]);
  }

  function catSection(cat) {
    var all = activeItems().filter(function (it) { return it.group === cat.id; });
    if (!all.length) return null;
    var shown = all.filter(passes);
    if (!shown.length) return null;
    var counts = tally(all);
    var disc = h('span', { class: 'cat__disc', 'aria-hidden': 'true' });
    disc.innerHTML = glyph(cat.glyph);
    return h('section', { class: 'cat', 'data-enamel': cat.enamel }, [
      h('div', { class: 'cat__head' }, [
        disc,
        h('h2', { text: cat.title }),
        h('span', { class: 'cat__count', text: 'Закрыто ' + counts.done + ' из ' + counts.total })
      ]),
      h('ul', { class: 'items' }, shown.map(itemRow))
    ]);
  }

  function filterBar(shownCount, totalCount) {
    function sizeChip(id, label) {
      return h('button', {
        type: 'button', class: 'chip', 'aria-pressed': filters.size === id ? 'true' : 'false', 'data-key': 'size-' + id,
        onclick: function () { setFilter('size', id); }
      }, [label]);
    }
    function toggleChip(key, label) {
      return h('button', {
        type: 'button', class: 'chip chip--toggle', 'aria-pressed': filters[key] ? 'true' : 'false', 'data-key': 'flt-' + key,
        onclick: function () { setFilter(key, !filters[key]); }
      }, [label]);
    }
    var sizeChips = [sizeChip('all', 'Любое')];
    SIZES.forEach(function (s) { sizeChips.push(sizeChip(s.id, s.label)); });
    return h('div', { class: 'filters', role: 'region', 'aria-label': 'Фильтры' }, [
      h('span', { class: 'filters__label', id: 'size-label', text: 'Сколько есть времени' }),
      h('div', { class: 'chips', role: 'group', 'aria-labelledby': 'size-label' }, sizeChips),
      h('div', { class: 'chips', role: 'group', 'aria-label': 'Дополнительные фильтры' }, [
        toggleChip('now', 'Сейчас сезон'),
        toggleChip('status', 'Дают статус'),
        toggleChip('hideDone', 'Скрыть закрытые')
      ]),
      filtersActive()
        ? h('p', { class: 'filters__result', 'aria-live': 'polite', text: 'Показано ' + shownCount + ' из ' + totalCount })
        : null
    ]);
  }

  function customSection() {
    var shown = state.custom.filter(customPasses);
    if (filtersActive() && !shown.length) return null;
    var kids = [h('div', { class: 'cat__head' }, [h('h2', { text: 'Свои цели' })])];
    if (!state.custom.length) {
      kids.push(h('p', { class: 'section-note', text: 'Пока пусто. Впиши цель, которой нет в списке, и она войдёт в общий счёт.' }));
    } else if (shown.length) {
      kids.push(h('ul', { class: 'items' }, shown.map(function (c) {
        var cid = 'chk-' + c.id;
        var armed = armedDelete === c.id;
        return h('li', { class: 'item' + (c.done ? ' is-done' : '') }, [
          h('div', { class: 'item__check' }, [
            h('input', merge(ctl(false), {
              type: 'checkbox', class: 'check', id: cid, 'data-key': cid, checked: Boolean(c.done),
              onchange: function (e) { toggleCustom(c.id, e.target.checked); }
            }))
          ]),
          h('div', { class: 'item__main' }, [
            h('label', { class: 'item__title', for: cid, text: c.title }),
            c.done ? h('span', { class: 'item__stamp', text: 'Закрыто: ' + monthLabel(c.done) }) : null
          ]),
          h('div', { class: 'item__side' }, [
            h('button', merge(ctl(false), {
              type: 'button', class: 'link-btn' + (armed ? ' is-armed' : ''), 'data-key': 'del-' + c.id,
              'aria-label': (armed ? 'Подтвердить удаление: ' : 'Удалить: ') + c.title,
              onclick: function () { removeCustom(c.id); }
            }), [armed ? 'Точно удалить?' : 'Удалить'])
          ])
        ]);
      })));
    }
    if (!filtersActive()) {
      var input = h('input', merge(ctl(false), {
        type: 'text', id: 'new-goal', 'data-key': 'new-goal', maxlength: '140', autocomplete: 'off',
        placeholder: 'Например, увидеть северное сияние', 'aria-label': 'Новая цель',
        oninput: function (e) { draft = e.target.value; },
        onkeydown: function (e) { if (e.key === 'Enter') { e.preventDefault(); addCustom(); } }
      }));
      input.value = draft;
      kids.push(h('div', { class: 'add' }, [
        input,
        h('button', merge(ctl(false), { type: 'button', class: 'btn', 'data-key': 'add-goal', onclick: addCustom }), ['Добавить цель'])
      ]));
    }
    return h('section', { class: 'cat', 'data-enamel': 'night' }, kids);
  }

  function removedSection() {
    var hidden = ITEMS.filter(function (it) { return state.hidden[it.id]; });
    if (!hidden.length) return null;
    var details = h('details', { class: 'removed', open: removedOpen }, [
      h('summary', { text: 'Убранные из списка: ' + hidden.length }),
      h('ul', {}, hidden.map(function (it) {
        return h('li', {}, [
          h('span', { text: it.title }),
          h('button', merge(ctl(false), {
            type: 'button', class: 'link-btn', 'data-key': 'restore-' + it.id, 'aria-label': 'Вернуть в список: ' + it.title,
            onclick: function () { restoreItem(it.id); }
          }), ['Вернуть'])
        ]);
      }))
    ]);
    details.addEventListener('toggle', function () { removedOpen = details.open; });
    return details;
  }

  function backupSection() {
    var input = h('input', {
      type: 'file', accept: 'application/json,.json', class: 'visually-hidden', id: 'import-file', tabindex: '-1', 'aria-hidden': 'true',
      onchange: function (e) {
        var f = e.target.files && e.target.files[0];
        e.target.value = '';
        if (f && window.confirm('Заменить текущие отметки данными из файла?')) importData(f);
      }
    });
    return h('section', { class: 'backup' }, [
      h('h2', { text: 'Резервная копия' }),
      h('p', { class: 'section-note', text: 'Отметки хранятся только на этом телефоне. Время от времени сохраняй копию — в «Файлы» или себе в мессенджер.' }),
      h('div', { class: 'add' }, [
        h('button', { type: 'button', class: 'btn', 'data-key': 'export-data', onclick: exportData }, ['Сохранить копию']),
        h('button', {
          type: 'button', class: 'btn btn--ghost', 'data-key': 'import-data',
          onclick: function () { input.click(); }
        }, ['Восстановить из файла']),
        input
      ])
    ]);
  }

  function buildPage() {
    var pr = progress();
    var pct = pr.total ? Math.round((pr.done / pr.total) * 100) : 0;
    var pins = milestonePins().concat(earnedPins());
    var pinList = h('ul', { class: 'pins' });
    DONE.forEach(function (d) { pinList.appendChild(pinEl(d, false)); });
    pins.forEach(function (p) { pinList.appendChild(pinEl(p, p.id === awarded)); });

    var active = activeItems();
    var shownCount = active.filter(passes).length + state.custom.filter(customPasses).length;
    var sections = CATS.map(catSection).filter(Boolean);
    var custom = customSection();

    var body = [];
    if (!sections.length && !custom) {
      body.push(h('div', { class: 'empty' }, [
        h('p', { text: 'Под эти фильтры ничего не подходит.' }),
        h('button', { type: 'button', class: 'btn', 'data-key': 'reset-filters', onclick: resetFilters }, ['Сбросить фильтры'])
      ]));
    }

    return h('main', { class: 'wrap' }, [
      h('header', {}, [
        h('h1', { text: 'Цели на жизнь' }),
        h('p', { class: 'lede', text: 'Чеклист без дедлайнов. Смотри, что подходит под свободное время и сезон, и закрывай по возможности. Каждая закрытая цель становится значком.' }),
        h('div', { class: 'progress' }, [
          h('div', { class: 'progress__row' }, [
            h('span', { class: 'progress__count', text: 'Закрыто ' + pr.done + ' из ' + pr.total }),
            h('span', { class: 'progress__mode', text: MODE_TEXT[mode] })
          ]),
          h('div', {
            class: 'bar', role: 'progressbar', 'aria-label': 'Сколько целей закрыто',
            'aria-valuemin': '0', 'aria-valuemax': String(pr.total), 'aria-valuenow': String(pr.done)
          }, [h('span', { class: 'bar__fill', style: { width: pct + '%' } })])
        ])
      ]),
      h('section', {}, [
        h('h2', { text: 'Уже сделано: ' + (DONE.length + pins.length) }),
        pinList
      ]),
      filterBar(shownCount, active.length + state.custom.length)
    ].concat(body, sections, [custom, removedSection(), backupSection(),
      h('footer', { class: 'foot' }, [
        h('p', { text: 'Бюджеты — ориентиры на одного: с перелётом из Москвы, в ценах 2026 года, по курсу около 84 ₽ за доллар. Вдвоём — умножай на два, перед поездкой пересчитай.' }),
        h('p', { text: 'Главный ограничитель — не деньги, а отпуск. Длинные поездки удобнее ставить на зимовки и майские.' })
      ])
    ]));
  }

  function focusKey(key) {
    if (!key) return;
    var el = app.querySelector('[data-key="' + key + '"]');
    if (el && !el.disabled && typeof el.focus === 'function') {
      try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); }
    }
  }

  function render(focusOverride) {
    var active = document.activeElement;
    var key = focusOverride || (active && active.getAttribute ? active.getAttribute('data-key') : null);
    app.textContent = '';
    app.appendChild(buildPage());
    focusKey(key);
  }

  function applyMode() {
    var off = mode !== 'writable';
    Array.prototype.forEach.call(app.querySelectorAll('[data-ctl]'), function (el) {
      el.disabled = off || el.getAttribute('data-ctl') === 'locked';
    });
    var note = app.querySelector('.progress__mode');
    if (note) note.textContent = MODE_TEXT[mode];
  }

  function setMode(next) {
    mode = next;
    applyMode();
  }

  function setStatus(text, isError) {
    if (!statusEl) return;
    statusEl.textContent = text || '';
    statusEl.className = 'status' + (text ? ' is-visible' : '') + (isError ? ' is-error' : '');
  }

  function setFilter(key, value) {
    filters[key] = value;
    saveFilters();
    render(key === 'size' ? 'size-' + value : 'flt-' + key);
  }

  function resetFilters() {
    filters = { size: 'all', now: false, status: false, hideDone: false };
    saveFilters();
    render('size-all');
  }

  function toggle(id, on) {
    if (mode !== 'writable') return;
    if (on) {
      state.done[id] = today();
      award(id);
    } else {
      delete state.done[id];
    }
    commit(1200);
  }

  function toggleCustom(id, on) {
    if (mode !== 'writable') return;
    state.custom.forEach(function (c) {
      if (c.id === id) c.done = on ? today() : null;
    });
    if (on) award(id);
    commit(1200);
  }

  function bump(it, delta) {
    if (mode !== 'writable') return;
    var key = it.counter.key;
    var before = isDone(it);
    state.counters[key] = Math.max(0, (state.counters[key] || 0) + delta);
    var after = isDone(it);
    if (after && !before) {
      state.done[it.id] = today();
      award(it.id);
    }
    if (!after) delete state.done[it.id];
    var ms = milestoneFor(it.id);
    if (ms && delta > 0 && state.counters[key] % ms.step === 0) {
      award(ms.key + '-' + state.counters[key]);
    }
    commit(1500);
  }

  function hideItem(id) {
    if (mode !== 'writable') return;
    state.hidden[id] = true;
    commit(1500, 'size-' + filters.size);
  }

  function restoreItem(id) {
    if (mode !== 'writable') return;
    delete state.hidden[id];
    removedOpen = true;
    commit(1500);
  }

  function addCustom() {
    if (mode !== 'writable') return;
    var title = draft.trim().replace(/\s+/g, ' ').slice(0, 140);
    if (!title) {
      setStatus('Впиши цель, чтобы её добавить.', false);
      window.setTimeout(function () { setStatus(''); }, 2500);
      focusKey('new-goal');
      return;
    }
    state.custom.push({ id: 'c' + Date.now().toString(36), title: title, done: null });
    draft = '';
    commit(600, 'new-goal');
  }

  function removeCustom(id) {
    if (mode !== 'writable') return;
    if (armedDelete !== id) {
      armedDelete = id;
      render('del-' + id);
      window.setTimeout(function () {
        if (armedDelete === id) {
          armedDelete = null;
          render();
        }
      }, 4000);
      return;
    }
    armedDelete = null;
    state.custom = state.custom.filter(function (c) { return c.id !== id; });
    commit(600, 'new-goal');
  }

  function commit(delay, focus) {
    persist();
    render(focus);
  }

  function hideStatusLater() {
    window.setTimeout(function () { setStatus(''); }, 2500);
  }

  function exportData() {
    var payload = JSON.stringify({ app: 'life-goals', exported: new Date().toISOString(), state: state }, null, 2);
    var name = 'life-goals-' + today() + '.json';
    var file = null;
    try {
      file = new File([payload], name, { type: 'application/json' });
    } catch (e) {
      file = null;
    }
    if (file && navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: 'Цели на жизнь' }).then(function () {
        setStatus('Копия сохранена', false);
        hideStatusLater();
      }, function (err) {
        if (err && err.name === 'AbortError') return;
        downloadFallback(payload, name);
      });
      return;
    }
    downloadFallback(payload, name);
  }

  function downloadFallback(payload, name) {
    try {
      var url = URL.createObjectURL(new Blob([payload], { type: 'application/json' }));
      var a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
      setStatus('Копия скачана', false);
      hideStatusLater();
    } catch (e) {
      setStatus('Не удалось сохранить копию на этом устройстве.', true);
    }
  }

  function importData(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var raw = JSON.parse(String(reader.result || ''));
        var incoming = raw && raw.state ? raw.state : raw;
        if (!incoming || typeof incoming !== 'object' || !incoming.counters) throw new Error('not a backup');
        state = normalize(incoming);
        persist();
        render('import-data');
        setStatus('Копия восстановлена', false);
        hideStatusLater();
      } catch (e) {
        setStatus('Это не похоже на копию списка целей.', true);
      }
    };
    reader.onerror = function () { setStatus('Не удалось прочитать файл.', true); };
    reader.readAsText(file);
  }

  function registerWorker() {
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().catch(function () { /* the browser decides */ });
    }
    if (!('serviceWorker' in navigator) || window.location.protocol === 'file:') return;
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () { /* offline mode unavailable */ });
    });
  }

  statusEl = h('div', { class: 'status', role: 'status', 'aria-live': 'polite' });
  document.body.appendChild(statusEl);
  if (mode === 'writable') persist();
  render();
  registerWorker();
})();

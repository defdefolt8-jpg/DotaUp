(() => {
  'use strict';

  const items = [
    { id: 1, weapon: 'Treasure', skin: 'Frostivus 2023 Treasure Chest', wear: 'Base', price: 6, color: '#47c8ff', shape: 'shield', imageLabel: 'Frostivus', imageAccent: '#47c8ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 2, weapon: 'Treasure', skin: 'Dead Reckoning Chest', wear: 'Base', price: 23, color: '#57d3ff', shape: 'crown', imageLabel: 'Reckoning', imageAccent: '#57d3ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 3, weapon: 'Collector Cache', skin: 'Spina Infernalis', wear: 'Base', price: 17, color: '#7f8fff', shape: 'axe', imageLabel: 'Inferno', imageAccent: '#7f8fff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/doom_bringer.png' },
    { id: 4, weapon: 'World Item', skin: 'Crownfall - Dire Creeps', wear: 'Base', price: 50, color: '#ff7a59', shape: 'daggers', imageLabel: 'Dire', imageAccent: '#ff7a59', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 5, weapon: 'World Item', skin: 'Crownfall - Radiant Creeps', wear: 'Base', price: 69, color: '#8dfc52', shape: 'wings', imageLabel: 'Radiant', imageAccent: '#8dfc52', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 6, weapon: 'Immortal', skin: 'Immortal Treasure I 2022', wear: 'Base', price: 103, color: '#8dfc52', shape: 'crown', imageLabel: 'Immortal', imageAccent: '#8dfc52', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 7, weapon: 'Terrain', skin: 'Stoneclaw Scavengers Dire Towers', wear: 'Base', price: 140, color: '#ff8a38', shape: 'hammer', imageLabel: 'Dire', imageAccent: '#ff8a38', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/tiny.png' },
    { id: 8, weapon: 'Terrain', skin: 'Stoneclaw Scavengers Radiant Towers', wear: 'Base', price: 141, color: '#6dffb7', shape: 'staff', imageLabel: 'Radiant', imageAccent: '#6dffb7', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/treant.png' },
    { id: 9, weapon: 'Anti-Mage', skin: 'Mantle of the Whispered Bond', wear: 'Base', price: 166, color: '#8c74ff', shape: 'blade', imageLabel: 'AM', imageAccent: '#8c74ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png' },
    { id: 10, weapon: 'Invoker', skin: 'Magus Apex', wear: 'Arcana', price: 234, color: '#a878ff', shape: 'staff', imageLabel: 'Invoker', imageAccent: '#a878ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png' },
    { id: 11, weapon: 'Rubick', skin: 'Crux of Perplex', wear: 'Immortal', price: 397, color: '#58f4c8', shape: 'staff', imageLabel: 'Rubick', imageAccent: '#58f4c8', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/rubick.png' },
    { id: 12, weapon: 'Shadow Fiend', skin: 'Arms of Desolation', wear: 'Immortal', price: 712, color: '#ff5576', shape: 'axe', imageLabel: 'SF', imageAccent: '#ff5576', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/nevermore.png' },
    { id: 13, weapon: 'Juggernaut', skin: 'Origins of Faith', wear: 'Immortal', price: 917, color: '#ffd36b', shape: 'blade', imageLabel: 'Jugg', imageAccent: '#ffd36b', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png' },
    { id: 14, weapon: 'Dragon Knight', skin: 'The Devotions of Dragonus - Wings', wear: 'Mythical', price: 1467, color: '#ff8c5a', shape: 'wings', imageLabel: 'DK', imageAccent: '#ff8c5a', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png' },
    { id: 15, weapon: 'Phantom Assassin', skin: 'Manifold Paradox', wear: 'Arcana', price: 1924, color: '#48bfff', shape: 'daggers', imageLabel: 'PA', imageAccent: '#48bfff', image: 'https://community.akamai.steamstatic.com/economy/image/QifztM4jTRrENf7LQ1M1h6-lJfGtuM8UIgRHVY7WmQExQUo-lCe3QG6XYvO_3pD5UI5hUlQ7nF8U5uoD2Ublfqh8f7ug3lWm5RDc4YUwjdCioFBmsXoo_W5n3P4w7KzVY-lFuA/330x192' },
    { id: 16, weapon: 'Shadow Fiend', skin: 'Demon Eater', wear: 'Arcana', price: 2028, color: '#ff5576', shape: 'axe', imageLabel: 'SF', imageAccent: '#ff5576', image: 'https://community.akamai.steamstatic.com/economy/image/IEkBqta5z6iokJzddPtiRd7IO7aI38FE6fZEu_uFfMYVVnq1DaK5QAL6XYb0m5muNt2fygcdwISuB6JSsDI2ap-nP7nQ2Efk6s2SyHCbaV6eQaKnBww5-pI9stirIQ/330x192' },
    { id: 17, weapon: 'Juggernaut', skin: 'Exalted Bladeform Legacy', wear: 'Arcana', price: 2100, color: '#ffcf66', shape: 'blade', imageLabel: 'Jugg', imageAccent: '#ffcf66', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png' },
    { id: 18, weapon: 'Terrorblade', skin: 'Fractal Horns of Inner Abysm', wear: 'Arcana', price: 2777, color: '#7cf2ff', shape: 'crown', imageLabel: 'TB', imageAccent: '#7cf2ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/terrorblade.png' },
    { id: 19, weapon: 'Invoker', skin: 'Dark Artistry Cape', wear: 'Mythical', price: 15477, color: '#9c6cff', shape: 'wings', imageLabel: 'Invoker', imageAccent: '#9c6cff', image: 'https://community.akamai.steamstatic.com/economy/image/UgG2rj5Qw1PtF4AZbx8n8Y5m3JZbJX64FdL1dQc6Y0nNh0s9cMNdH3GgloJrRzQ2S-vKVl02QG7Wm3SeQp0d8Q/330x192' },
    { id: 20, weapon: 'Pudge', skin: 'Dragonclaw Hook', wear: 'Legendary', price: 27940, color: '#ff7a59', shape: 'hook', imageLabel: 'Pudge', imageAccent: '#ff7a59', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png' },
    { id: 21, weapon: 'Lina', skin: 'Fiery Soul of the Slayer', wear: 'Arcana', price: 1680, color: '#ff6a4d', shape: 'staff', imageLabel: 'Lina', imageAccent: '#ff6a4d', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/lina.png' },
    { id: 22, weapon: 'Crystal Maiden', skin: 'Frost Avalanche', wear: 'Mythical', price: 320, color: '#73d8ff', shape: 'staff', imageLabel: 'CM', imageAccent: '#73d8ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png' },
    { id: 23, weapon: 'Juggernaut', skin: 'Provocation of Ruin', wear: 'Immortal', price: 540, color: '#ffcf66', shape: 'blade', imageLabel: 'Jugg', imageAccent: '#ffcf66', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png' },
    { id: 24, weapon: 'Pudge', skin: 'Feast of Abscession', wear: 'Arcana', price: 2450, color: '#ff7d68', shape: 'hook', imageLabel: 'Pudge', imageAccent: '#ff7d68', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png' },
    { id: 25, weapon: 'Zeus', skin: 'Tempest Helm of the Thundergod', wear: 'Arcana', price: 1870, color: '#68b6ff', shape: 'crown', imageLabel: 'Zeus', imageAccent: '#68b6ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/zuus.png' },
    { id: 26, weapon: 'Queen of Pain', skin: 'Sovereign of Torment', wear: 'Arcana', price: 2260, color: '#d86fff', shape: 'wings', imageLabel: 'QoP', imageAccent: '#d86fff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/queenofpain.png' },
    { id: 27, weapon: 'Windranger', skin: 'Compass of the Rising Gale', wear: 'Arcana', price: 2390, color: '#61f0aa', shape: 'bow', imageLabel: 'WR', imageAccent: '#61f0aa', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png' },
    { id: 28, weapon: 'Drow Ranger', skin: 'The Silent Wake', wear: 'Arcana', price: 2520, color: '#72a7ff', shape: 'bow', imageLabel: 'Drow', imageAccent: '#72a7ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png' },
    { id: 29, weapon: 'Faceless Void', skin: 'Claszureme Incursion', wear: 'Arcana', price: 2680, color: '#9d8bff', shape: 'hammer', imageLabel: 'Void', imageAccent: '#9d8bff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/faceless_void.png' },
    { id: 30, weapon: 'Tiny', skin: 'Ancient Inheritance', wear: 'Prestige', price: 4820, color: '#ffc759', shape: 'hammer', imageLabel: 'Tiny', imageAccent: '#ffc759', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/tiny.png' },
    { id: 31, weapon: 'Wraith King', skin: 'The One True King', wear: 'Arcana', price: 2890, color: '#8dfc52', shape: 'crown', imageLabel: 'WK', imageAccent: '#8dfc52', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/skeleton_king.png' },
    { id: 32, weapon: 'Razor', skin: 'Voidstorm Asylum', wear: 'Arcana', price: 2710, color: '#7bd7ff', shape: 'staff', imageLabel: 'Razor', imageAccent: '#7bd7ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/razor.png' },
    { id: 33, weapon: 'Spectre', skin: 'Phantom Advent', wear: 'Arcana', price: 2990, color: '#90a2ff', shape: 'daggers', imageLabel: 'Spec', imageAccent: '#90a2ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/spectre.png' },
    { id: 34, weapon: 'Ogre Magi', skin: 'FlockheartвЂ™s Gamble', wear: 'Arcana', price: 1880, color: '#ff9c66', shape: 'hammer', imageLabel: 'Ogre', imageAccent: '#ff9c66', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/ogre_magi.png' },
    { id: 35, weapon: 'Earthshaker', skin: 'Planetfall', wear: 'Arcana', price: 3410, color: '#ffc759', shape: 'hammer', imageLabel: 'ES', imageAccent: '#ffc759', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/earthshaker.png' },
    { id: 36, weapon: 'Phantom Assassin', skin: 'Codicil of the Veiled Ones', wear: 'Immortal', price: 380, color: '#6fbfff', shape: 'daggers', imageLabel: 'PA', imageAccent: '#6fbfff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png' },
    { id: 37, weapon: 'Invoker', skin: 'Dark Artistry Bracers', wear: 'Mythical', price: 1420, color: '#a878ff', shape: 'staff', imageLabel: 'Invoker', imageAccent: '#a878ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png' },
    { id: 38, weapon: 'Invoker', skin: 'Dark Artistry Hair', wear: 'Mythical', price: 1740, color: '#b184ff', shape: 'crown', imageLabel: 'Invoker', imageAccent: '#b184ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png' },
    { id: 39, weapon: 'Pudge', skin: 'The Abscesserator', wear: 'Immortal', price: 610, color: '#ff7b62', shape: 'hook', imageLabel: 'Pudge', imageAccent: '#ff7b62', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png' },
    { id: 40, weapon: 'Pudge', skin: 'Scavenging Guttleslug', wear: 'Immortal', price: 270, color: '#ff9068', shape: 'hook', imageLabel: 'Pudge', imageAccent: '#ff9068', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png' },
    { id: 41, weapon: 'Lina', skin: 'Blazing Cosmos', wear: 'Immortal', price: 520, color: '#ff6a4d', shape: 'staff', imageLabel: 'Lina', imageAccent: '#ff6a4d', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/lina.png' },
    { id: 42, weapon: 'Crystal Maiden', skin: 'White Sentry', wear: 'Immortal', price: 210, color: '#8bdcff', shape: 'staff', imageLabel: 'CM', imageAccent: '#8bdcff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png' },
    { id: 43, weapon: 'Anti-Mage', skin: 'Golden Basher of Mage Skulls', wear: 'Immortal', price: 1190, color: '#8c74ff', shape: 'blade', imageLabel: 'AM', imageAccent: '#8c74ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png' },
    { id: 44, weapon: 'Juggernaut', skin: 'Jagged Honor', wear: 'Mythical', price: 860, color: '#ffcf66', shape: 'blade', imageLabel: 'Jugg', imageAccent: '#ffcf66', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png' },
    { id: 45, weapon: 'Shadow Fiend', skin: 'Golden Arms of Desolation', wear: 'Immortal', price: 1840, color: '#ff5576', shape: 'axe', imageLabel: 'SF', imageAccent: '#ff5576', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/nevermore.png' },
    { id: 46, weapon: 'Rubick', skin: 'Golden Staff of Perplex', wear: 'Immortal', price: 960, color: '#59f2ca', shape: 'staff', imageLabel: 'Rubick', imageAccent: '#59f2ca', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/rubick.png' },
    { id: 47, weapon: 'Zeus', skin: 'Heavenly General', wear: 'Immortal', price: 470, color: '#68b6ff', shape: 'crown', imageLabel: 'Zeus', imageAccent: '#68b6ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/zuus.png' },
    { id: 48, weapon: 'Queen of Pain', skin: 'Bloodfeather Finery', wear: 'Mythical', price: 590, color: '#db74ff', shape: 'wings', imageLabel: 'QoP', imageAccent: '#db74ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/queenofpain.png' },
    { id: 49, weapon: 'Windranger', skin: 'Sylvan Vedette', wear: 'Arcana', price: 1860, color: '#61f0aa', shape: 'bow', imageLabel: 'WR', imageAccent: '#61f0aa', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png' },
    { id: 50, weapon: 'Drow Ranger', skin: 'Glacial Cascade', wear: 'Immortal', price: 310, color: '#72a7ff', shape: 'bow', imageLabel: 'Drow', imageAccent: '#72a7ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png' },
    { id: 51, weapon: 'Faceless Void', skin: 'Mace of Aeons', wear: 'Immortal', price: 4390, color: '#9d8bff', shape: 'hammer', imageLabel: 'Void', imageAccent: '#9d8bff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/faceless_void.png' },
    { id: 52, weapon: 'Tiny', skin: 'Majesty of the Colossus', wear: 'Mythical', price: 540, color: '#ffc759', shape: 'hammer', imageLabel: 'Tiny', imageAccent: '#ffc759', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/tiny.png' },
    { id: 53, weapon: 'Terrorblade', skin: 'Golden Fractal Horns of Inner Abysm', wear: 'Immortal', price: 3280, color: '#7cf2ff', shape: 'crown', imageLabel: 'TB', imageAccent: '#7cf2ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/terrorblade.png' },
    { id: 54, weapon: 'Dragon Knight', skin: 'Kindred of the Iron Dragon', wear: 'Mythical', price: 460, color: '#ff8c5a', shape: 'wings', imageLabel: 'DK', imageAccent: '#ff8c5a', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png' },
    { id: 55, weapon: 'Treasure', skin: 'Immortal Treasure II 2022', wear: 'Base', price: 88, color: '#8dfc52', shape: 'crown', imageLabel: 'Immortal II', imageAccent: '#8dfc52', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 56, weapon: 'Treasure', skin: 'Immortal Treasure III 2022', wear: 'Base', price: 96, color: '#8dfc52', shape: 'crown', imageLabel: 'Immortal III', imageAccent: '#8dfc52', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 57, weapon: 'Roshan', skin: 'Baby Roshan', wear: 'Courier', price: 21800, color: '#ffb457', shape: 'crown', imageLabel: 'Roshan', imageAccent: '#ffb457', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 58, weapon: 'Courier', skin: 'Unusual Hollow Jack', wear: 'Courier', price: 12800, color: '#a27dff', shape: 'wings', imageLabel: 'Courier', imageAccent: '#a27dff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 59, weapon: 'Courier', skin: 'Unusual Azuremir', wear: 'Courier', price: 11450, color: '#78d7ff', shape: 'wings', imageLabel: 'Courier', imageAccent: '#78d7ff', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/global/dota2_logo_symbol.png' },
    { id: 60, weapon: 'Pudge', skin: 'Golden Scavenging Guttleslug', wear: 'Immortal', price: 1360, color: '#ff8c6d', shape: 'hook', imageLabel: 'Pudge', imageAccent: '#ff8c6d', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png' }
  ];

  const paths = {
    blade: '<path d="M13 51 75 16l18 2-10 13-63 29-12-2 5-7Zm55-24 8 8M23 45l7 10"/>',
    hook: '<path d="M14 25c26-17 63-9 70 13 5 16-9 28-25 20-10-5-7-17 2-18 6-1 9 5 6 9 8 2 13-4 9-10-6-14-35-15-55 1Z"/><path d="m14 25-5-12 14 5"/>',
    lance: '<path d="m8 55 73-38 14-1-9 11L14 64Z"/><path d="m26 48 7 12M74 22l7 11"/>',
    staff: '<path d="M17 62 69 18M11 65l12-6M64 13l12 12"/><circle cx="75" cy="13" r="8"/><path d="m75 5 3 8-3 8-4-8Z"/>',
    bow: '<path d="M26 8c-20 17-20 39 0 56M26 8c53 7 53 49 0 56M26 8v56"/><path d="m21 30 39 3-39 4 7-4Z"/>',
    hammer: '<path d="m18 62 43-42M51 11l22 22M45 17 59 3l22 22-14 14Z"/><path d="m11 57 10 10"/>',
    wings: '<path d="M49 56C34 33 21 18 8 14c1 23 11 39 33 46M51 56c15-23 28-38 41-42-1 23-11 39-33 46"/><path d="M18 24c12 5 22 14 29 28M82 24C70 29 60 38 53 52"/>',
    daggers: '<path d="m12 60 28-38 8-5-2 10-27 39Zm42 0 28-38 8-5-2 10-27 39Z"/><path d="m9 55 15 12m27-12 15 12"/>',
    crown: '<path d="m13 23 20 14 17-24 17 24 20-14-8 39H21Z"/><path d="M22 52h56M50 13v39"/>',
    axe: '<path d="M19 66 61 20M53 13c14-5 28 0 37 10L66 46c-2-12-6-23-13-33Z"/><path d="m13 61 11 10"/>',
    shield: '<path d="M50 6 87 20v17c0 23-17 33-37 40-20-7-37-17-37-40V20Z"/><path d="M50 17v47M25 31h50"/>'
  };

  const state = {
    ownedIds: [],
    cartIds: new Set(),
    sourceIds: new Set(),
    targetId: null,
    chance: 0,
    mode: 'under',
    spinning: false,
    spinDuration: 4000,
    chancePresets: [60, 45, 30, 15],
    balance: 50000,
    marketView: 'inventory',
    isLoggedIn: false,
    profileTab: 'inventory',
    user: {
      name: 'DemoInvoker',
      steamId: 'ID 602197',
      avatar: null,
      level: 27,
      bestDropId: 8
    },
    marketSync: {
      status: 'offline',
      syncedAt: null
    },
    itemHistory: [],
    gameHistory: []
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const steamLoginUrl = '/api/auth/steam/login?return_to=/';
  const steamLogoutUrl = '/api/auth/logout?return_to=/';
  const profileStateKey = 'dotaupProfileState';
  const money = value => `${Math.round(value).toLocaleString('ru-RU')} COIN`;
  const itemById = id => items.find(item => item.id === Number(id));
  const ownedItems = () => state.ownedIds.map(itemById).filter(Boolean);
  const sourceTotal = () => [...state.sourceIds].reduce((sum, id) => sum + itemById(id).price, 0);
  const cartTotal = () => [...state.cartIds].reduce((sum, id) => sum + itemById(id).price, 0);

  function itemArt(item) {
    if (item.image) {
      return `<div class="item-art item-art-image"><img src="${item.image}" alt="${item.skin}" loading="lazy"></div>`;
    }
    return `<div class="item-art item-art-poster" style="--accent:${item.imageAccent || item.color}">
      <div class="item-poster-glow"></div>
      <div class="item-poster-top">${item.weapon}</div>
      <div class="item-poster-symbol">${item.imageLabel || item.skin.slice(0, 2)}</div>
      <div class="item-poster-bottom">${item.skin}</div>
      <svg viewBox="0 0 100 75" aria-hidden="true">${paths[item.shape]}</svg>
    </div>`;
  }

  function timestampLabel() {
    return new Date().toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  }

  function itemSnapshot(item) {
    return item ? {
      id: item.id,
      weapon: item.weapon,
      skin: item.skin,
      wear: item.wear,
      price: item.price,
      color: item.color,
      shape: item.shape,
      image: item.image || null,
      imageLabel: item.imageLabel || '',
      imageAccent: item.imageAccent || item.color
    } : null;
  }

  function saveProfileState() {
    try {
      const payload = {
        balance: state.balance,
        ownedIds: state.ownedIds,
        ownedItems: ownedItems().map(itemSnapshot).filter(Boolean),
        itemHistory: state.itemHistory,
        gameHistory: state.gameHistory,
        user: state.user,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(profileStateKey, JSON.stringify(payload));
    } catch {
      // Local persistence is only used to keep the demo UI in sync.
    }
  }

  function loadProfileState() {
    try {
      const saved = JSON.parse(localStorage.getItem(profileStateKey) || '{}');
      if (Number.isFinite(Number(saved.balance))) state.balance = Number(saved.balance);
      if (Array.isArray(saved.ownedIds)) state.ownedIds = saved.ownedIds.map(Number).filter(id => itemById(id));
      if (Array.isArray(saved.itemHistory)) state.itemHistory = saved.itemHistory;
      if (Array.isArray(saved.gameHistory)) state.gameHistory = saved.gameHistory;
      if (saved.user && typeof saved.user === 'object') state.user = { ...state.user, ...saved.user };
    } catch {
      saveProfileState();
    }
  }

  function setMarketSyncStatus(text, tone = '') {
    const node = $('#marketSyncStatus');
    if (!node) return;
    node.textContent = text;
    node.className = `market-sync-status${tone ? ` ${tone}` : ''}`;
  }

  async function hydrateMarketPrices() {
    setMarketSyncStatus('Steam Market: РѕР±РЅРѕРІР»СЏРµРј С†РµРЅС‹вЂ¦');
    try {
      const response = await fetch('/api/market-items', { cache: 'no-store' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (Array.isArray(data.items)) {
        const synced = new Map(data.items.map(item => [Number(item.id), item]));
        items.forEach(item => {
          const live = synced.get(item.id);
          if (!live) return;
          if (Number.isFinite(Number(live.price)) && Number(live.price) > 0) item.price = Math.round(Number(live.price));
          if (live.image) item.image = live.image;
          if (live.marketName) item.marketName = live.marketName;
        });
        state.marketSync.status = data.status || 'cached';
        state.marketSync.syncedAt = data.syncedAt || null;
        updateBalance();
        renderSelection();
        renderGrid();
        renderProfile();
      }
      const syncLabel = state.marketSync.syncedAt
        ? new Date(state.marketSync.syncedAt).toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })
        : 'С‚РѕР»СЊРєРѕ С‡С‚Рѕ';
      if (state.marketSync.status === 'refreshing') {
        setMarketSyncStatus(`Steam Market: РїРѕРєР°Р·Р°РЅ РєСЌС€ В· С„РѕРЅРѕРІРѕРµ РѕР±РЅРѕРІР»РµРЅРёРµ В· ${syncLabel}`, 'warn');
      } else {
        setMarketSyncStatus(`Steam Market: С†РµРЅС‹ СЃРёРЅС…СЂРѕРЅРёР·РёСЂРѕРІР°РЅС‹ В· ${syncLabel}`, 'ok');
      }
    } catch (error) {
      setMarketSyncStatus('Steam Market: РЅРµРґРѕСЃС‚СѓРїРµРЅ, РїРѕРєР°Р·Р°РЅС‹ СЃРѕС…СЂР°РЅС‘РЅРЅС‹Рµ С†РµРЅС‹', 'warn');
    }
  }

  function updateBalance() {
    $$('#balanceValue').forEach(node => { node.textContent = money(state.balance); });
    const profileBalance = $('#profileBalanceValue');
    if (profileBalance) profileBalance.textContent = money(state.balance);
    saveProfileState();
  }

  function renderLive() {
    const events = [
      ['NOVA', items[0], items[5]], ['FROST', items[1], items[7]], ['KIRA', items[8], items[4]],
      ['VOID', items[2], items[10]], ['ZEN', items[0], items[3]], ['AXE', items[9], items[6]]
    ];
    const markup = events.map(([user, from, to]) => `<article class="live-event" style="--c:${to.color}">
      <span class="live-avatar">${user[0]}</span><span class="mini-item"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[from.shape]}</svg></span>
      <span class="live-arrow">в†’</span><span class="mini-item"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[to.shape]}</svg></span>
      <span class="live-info"><strong>${to.skin}</strong><small>${user} В· ${money(to.price)}</small></span>
    </article>`).join('');
    $('#liveTrack').innerHTML = markup + markup;
  }

  function selectedRow(item) {
    return `<div class="selected-row" style="--rarity:${item.color}">${itemArt(item)}<span><strong>${item.skin}</strong><small>${item.weapon} В· ${item.wear}</small></span><b>${money(item.price)}</b></div>`;
  }

  function updateAuthUI() {
    $('.steam-button')?.classList.toggle('hidden-auth', state.isLoggedIn);
    $('.profile-chip')?.classList.toggle('show', state.isLoggedIn);
    if ($('#upgradeButton')) $('#upgradeButton').disabled = !state.isLoggedIn || state.spinning;
    if ($('#purchaseCartButton')) $('#purchaseCartButton').disabled = !state.isLoggedIn;
    if ($('#profileName')) $('#profileName').textContent = state.user.name;
    if ($('#profileSteamId')) $('#profileSteamId').textContent = state.user.steamId;
    if ($('#profileLevel')) $('#profileLevel').textContent = `LVL ${state.user.level}`;
    syncSteamAvatars();
  }

  function userInitials(name) {
    const clean = String(name || 'Steam').replace(/[^\p{L}\p{N}\s_-]/gu, '').trim();
    return clean.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase() || 'ST';
  }

  function syncSteamAvatars() {
    $$('.profile-avatar').forEach(avatar => {
      avatar.textContent = userInitials(state.user.name);
      if (state.user.avatar) {
        avatar.classList.add('has-image');
        avatar.style.backgroundImage = `url("${state.user.avatar}")`;
      } else {
        avatar.classList.remove('has-image');
        avatar.style.backgroundImage = '';
      }
    });
  }

  function requireAuth() {
    if (state.isLoggedIn) return true;
    window.top.location.href = steamLoginUrl;
    showToast('РЎРЅР°С‡Р°Р»Р° РІРѕР№РґРё РІ Р°РєРєР°СѓРЅС‚ Steam', 'error');
    return false;
  }

  async function hydrateSteamSession() {
    try {
      const response = await fetch('/api/auth/me', { credentials: 'include', cache: 'no-store' });
      const payload = await response.json();
      state.isLoggedIn = Boolean(payload.authenticated);
      if (payload.user) {
        state.user.name = payload.user.displayName || state.user.name;
        state.user.steamId = payload.user.steamId ? `ID ${payload.user.steamId}` : state.user.steamId;
        state.user.avatar = payload.user.avatar || null;
        saveProfileState();
      }
    } catch {
      state.isLoggedIn = false;
    }
    updateAuthUI();
    renderSelection();
    renderProfile();
  }

  async function hydrateSteamSessionAfterReturn() {
    const params = new URLSearchParams(window.location.search);
    const authError = params.get('auth_error');
    const justReturned = params.get('steam_auth') === 'ok';

    if (authError) {
      showToast('Steam login failed. Try again from the browser, not inside the Steam app.', 'error');
      window.history.replaceState({}, '', window.location.pathname);
      return hydrateSteamSession();
    }

    if (!justReturned) return hydrateSteamSession();

    const buttonLabel = $('#steamLoginButton span');
    if (buttonLabel) buttonLabel.textContent = 'Проверяем Steam...';

    for (let attempt = 0; attempt < 5; attempt += 1) {
      await hydrateSteamSession();
      if (state.isLoggedIn) {
        showToast('Steam подключен', 'success');
        window.history.replaceState({}, '', window.location.pathname);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 450));
    }

    if (buttonLabel) buttonLabel.textContent = 'Войти через Steam';
    showToast('Steam не вернул сессию. Открой сайт в обычном браузере и попробуй ещё раз.', 'error');
    window.history.replaceState({}, '', window.location.pathname);
  }

  function renderSelection() {
    const selected = [...state.sourceIds].map(itemById);
    $('#selectedSources').innerHTML = selected.length
      ? selected.map(selectedRow).join('')
      : '<div class="empty-state"><div class="plus-ring">+</div><strong>РРЅРІРµРЅС‚Р°СЂСЊ РїСѓСЃС‚</strong><span>РљСѓРїРё РїСЂРµРґРјРµС‚С‹ РІ РјР°РіР°Р·РёРЅРµ РЅРёР¶Рµ</span></div>';

    const target = itemById(state.targetId);
    $('#selectedTarget').innerHTML = target
      ? selectedRow(target)
      : '<div class="empty-state"><div class="plus-ring">+</div><strong>Р’С‹Р±РµСЂРё РЅР°РіСЂР°РґСѓ</strong><span>Р¦РµР»СЊ РґР»СЏ Р°РїРіСЂРµР№РґР° РїРѕСЏРІРёС‚СЃСЏ Р·РґРµСЃСЊ</span></div>';

    $('#selectedCount').textContent = selected.length;
    $('#mobileSourceCount').textContent = selected.length;
    $('#sourceTotal').textContent = money(sourceTotal());
    $('#targetPrice').textContent = target ? money(target.price) : '$0.00';
    $('#targetMultiplier').textContent = target && sourceTotal() ? `x${(target.price / sourceTotal()).toFixed(2)}` : 'вЂ”';
    $('#upgradeCost').textContent = target && selected.length ? `${money(sourceTotal())} в†’ ${money(target.price)}` : 'РЎРѕР±РµСЂРё РёРЅРІРµРЅС‚Р°СЂСЊ Рё РІС‹Р±РµСЂРё С†РµР»СЊ';
    if (!state.spinning) $('#resultMessage').textContent = !state.isLoggedIn
      ? 'Р’РѕР№РґРё РІ Steam, С‡С‚РѕР±С‹ РЅР°С‡Р°С‚СЊ Р°РїРіСЂРµР№РґС‹'
      : target && selected.length ? 'РўРµСЂРјРёРЅР°Р» РіРѕС‚РѕРІ Рє Р·Р°РїСѓСЃРєСѓ' : 'Р’С‹Р±РµСЂРё РїСЂРµРґРјРµС‚С‹ РґР»СЏ Р°РїРіСЂРµР№РґР°';
    syncChanceToSelection();
    updateAuthUI();
  }

  function renderOwnedGrid() {
    const query = $('#sourceSearch').value.trim().toLowerCase();
    const min = Number($('#sourceMinPrice').value) || 0;
    const max = Number($('#sourceMaxPrice').value) || Infinity;
    const ownedVisible = ownedItems().filter(item => `${item.weapon} ${item.skin}`.toLowerCase().includes(query) && item.price >= min && item.price <= max);
    $('#inventoryEmptyNote').hidden = ownedVisible.length !== 0 || state.marketView !== 'inventory';

    if (!ownedVisible.length && state.marketView === 'inventory') {
      $('#sourceItemsFound').textContent = '0';
      $('#marketSourceTotal').textContent = money(sourceTotal());
      $('#sourceItemGrid').innerHTML = '<div class="no-items">РџРѕРєР° РїСѓСЃС‚Рѕ. РџРµСЂРµРєР»СЋС‡РёСЃСЊ РЅР° РјР°РіР°Р·РёРЅ Рё РґРѕР±Р°РІСЊ СЃРєРёРЅС‹ РІ РєРѕСЂР·РёРЅСѓ.</div>';
      return;
    }

    const pool = state.marketView === 'inventory'
      ? ownedVisible
      : items.filter(item => `${item.weapon} ${item.skin}`.toLowerCase().includes(query) && item.price >= min && item.price <= max);

    $('#sourceItemsFound').textContent = String(pool.length);
    $('#marketSourceTotal').textContent = state.marketView === 'inventory' ? money(sourceTotal()) : money(cartTotal());
    $('#sourceItemGrid').innerHTML = pool.length ? pool.map(item => {
      const selected = state.sourceIds.has(item.id);
      const owned = state.ownedIds.includes(item.id);
      const queued = state.cartIds.has(item.id);
      const canQueue = state.balance >= cartTotal() + item.price && !owned;
      const label = state.marketView === 'inventory'
        ? (selected ? 'Р’Р«Р‘Р РђРќРћ' : 'Р’Р«Р‘Р РђРўР¬')
        : (owned ? 'РљРЈРџР›Р•РќРћ' : queued ? 'Р’ РљРћР Р—РРќР•' : canQueue ? 'Р’ РљРћР Р—РРќРЈ' : 'РќР• РҐР’РђРўРђР•Рў');
      return `<article class="item-card${selected && state.marketView === 'inventory' ? ' selected' : ''}${owned && state.marketView === 'store' ? ' owned' : ''}${queued && state.marketView === 'store' ? ' queued' : ''}" style="--rarity:${item.color}" data-item-id="${item.id}">
        <div class="item-badges"><span class="wear">${item.wear}</span><i class="rarity-dot"></i></div>
        ${state.marketView === 'store' ? `<button class="cart-corner${queued ? ' active' : ''}" type="button" data-cart-toggle="${item.id}" aria-label="РљРѕСЂР·РёРЅР°">рџ›’</button>` : ''}
        ${itemArt(item)}<span class="item-name">${item.weapon}</span><strong class="item-skin">${item.skin}</strong>
        <div class="item-footer"><span class="item-price">${money(item.price)}</span><button class="select-item" type="button" ${state.marketView === 'store' && !owned && !queued && !canQueue ? 'disabled' : ''}>${label}</button></div>
      </article>`;
    }).join('') : '<div class="no-items">РџРѕ Р·Р°РґР°РЅРЅС‹Рј С„РёР»СЊС‚СЂР°Рј РїСЂРµРґРјРµС‚С‹ РЅРµ РЅР°Р№РґРµРЅС‹.</div>';
  }

  function renderTargetGrid() {
    const query = $('#targetSearch').value.trim().toLowerCase();
    const min = Number($('#targetMinPrice').value) || 0;
    const max = Number($('#targetMaxPrice').value) || Infinity;
    const total = sourceTotal();
    const visible = items.filter(item => `${item.weapon} ${item.skin}`.toLowerCase().includes(query) && item.price >= min && item.price <= max && item.price > Math.max(total, 0));
    $('#targetItemsFound').textContent = String(visible.length);
    $('#marketTargetPrice').textContent = state.targetId ? money(itemById(state.targetId).price) : '$0.00';
    $('#targetItemGrid').innerHTML = visible.length ? visible.map(item => {
      const selected = state.targetId === item.id;
      return `<article class="item-card${selected ? ' selected' : ''}" style="--rarity:${item.color}" data-item-id="${item.id}">
        <div class="item-badges"><span class="wear">${item.wear}</span><i class="rarity-dot"></i></div>
        ${itemArt(item)}<span class="item-name">${item.weapon}</span><strong class="item-skin">${item.skin}</strong>
        <div class="item-footer"><span class="item-price">${money(item.price)}</span><button class="select-item" type="button">${selected ? 'Р’Р«Р‘Р РђРќРћ' : 'Р¦Р•Р›Р¬'}</button></div>
      </article>`;
    }).join('') : '<div class="no-items">РЎРЅР°С‡Р°Р»Р° РІС‹Р±РµСЂРё РїСЂРµРґРјРµС‚С‹ РІ РёРЅРІРµРЅС‚Р°СЂРµ.</div>';
  }

  function renderGrid() {
    renderOwnedGrid();
    renderTargetGrid();
  }

  function setMarketView(view) {
    state.marketView = view;
    $$('[data-source-view]').forEach(button => button.classList.toggle('active', button.dataset.sourceView === view));
    $('#purchaseCartButton').hidden = view !== 'store';
    renderGrid();
  }

  function toggleCartItem(id) {
    if (!requireAuth()) return;
    const item = itemById(id);
    if (!item) return;
    if (state.ownedIds.includes(id)) return showToast('Р­С‚РѕС‚ СЃРєРёРЅ СѓР¶Рµ РєСѓРїР»РµРЅ', 'error');
    if (state.cartIds.has(id)) state.cartIds.delete(id);
    else {
      if (state.balance < cartTotal() + item.price) return showToast('РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ Р±Р°Р»Р°РЅСЃР° РґР»СЏ РєРѕСЂР·РёРЅС‹', 'error');
      state.cartIds.add(id);
    }
    renderGrid();
  }

  function purchaseCart() {
    if (!requireAuth()) return;
    const ids = [...state.cartIds];
    if (!ids.length) return showToast('РљРѕСЂР·РёРЅР° РїСѓСЃС‚Р°', 'error');
    const total = cartTotal();
    if (state.balance < total) return showToast('РќРµРґРѕСЃС‚Р°С‚РѕС‡РЅРѕ Р±Р°Р»Р°РЅСЃР°', 'error');
    state.balance -= total;
    ids.forEach(id => {
      if (!state.ownedIds.includes(id)) state.ownedIds.push(id);
    });
    state.cartIds.clear();
    updateBalance();
    renderGrid();
    renderSelection();
    renderProfile();
    showToast(`РљСѓРїР»РµРЅРѕ РїСЂРµРґРјРµС‚РѕРІ: ${ids.length}`, 'success');
  }

  function selectInventoryItem(id) {
    if (!requireAuth()) return;
    if (!state.ownedIds.includes(id)) return;
    if (state.sourceIds.has(id)) state.sourceIds.delete(id);
    else if (state.sourceIds.size < 3) state.sourceIds.add(id);
    else return showToast('РњРѕР¶РЅРѕ РІС‹Р±СЂР°С‚СЊ РЅРµ Р±РѕР»СЊС€Рµ С‚СЂС‘С… РїСЂРµРґРјРµС‚РѕРІ', 'error');
    if (state.targetId && itemById(state.targetId).price <= sourceTotal()) state.targetId = null;
    renderSelection();
    renderGrid();
  }

  function updateChance(value) {
    state.chance = Math.max(0, Math.min(95, Number(value)));
    $('#chanceValue').textContent = state.chance.toFixed(2);
    $('#chanceCircle').style.strokeDasharray = `${state.chance} 100`;
    const presets = $$('.multiplier-row button');
    const nearest = presets.reduce((best, button) => Math.abs(Number(button.dataset.chance) - state.chance) < Math.abs(Number(best.dataset.chance) - state.chance) ? button : best, presets[0]);
    presets.forEach(button => button.classList.toggle('active', button === nearest));
  }

  function syncChanceToSelection() {
    const target = itemById(state.targetId);
    updateChance(target && sourceTotal() ? (sourceTotal() / target.price) * 100 : 0);
  }

  function chooseTargetForChance(desiredChance) {
    if (!requireAuth()) return;
    const total = sourceTotal();
    if (!total) return showToast('РЎРЅР°С‡Р°Р»Р° РІС‹Р±РµСЂРё РїСЂРµРґРјРµС‚С‹ РёР· РёРЅРІРµРЅС‚Р°СЂСЏ', 'error');
    const desiredPrice = total * 100 / desiredChance;
    const candidates = items.filter(item => item.price > total);
    if (!candidates.length) return showToast('РџРѕРґС…РѕРґСЏС‰РёС… СЃРєРёРЅРѕРІ РїРѕРєР° РЅРµС‚', 'error');
    state.targetId = candidates.reduce((best, item) => Math.abs(item.price - desiredPrice) < Math.abs(best.price - desiredPrice) ? item : best, candidates[0]).id;
    renderSelection();
    renderGrid();
    showToast(`РџРѕРґРѕР±СЂР°РЅ С€Р°РЅСЃ ${desiredChance}%`, 'success');
  }

  function applyChancePresets(values) {
    state.chancePresets = values;
    $$('.multiplier-row button').forEach((button, index) => {
      button.dataset.chance = values[index];
      button.textContent = `${values[index]}%`;
    });
    $$('[data-chance-input]').forEach((input, index) => { input.value = values[index]; });
    updateChance(state.chance);
  }

  function loadChancePresets() {
    try {
      const saved = JSON.parse(localStorage.getItem('dotaupChancePresets'));
      if (Array.isArray(saved) && saved.length === 4 && saved.every(value => Number(value) >= 1 && Number(value) <= 95)) applyChancePresets(saved.map(Number));
      else applyChancePresets(state.chancePresets);
    } catch {
      applyChancePresets(state.chancePresets);
    }
  }

  function settleInventoryAfterUpgrade(win) {
    const spentIds = [...state.sourceIds];
    state.ownedIds = state.ownedIds.filter(id => !spentIds.includes(id));
    if (win && state.targetId && !state.ownedIds.includes(state.targetId)) {
      state.ownedIds.push(state.targetId);
      const wonItem = itemById(state.targetId);
      state.itemHistory.unshift({
        id: `win-${Date.now()}`,
        itemId: wonItem.id,
        price: wonItem.price,
        status: 'Р’С‹РёРіСЂР°РЅ',
        at: timestampLabel()
      });
    }
    state.sourceIds.clear();
    state.targetId = null;
  }

  function runUpgrade() {
    if (!requireAuth()) return;
    if (state.spinning) return;
    if (!state.sourceIds.size || !state.targetId) return showToast('Р’С‹Р±РµСЂРё РёСЃС…РѕРґРЅС‹Р№ Рё С†РµР»РµРІРѕР№ РїСЂРµРґРјРµС‚', 'error');
    const stake = sourceTotal();
    const chanceAtStart = state.chance;
    const targetAtStart = itemById(state.targetId);
    const roll = Math.random() * 100;
    const extraTurns = state.spinDuration === 1000 ? 3 : 6;
    const endAngle = extraTurns * 360 + (roll * 3.6);
    state.spinning = true;
    $('#upgradeButton').disabled = true;
    $('#radarWrap').classList.remove('spinning');
    $('#radarWrap').style.setProperty('--spin-duration', `${state.spinDuration}ms`);
    $('#radarWrap').style.setProperty('--spin-end', `${endAngle}deg`);
    void $('#radarWrap').offsetWidth;
    $('#radarWrap').classList.add('spinning');
    $('#resultMessage').className = 'result-message';
    $('#resultMessage').textContent = 'РџСЂРѕРІРµСЂСЏРµРј СЂРµР·СѓР»СЊС‚Р°С‚вЂ¦';
    setTimeout(() => {
      const win = state.mode === 'under' ? roll <= state.chance : roll >= 100 - state.chance;
      state.gameHistory.unshift({
        id: `game-${Date.now()}`,
        targetId: targetAtStart.id,
        targetSkin: targetAtStart.skin,
        chance: chanceAtStart,
        stake,
        roll,
        result: win ? 'Р’С‹РёРіСЂС‹С€' : 'РџСЂРѕРёРіСЂС‹С€',
        at: timestampLabel()
      });
      $('#resultMessage').className = `result-message ${win ? 'win' : 'lose'}`;
      $('#resultMessage').textContent = win ? `РЈРЎРџР•РҐ В· РІС‹РїР°Р»Рѕ ${roll.toFixed(2)}` : `РќР•РЈР”РђР§Рђ В· РІС‹РїР°Р»Рѕ ${roll.toFixed(2)}`;
      showToast(win ? `РђРїРіСЂРµР№Рґ СѓСЃРїРµС€РµРЅ: ${targetAtStart.skin}` : 'РђРїРіСЂРµР№Рґ РЅРµ РїСЂРѕС€С‘Р». РСЃС…РѕРґРЅС‹Рµ РїСЂРµРґРјРµС‚С‹ СЃРїРёСЃР°РЅС‹.', win ? 'success' : 'error');
      settleInventoryAfterUpgrade(win);
      state.spinning = false;
      $('#upgradeButton').disabled = false;
      $('#radarWrap').classList.remove('spinning');
      $('#radarPointer').style.transform = 'rotate(0deg)';
      renderSelection();
      renderGrid();
      renderProfile();
      saveProfileState();
    }, state.spinDuration);
  }

  function sellItem(id) {
    const item = itemById(id);
    if (!item || !state.ownedIds.includes(id)) return;
    state.ownedIds = state.ownedIds.filter(value => value !== id);
    state.sourceIds.delete(id);
    if (state.targetId === id) state.targetId = null;
    state.balance += item.price;
    updateBalance();
    renderSelection();
    renderGrid();
    renderProfile();
    showToast(`РџСЂРѕРґР°РЅ ${item.skin}`, 'success');
  }

  function sellAllItems() {
    if (!state.ownedIds.length) return showToast('РРЅРІРµРЅС‚Р°СЂСЊ РїСѓСЃС‚', 'error');
    const total = ownedItems().reduce((sum, item) => sum + item.price, 0);
    state.ownedIds = [];
    state.sourceIds.clear();
    state.targetId = null;
    state.balance += total;
    updateBalance();
    renderSelection();
    renderGrid();
    renderProfile();
    showToast(`РџСЂРѕРґР°РЅРѕ РІСЃС‘ РЅР° ${money(total)}`, 'success');
  }

  function withdrawItem(id) {
    const item = itemById(id);
    if (!item || !state.ownedIds.includes(id)) return;
    const tradeUrl = window.prompt('Вставь Steam trade-ссылку для вывода предмета');
    if (!tradeUrl) return;
    showToast(`Заявка на вывод ${item.skin} создана`, 'success');
  }

  function renderProfileInventory() {
    const itemsOwned = ownedItems();
    const wins = state.gameHistory.filter(game => game.result === 'Р’С‹РёРіСЂС‹С€').length;
    const bestWonEntry = [...state.itemHistory].sort((a, b) => b.price - a.price)[0];
    const bestWonItem = bestWonEntry ? itemById(bestWonEntry.itemId) : itemById(state.user.bestDropId);
    const soldValue = $('#profileSoldValue');
    const inventoryCount = String(itemsOwned.length);
    const itemHistoryCount = String(state.itemHistory.length);
    const gameHistoryCount = String(state.gameHistory.length);
    const winRate = state.gameHistory.length ? Math.round((wins / state.gameHistory.length) * 100) : 0;
    const bestWonPrice = bestWonEntry?.price || bestWonItem?.price || 0;

    $('#profileInventoryCount').textContent = inventoryCount;
    $('#profileInventoryCountBadge').textContent = inventoryCount;
    $('#profileSidebarItems').textContent = inventoryCount;
    $('#profileSidebarWins').textContent = String(wins);
    $('#profileItemHistoryCount').textContent = itemHistoryCount;
    $('#profileItemHistoryCountBadge').textContent = itemHistoryCount;
    $('#profileGameHistoryCount').textContent = gameHistoryCount;
    $('#profileGameHistoryCountBadge').textContent = gameHistoryCount;
    $('#profileActivityCount').textContent = String(itemsOwned.length + state.itemHistory.length + state.gameHistory.length);
    $('#profileReadyToSell').textContent = inventoryCount;
    $('#profileMarketState').textContent = `Р“РѕС‚РѕРІРѕ Рє РїСЂРѕРґР°Р¶Рµ: ${inventoryCount}`;
    $('#profileUpgradeCount').textContent = String(state.gameHistory.length);
    $('#profileWinRate').textContent = `Winrate: ${winRate}%`;
    $('#profileBestDropValue').textContent = money(bestWonPrice);
    $('#profileBestDropName').textContent = bestWonItem ? bestWonItem.skin : 'РџРѕРєР° Р±РµР· РІС‹РёРіСЂС‹С€РµР№';
    const bestDrop = itemById(state.user.bestDropId);
    if (soldValue) soldValue.textContent = money(0);
    if (bestDrop) {
      const displayDrop = bestWonItem || bestDrop;
      $('#profileBestDrop').innerHTML = `<div class="profile-drop-card" style="--rarity:${displayDrop.color}">${itemArt(displayDrop)}<div><strong>${displayDrop.skin}</strong><span>${displayDrop.weapon}</span><b>${money(bestWonPrice || displayDrop.price)}</b></div></div>`;
    }
    $('#profileInventoryGrid').innerHTML = itemsOwned.length ? itemsOwned.map(item => `
      <article class="profile-item-card" style="--rarity:${item.color}">
        <div class="profile-item-top"><span>${money(item.price)}</span><small>${item.wear}</small></div>
        ${itemArt(item)}
        <strong>${item.skin}</strong>
        <span>${item.weapon}</span>
        <div class="profile-item-actions">
          <button type="button" data-sell-item="${item.id}">РџСЂРѕРґР°С‚СЊ</button>
          <button type="button" data-withdraw-item="${item.id}">Р’С‹РІРµСЃС‚Рё РІ Steam</button>
        </div>
      </article>`).join('') : '<div class="profile-empty">РЈ РІР°СЃ РїРѕРєР° РЅРµС‚ РїСЂРµРґРјРµС‚РѕРІ</div>';
  }

  function renderProfileHistory() {
    $('#profileItemHistoryGrid').innerHTML = state.itemHistory.length ? state.itemHistory.map(entry => {
      const item = itemById(entry.itemId);
      if (!item) return '';
      return `<article class="profile-history-card" style="--rarity:${item.color}">
        <div class="profile-history-price">${money(entry.price)}</div>
        ${itemArt(item)}
        <strong>${entry.status}</strong>
        <span>${item.skin}</span>
        <small>${entry.at}</small>
      </article>`;
    }).join('') : '<div class="profile-empty">РСЃС‚РѕСЂРёСЏ РїСЂРµРґРјРµС‚РѕРІ РїРѕРєР° РїСѓСЃС‚Р°</div>';

    $('#profileGamesList').innerHTML = state.gameHistory.length ? state.gameHistory.map(game => `
      <article class="profile-game-row ${game.result === 'Р’С‹РёРіСЂС‹С€' ? 'win' : 'lose'}">
        <div><strong>${game.result}</strong><span>${game.targetSkin}</span></div>
        <div><strong>${game.chance.toFixed(2)}%</strong><span>РЁР°РЅСЃ</span></div>
        <div><strong>${money(game.stake)}</strong><span>РЎС‚Р°РІРєР°</span></div>
        <div><strong>${game.roll.toFixed(2)}</strong><span>Р’С‹РїР°Р»Рѕ</span></div>
        <div><strong>${game.at}</strong><span>Р’СЂРµРјСЏ</span></div>
      </article>`).join('') : '<div class="profile-empty">РСЃС‚РѕСЂРёСЏ РёРіСЂ РїРѕРєР° РїСѓСЃС‚Р°</div>';
  }

  function renderProfile() {
    renderProfileInventory();
    renderProfileHistory();
    const currentSection = {
      inventory: ['РРЅРІРµРЅС‚Р°СЂСЊ', 'Р’СЃРµ РїСЂРµРґРјРµС‚С‹ Р°РєРєР°СѓРЅС‚Р°'],
      items: ['РСЃС‚РѕСЂРёСЏ РїСЂРµРґРјРµС‚РѕРІ', 'РџРѕСЃР»РµРґРЅРёРµ РІС‹РёРіСЂР°РЅРЅС‹Рµ Рё РєСѓРїР»РµРЅРЅС‹Рµ РїСЂРµРґРјРµС‚С‹'],
      games: ['РСЃС‚РѕСЂРёСЏ РёРіСЂ', 'Р’СЃРµ Р°РїРіСЂРµР№РґС‹, С€Р°РЅСЃС‹ Рё СЂРµР·СѓР»СЊС‚Р°С‚С‹'],
    }[state.profileTab] || ['РџСЂРѕС„РёР»СЊ', ''];
    const currentSectionNode = $('#profileCurrentSection');
    const currentHintNode = $('#profileCurrentHint');
    if (currentSectionNode) currentSectionNode.textContent = currentSection[0];
    if (currentHintNode) currentHintNode.textContent = currentSection[1];
    $$('[data-profile-tab]').forEach(button => button.classList.toggle('active', button.dataset.profileTab === state.profileTab));
    $$('[data-profile-panel]').forEach(panel => panel.hidden = panel.dataset.profilePanel !== state.profileTab);
    updateBalance();
  }

  let toastTimer;
  function showToast(message, type = '') {
    const toast = $('#toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    toastTimer = setTimeout(() => { toast.className = 'toast'; }, 2800);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.modal-close', modal)?.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  $('#sourceItemGrid').addEventListener('click', event => {
    const cartButton = event.target.closest('[data-cart-toggle]');
    if (cartButton) {
      toggleCartItem(Number(cartButton.dataset.cartToggle));
      return;
    }
    const card = event.target.closest('.item-card');
    if (!card) return;
    const id = Number(card.dataset.itemId);
    if (state.marketView === 'store') toggleCartItem(id);
    else selectInventoryItem(id);
  });

  $('#targetItemGrid').addEventListener('click', event => {
    const card = event.target.closest('.item-card');
    if (!card) return;
    if (!requireAuth()) return;
    if (!state.sourceIds.size) return showToast('РЎРЅР°С‡Р°Р»Р° РІС‹Р±РµСЂРё РїСЂРµРґРјРµС‚С‹ РёР· РёРЅРІРµРЅС‚Р°СЂСЏ', 'error');
    state.targetId = Number(card.dataset.itemId);
    renderSelection();
    renderGrid();
  });

  $('#profileInventoryGrid').addEventListener('click', event => {
    const sellButton = event.target.closest('[data-sell-item]');
    if (sellButton) return sellItem(Number(sellButton.dataset.sellItem));
    const withdrawButton = event.target.closest('[data-withdraw-item]');
    if (withdrawButton) return withdrawItem(Number(withdrawButton.dataset.withdrawItem));
  });

  ['sourceSearch', 'sourceMinPrice', 'sourceMaxPrice', 'targetSearch', 'targetMinPrice', 'targetMaxPrice']
    .forEach(id => $(`#${id}`).addEventListener('input', renderGrid));

  $('#upgradeButton').addEventListener('click', runUpgrade);
  $('#clearSelection').addEventListener('click', () => {
    state.sourceIds.clear();
    state.targetId = null;
    renderSelection();
    renderGrid();
  });
  $('#randomTarget').addEventListener('click', () => {
    if (!requireAuth()) return;
    const candidates = items.filter(item => item.price > sourceTotal());
    if (!state.sourceIds.size || !candidates.length) return showToast('РЎРЅР°С‡Р°Р»Р° РІС‹Р±РµСЂРё РїСЂРµРґРјРµС‚С‹ РёР· РёРЅРІРµРЅС‚Р°СЂСЏ', 'error');
    state.targetId = candidates[Math.floor(Math.random() * candidates.length)].id;
    renderSelection();
    renderGrid();
  });

  $$('.market-mobile-tabs button').forEach(button => button.addEventListener('click', () => {
    $$('.market-mobile-tabs button').forEach(item => item.classList.toggle('active', item === button));
    $$('[data-market-pane]').forEach(pane => pane.classList.toggle('active-mobile-market', pane.dataset.marketPane === button.dataset.marketTab));
  }));
  $$('.source-view-switch button').forEach(button => button.addEventListener('click', () => setMarketView(button.dataset.sourceView)));
  $('#purchaseCartButton').addEventListener('click', purchaseCart);
  $$('.multiplier-row button').forEach(button => button.addEventListener('click', () => chooseTargetForChance(Number(button.dataset.chance))));
  $$('.speed-switch button').forEach(button => button.addEventListener('click', () => {
    state.spinDuration = button.dataset.speed === 'fast' ? 1000 : 4000;
    $$('.speed-switch button').forEach(item => item.classList.toggle('active', item === button));
  }));
  $('#chanceSettingsButton').addEventListener('click', () => {
    const editor = $('#chanceEditor');
    const open = editor.classList.toggle('open');
    editor.setAttribute('aria-hidden', String(!open));
    $('#chanceSettingsButton').setAttribute('aria-expanded', String(open));
  });
  $('#saveChancePresets').addEventListener('click', () => {
    const values = $$('[data-chance-input]').map(input => Number(input.value));
    if (values.some(value => !Number.isFinite(value) || value < 1 || value > 95)) return showToast('РЈРєР°Р¶Рё РїСЂРѕС†РµРЅС‚С‹ РѕС‚ 1 РґРѕ 95', 'error');
    applyChancePresets(values);
    localStorage.setItem('dotaupChancePresets', JSON.stringify(values));
    $('#chanceEditor').classList.remove('open');
    $('#chanceEditor').setAttribute('aria-hidden', 'true');
    $('#chanceSettingsButton').setAttribute('aria-expanded', 'false');
    showToast('РљРЅРѕРїРєРё РїСЂРѕС†РµРЅС‚РѕРІ СЃРѕС…СЂР°РЅРµРЅС‹', 'success');
  });
  $$('.mode-switch button').forEach(button => button.addEventListener('click', () => {
    state.mode = button.dataset.mode;
    $$('.mode-switch button').forEach(item => item.classList.toggle('active', item === button));
  }));
  $$('.mobile-tabs button').forEach(button => button.addEventListener('click', () => {
    $$('.mobile-tabs button').forEach(item => item.classList.toggle('active', item === button));
    $$('[data-mobile-panel]').forEach(panel => panel.classList.toggle('active-mobile', panel.dataset.mobilePanel === button.dataset.mobileTab));
  }));
  $$('[data-profile-tab]').forEach(button => button.addEventListener('click', () => {
    state.profileTab = button.dataset.profileTab;
    renderProfile();
  }));
  $('#sellAllButton').addEventListener('click', sellAllItems);
  $('#profileOpenButton').addEventListener('click', () => {
    window.top.location.href = '/profile';
  });
  $('#steamLoginButton')?.addEventListener('click', () => {
    window.top.location.href = steamLoginUrl;
  });

  $$('[data-modal-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modalOpen)));
  $$('[data-modal-close]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') $$('.modal.open').forEach(closeModal); });
  $('[data-demo-login]')?.addEventListener('click', event => {
    closeModal(event.target.closest('.modal'));
    window.top.location.href = steamLoginUrl;
  });
  $('[data-copy-hash]').addEventListener('click', () => navigator.clipboard?.writeText('9f4d-demo-seed-a81c').then(() => showToast('РҐРµС€ СЃРєРѕРїРёСЂРѕРІР°РЅ', 'success')).catch(() => showToast('РҐРµС€: 9f4d-demo-seed-a81c')));
  $('#activatePromo').addEventListener('click', () => {
    const valid = $('#promoInput').value.trim().toUpperCase() === 'DOTAUP2026';
    if (valid) {
      state.balance += 25;
      updateBalance();
      closeModal($('#bonusModal'));
      showToast('Р‘РѕРЅСѓСЃ $25.00 Р°РєС‚РёРІРёСЂРѕРІР°РЅ', 'success');
      renderGrid();
      renderProfile();
    } else showToast('РџСЂРѕРјРѕРєРѕРґ РЅРµ РЅР°Р№РґРµРЅ', 'error');
  });

  loadChancePresets();
  loadProfileState();
  updateBalance();
  setMarketSyncStatus('Steam Market: РїРѕРґРєР»СЋС‡РµРЅРёРµвЂ¦');
  renderLive();
  setMarketView('inventory');
  renderSelection();
  renderProfile();
  updateChance(state.chance);
  hydrateMarketPrices();
  hydrateSteamSessionAfterReturn();
})();


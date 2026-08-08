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
    { id: 30, weapon: 'Tiny', skin: 'Ancient Inheritance', wear: 'Prestige', price: 4820, color: '#ffc759', shape: 'hammer', imageLabel: 'Tiny', imageAccent: '#ffc759', image: 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/tiny.png' }
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
    balance: 1250,
    marketView: 'inventory',
    isLoggedIn: false,
    profileTab: 'inventory',
    user: {
      name: 'DemoInvoker',
      steamId: 'ID 602197',
      level: 27,
      bestDropId: 8
    },
    itemHistory: [],
    gameHistory: []
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
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

  function updateBalance() {
    $$('#balanceValue').forEach(node => { node.textContent = money(state.balance); });
    const profileBalance = $('#profileBalanceValue');
    if (profileBalance) profileBalance.textContent = money(state.balance);
  }

  function renderLive() {
    const events = [
      ['NOVA', items[0], items[5]], ['FROST', items[1], items[7]], ['KIRA', items[8], items[4]],
      ['VOID', items[2], items[10]], ['ZEN', items[0], items[3]], ['AXE', items[9], items[6]]
    ];
    const markup = events.map(([user, from, to]) => `<article class="live-event" style="--c:${to.color}">
      <span class="live-avatar">${user[0]}</span><span class="mini-item"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[from.shape]}</svg></span>
      <span class="live-arrow">→</span><span class="mini-item"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[to.shape]}</svg></span>
      <span class="live-info"><strong>${to.skin}</strong><small>${user} · ${money(to.price)}</small></span>
    </article>`).join('');
    $('#liveTrack').innerHTML = markup + markup;
  }

  function selectedRow(item) {
    return `<div class="selected-row" style="--rarity:${item.color}">${itemArt(item)}<span><strong>${item.skin}</strong><small>${item.weapon} · ${item.wear}</small></span><b>${money(item.price)}</b></div>`;
  }

  function updateAuthUI() {
    $('.steam-button')?.classList.toggle('hidden-auth', state.isLoggedIn);
    $('.profile-chip')?.classList.toggle('show', state.isLoggedIn);
    if ($('#upgradeButton')) $('#upgradeButton').disabled = !state.isLoggedIn || state.spinning;
    if ($('#purchaseCartButton')) $('#purchaseCartButton').disabled = !state.isLoggedIn;
    if ($('#profileName')) $('#profileName').textContent = state.user.name;
    if ($('#profileSteamId')) $('#profileSteamId').textContent = state.user.steamId;
    if ($('#profileLevel')) $('#profileLevel').textContent = `LVL ${state.user.level}`;
  }

  function requireAuth() {
    if (state.isLoggedIn) return true;
    openModal('loginModal');
    showToast('Сначала войди в аккаунт Steam', 'error');
    return false;
  }

  function renderSelection() {
    const selected = [...state.sourceIds].map(itemById);
    $('#selectedSources').innerHTML = selected.length
      ? selected.map(selectedRow).join('')
      : '<div class="empty-state"><div class="plus-ring">+</div><strong>Инвентарь пуст</strong><span>Купи предметы в магазине ниже</span></div>';

    const target = itemById(state.targetId);
    $('#selectedTarget').innerHTML = target
      ? selectedRow(target)
      : '<div class="empty-state"><div class="plus-ring">+</div><strong>Выбери награду</strong><span>Цель для апгрейда появится здесь</span></div>';

    $('#selectedCount').textContent = selected.length;
    $('#mobileSourceCount').textContent = selected.length;
    $('#sourceTotal').textContent = money(sourceTotal());
    $('#targetPrice').textContent = target ? money(target.price) : '$0.00';
    $('#targetMultiplier').textContent = target && sourceTotal() ? `x${(target.price / sourceTotal()).toFixed(2)}` : '—';
    $('#upgradeCost').textContent = target && selected.length ? `${money(sourceTotal())} → ${money(target.price)}` : 'Собери инвентарь и выбери цель';
    if (!state.spinning) $('#resultMessage').textContent = !state.isLoggedIn
      ? 'Войди в Steam, чтобы начать апгрейды'
      : target && selected.length ? 'Терминал готов к запуску' : 'Выбери предметы для апгрейда';
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
      $('#sourceItemGrid').innerHTML = '<div class="no-items">Пока пусто. Переключись на магазин и добавь скины в корзину.</div>';
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
        ? (selected ? 'ВЫБРАНО' : 'ВЫБРАТЬ')
        : (owned ? 'КУПЛЕНО' : queued ? 'В КОРЗИНЕ' : canQueue ? 'В КОРЗИНУ' : 'НЕ ХВАТАЕТ');
      return `<article class="item-card${selected && state.marketView === 'inventory' ? ' selected' : ''}${owned && state.marketView === 'store' ? ' owned' : ''}${queued && state.marketView === 'store' ? ' queued' : ''}" style="--rarity:${item.color}" data-item-id="${item.id}">
        <div class="item-badges"><span class="wear">${item.wear}</span><i class="rarity-dot"></i></div>
        ${state.marketView === 'store' ? `<button class="cart-corner${queued ? ' active' : ''}" type="button" data-cart-toggle="${item.id}" aria-label="Корзина">🛒</button>` : ''}
        ${itemArt(item)}<span class="item-name">${item.weapon}</span><strong class="item-skin">${item.skin}</strong>
        <div class="item-footer"><span class="item-price">${money(item.price)}</span><button class="select-item" type="button" ${state.marketView === 'store' && !owned && !queued && !canQueue ? 'disabled' : ''}>${label}</button></div>
      </article>`;
    }).join('') : '<div class="no-items">По заданным фильтрам предметы не найдены.</div>';
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
        <div class="item-footer"><span class="item-price">${money(item.price)}</span><button class="select-item" type="button">${selected ? 'ВЫБРАНО' : 'ЦЕЛЬ'}</button></div>
      </article>`;
    }).join('') : '<div class="no-items">Сначала выбери предметы в инвентаре.</div>';
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
    if (state.ownedIds.includes(id)) return showToast('Этот скин уже куплен', 'error');
    if (state.cartIds.has(id)) state.cartIds.delete(id);
    else {
      if (state.balance < cartTotal() + item.price) return showToast('Недостаточно баланса для корзины', 'error');
      state.cartIds.add(id);
    }
    renderGrid();
  }

  function purchaseCart() {
    if (!requireAuth()) return;
    const ids = [...state.cartIds];
    if (!ids.length) return showToast('Корзина пуста', 'error');
    const total = cartTotal();
    if (state.balance < total) return showToast('Недостаточно баланса', 'error');
    state.balance -= total;
    ids.forEach(id => {
      if (!state.ownedIds.includes(id)) state.ownedIds.push(id);
    });
    state.cartIds.clear();
    updateBalance();
    renderGrid();
    renderSelection();
    renderProfile();
    showToast(`Куплено предметов: ${ids.length}`, 'success');
  }

  function selectInventoryItem(id) {
    if (!requireAuth()) return;
    if (!state.ownedIds.includes(id)) return;
    if (state.sourceIds.has(id)) state.sourceIds.delete(id);
    else if (state.sourceIds.size < 3) state.sourceIds.add(id);
    else return showToast('Можно выбрать не больше трёх предметов', 'error');
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
    if (!total) return showToast('Сначала выбери предметы из инвентаря', 'error');
    const desiredPrice = total * 100 / desiredChance;
    const candidates = items.filter(item => item.price > total);
    if (!candidates.length) return showToast('Подходящих скинов пока нет', 'error');
    state.targetId = candidates.reduce((best, item) => Math.abs(item.price - desiredPrice) < Math.abs(best.price - desiredPrice) ? item : best, candidates[0]).id;
    renderSelection();
    renderGrid();
    showToast(`Подобран шанс ${desiredChance}%`, 'success');
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
        status: 'Выигран',
        at: timestampLabel()
      });
    }
    state.sourceIds.clear();
    state.targetId = null;
  }

  function runUpgrade() {
    if (!requireAuth()) return;
    if (state.spinning) return;
    if (!state.sourceIds.size || !state.targetId) return showToast('Выбери исходный и целевой предмет', 'error');
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
    $('#resultMessage').textContent = 'Проверяем результат…';
    setTimeout(() => {
      const win = state.mode === 'under' ? roll <= state.chance : roll >= 100 - state.chance;
      state.gameHistory.unshift({
        id: `game-${Date.now()}`,
        targetId: targetAtStart.id,
        targetSkin: targetAtStart.skin,
        chance: chanceAtStart,
        stake,
        roll,
        result: win ? 'Выигрыш' : 'Проигрыш',
        at: timestampLabel()
      });
      $('#resultMessage').className = `result-message ${win ? 'win' : 'lose'}`;
      $('#resultMessage').textContent = win ? `УСПЕХ · выпало ${roll.toFixed(2)}` : `НЕУДАЧА · выпало ${roll.toFixed(2)}`;
      showToast(win ? `Апгрейд успешен: ${targetAtStart.skin}` : 'Апгрейд не прошёл. Исходные предметы списаны.', win ? 'success' : 'error');
      settleInventoryAfterUpgrade(win);
      state.spinning = false;
      $('#upgradeButton').disabled = false;
      $('#radarWrap').classList.remove('spinning');
      $('#radarPointer').style.transform = 'rotate(0deg)';
      renderSelection();
      renderGrid();
      renderProfile();
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
    showToast(`Продан ${item.skin}`, 'success');
  }

  function sellAllItems() {
    if (!state.ownedIds.length) return showToast('Инвентарь пуст', 'error');
    const total = ownedItems().reduce((sum, item) => sum + item.price, 0);
    state.ownedIds = [];
    state.sourceIds.clear();
    state.targetId = null;
    state.balance += total;
    updateBalance();
    renderSelection();
    renderGrid();
    renderProfile();
    showToast(`Продано всё на ${money(total)}`, 'success');
  }

  function withdrawItem(id) {
    const item = itemById(id);
    if (!item || !state.ownedIds.includes(id)) return;
    showToast(`Демо-вывод ${item.skin} в Steam`, 'success');
  }

  function renderProfileInventory() {
    const itemsOwned = ownedItems();
    $('#profileInventoryCount').textContent = String(itemsOwned.length);
    $('#profileItemHistoryCount').textContent = String(state.itemHistory.length);
    $('#profileGameHistoryCount').textContent = String(state.gameHistory.length);
    const soldValue = $('#profileSoldValue');
    if (soldValue) soldValue.textContent = money(0);
    $('#profileUpgradeCount').textContent = String(state.gameHistory.length);
    const bestDrop = itemById(state.user.bestDropId);
    if (bestDrop) {
      $('#profileBestDrop').innerHTML = `<div class="profile-drop-card" style="--rarity:${bestDrop.color}">${itemArt(bestDrop)}<div><strong>${bestDrop.skin}</strong><span>${bestDrop.weapon}</span><b>${money(bestDrop.price)}</b></div></div>`;
    }
    $('#profileInventoryGrid').innerHTML = itemsOwned.length ? itemsOwned.map(item => `
      <article class="profile-item-card" style="--rarity:${item.color}">
        <div class="profile-item-top"><span>${money(item.price)}</span><small>${item.wear}</small></div>
        ${itemArt(item)}
        <strong>${item.skin}</strong>
        <span>${item.weapon}</span>
        <div class="profile-item-actions">
          <button type="button" data-sell-item="${item.id}">Продать</button>
          <button type="button" data-withdraw-item="${item.id}">Вывести в Steam</button>
        </div>
      </article>`).join('') : '<div class="profile-empty">У вас пока нет предметов</div>';
  }

  function renderProfileHistory() {
    $('#profileItemHistoryGrid').innerHTML = state.itemHistory.length ? state.itemHistory.map(entry => {
      const item = itemById(entry.itemId);
      return `<article class="profile-history-card" style="--rarity:${item.color}">
        <div class="profile-history-price">${money(entry.price)}</div>
        ${itemArt(item)}
        <strong>${entry.status}</strong>
        <span>${item.skin}</span>
        <small>${entry.at}</small>
      </article>`;
    }).join('') : '<div class="profile-empty">История предметов пока пуста</div>';

    $('#profileGamesList').innerHTML = state.gameHistory.length ? state.gameHistory.map(game => `
      <article class="profile-game-row ${game.result === 'Выигрыш' ? 'win' : 'lose'}">
        <div><strong>${game.result}</strong><span>${game.targetSkin}</span></div>
        <div><strong>${game.chance.toFixed(2)}%</strong><span>Шанс</span></div>
        <div><strong>${money(game.stake)}</strong><span>Ставка</span></div>
        <div><strong>${game.roll.toFixed(2)}</strong><span>Выпало</span></div>
        <div><strong>${game.at}</strong><span>Время</span></div>
      </article>`).join('') : '<div class="profile-empty">История игр пока пуста</div>';
  }

  function renderProfile() {
    renderProfileInventory();
    renderProfileHistory();
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
    if (!state.sourceIds.size) return showToast('Сначала выбери предметы из инвентаря', 'error');
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
    if (!state.sourceIds.size || !candidates.length) return showToast('Сначала выбери предметы из инвентаря', 'error');
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
    if (values.some(value => !Number.isFinite(value) || value < 1 || value > 95)) return showToast('Укажи проценты от 1 до 95', 'error');
    applyChancePresets(values);
    localStorage.setItem('dotaupChancePresets', JSON.stringify(values));
    $('#chanceEditor').classList.remove('open');
    $('#chanceEditor').setAttribute('aria-hidden', 'true');
    $('#chanceSettingsButton').setAttribute('aria-expanded', 'false');
    showToast('Кнопки процентов сохранены', 'success');
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
    if (!requireAuth()) return;
    renderProfile();
    openModal('profileModal');
  });

  $$('[data-modal-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modalOpen)));
  $$('[data-modal-close]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') $$('.modal.open').forEach(closeModal); });
  $('[data-demo-login]').addEventListener('click', event => {
    state.isLoggedIn = true;
    localStorage.setItem('dotaupSteamLoggedIn', '1');
    closeModal(event.target.closest('.modal'));
    updateAuthUI();
    renderSelection();
    renderProfile();
    showToast('Steam-аккаунт подключен', 'success');
  });
  $('[data-copy-hash]').addEventListener('click', () => navigator.clipboard?.writeText('9f4d-demo-seed-a81c').then(() => showToast('Хеш скопирован', 'success')).catch(() => showToast('Хеш: 9f4d-demo-seed-a81c')));
  $('#activatePromo').addEventListener('click', () => {
    const valid = $('#promoInput').value.trim().toUpperCase() === 'DOTAUP2026';
    if (valid) {
      state.balance += 25;
      updateBalance();
      closeModal($('#bonusModal'));
      showToast('Бонус $25.00 активирован', 'success');
      renderGrid();
      renderProfile();
    } else showToast('Промокод не найден', 'error');
  });

  loadChancePresets();
  state.isLoggedIn = localStorage.getItem('dotaupSteamLoggedIn') === '1';
  updateBalance();
  renderLive();
  setMarketView('inventory');
  renderSelection();
  renderProfile();
  updateChance(state.chance);
})();

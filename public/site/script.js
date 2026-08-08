(() => {
  'use strict';

  const items = [
    { id: 1, weapon: 'Phantom Blade', skin: 'Neon Rift', wear: 'FN', price: 18.4, color: '#4bb8ff', shape: 'blade' },
    { id: 2, weapon: 'Abyssal Hook', skin: 'Deep Current', wear: 'MW', price: 26.75, color: '#50c8ff', shape: 'hook' },
    { id: 3, weapon: 'Dragon Lance', skin: 'Ember Scale', wear: 'FT', price: 42.1, color: '#a878ff', shape: 'lance' },
    { id: 4, weapon: 'Arcane Staff', skin: 'Void Signal', wear: 'FN', price: 67.9, color: '#a878ff', shape: 'staff' },
    { id: 5, weapon: 'Crimson Edge', skin: 'Blood Circuit', wear: 'MW', price: 94.5, color: '#c368ff', shape: 'blade' },
    { id: 6, weapon: 'Celestial Bow', skin: 'Polar Light', wear: 'FN', price: 138.2, color: '#ff5576', shape: 'bow' },
    { id: 7, weapon: 'Titan Hammer', skin: 'Solar Core', wear: 'FT', price: 215, color: '#ff5576', shape: 'hammer' },
    { id: 8, weapon: 'Eternal Wings', skin: 'Astral Dominion', wear: 'FN', price: 389.9, color: '#ff5576', shape: 'wings' },
    { id: 9, weapon: 'Spectral Daggers', skin: 'Night Pulse', wear: 'MW', price: 31.25, color: '#48bfff', shape: 'daggers' },
    { id: 10, weapon: 'Oracle Crown', skin: 'Violet Omen', wear: 'FN', price: 76.6, color: '#a878ff', shape: 'crown' },
    { id: 11, weapon: 'Infernal Axe', skin: 'Molten Code', wear: 'FT', price: 164.8, color: '#ff5576', shape: 'axe' },
    { id: 12, weapon: 'Ancient Shield', skin: 'Emerald Guard', wear: 'MW', price: 55.3, color: '#a878ff', shape: 'shield' }
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
    isLoggedIn: false
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `$${value.toFixed(2)}`;
  const itemById = id => items.find(item => item.id === Number(id));
  const ownedItems = () => state.ownedIds.map(itemById).filter(Boolean);
  const sourceTotal = () => [...state.sourceIds].reduce((sum, id) => sum + itemById(id).price, 0);
  const cartTotal = () => [...state.cartIds].reduce((sum, id) => sum + itemById(id).price, 0);

  function itemArt(item) {
    return `<div class="item-art"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[item.shape]}</svg></div>`;
  }

  function updateBalance() {
    $$('#balanceValue').forEach(node => { node.textContent = money(state.balance); });
  }

  function updateAuthUI() {
    const loginButton = $('.steam-button');
    if (!loginButton) return;
    loginButton.classList.toggle('is-authenticated', state.isLoggedIn);
    $('span', loginButton).textContent = state.isLoggedIn ? 'Steam подключен' : 'Войти через Steam';
    $('#upgradeButton').disabled = !state.isLoggedIn || state.spinning;
    $('#purchaseCartButton').disabled = !state.isLoggedIn;
  }

  function requireAuth() {
    if (state.isLoggedIn) return true;
    openModal('loginModal');
    showToast('Сначала войди в аккаунт Steam', 'error');
    return false;
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
    if (!state.spinning) {
      $('#resultMessage').textContent = !state.isLoggedIn
        ? 'Войди в Steam, чтобы начать апгрейды'
        : target && selected.length ? 'Терминал готов к запуску' : 'Выбери предметы для апгрейда';
    }
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
    if (win && state.targetId && !state.ownedIds.includes(state.targetId)) state.ownedIds.push(state.targetId);
    state.sourceIds.clear();
    state.targetId = null;
  }

  function runUpgrade() {
    if (!requireAuth()) return;
    if (state.spinning) return;
    if (!state.sourceIds.size || !state.targetId) return showToast('Выбери исходный и целевой предмет', 'error');
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
      $('#resultMessage').className = `result-message ${win ? 'win' : 'lose'}`;
      $('#resultMessage').textContent = win ? `УСПЕХ · выпало ${roll.toFixed(2)}` : `НЕУДАЧА · выпало ${roll.toFixed(2)}`;
      showToast(win ? `Апгрейд успешен: ${itemById(state.targetId).skin}` : 'Апгрейд не прошёл. Исходные предметы списаны.', win ? 'success' : 'error');
      settleInventoryAfterUpgrade(win);
      state.spinning = false;
      $('#upgradeButton').disabled = false;
      $('#radarWrap').classList.remove('spinning');
      $('#radarPointer').style.transform = 'rotate(0deg)';
      renderSelection();
      renderGrid();
    }, state.spinDuration);
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
  $$('[data-modal-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modalOpen)));
  $$('[data-modal-close]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') $$('.modal.open').forEach(closeModal); });
  $('[data-demo-login]').addEventListener('click', event => {
    state.isLoggedIn = true;
    localStorage.setItem('dotaupSteamLoggedIn', '1');
    closeModal(event.target.closest('.modal'));
    updateAuthUI();
    renderSelection();
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
    } else showToast('Промокод не найден', 'error');
  });

  loadChancePresets();
  state.isLoggedIn = localStorage.getItem('dotaupSteamLoggedIn') === '1';
  updateBalance();
  renderLive();
  setMarketView('inventory');
  renderSelection();
  updateChance(state.chance);
})();

(() => {
  'use strict';

  const items = [
    { id: 1, weapon: 'Phantom Blade', skin: 'Neon Rift', wear: 'FN', price: 18.40, rarity: 'consumer', color: '#4bb8ff', shape: 'blade' },
    { id: 2, weapon: 'Abyssal Hook', skin: 'Deep Current', wear: 'MW', price: 26.75, rarity: 'consumer', color: '#50c8ff', shape: 'hook' },
    { id: 3, weapon: 'Dragon Lance', skin: 'Ember Scale', wear: 'FT', price: 42.10, rarity: 'classified', color: '#a878ff', shape: 'lance' },
    { id: 4, weapon: 'Arcane Staff', skin: 'Void Signal', wear: 'FN', price: 67.90, rarity: 'classified', color: '#a878ff', shape: 'staff' },
    { id: 5, weapon: 'Crimson Edge', skin: 'Blood Circuit', wear: 'MW', price: 94.50, rarity: 'classified', color: '#c368ff', shape: 'blade' },
    { id: 6, weapon: 'Celestial Bow', skin: 'Polar Light', wear: 'FN', price: 138.20, rarity: 'covert', color: '#ff5576', shape: 'bow' },
    { id: 7, weapon: 'Titan Hammer', skin: 'Solar Core', wear: 'FT', price: 215.00, rarity: 'covert', color: '#ff5576', shape: 'hammer' },
    { id: 8, weapon: 'Eternal Wings', skin: 'Astral Dominion', wear: 'FN', price: 389.90, rarity: 'covert', color: '#ff5576', shape: 'wings' },
    { id: 9, weapon: 'Spectral Daggers', skin: 'Night Pulse', wear: 'MW', price: 31.25, rarity: 'consumer', color: '#48bfff', shape: 'daggers' },
    { id: 10, weapon: 'Oracle Crown', skin: 'Violet Omen', wear: 'FN', price: 76.60, rarity: 'classified', color: '#a878ff', shape: 'crown' },
    { id: 11, weapon: 'Infernal Axe', skin: 'Molten Code', wear: 'FT', price: 164.80, rarity: 'covert', color: '#ff5576', shape: 'axe' },
    { id: 12, weapon: 'Ancient Shield', skin: 'Emerald Guard', wear: 'MW', price: 55.30, rarity: 'classified', color: '#a878ff', shape: 'shield' }
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

  const state = { sourceIds: new Set(), targetId: null, chance: 45, mode: 'under', spinning: false, spinDuration: 4000, chancePresets: [60, 45, 30, 15], balance: 1250 };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const money = value => `$${value.toFixed(2)}`;
  const sourceTotal = () => [...state.sourceIds].reduce((sum, id) => sum + items.find(item => item.id === id).price, 0);
  const itemById = id => items.find(item => item.id === Number(id));

  function itemArt(item) {
    return `<div class="item-art"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[item.shape]}</svg></div>`;
  }

  function renderLive() {
    const events = [
      ['NOVA', items[0], items[5]], ['FROST', items[1], items[7]], ['KIRA', items[8], items[4]],
      ['VOID', items[2], items[10]], ['ZEN', items[0], items[3]], ['AXE', items[9], items[6]]
    ];
    const markup = events.map(([user, from, to]) => `<article class="live-event" style="--c:${to.color}">
      <span class="live-avatar">${user[0]}</span><span class="mini-item"><svg viewBox="0 0 100 75" aria-hidden="true">${paths[to.shape]}</svg></span>
      <span class="live-info"><strong>${to.skin}</strong><small>${user} · ${money(to.price)}</small></span><span class="live-arrow">↗</span>
    </article>`).join('');
    $('#liveTrack').innerHTML = markup + markup;
  }

  function renderMarket(mode) {
    const prefix = mode === 'source' ? 'source' : 'target';
    const query = $(`#${prefix}Search`).value.trim().toLowerCase();
    const min = Number($(`#${prefix}MinPrice`).value) || 0;
    const max = Number($(`#${prefix}MaxPrice`).value) || Infinity;
    const total = sourceTotal();
    const visible = items.filter(item => {
      const matchesText = `${item.weapon} ${item.skin}`.toLowerCase().includes(query);
      const matchesPrice = item.price >= min && item.price <= max;
      const matchesTarget = mode === 'source' || item.price > Math.max(total, 0);
      return matchesText && matchesPrice && matchesTarget;
    });
    $(`#${prefix}ItemsFound`).textContent = visible.length;
    $(`#${prefix}ItemGrid`).innerHTML = visible.length ? visible.map(item => {
      const selected = mode === 'source' ? state.sourceIds.has(item.id) : state.targetId === item.id;
      return `<article class="item-card${selected ? ' selected' : ''}" style="--rarity:${item.color}" data-item-id="${item.id}" data-item-mode="${mode}">
        <div class="item-badges"><span class="wear">${item.wear}</span><i class="rarity-dot"></i></div>
        ${itemArt(item)}<span class="item-name">${item.weapon}</span><strong class="item-skin">${item.skin}</strong>
        <div class="item-footer"><span class="item-price">${money(item.price)}</span><button class="select-item" type="button" aria-label="Выбрать ${item.skin}">${selected ? 'ВЫБРАНО' : 'ВЫБРАТЬ'}</button></div>
      </article>`;
    }).join('') : '<div class="no-items">По заданным параметрам предметов нет.</div>';
  }

  function renderGrid() {
    renderMarket('source');
    renderMarket('target');
    $('#marketSourceTotal').textContent = money(sourceTotal());
    $('#marketTargetPrice').textContent = state.targetId ? money(itemById(state.targetId).price) : '$0.00';
  }

  function selectedRow(item) {
    return `<div class="selected-row" style="--rarity:${item.color}">${itemArt(item)}<span><strong>${item.skin}</strong><small>${item.weapon} · ${item.wear}</small></span><b>${money(item.price)}</b></div>`;
  }

  function renderSelection() {
    const selected = [...state.sourceIds].map(itemById);
    $('#selectedSources').innerHTML = selected.length ? selected.map(selectedRow).join('') : '<div class="empty-state"><div class="plus-ring">+</div><strong>Выбери предметы</strong><span>Можно выбрать несколько</span></div>';
    const target = itemById(state.targetId);
    $('#selectedTarget').innerHTML = target ? selectedRow(target) : '<div class="empty-state"><div class="plus-ring">+</div><strong>Выбери награду</strong><span>Предмет, который хочешь получить</span></div>';
    $('#selectedCount').textContent = selected.length;
    $('#mobileSourceCount').textContent = selected.length;
    $('#sourceTotal').textContent = money(sourceTotal());
    $('#targetPrice').textContent = target ? money(target.price) : '$0.00';
    $('#targetMultiplier').textContent = target && sourceTotal() ? `x${(target.price / sourceTotal()).toFixed(2)}` : '—';
    $('#upgradeCost').textContent = target && selected.length ? `${money(sourceTotal())} → ${money(target.price)}` : 'Выбери предметы';
    if (!state.spinning) $('#resultMessage').textContent = target && selected.length ? 'Терминал готов к запуску' : 'Выбери предметы для апгрейда';
    syncChanceToSelection();
  }

  function selectItem(mode, id) {
    if (mode === 'source') {
      if (state.sourceIds.has(id)) state.sourceIds.delete(id);
      else if (state.sourceIds.size < 3) state.sourceIds.add(id);
      else return showToast('Можно выбрать не больше трёх предметов', 'error');
      if (state.targetId && itemById(state.targetId).price <= sourceTotal()) state.targetId = null;
    } else {
      if (!state.sourceIds.size) return showToast('Сначала выбери предмет из своего инвентаря', 'error');
      state.targetId = id;
    }
    renderSelection(); renderGrid();
  }

  function updateChance(value) {
    state.chance = Math.max(0, Math.min(95, Number(value)));
    $('#chanceValue').textContent = state.chance.toFixed(2);
    $('#chanceCircle').style.strokeDasharray = `${state.chance} 100`;
    $('#radarPointer').style.transform = `rotate(${state.chance * 3.6}deg)`;
    const presets = $$('.multiplier-row button');
    const nearest = presets.reduce((best, button) => Math.abs(Number(button.dataset.chance) - state.chance) < Math.abs(Number(best.dataset.chance) - state.chance) ? button : best, presets[0]);
    presets.forEach(button => button.classList.toggle('active', button === nearest));
  }

  function syncChanceToSelection() {
    const target = itemById(state.targetId);
    updateChance(target && sourceTotal() ? (sourceTotal() / target.price) * 100 : 0);
  }

  function chooseTargetForChance(desiredChance) {
    const total = sourceTotal();
    if (!total) return showToast('Сначала выбери предметы из инвентаря', 'error');
    const desiredPrice = total * 100 / desiredChance;
    const candidates = items.filter(item => item.price > total);
    if (!candidates.length) return showToast('Подходящих скинов пока нет', 'error');
    state.targetId = candidates.reduce((best, item) => Math.abs(item.price - desiredPrice) < Math.abs(best.price - desiredPrice) ? item : best, candidates[0]).id;
    renderSelection();
    renderGrid();
    showToast(`Подобран ближайший скин под шанс ${desiredChance}%`, 'success');
  }

  function applyChancePresets(values) {
    state.chancePresets = values;
    $$('.multiplier-row button').forEach((button, index) => {
      button.dataset.chance = values[index];
      button.textContent = `${values[index]}%`;
    });
    $$('[data-chance-input]').forEach((input, index) => input.value = values[index]);
    updateChance(state.chance);
  }

  function loadChancePresets() {
    try {
      const saved = JSON.parse(localStorage.getItem('dotaupChancePresets'));
      if (Array.isArray(saved) && saved.length === 4 && saved.every(value => Number(value) >= 1 && Number(value) <= 95)) applyChancePresets(saved.map(Number));
      else applyChancePresets(state.chancePresets);
    } catch { applyChancePresets(state.chancePresets); }
  }

  function runUpgrade() {
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
      showToast(win ? `Апгрейд успешен: ${itemById(state.targetId).skin}` : 'Апгрейд не прошёл. Попробуй ещё раз.', win ? 'success' : 'error');
      state.spinning = false;
      $('#upgradeButton').disabled = false;
      $('#radarWrap').classList.remove('spinning');
      $('#radarPointer').style.transform = 'rotate(0deg)';
    }, state.spinDuration);
  }

  let toastTimer;
  function showToast(message, type = '') {
    const toast = $('#toast');
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    toastTimer = setTimeout(() => toast.className = 'toast', 2800);
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    $('.modal-close', modal)?.focus();
  }

  function closeModal(modal) {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  ['sourceItemGrid', 'targetItemGrid'].forEach(gridId => {
    $(`#${gridId}`).addEventListener('click', event => {
      const card = event.target.closest('.item-card');
      if (card) selectItem(card.dataset.itemMode, Number(card.dataset.itemId));
    });
  });
  ['sourceSearch', 'sourceMinPrice', 'sourceMaxPrice', 'targetSearch', 'targetMinPrice', 'targetMaxPrice']
    .forEach(id => $(`#${id}`).addEventListener('input', renderGrid));
  $('#upgradeButton').addEventListener('click', runUpgrade);
  $('#clearSelection').addEventListener('click', () => { state.sourceIds.clear(); renderSelection(); renderGrid(); });
  $('#randomTarget').addEventListener('click', () => {
    const candidates = items.filter(item => item.price > sourceTotal());
    if (!state.sourceIds.size || !candidates.length) return showToast('Сначала выбери предмет из инвентаря', 'error');
    state.targetId = candidates[Math.floor(Math.random() * candidates.length)].id;
    renderSelection(); renderGrid();
  });
  $$('.market-mobile-tabs button').forEach(button => button.addEventListener('click', () => {
    $$('.market-mobile-tabs button').forEach(item => item.classList.toggle('active', item === button));
    $$('[data-market-pane]').forEach(pane => pane.classList.toggle('active-mobile-market', pane.dataset.marketPane === button.dataset.marketTab));
  }));
  $$('.multiplier-row button').forEach(button => button.addEventListener('click', () => chooseTargetForChance(Number(button.dataset.chance))));
  $$('.speed-switch button').forEach(button => button.addEventListener('click', () => {
    state.spinDuration = button.dataset.speed === 'fast' ? 1000 : 4000;
    $$('.speed-switch button').forEach(item => item.classList.toggle('active', item === button));
    showToast(button.dataset.speed === 'fast' ? 'FAST-прокрутка: 1 секунда' : 'Обычная прокрутка: 4 секунды', 'success');
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
  $('#menuToggle').addEventListener('click', () => {
    const open = $('.main-nav').classList.toggle('open');
    $('#menuToggle').setAttribute('aria-expanded', String(open));
  });
  $$('[data-modal-open]').forEach(button => button.addEventListener('click', () => openModal(button.dataset.modalOpen)));
  $$('[data-modal-close]').forEach(button => button.addEventListener('click', () => closeModal(button.closest('.modal'))));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') $$('.modal.open').forEach(closeModal); });
  $('[data-demo-login]').addEventListener('click', event => { closeModal(event.target.closest('.modal')); showToast('Демо-авторизация выполнена', 'success'); });
  $('[data-copy-hash]').addEventListener('click', () => navigator.clipboard?.writeText('9f4d-demo-seed-a81c').then(() => showToast('Хеш скопирован', 'success')).catch(() => showToast('Хеш: 9f4d-demo-seed-a81c')));
  $('#activatePromo').addEventListener('click', () => {
    const valid = $('#promoInput').value.trim().toUpperCase() === 'DOTAUP2026';
    if (valid) { state.balance += 25; $('#balanceValue').textContent = money(state.balance); closeModal($('#bonusModal')); showToast('Бонус $25.00 активирован', 'success'); }
    else showToast('Промокод не найден', 'error');
  });

  loadChancePresets(); renderLive(); renderGrid(); renderSelection(); updateChance(state.chance);
})();

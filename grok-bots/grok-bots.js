/* /grok-bots — X Freeze's Grok bots.
 * Data: window.FreezeStackGrokBots (data/grok-bots-data.js); pictures: window.FreezeStackGrokScenes,
 * icons: window.FreezeStackGrokIcons (for bots without a picture);
 * faces: window.FreezeStackGrokFaces (only for the faint faces in the background).
 * The top is a front desk: the visitor finishes "I need help with…" and the best-fitting bot steps
 * forward. Below, the bots are staff ID badges grouped into departments; a badge opens the
 * bot's résumé. Hire links are only followed when they are https x.ai / grok.com. */
(function () {
  'use strict';
  var data = window.FreezeStackGrokBots || { categories: [], bots: [] };
  var FACES = window.FreezeStackGrokFaces || [];
  var ICONS = window.FreezeStackGrokIcons || {};
  var SCENES = window.FreezeStackGrokScenes || {};
  var sceneUid = 0;
  // Each bot's colour (from its Grok face) picks its gradient.
  var HUE = { '#804EE0': 'violet', '#E02A88': 'pink', '#FF6700': 'orange', '#E02135': 'red', '#777777': 'indigo', '#009957': 'green',
    '#FFFFFF': 'sky', '#0E74E0': 'blue', '#855C36': 'amber', '#FF9800': 'gold', '#00A592': 'teal' };
  var cats = data.categories || [];
  var bots = (data.bots || []).filter(function (b) { return b && b.id && b.name; });
  bots.forEach(function (b, i) { b.staffNo = 'XF-' + String(i + 1).padStart(3, '0'); });
  var byId = {};
  bots.forEach(function (b) { byId[b.id] = b; });
  var catName = {};
  cats.forEach(function (c) { catName[c.id] = c.name; });
  var state = { cat: 'all', q: '' };
  var SVG = 'http://www.w3.org/2000/svg';
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  function h(tag, attrs) {
    var node = tag.indexOf('svg:') === 0 ? document.createElementNS(SVG, tag.slice(4)) : document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined || v === false) return;
      if (k === 'text') node.textContent = v;
      else if (k === 'on') Object.keys(v).forEach(function (e) { node.addEventListener(e, v[e]); });
      else node.setAttribute(k === 'className' ? 'class' : k, v === true ? '' : String(v));
    });
    for (var i = 2; i < arguments.length; i++) {
      [].concat(arguments[i]).forEach(function (c) { if (c !== null && c !== undefined && c !== false) node.append(c.nodeType ? c : document.createTextNode(String(c))); });
    }
    return node;
  }
  function safeLink(url) {
    try { var u = new URL(url); return u.protocol === 'https:' && /(^|\.)(x\.ai|grok\.com)$/.test(u.hostname) ? u.href : ''; }
    catch (e) { return ''; }
  }
  function hueOf(b) { return HUE[String(b.color).toUpperCase()] || 'indigo'; }

  /* ---------- faces (background only) ---------- */
  function face(b, size) {
    var f = FACES[b.face] || FACES[0];
    var svg = h('svg:svg', { viewBox: f ? f.vb : '0 0 229 229', width: size, height: size, className: 'gk-face', 'aria-hidden': 'true' });
    if (!f) return svg;
    var g = h('svg:g', { transform: f.g });
    g.append(h('svg:path', { d: f.head, className: 'gk-face__head' }));
    f.eyes.forEach(function (e) { g.append(h('svg:path', { d: e.d, transform: e.t || null, className: 'gk-face__eye' })); });
    svg.append(g);
    return svg;
  }

  /* ---------- tiles: the bot's animated picture on its colour gradient ---------- */
  function tile(b, size) {
    var svg;
    if (SCENES[b.id]) {
      svg = h('svg:svg', { viewBox: '0 0 48 48', className: 'gk-scene', 'aria-hidden': 'true' });
      svg.innerHTML = SCENES[b.id]('gks' + (++sceneUid));
      svg.style.setProperty('--sw', size >= 90 ? 1.45 : size >= 56 ? 2.05 : 2.4);
      animate(svg);
    } else {
      svg = h('svg:svg', { viewBox: '0 0 24 24', className: 'gk-tile__icon', 'aria-hidden': 'true' });
      (ICONS[b.icon] || []).forEach(function (n) { svg.append(h('svg:' + n[0], n[1])); });
    }
    return h('span', { className: 'gk-tile', 'data-hue': hueOf(b), style: 'width:' + size + 'px;height:' + size + 'px' }, svg);
  }
  // Pictures only play while on screen, start at different points so they don't move in step,
  // and hold a still frame when the visitor prefers reduced motion.
  var seen = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) e.target.unpauseAnimations(); else e.target.pauseAnimations(); });
  }) : null;
  function animate(svg) {
    if (typeof svg.pauseAnimations !== 'function') return;
    requestAnimationFrame(function () {
      if (reduceMotion) { svg.pauseAnimations(); svg.setCurrentTime(1.6); return; }
      svg.setCurrentTime(Math.random() * 4);
      if (seen) { svg.pauseAnimations(); seen.observe(svg); }
    });
  }
  function forget(root) {
    if (seen && root) root.querySelectorAll('.gk-scene').forEach(function (s) { seen.unobserve(s); });
  }

  /* ---------- background: a few faint faces ---------- */
  function renderGhosts() {
    var wrap = document.getElementById('gk-ghosts');
    if (!wrap || !bots.length) return;
    // [bot index, left %, top %, size px, blur px]
    var spots = [[3, 6, 20, 230, 6], [11, 90, 16, 250, 7], [40, 8, 80, 110, 1.5], [52, 93, 78, 150, 3]];
    wrap.replaceChildren.apply(wrap, spots.map(function (s, i) {
      return h('span', { className: 'gk-ghost', style: 'left:' + s[1] + '%;top:' + s[2] + '%;--blur:' + s[4] + 'px;--d:' + (i * 1.7).toFixed(1) + 's' }, face(bots[s[0] % bots.length], s[3]));
    }));
  }

  /* ---------- Hire ---------- */
  function hireButton(b, big) {
    var link = safeLink(b.link);
    if (!link) return h('span', { className: 'gk-hire is-soon' + (big ? ' gk-hire--big' : ''), text: 'Coming soon' });
    var label = big ? 'Hire in Grok' : 'Hire';
    var btn = h('a', { className: 'gk-hire' + (big ? ' gk-hire--big' : ''), href: link, target: '_blank', rel: 'noopener', 'aria-label': 'Hire ' + b.name + ' in Grok (opens x.ai)',
      on: { click: function (e) {
        e.stopPropagation();
        btn.classList.add('is-busy');
        btn.firstChild.textContent = 'Opening Grok…';
        setTimeout(function () { btn.classList.remove('is-busy'); btn.firstChild.textContent = label; }, 2200);
      } } }, h('span', { text: label }), big ? h('span', { 'aria-hidden': 'true', text: '↗' }) : null);
    return btn;
  }

  /* ---------- matching a task to a bot ---------- */
  var STOP = { i: 1, a: 1, an: 1, the: 1, my: 1, me: 1, to: 1, for: 1, with: 1, and: 1, of: 1, on: 1, in: 1, need: 1, help: 1, want: 1, some: 1, our: 1, your: 1, it: 1, is: 1, do: 1, get: 1, new: 1, next: 1, how: 1, can: 1, please: 1 };
  // Everyday words people type, pointed at the words the bots use.
  var ALIAS = { taxes: 'tax', gst: 'tax', itr: 'tax', budget: 'budgets', loan: 'loans', emi: 'loans', laptop: 'laptops', pc: 'laptops', computer: 'laptops', wifi: 'wi-fi', phone: 'phones',
    resume: 'resumes', cv: 'resumes', job: 'career', jobs: 'career', blog: 'writer', write: 'writer', writing: 'writer', article: 'writer', learn: 'teacher', learning: 'teacher', math: 'teacher', maths: 'teacher', calculus: 'teacher', physics: 'teacher', sell: 'sales', selling: 'sales', leads: 'sales', youtube: 'video', reel: 'video', reels: 'video', logo: 'logos', instagram: 'social', tweet: 'x', tweets: 'x',
    trip: 'trips', holiday: 'trips', vacation: 'trips', flight: 'trips', party: 'birthdays', birthday: 'birthdays', marriage: 'wedding', shaadi: 'wedding', workout: 'workouts', gym: 'workouts',
    diet: 'workouts', anxiety: 'stress', scam: 'scams', hacked: 'scams', fraud: 'scams', rent: 'renting', flat: 'home', house: 'home', apartment: 'home',
    contract: 'contracts', lawyer: 'legal', email: 'inbox', emails: 'inbox', mail: 'inbox', study: 'teaches', homework: 'teaches', song: 'music', jingle: 'jingles',
    bug: 'bugs', deploy: 'live', website: 'site', ranking: 'rank', hire: 'hiring', recruit: 'hiring',
    customers: 'buyers', complaints: 'support', tickets: 'support', subscriptions: 'subscription', bills: 'bill', move: 'moving', shifting: 'moving', college: 'shortlist', university: 'shortlist' };
  function stem(w) { return w.length > 4 ? w.replace(/(ings|ing|es|s)$/, '') : w.replace(/s$/, ''); }
  function words(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9\- ]+/g, ' ').split(/\s+/).filter(function (w) { return w && !STOP[w]; });
  }
  var index = bots.map(function (b) {
    return {
      b: b,
      top: words(b.name + ' ' + b.role).map(stem),
      mid: words(b.about + ' ' + (b.can || []).join(' ')).map(stem),
      low: words((b.how || '') + ' ' + (catName[b.category] || '') + ' ' + (b.tools || []).join(' ')).map(stem)
    };
  });
  function rank(query) {
    var raw = words(query);
    // "blog post" is long-form writing, not an X post.
    if (raw.indexOf('blog') !== -1) raw = raw.filter(function (w) { return w !== 'post' && w !== 'posts'; });
    var q = raw.map(function (w) { return stem(ALIAS[w] || w); });
    if (!q.length) return [];
    return index.map(function (e) {
      var score = 0;
      q.forEach(function (w) {
        if (w.length < 2) return;
        if (e.top.indexOf(w) !== -1) score += 6;
        else if (w.length > 2 && e.top.some(function (t) { return t.indexOf(w) === 0; })) score += 3;
        if (e.mid.indexOf(w) !== -1) score += 3;
        else if (w.length > 3 && e.mid.some(function (t) { return t.indexOf(w) === 0; })) score += 1;
        if (e.low.indexOf(w) !== -1) score += 1;
      });
      return { b: e.b, score: score };
    }).filter(function (r) { return r.score > 0; }).sort(function (x, y) { return y.score - x.score; });
  }

  /* ---------- the front desk ---------- */
  var EXAMPLES = ['my taxes', 'planning a wedding', 'a slow laptop', 'my next video', 'a job interview', 'a scam message', 'a trip to Japan', 'launching my website'];
  var desk = { typing: null, cycle: null, ex: 0 };
  function showMatch(query) {
    var box = document.getElementById('gk-match'), also = document.getElementById('gk-also'), hero = document.querySelector('.gk-hero__inner');
    if (!box) return;
    var fading = box.classList.contains('is-out');
    forget(box);
    var found = rank(query);
    if (!found.length) {
      box.className = 'gk-match is-none';
      box.removeAttribute('data-hue');
      box.replaceChildren(h('p', { text: 'No exact match yet. Try other words, or browse the departments below.' }));
      if (also) also.replaceChildren();
      if (fading) fadeIn(box, also);
      return;
    }
    var b = found[0].b;
    box.className = 'gk-match';
    box.setAttribute('data-hue', hueOf(b));
    if (hero) hero.setAttribute('data-hue', hueOf(b));
    box.replaceChildren(
      h('button', { type: 'button', className: 'gk-match__open', 'aria-label': 'See ' + b.name + '’s résumé', on: { click: function () { openBot(b); } } }),
      tile(b, 64),
      h('div', null, h('p', { className: 'gk-match__lbl', text: 'Your expert' }), h('h2', null, b.name, h('i', { className: 'gk-match__sep', text: ' · ' }), h('span', { text: b.role })), h('p', { className: 'gk-match__about', text: b.about })),
      hireButton(b));
    if (also) {
      var more = found.slice(1, 3).map(function (r) { return r.b; });
      var parts = [];
      more.forEach(function (m, i) {
        if (i) parts.push(', ');
        parts.push(h('button', { type: 'button', text: m.name, on: { click: function () { openBot(m); } } }));
      });
      also.replaceChildren.apply(also, parts.length ? ['Also good for this: '].concat(parts) : []);
    }
    if (fading) fadeIn(box, also);
  }
  // While the next example types, the suggestion fades out; it fades back in with the new bot.
  function fadeOut() {
    ['gk-match', 'gk-also'].forEach(function (id) { var el = document.getElementById(id); if (el && el.childNodes.length) el.classList.add('is-out'); });
  }
  function fadeIn(box, also) {
    box.className += ' is-out';
    if (also) also.classList.add('is-out');
    setTimeout(function () { box.classList.remove('is-out'); if (also) also.classList.remove('is-out'); }, 40);
  }
  // Types an example into the blank, shows its expert, then moves on, until the visitor types.
  function typeExample() {
    var what = document.getElementById('gk-what');
    if (!what) return;
    var text = EXAMPLES[desk.ex % EXAMPLES.length], i = 0;
    desk.ex++;
    clearInterval(desk.typing);
    if (reduceMotion) { what.textContent = text; showMatch(text); return; }
    what.textContent = '';
    fadeOut();
    desk.typing = setInterval(function () {
      what.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(desk.typing); showMatch(text); }
    }, 45);
  }
  function startExamples() {
    stopExamples();
    typeExample();
    if (!reduceMotion) desk.cycle = setInterval(typeExample, 3800);
  }
  function stopExamples() {
    clearInterval(desk.cycle);
    clearInterval(desk.typing);
    ['gk-match', 'gk-also'].forEach(function (id) { var el = document.getElementById(id); if (el) el.classList.remove('is-out'); });
  }

  /* ---------- departments ---------- */
  function renderCats() {
    var wrap = document.getElementById('gk-cats');
    if (!wrap) return;
    var used = cats.filter(function (c) { return bots.some(function (b) { return b.category === c.id; }); });
    wrap.replaceChildren.apply(wrap, [{ id: 'all', name: 'All staff' }].concat(used).map(function (c) {
      return h('button', { type: 'button', className: 'gk-dept', 'aria-pressed': String(state.cat === c.id), on: { click: function () { setCat(c.id); } } }, c.name);
    }));
  }
  function setCat(id) {
    state.cat = id;
    history.replaceState(null, '', id === 'all' ? location.pathname : '#' + id);
    renderCats();
    renderGrid();
  }

  /* ---------- ID badges ---------- */
  function badge(b) {
    return h('li', { className: 'gk-badge', 'data-hue': hueOf(b) },
      h('button', { type: 'button', className: 'gk-badge__open', 'aria-label': b.name + ', ' + b.role + '. See résumé', on: { click: function () { openBot(b); } } }),
      h('div', { className: 'gk-badge__band' }, h('span', { className: 'gk-badge__slot', 'aria-hidden': 'true' }), h('span', { className: 'gk-badge__photo' }, tile(b, 58))),
      h('div', { className: 'gk-badge__body' },
        h('p', { className: 'gk-badge__id', text: (catName[b.category] || '') + ' · ' + b.staffNo }),
        h('h3', { text: b.name }),
        h('p', { className: 'gk-badge__role', text: b.role }),
        h('p', { className: 'gk-badge__about', text: b.about })),
      h('div', { className: 'gk-badge__foot' }, h('span', { className: 'gk-badge__status' }, h('i', { 'aria-hidden': 'true' }), 'Ready to hire'), hireButton(b)));
  }
  function renderGrid() {
    var grid = document.getElementById('gk-grid');
    if (!grid) return;
    var shown;
    if (state.q) shown = rank(state.q).map(function (r) { return r.b; }).filter(function (b) { return state.cat === 'all' || b.category === state.cat; });
    else {
      shown = bots.filter(function (b) { return state.cat === 'all' || b.category === state.cat; });
      if (state.cat === 'all') shown.sort(function (a, b) { return (b.featured ? 1 : 0) - (a.featured ? 1 : 0); });
    }
    forget(grid);
    grid.replaceChildren.apply(grid, shown.map(badge));
    var empty = document.getElementById('gk-empty');
    if (empty) empty.hidden = shown.length > 0;
    var title = document.getElementById('gk-list-title');
    if (title) title.textContent = state.q ? 'Best fits for “' + state.q + '”' : state.cat === 'all' ? 'Meet the staff' : catName[state.cat] + ' department';
    var count = document.getElementById('gk-count');
    if (count) count.textContent = shown.length + ' on staff';
  }

  /* ---------- résumé ---------- */
  var lastFocus = null;
  function bullets(cls, items) { return h('ul', { className: cls }, items.map(function (t) { return h('li', { text: t }); })); }
  function section(title, body) { return h('section', null, h('h3', { text: title }), body); }
  function openBot(b) {
    var dlg = document.getElementById('gk-modal');
    var body = document.getElementById('gk-modal-body');
    if (!dlg || !body) return;
    lastFocus = document.activeElement;
    forget(body);
    var share = location.origin + location.pathname + '#bot=' + encodeURIComponent(b.id);
    var copy = h('button', { type: 'button', className: 'gk-ghostbtn', on: { click: function () {
      var done = function () { copy.textContent = 'Link copied'; setTimeout(function () { copy.textContent = 'Copy link'; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(share).then(done, function () { window.prompt('Copy this link', share); });
      else window.prompt('Copy this link', share);
    } } }, 'Copy link');
    var meta = h('dl', { className: 'gk-cv__meta' },
      h('div', null, h('dt', { text: 'Department' }), h('dd', { text: catName[b.category] || '' })),
      h('div', null, h('dt', { text: 'Staff no.' }), h('dd', { text: b.staffNo })),
      b.tools && b.tools.length ? h('div', null, h('dt', { text: 'Works with' }), h('dd', { text: b.tools.join(', ') })) : null);
    body.replaceChildren(
      h('button', { type: 'button', className: 'gk-modal__close', 'aria-label': 'Close', on: { click: closeBot } }, '×'),
      h('div', { className: 'gk-cv', 'data-hue': hueOf(b) },
        h('aside', { className: 'gk-cv__side' },
          tile(b, 84),
          h('h2', { id: 'gk-m-name', text: b.name }),
          h('p', { className: 'gk-cv__role', text: b.role }),
          h('div', { className: 'gk-cv__actions' }, hireButton(b, true), copy, h('p', { className: 'gk-modal__free', text: 'Free to hire · Opens in Grok' })),
          meta),
        h('div', { className: 'gk-cv__main' },
          section('Summary', h('p', { className: 'gk-cv__lead', text: b.about })),
          b.can && b.can.length ? section('Duties', bullets('gk-can', b.can)) : null,
          b.how ? section('Working style', h('p', { text: b.how })) : null,
          b.wont && b.wont.length ? section('Won’t do', bullets('gk-wont', b.wont)) : null)));
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
    dlg.scrollTop = 0;
    history.replaceState(null, '', '#bot=' + encodeURIComponent(b.id));
  }
  function closeBot() {
    var dlg = document.getElementById('gk-modal');
    if (dlg && dlg.open && typeof dlg.close === 'function') dlg.close(); else if (dlg) dlg.removeAttribute('open');
  }

  /* ---------- theme toggle (same storage key as the portfolio home page) ---------- */
  function initTheme() {
    var root = document.documentElement;
    function label() {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) { btn.setAttribute('aria-label', 'Switch to ' + next + ' theme'); btn.title = 'Switch to ' + next + ' theme'; });
    }
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var theme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', theme);
        try { localStorage.setItem('xf-theme', theme); } catch (e) {}
        label();
      });
    });
    label();
  }

  /* ---------- boot ---------- */
  function boot() {
    initTheme();
    var search = document.getElementById('gk-search');
    var what = document.getElementById('gk-what');
    if (search) {
      search.addEventListener('focus', function () { if (!search.value.trim()) stopExamples(); });
      search.addEventListener('blur', function () { if (!search.value.trim()) startExamples(); });
      search.addEventListener('input', function () {
        state.q = search.value.trim();
        stopExamples();
        if (what) what.textContent = state.q;
        if (state.q) showMatch(state.q);
        else if (document.activeElement !== search) startExamples();
        renderGrid();
      });
    }
    var ask = document.getElementById('gk-ask');
    if (ask) ask.addEventListener('submit', function (e) {
      e.preventDefault();
      var staff = document.getElementById('gk-staff');
      if (staff) staff.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    var dlg = document.getElementById('gk-modal');
    if (dlg) {
      dlg.addEventListener('click', function (e) { if (e.target === dlg) closeBot(); });
      dlg.addEventListener('close', function () {
        history.replaceState(null, '', state.cat === 'all' ? location.pathname : '#' + state.cat);
        if (lastFocus && lastFocus.focus) lastFocus.focus();
      });
    }
    if (reduceMotion) document.documentElement.classList.add('gk-still');
    var hash = decodeURIComponent(location.hash.slice(1));
    if (catName[hash]) state.cat = hash;
    renderGhosts();
    renderCats();
    renderGrid();
    startExamples();
    var m = hash.match(/^bot=(.+)$/);
    if (m && byId[m[1]]) openBot(byId[m[1]]);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();

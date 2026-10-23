/* Small animated pictures for the Grok Bots tiles: one per bot, showing its job.
 * Each is plain SVG markup for a 48x48 box, animated with SMIL so it needs no other code.
 * Lines use the tile's ink colour; `.ac` (stroke) and `.acf` (fill) parts use the
 * category colour, `.dim` parts are faint. Bots without a picture fall back to their icon. */
(function () {
  'use strict';
  var EASE = '.45 0 .55 1';
  function repeat(n, v) { var a = []; for (var i = 0; i < n; i++) a.push(v); return a.join(';'); }
  function even(n) { var a = []; for (var i = 0; i < n; i++) a.push(+(i / (n - 1)).toFixed(4)); return a; }
  function timing(n, dur, o) {
    return ' keyTimes="' + (o.t || even(n)).join(';') + '" dur="' + dur + 's"' +
      (o.lin ? ' calcMode="linear"' : ' calcMode="spline" keySplines="' + repeat(n - 1, EASE) + '"') +
      (o.begin ? ' begin="' + o.begin + 's"' : '') + ' repeatCount="indefinite"';
  }
  // Animate one attribute through `vals` (eased unless o.lin); o.t = key times, o.begin = delay.
  function A(attr, vals, dur, o) {
    o = o || {};
    return '<animate attributeName="' + attr + '" values="' + vals.join(';') + '"' + timing(vals.length, dur, o) + '/>';
  }
  // Animate the element's transform (replaces its own transform attribute).
  function T(type, vals, dur, o) {
    o = o || {};
    return '<animateTransform attributeName="transform" type="' + type + '" values="' + vals.join(';') + '"' + timing(vals.length, dur, o) + '/>';
  }
  // Move along a path; o.kp = how far along (0-1) at each key time.
  function M(path, dur, o) {
    o = o || {};
    var kp = o.kp || [0, 1];
    return '<animateMotion path="' + path + '" keyPoints="' + kp.join(';') + '"' + timing(kp.length, dur, { t: o.t, lin: true, begin: o.begin }) +
      (o.rotate ? ' rotate="auto"' : '') + '/>';
  }
  // A path that draws itself in over the given key times.
  function draw(d, vals, dur, o) {
    return '<path class="' + ((o && o.cls) || '') + '" d="' + d + '" pathLength="100" stroke-dasharray="100" stroke-dashoffset="' + vals[0] + '">' +
      A('stroke-dashoffset', vals, dur, { t: o && o.t, lin: true }) + '</path>';
  }
  // Lucide shapes (ISC licence, see js/grok-bots-icons.js) as raw 24x24 elements.
  function nodes(name) {
    return ((window.FreezeStackGrokIcons || {})[name] || []).map(function (n) {
      return '<' + n[0] + Object.keys(n[1]).map(function (k) { return ' ' + k + '="' + n[1][k] + '"'; }).join('') + '/>';
    }).join('');
  }
  // A Lucide shape placed with a scale and offset; `extra` is more markup in the same 24x24 space.
  function lucide(name, x, y, s, extra, cls) {
    return '<g' + (cls ? ' class="' + cls + '"' : '') + ' transform="translate(' + x + ' ' + y + ') scale(' + s + ')" style="stroke-width:calc(var(--sw) / ' + s + ')">' +
      nodes(name) + (extra || '') + '</g>';
  }
  // The same, centred on (cx, cy).
  function C(name, cx, cy, s, extra, cls) { return lucide(name, +(cx - 12 * s).toFixed(2), +(cy - 12 * s).toFixed(2), s, extra, cls); }
  // A small four-point star that twinkles.
  function twinkle(x, y, s, dur, begin) {
    return '<path class="dot" transform="translate(' + x + ' ' + y + ') scale(' + s + ')" d="M0-3.5.9-.9 3.5 0 .9.9 0 3.5-.9.9-3.5 0-.9-.9z" opacity=".2">' +
      A('opacity', [0.2, 1, 0.2], dur, { begin: begin }) + '</path>';
  }
  // A star that pops in at key times t (scale values v).
  function pop(x, y, v, dur, t, inner) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g transform="scale(0)">' + T('scale', v, dur, { t: t }) + inner + '</g></g>';
  }
  var STAR = '<path class="acf" d="M0-4 1.2-1.2 4 0 1.2 1.2 0 4-1.2 1.2-4 0-1.2-1.2z"/>';
  // A tick badge in the category colour.
  function badge(r) { return '<circle class="acf" r="' + r + '"/><path class="ink2" d="M-2.1 0l1.4 1.4 2.8-2.8" style="stroke-width:1.5"/>'; }

  var S = {};

  // Video: a player whose progress bar fills while the play button breathes.
  S['video-bot'] = function () {
    return '<rect x="7" y="11" width="34" height="26" rx="6"/>' +
      '<g transform="translate(24.5 22.5)"><g>' + T('scale', [1, 1.14, 1], 1.8) +
      '<path class="fill" d="M-3.5-5v10l8.5-5z" style="stroke-width:1.4"/></g></g>' +
      '<path class="dim" d="M12.5 31.5h23"/>' +
      draw('M12.5 31.5h23', [100, 0, 0], 3.4, { cls: 'ac', t: [0, 0.82, 1] });
  };

  // Research: a magnifier scanning lines of text.
  S['research-bot'] = function () {
    return '<path class="dim" d="M9 13h20M9 20h30M9 27h16M9 34h24"/>' +
      '<g>' + T('translate', ['0 0', '-11 -7', '-5 7', '0 0'], 4.4) +
      '<circle class="lens" cx="28" cy="24" r="7.5"/><path d="M33.5 29.5l5.5 5.5"/>' +
      '<path class="ac" d="M24.2 21.8a4.6 4.6 0 0 1 3-2.6"/></g>';
  };

  // Finance: three bars that grow, the tallest in the category colour.
  S['finance-bot'] = function () {
    function bar(x, h, delay, cls) {
      var low = Math.round(h * 0.35);
      var t = [0, 0.3, 0.75, 1];
      return '<rect' + (cls ? ' class="' + cls + '"' : '') + ' x="' + x + '" y="' + (37 - low) + '" width="6.5" height="' + low + '" rx="1.6">' +
        A('height', [low, h, h, low], 3.8, { t: t, begin: delay }) + A('y', [37 - low, 37 - h, 37 - h, 37 - low], 3.8, { t: t, begin: delay }) + '</rect>';
    }
    return '<path class="dim" d="M7 40h34"/>' + bar(11, 13, 0) + bar(20.75, 19, 0.25) + bar(30.5, 25, 0.5, 'ac');
  };

  // Writer: a feather pen writing a line, then lifting back to the start.
  S['writer-bot'] = function () {
    var line = 'M7 35c2.4-4.2 4.4-4.6 5.8-1.2s3.2 3.6 5-.2 3.8-3.8 5.6-.4 3.4 3.4 5.2.2';
    var t = [0, 0.7, 0.88, 1];
    return '<path class="dim" d="M7 40.5h27"/>' +
      '<path class="ac" d="' + line + '" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">' +
      A('stroke-dashoffset', [100, 0, 0, 0], 3.6, { t: t, lin: true }) + A('opacity', [1, 1, 1, 0], 3.6, { t: t, lin: true }) + '</path>' +
      '<g>' + M(line, 3.6, { kp: [0, 1, 1, 0], t: [0, 0.7, 0.86, 1] }) + lucide('feather', -1.56, -17.16, 0.78) + '</g>';
  };

  // Travel: a plane flying a dotted route to a pin.
  S['travel-bot'] = function () {
    var route = 'M9 37C13 22 27 13 39 11';
    return '<path class="dim" d="' + route + '" stroke-dasharray="1.5 4.5"/>' +
      '<circle class="fill" cx="9" cy="37" r="1.4"/>' +
      '<circle class="ac" cx="39" cy="11" r="2.4">' + A('r', [2.4, 2.4, 3.4, 2.4], 3.8, { t: [0, 0.78, 0.9, 1] }) + '</circle>' +
      '<g opacity="0">' + M(route, 3.8, { kp: [0, 1], t: [0, 1], rotate: true }) + A('opacity', [0, 1, 1, 0], 3.8, { t: [0, 0.12, 0.8, 1], lin: true }) +
      '<path class="fill" style="stroke-width:.6" transform="scale(.8)" d="M7 0-1.5-1.5-4.5-7h-2l1.7 5.6-2.6.2L-9-3.6h-1.3l1 3.6-1 3.6H-9l1.6-2.4 2.6.2-1.7 5.6h2l3-5.5z"/></g>';
  };

  // Inbox: a letter drops into the tray and a badge pops up.
  S['inbox-bot'] = function () {
    var t = [0, 0.2, 0.5, 0.62, 1];
    return '<g opacity="0" transform="translate(0 -6)">' + T('translate', ['0 -6', '0 9', '0 9'], 2.8, { t: [0, 0.55, 1] }) +
      A('opacity', [0, 1, 1, 0, 0], 2.8, { t: t, lin: true }) +
      '<rect x="17" y="8" width="14" height="10" rx="1.8"/><path d="M17.8 9.4 24 14l6.2-4.6"/></g>' +
      '<path d="M42 28H31l-3 4.5h-8L17 28H6"/>' +
      '<path d="M12.2 16.6 6 28v9a3 3 0 0 0 3 3h30a3 3 0 0 0 3-3v-9l-6.2-11.4A3 3 0 0 0 33.2 15H14.8a3 3 0 0 0-2.6 1.6z"/>' +
      '<circle class="acf" cx="39.5" cy="10.5" r="0">' + A('r', [0, 0, 3.6, 3, 3, 0], 2.8, { t: [0, 0.5, 0.6, 0.7, 0.92, 1] }) + '</circle>';
  };

  // Interior: a sofa under a picture, with a floor lamp that glows on and off.
  S['interior-bot'] = function () {
    return '<rect class="dim" x="11.5" y="5.5" width="11" height="7.5" rx="1.2"/>' +
      lucide('sofa', 2, 12, 1.3) +
      '<path class="acf" d="M36 18.5h7l3.5 15h-14z" opacity="0">' + A('opacity', [0, 0.34, 0.34, 0], 3.8, { t: [0, 0.2, 0.7, 1] }) + '</path>' +
      '<path d="M39.5 18.5V38M36.5 38h6"/><path d="M35.5 18.5h8l-1.8-6.5h-4.4z"/>';
  };

  // Explainer: a light bulb that switches on, with rays.
  S['explainer-bot'] = function () {
    var t = [0, 0.25, 0.7, 1];
    return '<circle class="acf" cx="24" cy="17.8" r="8.6" opacity="0">' + A('opacity', [0, 0.2, 0.2, 0], 3.2, { t: t }) + '</circle>' +
      lucide('lightbulb', 4.8, 5, 1.6) +
      '<path class="ac" opacity=".3" d="M21 22.6l1.5-3.3 1.5 2.3 1.5-2.3 1.5 3.3" style="stroke-width:calc(var(--sw) * .8)">' +
      A('opacity', [0.3, 1, 1, 0.3], 3.2, { t: t }) + '</path>' +
      '<path class="ac" opacity="0" d="M12.3 13.5 9.9 12.7M16.8 7.6l-1.4-2M24 5.3V2.8M31.2 7.6l1.4-2M35.7 13.5l2.4-.8">' +
      A('opacity', [0, 1, 1, 0], 3.2, { t: t }) + '</path>';
  };

  // X Post: a post writes itself, then gets a fact-checked tick.
  S['x-post-bot'] = function () {
    return '<rect x="7" y="9" width="34" height="30" rx="6"/><circle cx="14.5" cy="17" r="3"/>' +
      '<path class="dim" d="M20.5 15.5h10M20.5 19.5h6"/>' +
      draw('M12.5 26.5h23', [100, 100, 0, 0, 100], 4.2, { t: [0, 0.05, 0.25, 0.92, 1] }) +
      draw('M12.5 32.5h13', [100, 100, 0, 0, 100], 4.2, { t: [0, 0.25, 0.4, 0.92, 1] }) +
      '<g transform="translate(34.5 32.5)"><g transform="scale(0)">' +
      T('scale', [0, 0, 1.15, 1, 1, 0], 4.2, { t: [0, 0.45, 0.53, 0.6, 0.9, 1] }) +
      badge(4.6) + '</g></g>';
  };

  // Bot Manager: a lead node sends work down to three bots in turn.
  S['bot-manager'] = function () {
    var paths = ['M24 17v7H13.5a3 3 0 0 0-3 3v4', 'M24 17v14', 'M24 17v7h10.5a3 3 0 0 1 3 3v4'];
    var xs = [5.5, 19, 32.5];
    var out = '<rect x="19" y="7" width="10" height="10" rx="3"/>' +
      '<path d="M24 17v14M10.5 31v-4a3 3 0 0 1 3-3h21a3 3 0 0 1 3 3v4"/>';
    paths.forEach(function (p, i) {
      var begin = i * 1.2;
      out += '<rect class="acf" x="' + xs[i] + '" y="31" width="10" height="10" rx="3" opacity="0">' +
        A('opacity', [0, 0, 0.45, 0, 0], 3.6, { t: [0, 0.28, 0.36, 0.6, 1], begin: begin }) + '</rect>' +
        '<rect x="' + xs[i] + '" y="31" width="10" height="10" rx="3"/>' +
        '<circle class="acf" r="2" opacity="0">' + M(p, 3.6, { kp: [0, 1, 1], t: [0, 0.3, 1], begin: begin }) +
        A('opacity', [0, 1, 1, 0, 0], 3.6, { t: [0, 0.04, 0.27, 0.31, 1], lin: true, begin: begin }) + '</circle>';
    });
    return out;
  };

  // Director: a clapperboard that snaps shut.
  S['director-bot'] = function () {
    var t = [0, 0.1, 0.55, 1];
    return '<path d="M8 21h32v16a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z"/><path class="dim" d="M8 27h32"/>' +
      '<g transform="rotate(-18 9 20)">' + T('rotate', ['-18 9 20', '0 9 20', '0 9 20', '-18 9 20'], 2.6, { t: t }) +
      '<rect x="8" y="14" width="32" height="6" rx="1.5"/><path d="M16.5 14l-3 6M24.5 14l-3 6M32.5 14l-3 6"/></g>' +
      '<path class="ac" opacity="0" d="M42.5 13.5 45 11M43.5 18H46.5">' + A('opacity', [0, 0, 1, 0, 0], 2.6, { t: [0, 0.08, 0.12, 0.3, 1], lin: true }) + '</path>';
  };

  // Web Lead: a globe turning, for a site going live.
  S['web-lead-bot'] = function () {
    var out = '<circle cx="24" cy="24" r="14"/><path class="dim" d="M12.4 16.5h23.2M12.4 31.5h23.2"/><path class="ac" d="M10 24h28"/>';
    [0, 2, 4].forEach(function (begin) {
      out += '<path d="M24 10Q-4 24 24 38" opacity="0">' +
        A('d', ['M24 10Q-4 24 24 38', 'M24 10Q52 24 24 38'], 6, { begin: begin }) +
        A('opacity', [0, 1, 1, 0], 6, { t: [0, 0.15, 0.85, 1], lin: true, begin: begin }) + '</path>';
    });
    return out;
  };

  // Odd Jobs: arrows turning around a quick lightning bolt.
  S['odd-jobs-bot'] = function () {
    return '<g transform="translate(24 24)"><g>' + T('rotate', [0, 360], 7, { lin: true }) + C('refresh-cw', 0, 0, 1.45) + '</g></g>' +
      '<g transform="translate(24 24)"><g>' + T('scale', [1, 1.18, 1], 1.6) + '<path class="acf" d="M1.2-7.5-5 1.2h4.6L-1.2 7.5 5-1.2H.4z"/></g></g>';
  };

  // Memory: a brain whose parts light up in turn.
  S['memory-bot'] = function () {
    return C('brain', 24, 24, 1.55) + [[17.8, 19.4], [30.2, 17.8], [29.4, 28.7], [19.4, 28.7]].map(function (p, i) {
      return '<circle class="acf" cx="' + p[0] + '" cy="' + p[1] + '" r="1.9" opacity=".15">' +
        A('opacity', [0.15, 1, 0.15, 0.15], 3.2, { t: [0, 0.12, 0.3, 1], begin: i * 0.8 }) + '</circle>';
    }).join('');
  };

  // Moving: a loaded truck rolling along the road.
  S['moving-bot'] = function () {
    return '<path class="dim" d="M4 37.5h40" stroke-dasharray="6 5">' + A('stroke-dashoffset', [0, 11], 0.7, { lin: true }) + '</path>' +
      '<path d="M3 17h6M5 22h5" opacity=".4">' + A('opacity', [0.15, 0.6, 0.15], 0.8) + '</path>' +
      '<g>' + T('translate', ['0 0', '0 -.7', '0 0'], 0.45) + C('truck', 27, 22, 1.4, '<rect class="ac" x="4.5" y="8" width="5.5" height="5" rx=".8"/>') + '</g>';
  };

  // Event: a party popper bursting confetti.
  S['event-bot'] = function () {
    var parts = [
      [4, -16, '<circle class="acf" r="1.5"/>'], [10, -14, '<path d="M-1.5 0h3"/>'],
      [15, -9, '<rect class="acf" x="-1.2" y="-1.2" width="2.4" height="2.4" rx=".4"/>'], [17, -2, '<path d="M0-1.5v3"/>'],
      [8, -7, '<circle class="acf" r="1.1"/>'], [13, -15, '<path class="ac" d="M-1.2-1.2l2.4 2.4"/>']
    ];
    return '<path d="M9 39 16.5 21.5 26.5 31.5Z"/><path class="dim" d="M12.2 31.6l4.2 4.2"/>' + parts.map(function (p, i) {
      var b = (i % 3) * 0.12;
      return '<g transform="translate(21.5 26.5)"><g opacity="0">' +
        T('translate', ['0 0', p[0] + ' ' + p[1], (p[0] * 1.1).toFixed(1) + ' ' + (p[1] * 1.1 + 4).toFixed(1)], 2.4, { t: [0, 0.35, 1], begin: b }) +
        A('opacity', [0, 1, 1, 0], 2.4, { t: [0, 0.08, 0.6, 1], lin: true, begin: b }) +
        '<g>' + T('rotate', [0, 200], 2.4, { lin: true, begin: b }) + p[2] + '</g></g></g>';
    }).join('');
  };

  // Wedding: two rings with a gem, swaying, and sparkles.
  S['wedding-bot'] = function () {
    return '<g>' + T('rotate', ['-4 24 29', '4 24 29', '-4 24 29'], 4) +
      '<circle cx="19.5" cy="30" r="8"/><circle cx="28.5" cy="30" r="8"/>' +
      '<path class="ac" d="M19.5 22l-3.2-3.4 1.6-2.4h3.2l1.6 2.4zM16.3 18.6h6.4"/></g>' +
      pop(34, 13, [0, 0, 1, 0, 0], 2.8, [0, 0.3, 0.45, 0.6, 1], STAR) +
      pop(11, 16, [0, 0, 0, 0.75, 0, 0], 2.8, [0, 0.5, 0.75, 0.85, 0.95, 1], STAR);
  };

  // Social Media: a chat bubble sending up hearts.
  S['social-media-bot'] = function () {
    var heart = 'M0 3C-1 2.2-3.2.6-3.2-1a1.6 1.6 0 0 1 3.2-.7 1.6 1.6 0 0 1 3.2.7C3.2.6 1 2.2 0 3z';
    return C('message-circle-heart', 19, 28, 1.25) + [[0, 30, 17, 36, 7], [1.1, 33, 20, 41, 9], [2.2, 29, 18, 33, 6]].map(function (h) {
      return '<g opacity="0">' + T('translate', [h[1] + ' ' + h[2], ((h[1] + h[3]) / 2 + 3) + ' ' + ((h[2] + h[4]) / 2), h[3] + ' ' + h[4]], 3.3, { begin: h[0], lin: true }) +
        A('opacity', [0, 1, 1, 0], 3.3, { t: [0, 0.15, 0.6, 1], lin: true, begin: h[0] }) + '<path class="acf" d="' + heart + '"/></g>';
    }).join('');
  };

  // Poster: a printer feeding out a finished poster.
  S['poster-bot'] = function () {
    var t = [0, 0.15, 0.55, 0.85, 1];
    return '<path d="M14 18v-7.5a1.5 1.5 0 0 1 1.5-1.5h17a1.5 1.5 0 0 1 1.5 1.5V18"/><rect x="8" y="18" width="32" height="13" rx="3"/>' +
      '<circle class="acf" cx="34.5" cy="22.5" r="1.3">' + A('opacity', [1, 0.25, 1], 0.8, { lin: true }) + '</circle><path d="M13 27h22"/>' +
      '<g opacity="0">' + A('opacity', [0, 1, 1, 1, 0], 3.6, { t: t, lin: true }) +
      '<rect x="15" y="31" width="18" height="0" rx="1">' + A('height', [0, 0, 12, 12, 12], 3.6, { t: t }) + '</rect>' +
      '<g opacity="0">' + A('opacity', [0, 0, 0, 1, 1], 3.6, { t: [0, 0.15, 0.5, 0.6, 1], lin: true }) +
      '<path class="ac" d="M18.5 40l3.5-3.5 2.5 2.5 2-2 3.5 3"/><circle class="acf" cx="28.5" cy="35" r="1.2"/></g></g>';
  };

  // Thumbnail: a cursor clicks a thumbnail and it lights up.
  S['thumbnail-bot'] = function () {
    var t = [0, 0.3, 0.4, 0.48, 0.85, 1], d = 3.4;
    return '<rect x="6" y="9" width="32" height="21" rx="3"/>' +
      '<rect class="ac" x="6" y="9" width="32" height="21" rx="3" opacity="0">' + A('opacity', [0, 0, 0, 1, 0, 0], d, { t: t, lin: true }) + '</rect>' +
      '<circle class="dim" cx="13" cy="15.5" r="2"/><path class="dim" d="M9.5 26.5l7-7 5 5 3-3 5.5 5"/>' +
      '<circle class="ac" cx="30" cy="22" r="2" opacity="0">' + A('r', [2, 2, 2, 8, 8, 2], d, { t: t }) + A('opacity', [0, 0, 0.9, 0, 0, 0], d, { t: t, lin: true }) + '</circle>' +
      '<g transform="translate(42 42)">' + T('translate', ['42 42', '30 22', '30 22', '30 22', '30 22', '42 42'], d, { t: t }) +
      '<g>' + T('scale', [1, 1, 0.82, 1, 1, 1], d, { t: t }) + '<path class="fill" style="stroke-width:1" d="M0 0v11.5l3-2.8 2.2 4.8 2-.9-2.1-4.7h4.2z"/></g></g>';
  };

  // Design: a pen drawing a curve between two anchor points.
  S['design-bot'] = function () {
    var curve = 'M9 35C13 15 35 33 39 13', t = [0, 0.65, 0.88, 1];
    return '<path class="dim" d="M9 35 13 15M39 13 35 33"/><circle class="dim dot" cx="13" cy="15" r="1.6"/><circle class="dim dot" cx="35" cy="33" r="1.6"/>' +
      '<path class="ac" d="' + curve + '" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">' +
      A('stroke-dashoffset', [100, 0, 0, 0], 3.6, { t: t, lin: true }) + A('opacity', [1, 1, 1, 0], 3.6, { t: t, lin: true }) + '</path>' +
      '<rect class="knob" x="6.5" y="32.5" width="5" height="5" rx="1"/><rect class="knob" x="36.5" y="10.5" width="5" height="5" rx="1"/>' +
      '<g>' + M(curve, 3.6, { kp: [0, 1, 1, 0], t: [0, 0.65, 0.86, 1] }) + '<circle class="acf" r="2.2"/></g>';
  };

  // Tutor: an open book turning a page.
  S['tutor-bot'] = function () {
    var R = 'M24 14C28 11 35 11 40 13L40 35C35 33 28 33 24 36Z';
    var Mid = 'M24 14C24.6 10 25.2 7 26 5L26 27C25.2 30 24.6 33 24 36Z';
    var L = 'M24 14C20 11 13 11 8 13L8 35C13 33 20 33 24 36Z';
    return '<path d="' + L + '"/><path d="' + R + '"/>' +
      '<path class="dim" d="M12 18.5c3-1 6-1 8.5.5M12 24c3-1 6-1 8.5.5M27.5 19c2.5-1.5 5.5-1.5 8.5-.5M27.5 24.5c2.5-1.5 5.5-1.5 8.5-.5"/>' +
      '<path class="ac" d="' + R + '" opacity="0">' + A('d', [R, R, Mid, L, L], 3.2, { t: [0, 0.3, 0.5, 0.7, 1] }) +
      A('opacity', [0, 1, 1, 1, 0], 3.2, { t: [0, 0.15, 0.5, 0.85, 1], lin: true }) + '</path>';
  };

  // Wellbeing: a moon with a slow breathing ring and twinkling stars.
  S['wellbeing-bot'] = function () {
    return '<circle class="ac" cx="22" cy="25" r="12.5" opacity=".5">' + A('r', [12.5, 17, 12.5], 5) + A('opacity', [0.5, 0.08, 0.5], 5) + '</circle>' +
      C('moon', 22, 25, 1.25) + twinkle(37, 11, 1, 2.6, 0) + twinkle(39.5, 21, 0.7, 2.6, 1.3) + twinkle(30, 6.5, 0.6, 2.6, 0.7);
  };

  // Fitness: a dumbbell being lifted.
  S['fitness-bot'] = function () {
    return '<path class="dim" d="M8 41h32"/>' +
      '<g>' + T('translate', ['0 7', '0 -3', '0 -3', '0 7'], 2.4, { t: [0, 0.4, 0.55, 1] }) +
      '<path d="M15 22h18"/><rect class="ac" x="10" y="15" width="5" height="14" rx="1.5"/><rect class="ac" x="33" y="15" width="5" height="14" rx="1.5"/>' +
      '<rect x="6" y="18" width="4" height="8" rx="1.2"/><rect x="38" y="18" width="4" height="8" rx="1.2"/></g>' +
      '<path d="M5 9l2.5 2M43 9l-2.5 2" opacity="0">' + A('opacity', [0, 0, 0.6, 0, 0], 2.4, { t: [0, 0.38, 0.48, 0.65, 1] }) + '</path>';
  };

  // Health: a heartbeat line with a heart that beats.
  S['health-bot'] = function () {
    var ecg = 'M5 31h10l2.5-5 4 11 4-15 3 9h14.5';
    return '<path class="dim" d="' + ecg + '"/>' +
      '<path class="ac" d="' + ecg + '" pathLength="100" stroke-dasharray="28 100" stroke-dashoffset="28">' + A('stroke-dashoffset', [28, -100], 2, { lin: true }) + '</path>' +
      '<g transform="translate(24 13)"><g>' + T('scale', [1, 1, 1.18, 1, 1], 2, { t: [0, 0.3, 0.38, 0.46, 1] }) + C('heart', 0, 0, 0.7) + '</g></g>';
  };

  // Business: a rocket lifting off.
  S['business-bot'] = function () {
    var flame = 'M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z';
    return [[0, 40, 14], [0.45, 33, 7], [0.9, 43, 24]].map(function (s) {
      return '<g opacity="0">' + T('translate', [s[1] + ' ' + s[2], (s[1] - 16) + ' ' + (s[2] + 16)], 1.4, { lin: true, begin: s[0] }) +
        A('opacity', [0, 0.6, 0], 1.4, { lin: true, begin: s[0] }) + '<path d="M0 0l-4 4"/></g>';
    }).join('') +
      '<g>' + T('translate', ['0 0', '.4 -.4', '0 0', '-.3 .3', '0 0'], 0.5, { lin: true }) +
      C('rocket', 25, 21, 1.3, '<path class="acf" d="' + flame + '">' + A('opacity', [1, 0.5, 1], 0.3, { lin: true }) + '</path>') + '</g>';
  };

  // Legal: the scales of justice tipping gently.
  S['legal-bot'] = function () {
    function pan(x, dy) {
      return '<g>' + T('translate', ['0 ' + dy, '0 ' + -dy, '0 ' + dy], 4) +
        '<path d="M' + x + ' 14l-5 11M' + x + ' 14l5 11"/><path d="M' + (x - 5.5) + ' 25h11a5.5 4.5 0 0 1-11 0z"/></g>';
    }
    return '<path d="M24 14v24M17 38h14"/><circle class="acf" cx="24" cy="11.5" r="2"/>' +
      '<g>' + T('rotate', ['-7 24 14', '7 24 14', '-7 24 14'], 4) + '<path d="M10 14h28"/></g>' + pan(10, 1.7) + pan(38, -1.7);
  };

  // Files: files travel down the folder tree into place.
  S['files-bot'] = function () {
    var f1 = 'M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z';
    var f2 = 'M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z';
    var extra = [['M3 3v2a2 2 0 0 0 2 2h6', f1, 0], ['M3 3v13a2 2 0 0 0 2 2h6', f2, 1.4]].map(function (x) {
      return '<path class="acf" d="' + x[1] + '" opacity="0">' + A('opacity', [0, 0, 0.45, 0, 0], 2.8, { t: [0, 0.3, 0.38, 0.65, 1], begin: x[2] }) + '</path>' +
        '<circle class="acf" r="1.3" opacity="0">' + M(x[0], 2.8, { kp: [0, 1, 1], t: [0, 0.32, 1], begin: x[2] }) +
        A('opacity', [0, 1, 1, 0, 0], 2.8, { t: [0, 0.03, 0.29, 0.33, 1], lin: true, begin: x[2] }) + '</circle>';
    }).join('');
    return C('folder-tree', 24, 24, 1.55, extra);
  };

  // Shopping: an item drops into the bag.
  S['shopping-bot'] = function () {
    return '<g opacity="0">' + T('translate', ['24 1', '24 15', '24 15'], 2.6, { t: [0, 0.4, 1] }) + A('opacity', [0, 1, 0, 0], 2.6, { t: [0, 0.15, 0.48, 1], lin: true }) +
      '<rect class="ac" x="-3.5" y="-3.5" width="7" height="7" rx="1.4"/></g>' +
      '<g transform="translate(24 42)"><g>' + T('scale', ['1 1', '1 1', '1.04 .95', '1 1', '1 1'], 2.6, { t: [0, 0.45, 0.52, 0.62, 1] }) + C('shopping-bag', 0, -14, 1.4) + '</g></g>';
  };

  // Assistant: scattered tasks fly into a calendar.
  S['assistant-bot'] = function () {
    var cells = [[13, 23], [21, 23], [29, 23], [13, 31], [21, 31], [29, 31]];
    var out = '<rect x="8" y="11" width="32" height="29" rx="4"/><path d="M8 18.5h32M16 8v6M32 8v6"/>' + cells.map(function (c) {
      return '<rect class="dim" x="' + c[0] + '" y="' + c[1] + '" width="6" height="5" rx="1.2"/>';
    }).join('');
    [[3, 4, 0, 0], [45, 6, 2, 0.5], [44, 45, 4, 1]].forEach(function (d) {
      var c = cells[d[2]], b = d[3];
      out += '<rect class="acf" x="' + c[0] + '" y="' + c[1] + '" width="6" height="5" rx="1.2" opacity="0">' +
        A('opacity', [0, 0, 1, 1, 0], 3.6, { t: [0, 0.35, 0.42, 0.88, 1], lin: true, begin: b }) + '</rect>' +
        '<circle class="acf" r="1.8" opacity="0">' + M('M' + d[0] + ' ' + d[1] + 'L' + (c[0] + 3) + ' ' + (c[1] + 2.5), 3.6, { kp: [0, 0, 1, 1], t: [0, 0.05, 0.38, 1], begin: b }) +
        A('opacity', [0, 1, 1, 0, 0], 3.6, { t: [0, 0.06, 0.36, 0.42, 1], lin: true, begin: b }) + '</circle>';
    });
    return out;
  };

  // Cyber Safety: a shield is scanned, then ticked.
  S['cyber-safety-bot'] = function (u) {
    var shield = 'M24 8l13 5v10c0 8-5.5 13-13 16-7.5-3-13-8-13-16V13z';
    return '<clipPath id="' + u + '"><path d="' + shield + '"/></clipPath>' +
      '<g clip-path="url(#' + u + ')"><g>' + T('translate', ['0 0', '0 30', '0 30'], 3.6, { t: [0, 0.45, 1] }) +
      '<rect class="acf" x="10" y="2" width="28" height="6" opacity=".18"/><path class="ac" d="M10 8h28"/></g></g>' +
      '<path d="' + shield + '"/>' + draw('M18.5 23.5l4 4 7-7.5', [100, 100, 0, 0, 100], 3.6, { t: [0, 0.45, 0.6, 0.9, 1] });
  };

  // Manager: a clipboard whose tasks get ticked off.
  S['manager-bot'] = function () {
    return '<rect x="11" y="10" width="26" height="31" rx="3"/><rect x="18" y="7" width="12" height="6" rx="2"/>' + [19.5, 26.5, 33.5].map(function (y, i) {
      var a = 0.1 + i * 0.18;
      return '<circle cx="17.5" cy="' + y + '" r="2.3"/><path class="dim" d="M23 ' + y + 'h9"/>' +
        draw('M16.3 ' + y + 'l1 1 2-2.1', [100, 100, 0, 0, 100], 3.6, { cls: 'ac', t: [0, a, a + 0.08, 0.9, 1] });
    }).join('');
  };

  // Property: a key arrives and the home lights up.
  S['property-bot'] = function () {
    var t = [0, 0.4, 0.5, 0.85, 1];
    return '<path d="M8 22.5 24 10l16 12.5M12 19.5V38h24V19.5"/>' +
      '<rect class="acf" x="21" y="29" width="6" height="9" opacity="0">' + A('opacity', [0, 0, 0.5, 0.5, 0], 3.6, { t: t }) + '</rect>' +
      '<rect class="acf" x="15.5" y="24" width="4.5" height="4.5" rx=".8" opacity="0">' + A('opacity', [0, 0, 0.5, 0.5, 0], 3.6, { t: t }) + '</rect>' +
      '<path d="M21 38v-9h6v9"/><rect class="dim" x="15.5" y="24" width="4.5" height="4.5" rx=".8"/>' +
      '<g opacity="0">' + T('translate', ['38 42', '26 34', '26 34', '26 34', '38 42'], 3.6, { t: t }) + A('opacity', [0, 1, 0, 0, 0], 3.6, { t: [0, 0.15, 0.5, 0.9, 1], lin: true }) +
      '<g class="ac"><path d="M0 0h9M2.5 0v2.5M5 0v2"/><circle cx="12" cy="0" r="3"/></g></g>';
  };

  // Tech Support: an alert, a quick fix, then a tick.
  S['tech-support-bot'] = function () {
    var d = 3.8;
    return '<rect x="9" y="10" width="30" height="20" rx="2.5"/><path d="M9 30 5 35.5h38L39 30"/>' +
      '<g class="ac">' + A('opacity', [1, 1, 0, 0, 1], d, { t: [0, 0.28, 0.32, 0.96, 1], lin: true }) + '<path d="M24 15v6M24 25.2v.1"/></g>' +
      '<g transform="translate(24 20)" opacity="0">' + A('opacity', [0, 0, 1, 1, 0, 0], d, { t: [0, 0.3, 0.34, 0.58, 0.62, 1], lin: true }) +
      '<g>' + T('rotate', [0, 360], 0.9, { lin: true }) + '<path class="ac" d="M0-5a5 5 0 0 1 5 5"/></g></g>' +
      draw('M19 20.5l3.5 3.5 6.5-7', [100, 100, 0, 0, 100], d, { t: [0, 0.62, 0.72, 0.92, 1] });
  };

  // Ads: a megaphone sending out waves.
  S['ads-bot'] = function () {
    return '<g>' + T('rotate', ['0 14 24', '-3 14 24', '0 14 24'], 1.2) + C('megaphone', 20, 24, 1.3) + '</g>' +
      ['M35 18.5a4.5 4.5 0 0 1 0 6', 'M38.2 15.5a9 9 0 0 1 0 12', 'M41.4 12.5a13.5 13.5 0 0 1 0 18'].map(function (d, i) {
        return '<path class="ac" d="' + d + '" opacity="0">' + A('opacity', [0, 1, 0, 0], 1.8, { t: [0, 0.2, 0.6, 1], lin: true, begin: i * 0.25 }) + '</path>';
      }).join('');
  };

  // Admissions: a school with its flag waving.
  S['admissions-bot'] = function () {
    var f1 = 'M24 5.5c2.2-1.2 4.2 1.2 6.4 0s3.4-1 4.6 0v5c-1.2-1-2.4-1.2-4.6 0s-4.2-1.2-6.4 0z';
    var f2 = 'M24 5.5c2.2 1.2 4.2-1.2 6.4 0s3.4 1 4.6 0v5c-1.2 1-2.4 1.2-4.6 0s-4.2 1.2-6.4 0z';
    return C('school', 24, 29, 1.35) + '<path d="M24 15.5V5.5"/><path class="ac" d="' + f1 + '">' + A('d', [f1, f2, f1], 1.4) + '</path>';
  };

  // Career: a climber hopping up the steps to a star.
  S['career-bot'] = function () {
    var hop = 'M10.5 35.8Q15 25 19.5 28.8Q24 18 28.5 21.8Q33 11 37.5 14.8';
    return '<path d="M6 39h9v-7h9v-7h9v-7h9"/>' +
      '<circle class="acf" r="2.3" opacity="0">' + M(hop, 4, { kp: [0, 0, 0.333, 0.333, 0.667, 0.667, 1, 1], t: [0, 0.08, 0.2, 0.3, 0.42, 0.52, 0.64, 1] }) +
      A('opacity', [0, 1, 1, 0], 4, { t: [0, 0.06, 0.9, 1], lin: true }) + '</circle>' +
      pop(40, 7.5, [0, 0, 1.15, 1, 1, 0], 4, [0, 0.62, 0.7, 0.76, 0.9, 1], STAR);
  };

  // Checker: a mistake is underlined, fixed, and ticked.
  S['checker-bot'] = function () {
    var t = [0, 0.2, 0.4, 0.55, 0.62, 0.9, 1], d = 3.8;
    return '<rect x="9" y="7" width="27" height="34" rx="3"/><path class="dim" d="M14 15h17M14 21h17M14 33h11"/><path d="M14 27h4.5M28 27h3"/>' +
      '<path class="ac" d="M21 27h4.5">' + A('opacity', [1, 1, 1, 0, 0, 0, 1], d, { t: t, lin: true }) + '</path>' +
      '<path d="M21 27h4.5" opacity="0">' + A('opacity', [0, 0, 0, 1, 1, 1, 0], d, { t: t, lin: true }) + '</path>' +
      '<path class="ac" d="M20.5 30.5q1-1.2 2 0t2 0 2 0" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" style="stroke-width:calc(var(--sw) * .7)">' +
      A('stroke-dashoffset', [100, 100, 0, 0, 0, 0, 100], d, { t: t, lin: true }) + A('opacity', [1, 1, 1, 0, 0, 0, 0], d, { t: t, lin: true }) + '</path>' +
      pop(35, 37, [0, 0, 0, 0, 1, 1, 0], d, t, badge(4.2));
  };

  // Creative: a before/after slider sweeping across a picture.
  S['creative-bot'] = function (u) {
    var pic = '<path d="M10 33.5l8-9 6 6 4-4 10 7.5"/><circle cx="32" cy="17" r="2.5"/>', d = 4.4;
    return '<clipPath id="' + u + '"><rect x="6" y="10" width="18" height="28">' + A('width', [8, 28, 8], d) + '</rect></clipPath>' +
      '<rect x="6" y="10" width="36" height="28" rx="4"/><g class="dim">' + pic + '</g><g class="ac" clip-path="url(#' + u + ')">' + pic + '</g>' +
      '<g>' + T('translate', ['-10 0', '10 0', '-10 0'], d) + '<path d="M24 10v28"/><circle class="knob" cx="24" cy="24" r="3.2"/></g>';
  };

  // Risk: a warning sign sending out alert rings.
  S['risk-bot'] = function () {
    return [0, 1.2].map(function (b) {
      return '<circle class="ac" cx="24" cy="26" r="12" opacity="0">' + A('r', [12, 21], 2.4, { begin: b }) + A('opacity', [0.6, 0], 2.4, { begin: b, lin: true }) + '</circle>';
    }).join('') +
      '<path class="knob" d="M24 9 40.5 37.5h-33z"/><path class="ac" d="M24 19.5v8M24 32v.1">' + A('opacity', [1, 0.3, 1], 1.2, { lin: true }) + '</path>';
  };

  // Community: people join in around one person.
  S['community-bot'] = function () {
    var d = 4, t = [0, 0.25, 0.75, 1];
    function side(cx, dx) {
      return '<g opacity="0">' + T('translate', [dx + ' 0', '0 0', '0 0', dx + ' 0'], d, { t: t }) + A('opacity', [0, 1, 1, 0], d, { t: t }) +
        '<circle cx="' + cx + '" cy="23" r="3.5"/><path d="M' + (cx - 6) + ' 37a6 6 0 0 1 12 0"/></g>';
    }
    return '<circle cx="24" cy="19" r="4.5"/><path d="M16 37a8 8 0 0 1 16 0"/>' + side(10, -6) + side(38, 6) +
      '<path class="ac" d="M11 15.5Q24 4 37 15.5" stroke-dasharray="2 3.5" opacity="0">' + A('opacity', [0, 0, 1, 1, 0, 0], d, { t: [0, 0.25, 0.35, 0.7, 0.78, 1] }) + '</path>';
  };

  // Music: a note bobbing while small notes float away.
  S['music-bot'] = function () {
    var note = '<circle class="acf" r="1.7"/><path class="ac" d="M1.5 0v-6.5c1.6.4 2.8 1.4 3 3"/>';
    return '<g>' + T('translate', ['0 0', '0 -1.5', '0 0'], 0.9) + C('music', 21, 26, 1.3) + '</g>' + [[0, 35, 27, 41, 12], [1.3, 36, 20, 38, 9]].map(function (n) {
      return '<g opacity="0">' + T('translate', [n[1] + ' ' + n[2], ((n[1] + n[3]) / 2 - 2) + ' ' + ((n[2] + n[4]) / 2), n[3] + ' ' + n[4]], 2.6, { lin: true, begin: n[0] }) +
        A('opacity', [0, 1, 1, 0], 2.6, { t: [0, 0.15, 0.6, 1], lin: true, begin: n[0] }) + note + '</g>';
    }).join('');
  };

  // News Desk: a front page with a live dot and a running ticker.
  S['news-desk-bot'] = function () {
    return '<rect x="7" y="9" width="34" height="30" rx="3"/>' +
      '<circle class="acf" cx="12.5" cy="14.5" r="1.6">' + A('opacity', [1, 0.2, 1], 1.1, { lin: true }) + '</circle>' +
      '<path d="M17 14.5h19"/><rect class="dim" x="12" y="19" width="10" height="8" rx="1.2"/><path class="dim" d="M26 20h10M26 23.5h10M26 27h6"/>' +
      '<path class="ac" d="M12 33.5h24" stroke-dasharray="7 3.5">' + A('stroke-dashoffset', [0, 10.5], 0.9, { lin: true }) + '</path>';
  };

  // PR: a paper plane delivers a pitch to the right person.
  S['pr-bot'] = function () {
    var path = 'M6 35C14 26 20 33 29 22', d = 3.4;
    return '<path class="dim" d="' + path + '" stroke-dasharray="1.5 4"/><circle cx="38" cy="17" r="3.5"/><path d="M31.5 31a6.5 6.5 0 0 1 13 0"/>' +
      '<circle class="ac" cx="38" cy="23" r="7" opacity="0">' + A('r', [7, 7, 7, 12, 12], d, { t: [0, 0.6, 0.62, 0.9, 1] }) +
      A('opacity', [0, 0, 0.7, 0, 0], d, { t: [0, 0.6, 0.62, 0.9, 1], lin: true }) + '</circle>' +
      '<g opacity="0">' + M(path, d, { kp: [0, 1, 1], t: [0, 0.62, 1], rotate: true }) + A('opacity', [0, 1, 1, 0, 0], d, { t: [0, 0.1, 0.55, 0.64, 1], lin: true }) +
      '<path class="fill" style="stroke-width:1" d="M5 0-5-4.5-3 0-5 4.5z"/></g>';
  };

  // SEO: a result climbs to the top of the search results.
  S['seo-bot'] = function () {
    var d = 4, t = [0, 0.15, 0.45, 0.85, 1];
    function row(y, cls, len, from) {
      return '<g transform="translate(0 ' + from + ')">' + T('translate', ['0 ' + from, '0 ' + from, '0 0', '0 0', '0 ' + from], d, { t: t }) +
        '<rect class="' + cls + '" x="8" y="' + (y - 2.5) + '" width="5" height="5" rx="1.2"/><path class="' + cls + '" d="M17 ' + y + 'h' + len + '"/></g>';
    }
    return '<rect x="7" y="6" width="34" height="9" rx="4.5"/><circle cx="13.5" cy="10.5" r="2.2"/><path d="M15.2 12.2l1.8 1.8"/><path class="dim" d="M20 10.5h12"/>' +
      row(29, 'dim', 17, -7) + row(36, 'dim', 14, -7) + row(22, 'ac', 21, 14);
  };

  // Voice: a microphone with a moving sound level.
  S['voice-bot'] = function () {
    return C('mic', 24, 22, 1.35) + [[7, 0, 5], [11.5, 0.2, 8], [36.5, 0.1, 8], [41, 0.3, 5]].map(function (b) {
      return '<line class="ac" x1="' + b[0] + '" x2="' + b[0] + '" y1="16" y2="20">' +
        A('y1', [16, 18 - b[2], 16], 0.8, { begin: b[1] }) + A('y2', [20, 18 + b[2], 20], 0.8, { begin: b[1] }) + '</line>';
    }).join('');
  };

  // Automation: work flows from one step to the next, with the switch on.
  S['automation-bot'] = function () {
    var d = 2.6;
    var extra = '<rect class="acf" width="8" height="8" x="13" y="13" rx="2" opacity="0">' + A('opacity', [0, 0, 0.45, 0, 0], d, { t: [0, 0.4, 0.48, 0.75, 1] }) + '</rect>' +
      '<circle class="acf" r="1.3" opacity="0">' + M('M7 11v4a2 2 0 0 0 2 2h4', d, { kp: [0, 1, 1], t: [0, 0.42, 1] }) +
      A('opacity', [0, 1, 1, 0, 0], d, { t: [0, 0.05, 0.38, 0.44, 1], lin: true }) + '</circle>';
    return C('workflow', 21, 26, 1.45, extra) + '<rect x="30" y="8" width="12" height="7" rx="3.5"/><circle class="acf" cx="38.5" cy="11.5" r="2"/>';
  };

  // Data: a chart line draws itself and a label pops up.
  S['data-bot'] = function () {
    var line = 'M13 32l7-8 6 4 10-12', d = 3.8, t = [0, 0.55, 0.9, 1];
    return '<path class="dim" d="M9 8v30h31"/>' +
      '<path class="ac" d="' + line + '" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100">' +
      A('stroke-dashoffset', [100, 0, 0, 0], d, { t: t, lin: true }) + A('opacity', [1, 1, 1, 0], d, { t: t, lin: true }) + '</path>' +
      [[20, 24, 0.17], [26, 28, 0.29], [36, 16, 0.55]].map(function (p) {
        return '<circle class="acf" cx="' + p[0] + '" cy="' + p[1] + '" r="0">' + A('r', [0, 0, 2, 2, 0], d, { t: [0, p[2], p[2] + 0.06, 0.9, 1] }) + '</circle>';
      }).join('') +
      '<g opacity="0">' + A('opacity', [0, 0, 1, 1, 0, 0], d, { t: [0, 0.58, 0.66, 0.88, 0.95, 1], lin: true }) +
      '<rect x="30" y="5" width="12" height="7" rx="2.5"/><path d="M36 12v2"/><path class="dim" d="M33 8.5h6"/></g>';
  };

  // DevOps: a release uploads to the cloud while the server lights blink.
  S['devops-bot'] = function () {
    return C('cloud', 24, 14, 1.3) +
      '<g opacity="0">' + T('translate', ['24 28', '24 19'], 1.6) + A('opacity', [0, 1, 0], 1.6, { t: [0, 0.4, 1], lin: true }) + '<path class="ac" d="M0 3.5v-7M-3-.5l3-3 3 3"/></g>' +
      '<rect x="13" y="31" width="22" height="9" rx="2.5"/>' +
      '<circle class="acf" cx="18" cy="35.5" r="1.2">' + A('opacity', [1, 0.2, 1], 1, { lin: true }) + '</circle>' +
      '<circle class="acf" cx="22" cy="35.5" r="1.2">' + A('opacity', [0.2, 1, 0.2], 1, { lin: true }) + '</circle><path class="dim" d="M27 35.5h4"/>';
  };

  // Review: a bug crawls out from the code and gets caught.
  S['review-bot'] = function () {
    var d = 3.8;
    return '<path class="dim" d="M9 10h13M13 16h18M13 22h11M9 28h8"/>' +
      '<circle class="ac" cx="33" cy="36" r="10" opacity="0">' + A('r', [10, 10, 7.5, 7.5, 10], d, { t: [0, 0.6, 0.66, 0.9, 1] }) +
      A('opacity', [0, 0, 1, 0, 0], d, { t: [0, 0.6, 0.66, 0.9, 1], lin: true }) + '</circle>' +
      '<g opacity="0">' + T('translate', ['8 36', '33 36', '33 36'], d, { t: [0, 0.6, 1], lin: true }) + A('opacity', [0, 1, 1, 0], d, { t: [0, 0.06, 0.88, 1], lin: true }) +
      '<g>' + T('rotate', [84, 96, 84], 0.4) + '<g transform="scale(.6) translate(-12 -12)" style="stroke-width:calc(var(--sw) / .6)">' + nodes('bug') + '</g></g></g>';
  };

  // Negotiation: a handshake that seals the deal.
  S['negotiation-bot'] = function () {
    var d = 3;
    return '<g>' + T('translate', ['0 0', '0 -1.6', '0 1.2', '0 -1.6', '0 1.2', '0 0', '0 0'], d, { t: [0, 0.07, 0.14, 0.21, 0.28, 0.35, 1] }) + C('handshake', 24, 26, 1.5) + '</g>' +
      '<path class="ac" d="M24 10V6.5M17 12.5l-2.2-2.2M31 12.5l2.2-2.2" opacity="0">' + A('opacity', [0, 0, 1, 1, 0, 0], d, { t: [0, 0.35, 0.42, 0.6, 0.72, 1], lin: true }) + '</path>';
  };

  // Notes: scattered notes gather into one neat stack.
  S['notes-bot'] = function () {
    var d = 4.2, t = [0, 0.35, 0.65, 1];
    return [[3, 3, -14, 13, 13], [29, 4, 12, 15.5, 15.5], [4, 29, 10, 18, 18]].map(function (n, i) {
      return '<g transform="translate(' + n[0] + ' ' + n[1] + ')">' + T('translate', [n[0] + ' ' + n[1], n[3] + ' ' + n[4], n[3] + ' ' + n[4], n[0] + ' ' + n[1]], d, { t: t }) +
        '<g transform="rotate(' + n[2] + ' 8 8)">' + T('rotate', [n[2] + ' 8 8', '0 8 8', '0 8 8', n[2] + ' 8 8'], d, { t: t }) +
        '<rect class="paper' + (i === 2 ? ' ac' : '') + '" width="16" height="16" rx="2.2"/><path class="dim" d="M4 5.5h8M4 9.5h5.5"/></g></g>';
    }).join('');
  };

  // Paperwork: a form gets its approval stamp.
  S['paperwork-bot'] = function () {
    var d = 3.4, t = [0, 0.3, 0.38, 0.55, 0.9, 1];
    return '<rect x="8" y="14" width="25" height="28" rx="3"/><path class="dim" d="M13 20h15M13 25h15M13 30h7"/>' +
      '<g opacity="0">' + A('opacity', [0, 0, 1, 1, 1, 0], d, { t: t, lin: true }) + '<circle class="ac" cx="27" cy="35" r="4.5"/><path class="ac" d="M25 35.1l1.5 1.5 3-3.2"/></g>' +
      '<g transform="translate(27 12)">' + T('translate', ['27 12', '27 12', '27 30', '27 12', '27 12', '27 12'], d, { t: t }) +
      '<circle class="knob" cx="0" cy="-8.5" r="2.5"/><path d="M0-6v2"/><rect class="knob" x="-6" y="-4" width="12" height="3.2" rx="1"/><path d="M-7 0h14"/></g>';
  };

  // Hiring: the pick lands on the right candidate.
  S['hiring-bot'] = function () {
    var d = 4;
    return [12, 24, 36].map(function (x) { return '<circle cx="' + x + '" cy="20" r="3.5"/><path d="M' + (x - 5.5) + ' 33a5.5 5.5 0 0 1 11 0"/>'; }).join('') +
      '<g opacity="0">' + T('translate', ['12 0', '36 0', '24 0', '24 0', '12 0'], d, { t: [0, 0.25, 0.45, 0.9, 1] }) + A('opacity', [0, 1, 1, 0], d, { t: [0, 0.06, 0.88, 1], lin: true }) +
      '<rect class="ac" x="-7.5" y="11.5" width="15" height="26" rx="5"/></g>' +
      pop(29.5, 14.5, [0, 0, 1, 1, 0], d, [0, 0.45, 0.52, 0.88, 1], badge(3.6));
  };

  // Ops: two gears turning together.
  S['ops-bot'] = function () {
    function gear(cx, cy, s, to, dur, cls) {
      return '<g transform="translate(' + cx + ' ' + cy + ')"' + (cls ? ' class="' + cls + '"' : '') + '><g>' + T('rotate', [0, to], dur, { lin: true }) +
        '<g transform="scale(' + s + ') translate(-12 -12)" style="stroke-width:calc(var(--sw) / ' + s + ')">' + nodes('cog') + '</g></g></g>';
    }
    return gear(19, 20, 1.15, 360, 8) + gear(33, 33, 0.8, -360, +(8 * 0.8 / 1.15).toFixed(2), 'ac');
  };

  // Product: an arrow hits the bullseye.
  S['product-bot'] = function () {
    var d = 3.2, t = [0, 0.3, 0.38, 0.46, 0.54, 0.9, 1];
    return '<circle cx="22" cy="26" r="14"/><circle cx="22" cy="26" r="9"/>' +
      '<circle class="acf" cx="22" cy="26" r="3.6">' + A('r', [3.6, 3.6, 5, 3.6, 3.6, 3.6, 3.6], d, { t: t }) + '</circle>' +
      '<g opacity="0">' + T('translate', ['40 8', '22 26', '22 26', '22 26', '22 26', '22 26', '40 8'], d, { t: t }) +
      A('opacity', [0, 1, 1, 1, 1, 0, 0], d, { t: [0, 0.1, 0.38, 0.46, 0.54, 0.9, 1], lin: true }) +
      '<g>' + T('rotate', [0, 0, -6, 4, 0, 0, 0], d, { t: t }) + '<path d="M0 0l13-13M13-13h3.5M13-13v-3.5M10.5-10.5h3.5M10.5-10.5v-3.5"/></g></g>';
  };

  // Sales: leads drop into the funnel and a deal comes out.
  S['sales-bot'] = function () {
    var d = 3.6;
    return '<path d="M7 9h34L28 24v10l-8 4V24z"/>' + [[12, 0], [24, 0.45], [35, 0.9]].map(function (p) {
      return '<circle class="dot" r="1.8" opacity="0">' + M('M' + p[0] + ' 2L24 17', d, { kp: [0, 1, 1], t: [0, 0.25, 1], begin: p[1] }) +
        A('opacity', [0, 1, 1, 0, 0], d, { t: [0, 0.05, 0.2, 0.27, 1], lin: true, begin: p[1] }) + '</circle>';
    }).join('') +
      '<g opacity="0">' + T('translate', ['24 38', '24 38', '24 44', '24 44'], d, { t: [0, 0.55, 0.8, 1] }) + A('opacity', [0, 0, 1, 0, 0], d, { t: [0, 0.55, 0.62, 0.8, 1], lin: true }) +
      '<circle class="acf" r="3"/></g>';
  };

  // Spend: a coin spins down into the piggy bank.
  S['spend-bot'] = function () {
    var d = 2.8;
    return '<g opacity="0">' + T('translate', ['24 2', '24 17', '24 17'], d, { t: [0, 0.45, 1] }) + A('opacity', [0, 1, 1, 0, 0], d, { t: [0, 0.1, 0.4, 0.48, 1], lin: true }) +
      '<ellipse class="ac" rx="3.6" ry="3.6">' + A('rx', [3.6, 1, 3.6, 1, 3.6], d) + '</ellipse></g>' +
      '<g transform="translate(24 39.5)"><g>' + T('scale', ['1 1', '1 1', '1.04 .95', '1 1', '1 1'], d, { t: [0, 0.45, 0.52, 0.62, 1] }) + C('piggy-bank', 0, -11.5, 1.4) + '</g></g>';
  };

  // Support: typing dots, then a reply that solves it.
  S['support-bot'] = function () {
    var d = 3.8;
    return '<path d="M10 11h28a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H21l-7 6v-6h-4a4 4 0 0 1-4-4V15a4 4 0 0 1 4-4z"/>' +
      '<g>' + A('opacity', [1, 1, 0, 0, 1], d, { t: [0, 0.5, 0.56, 0.94, 1], lin: true }) + [17, 24, 31].map(function (x, i) {
        return '<circle class="dot" cx="' + x + '" cy="22" r="2">' + T('translate', ['0 0', '0 -2.5', '0 0', '0 0'], 0.9, { t: [0, 0.2, 0.4, 1], begin: i * 0.15 }) + '</circle>';
      }).join('') + '</g>' +
      draw('M18 22l4 4 8-8.5', [100, 100, 0, 0, 100], d, { cls: 'ac', t: [0, 0.56, 0.68, 0.92, 1] });
  };

  // Motion Graphic Video: a tilted app window with light sweeping across it, a headline that
  // writes itself in below, and a sound level keeping the beat.
  S['motion-graphic-video-bot'] = function (u) {
    var win = 'M9 14 36 10V29L9 34Z', d = 3.2;
    return '<clipPath id="' + u + '"><path d="' + win + '"/></clipPath>' +
      '<g>' + T('translate', ['0 0', '0 -1.2', '0 0'], 3) +
      '<g clip-path="url(#' + u + ')"><g transform="translate(-30 0)">' + T('translate', ['-30 0', '34 0', '34 0'], d, { t: [0, 0.55, 1] }) +
      '<path class="acf" d="M15 4h7L10 42H3z" opacity=".38"/></g></g>' +
      '<path d="' + win + '"/><path class="dim" d="M13 18.5l10-1.5M13 23l18-2.7M13 27.5l13-2"/></g>' +
      draw('M9 39.5h16', [100, 100, 0, 0, 100], d, { cls: 'ac', t: [0, 0.2, 0.42, 0.9, 1] }) +
      draw('M9 43.5h10', [100, 100, 0, 0, 100], d, { t: [0, 0.32, 0.5, 0.9, 1] }) +
      [[32, 0, 4], [35.5, 0.15, 6], [39, 0.3, 3.5]].map(function (b) {
        return '<line class="ac" x1="' + b[0] + '" x2="' + b[0] + '" y1="39.5" y2="43.5">' +
          A('y1', [39.5, 41.5 - b[2], 39.5], 0.6, { begin: b[1] }) + A('y2', [43.5, 41.5 + b[2], 43.5], 0.6, { begin: b[1] }) + '</line>';
      }).join('');
  };

  // Explainer Video: a video frame where a chart grows and draws its trend, a verified tick
  // pops in, and a voice-over waveform runs underneath.
  S['explainer-video-bot'] = function () {
    var d = 3.8, t = [0, 0.3, 0.8, 1];
    function bar(x, h, delay) {
      var low = 2;
      return '<rect x="' + x + '" y="' + (29 - low) + '" width="4" height="' + low + '" rx="1">' +
        A('height', [low, h, h, low], d, { t: t, begin: delay }) + A('y', [29 - low, 29 - h, 29 - h, 29 - low], d, { t: t, begin: delay }) + '</rect>';
    }
    return '<rect x="7" y="9" width="34" height="25" rx="4"/>' +
      bar(12, 7, 0) + bar(18, 11, 0.15) + bar(24, 14, 0.3) +
      draw('M12 20l8-4 6 1 8-6', [100, 100, 0, 0, 100], d, { cls: 'ac', t: [0, 0.3, 0.5, 0.88, 1] }) +
      pop(35.5, 14.5, [0, 0, 1.1, 1, 1, 0], d, [0, 0.5, 0.58, 0.64, 0.88, 1], badge(3.4)) +
      [[11, 0, 2], [15.5, 0.12, 3.5], [20, 0.24, 2.5], [24.5, 0.06, 4], [29, 0.18, 2], [33.5, 0.3, 3]].map(function (b) {
        return '<line class="dim" x1="' + b[0] + '" x2="' + b[0] + '" y1="39" y2="41">' +
          A('y1', [39, 40 - b[2], 39], 0.7, { begin: b[1] }) + A('y2', [41, 40 + b[2], 41], 0.7, { begin: b[1] }) + '</line>';
      }).join('');
  };

  // Notepad: a dated page fills line by line as you dictate, then a reminder bell rings.
  S['notepad-bot'] = function () {
    var d = 4.4;
    function line(path, from, to) { return draw(path, [100, 100, 0, 0, 100], d, { t: [0, from, to, 0.9, 1] }); }
    return '<rect class="paper" x="10" y="9" width="24" height="30" rx="3"/>' +
      '<path d="M15 6.5v5M22 6.5v5M29 6.5v5"/>' +
      '<path class="ac" d="M15 16.5h6"/>' +
      line('M15 22h14', 0.08, 0.28) + line('M15 27h10', 0.28, 0.44) + line('M15 32h12', 0.44, 0.6) +
      '<g transform="translate(37 33)"><g>' + T('rotate', [0, 0, -16, 13, -8, 0, 0], d, { t: [0, 0.64, 0.7, 0.76, 0.82, 0.88, 1] }) +
      '<path class="acf" d="M-4.5 2.5c1-1 1.5-2 1.5-4.5a3 3 0 0 1 6 0c0 2.5.5 3.5 1.5 4.5z"/>' +
      '<path class="ac" d="M-1.3 4.6a1.5 1.5 0 0 0 2.6 0"/></g></g>';
  };

  window.FreezeStackGrokScenes = S;
})();

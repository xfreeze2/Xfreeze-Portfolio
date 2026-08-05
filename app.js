/* Path-based section routes: /frezestack not #frezestack */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

(function initPathRouting() {
  const pathToSection = {
    "/": "top",
    "/about": "about",
    "/frezestack": "frezestack",
    "/articles": "articles",
    "/posts": "posts",
    "/library": "posts",
    "/contact": "contact",
    "/support": "support"
  };

  function normalizePath(pathname) {
    const p = (pathname || "/").replace(/\/+$/, "");
    return p === "" ? "/" : p;
  }

  function sectionIdFromPath(pathname) {
    return pathToSection[normalizePath(pathname)] || null;
  }

  function pathFromSectionId(id) {
    if (!id || id === "top") return "/";
    const match = Object.entries(pathToSection).find(
      ([path, sectionId]) => sectionId === id && path !== "/library"
    );
    return match ? match[0] : `/${id}`;
  }

  function scrollToSection(id, behavior = "smooth") {
    if (!id || id === "top") {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior, block: "start" });
  }

  function go(path, { push = true, behavior = "smooth" } = {}) {
    const clean = normalizePath(path);
    const id = sectionIdFromPath(clean) || "top";
    const url = clean === "/" ? "/" : clean;
    if (push) history.pushState({ path: clean }, "", url);
    else history.replaceState({ path: clean }, "", url);
    scrollToSection(id, behavior);
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const href = link.getAttribute("href");
    if (!href) return;

    // Clean path links: /about, /frezestack, …
    if (href.startsWith("/") && !href.startsWith("//")) {
      const pathOnly = href.split("?")[0].split("#")[0];
      if (sectionIdFromPath(pathOnly) || pathOnly === "/") {
        event.preventDefault();
        go(pathOnly);
      }
      return;
    }

    // Legacy hash links still work, but rewrite URL without #
    if (href.startsWith("#") && href.length > 1) {
      const id = href.slice(1);
      if (id === "main") return;
      if (id === "top" || document.getElementById(id)) {
        event.preventDefault();
        go(pathFromSectionId(id));
      }
    }
  });

  window.addEventListener("popstate", () => {
    go(location.pathname, { push: false, behavior: "auto" });
  });

  function bootFromLocation() {
    // Old bookmarks: /#frezestack → /frezestack
    if (location.hash && location.hash.length > 1) {
      const id = location.hash.slice(1);
      if (id === "top" || document.getElementById(id)) {
        go(pathFromSectionId(id), { push: false, behavior: "auto" });
        return;
      }
    }
    const path = normalizePath(location.pathname);
    if (path !== "/" && sectionIdFromPath(path)) {
      go(path, { push: false, behavior: "auto" });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootFromLocation);
  } else {
    bootFromLocation();
  }
})();

const consultDialog = document.querySelector("#consultDialog");
const supportDialog = document.querySelector("#supportDialog");
const consultForm = document.querySelector("#consultForm");
const consultStatus = document.querySelector("#consultStatus");
const walletStatus = document.querySelector("#walletStatus");
const toast = document.querySelector("#toast");
let toastTimer;

document.documentElement.classList.add("js");

function markHeroLoaded() {
  document.documentElement.classList.add("is-loaded");
}

// Wait for fonts + one paint so the cascade doesn't hitch mid-frame
const startHeroMotion = () => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      // tiny beat after layout so transitions always start from the hidden state
      window.setTimeout(markHeroLoaded, 40);
    });
  });
};

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(startHeroMotion).catch(startHeroMotion);
} else {
  startHeroMotion();
}

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealSections = document.querySelectorAll(".reveal-section");
  document.documentElement.classList.add("has-reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealSections.forEach((section) => revealObserver.observe(section));
}

if (window.matchMedia("(pointer: fine)").matches) {
  document.querySelectorAll("[data-glass]").forEach((surface) => {
    surface.addEventListener("pointermove", (event) => {
      const bounds = surface.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width) * 100;
      const y = ((event.clientY - bounds.top) / bounds.height) * 100;
      surface.style.setProperty("--mx", `${x.toFixed(2)}%`);
      surface.style.setProperty("--my", `${y.toFixed(2)}%`);
    });

    surface.addEventListener("pointerleave", () => {
      surface.style.setProperty("--mx", "20%");
      surface.style.setProperty("--my", "0%");
    });
  });
}

function openDialog(dialog) {
  if (!dialog || dialog.open) return;
  dialog.showModal();
  document.body.classList.add("dialog-open");
}

function closeDialog(dialog) {
  if (!dialog || !dialog.open) return;
  dialog.close();
  document.body.classList.remove("dialog-open");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

document.querySelectorAll("[data-open-support]").forEach((button) => {
  button.addEventListener("click", () => openDialog(supportDialog));
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => closeDialog(button.closest("dialog")));
});

[consultDialog, supportDialog].filter(Boolean).forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeDialog(dialog);
  });
  dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
});

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
}

document.querySelectorAll("[data-copy-wallet]").forEach((button) => {
  button.addEventListener("click", async () => {
    await copyText(button.dataset.copyWallet);
    const original = button.textContent;
    button.textContent = "Copied";
    walletStatus.textContent = "Wallet address copied to your clipboard.";
    window.setTimeout(() => {
      button.textContent = original;
      walletStatus.textContent = "";
    }, 2200);
  });
});

if (consultForm) {
  consultForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(consultForm);
    const message = [
      `Hello X Freeze, I am ${data.get("name")}.`,
      `Topic: ${data.get("topic")}`,
      "",
      data.get("message")
    ].join("\n");

    await copyText(message);
    if (consultStatus) {
      consultStatus.textContent = "Your message has been copied. Opening X now.";
    }
    window.setTimeout(() => {
      window.open("https://x.com/XFreeze", "_blank", "noopener,noreferrer");
    }, 450);
  });
}

/* Articles: page scroll (up/down) moves the card track sideways */
(function initArticlesHorizontalScroll() {
  const pin = document.querySelector(".x-articles-pin");
  const sticky = document.querySelector(".x-articles-sticky");
  const track = document.getElementById("x-articles-track");
  const viewport = document.querySelector(".x-articles-viewport");
  if (!pin || !sticky || !track) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia("(max-width: 720px)");
  let ticking = false;

  function maxTranslate() {
    const gutter = viewport
      ? parseFloat(getComputedStyle(viewport).paddingLeft) || 0
      : 0;
    return Math.max(0, track.scrollWidth - window.innerWidth + gutter);
  }

  function setPinHeight() {
    if (reduceMotion.matches || mobile.matches) {
      pin.style.height = "";
      return;
    }
    // Content-height sticky + horizontal travel (no full-viewport empty band)
    const stickyH = sticky.offsetHeight;
    const travel = maxTranslate();
    pin.style.height = `${Math.round(stickyH + travel * 1.08)}px`;
  }

  function progress() {
    const rect = pin.getBoundingClientRect();
    const pinH = pin.offsetHeight;
    const stickyH = sticky.offsetHeight;
    const travel = pinH - stickyH;
    if (travel <= 0) return 0;
    // 0 when pin top hits viewport top; 1 when pin is fully scrolled through
    const scrolled = Math.min(Math.max(-rect.top, 0), travel);
    return scrolled / travel;
  }

  function update() {
    ticking = false;
    if (reduceMotion.matches || mobile.matches) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }
    const p = progress();
    const x = -maxTranslate() * p;
    // Only X — sticky freezes Y while the pin scrolls
    track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`;
  }

  function layoutAndUpdate() {
    setPinHeight();
    update();
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  function onResize() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(layoutAndUpdate);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  reduceMotion.addEventListener?.("change", layoutAndUpdate);
  mobile.addEventListener?.("change", layoutAndUpdate);

  track.querySelectorAll("img").forEach((img) => {
    if (!img.complete) img.addEventListener("load", layoutAndUpdate, { once: true });
  });

  layoutAndUpdate();
  window.requestAnimationFrame(layoutAndUpdate);
})();

/* Post library (data from posts.js) */
(function initLibrary() {
  const grid = document.querySelector("#lib-grid");
  if (!grid || !window.XF_POSTS) return;

  const POSTS = window.XF_POSTS;
  const CHIPS = window.XF_CHIPS || [];
  const PAGE = 12;
  const state = { cat: "all", q: "", sort: "views", shown: PAGE };

  function compact(n) {
    if (n >= 1e9) return `${(n / 1e9).toFixed(2).replace(/\.?0+$/, "")}B`;
    if (n >= 1e6) return `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
    if (n >= 1e3) return `${Math.round(n / 1e3)}K`;
    return String(n);
  }

  function niceDate(iso) {
    return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
      timeZone: "UTC"
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]
    ));
  }

  const filtersEl = document.querySelector("#lib-filters");
  if (filtersEl) {
    filtersEl.innerHTML = [
      `<button class="filter active" type="button" data-cat="all" aria-pressed="true">All <small>${POSTS.length}</small></button>`,
      ...CHIPS.map((chip) => (
        `<button class="filter" type="button" data-cat="${chip.key}" aria-pressed="false">${esc(chip.label)} <small>${chip.n}</small></button>`
      ))
    ].join("");
  }

  function matches() {
    const q = state.q.toLowerCase();
    return POSTS.filter((post) => {
      if (state.cat !== "all" && !post.c.includes(state.cat)) return false;
      if (q && !post.t.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function sortList(list) {
    const out = list.slice();
    if (state.sort === "date") out.sort((a, b) => (a.d < b.d ? 1 : -1));
    else out.sort((a, b) => b.v - a.v);
    return out;
  }

  const countEl = document.querySelector("#lib-count");
  const moreWrap = document.querySelector(".lib-more");
  const moreBtn = document.querySelector("#lib-more");

  function render() {
    const list = sortList(matches());
    const slice = list.slice(0, state.shown);

    if (!list.length) {
      grid.innerHTML = '<p class="lib-empty">No posts match that search. Try another word or clear the filter.</p>';
    } else {
      grid.innerHTML = slice.map((post, index) => {
        const featured = index === 0 ? " lib-card-featured" : "";
        const metaBits = featured
          ? `${compact(post.l)} likes · ${compact(post.r)} reposts · ${niceDate(post.d)}`
          : `${compact(post.l)} likes · ${compact(post.r)} reposts`;

        return (
          `<a class="lib-card${featured}" href="${post.u}" target="_blank" rel="noopener noreferrer">` +
          `<div class="lib-card-top"><span class="lib-tag">${esc(post.tag)}</span><span class="lib-date">${niceDate(post.d)}</span></div>` +
          `<div class="lib-body">` +
          (post.q ? `<p class="lib-quoting">Replying to @${esc(post.q)}</p>` : "") +
          `<p class="lib-text">${esc(post.t)}</p>` +
          `</div>` +
          `<div class="lib-metrics">` +
          `<span class="v">${compact(post.v)} views</span>` +
          `<span class="sub">${metaBits}</span>` +
          `<span class="go" aria-hidden="true">↗</span>` +
          `</div>` +
          "</a>"
        );
      }).join("");
    }

    if (countEl) {
      countEl.textContent = list.length
        ? `${slice.length} of ${list.length} posts`
        : "";
    }
    if (moreWrap) moreWrap.classList.toggle("done", slice.length >= list.length);
  }

  function reset() {
    state.shown = PAGE;
    render();
  }

  filtersEl?.addEventListener("click", (event) => {
    const btn = event.target.closest(".filter");
    if (!btn) return;
    filtersEl.querySelectorAll(".filter").forEach((item) => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    state.cat = btn.dataset.cat;
    reset();
  });

  const searchInput = document.querySelector("#lib-q");
  if (searchInput) {
    let timer;
    searchInput.addEventListener("input", () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        state.q = searchInput.value.trim();
        reset();
      }, 140);
    });
  }

  document.querySelectorAll(".sort-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".sort-btn").forEach((item) => {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      state.sort = btn.dataset.sort;
      reset();
    });
  });

  moreBtn?.addEventListener("click", () => {
    state.shown += PAGE;
    render();
  });

  render();
})();

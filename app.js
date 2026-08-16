/* Theme: light / dark with localStorage + system preference */
(function initThemeToggle() {
  const key = "xf-theme";
  const root = document.documentElement;

  function getPreferred() {
    try {
      const stored = localStorage.getItem(key);
      if (stored === "dark" || stored === "light") return stored;
    } catch (_) {}
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(key, theme);
    } catch (_) {}
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const next = theme === "dark" ? "light" : "dark";
      btn.setAttribute("aria-label", `Switch to ${next} theme`);
      btn.title = `Switch to ${next} theme`;
    });
  }

  applyTheme(root.getAttribute("data-theme") || getPreferred());

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      applyTheme(current === "dark" ? "light" : "dark");
    });
  });

  // Follow system only when user hasn't chosen explicitly
  try {
    if (!localStorage.getItem(key)) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
        if (!localStorage.getItem(key)) {
          applyTheme(event.matches ? "dark" : "light");
        }
      });
    }
  } catch (_) {}
})();

/* Path-based section routes + keep scroll position on refresh */
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

(function initPathRouting() {
  const pathToSection = {
    "/": "top",
    "/about": "about",
    "/articles": "articles",
    "/contact": "contact",
    "/support": "support"
  };
  const SCROLL_Y_KEY = "xf-scroll-y";
  const SCROLL_PATH_KEY = "xf-scroll-path";
  let saveTimer = 0;

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
      ([path, sectionId]) => sectionId === id
    );
    return match ? match[0] : `/${id}`;
  }

  function saveScroll() {
    try {
      sessionStorage.setItem(SCROLL_Y_KEY, String(window.scrollY || 0));
      sessionStorage.setItem(SCROLL_PATH_KEY, normalizePath(location.pathname));
    } catch (_) {}
  }

  function readSavedScroll() {
    try {
      const path = sessionStorage.getItem(SCROLL_PATH_KEY);
      const y = sessionStorage.getItem(SCROLL_Y_KEY);
      if (path == null || y == null) return null;
      return { path, y: Math.max(0, parseInt(y, 10) || 0) };
    } catch (_) {
      return null;
    }
  }

  function restoreScroll(y) {
    const apply = () => window.scrollTo({ top: y, left: 0, behavior: "auto" });
    apply();
    // Layout (images/sticky) can shift after first paint — re-apply a few times
    window.requestAnimationFrame(apply);
    window.setTimeout(apply, 50);
    window.setTimeout(apply, 200);
    window.setTimeout(apply, 500);
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
    // Nav clicks intentionally jump — overwrite saved position after jump
    window.setTimeout(saveScroll, behavior === "smooth" ? 450 : 0);
  }

  window.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(saveScroll, 80);
    },
    { passive: true }
  );
  window.addEventListener("pagehide", saveScroll);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveScroll();
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target === "_blank" || link.hasAttribute("download")) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const href = link.getAttribute("href");
    if (!href) return;

    if (href.startsWith("/") && !href.startsWith("//")) {
      const pathOnly = href.split("?")[0].split("#")[0];
      if (sectionIdFromPath(pathOnly) || pathOnly === "/") {
        event.preventDefault();
        go(pathOnly);
      }
      return;
    }

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

  function isReload() {
    const nav = performance.getEntriesByType("navigation")[0];
    return Boolean(nav && nav.type === "reload");
  }

  function bootFromLocation() {
    // Old hash bookmarks: /#about → /about (URL only)
    if (location.hash && location.hash.length > 1) {
      const id = location.hash.slice(1);
      if (id === "top" || document.getElementById(id)) {
        const path = pathFromSectionId(id);
        history.replaceState({ path }, "", path === "/" ? "/" : path);
      }
    }

    const path = normalizePath(location.pathname);
    const saved = readSavedScroll();

    // Refresh / back within same session: restore exact scroll position
    if (saved && saved.path === path) {
      restoreScroll(saved.y);
      return;
    }

    // Fresh visit to a section path (not a reload with saved scroll)
    if (!isReload() && path !== "/" && sectionIdFromPath(path)) {
      scrollToSection(sectionIdFromPath(path), "auto");
      window.setTimeout(saveScroll, 0);
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

const CALENDLY_URL = "https://calendly.com/xfreeze-connect/30min";
const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

let calendlyAssetsPromise = null;

function ensureCalendlyAssets() {
  if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
    return Promise.resolve();
  }
  if (calendlyAssetsPromise) return calendlyAssetsPromise;

  calendlyAssetsPromise = new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }

    const existing = document.querySelector(`script[src="${CALENDLY_JS}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Calendly failed to load")), { once: true });
      // already loaded earlier
      if (window.Calendly) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Calendly failed to load"));
    document.head.appendChild(script);
  }).catch((error) => {
    calendlyAssetsPromise = null;
    throw error;
  });

  return calendlyAssetsPromise;
}

function showCalendlyLoading() {
  let overlay = document.getElementById("calendlyLoading");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "calendlyLoading";
    overlay.className = "calendly-loading";
    overlay.setAttribute("role", "status");
    overlay.innerHTML = `
      <div class="calendly-loading-card">
        <div class="calendly-loading-spinner" aria-hidden="true"></div>
        <p>Opening calendar…</p>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.hidden = false;
  document.body.classList.add("calendly-loading-open");
}

function hideCalendlyLoading() {
  const overlay = document.getElementById("calendlyLoading");
  if (overlay) overlay.hidden = true;
  document.body.classList.remove("calendly-loading-open");
}

async function openCalendlyPopup() {
  showCalendlyLoading();
  try {
    await ensureCalendlyAssets();
    // Small beat so spinner paints before Calendly paints over it
    await new Promise((r) => window.requestAnimationFrame(() => r()));
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: CALENDLY_URL });
      // Calendly popup usually covers the page; hide our spinner shortly after
      window.setTimeout(hideCalendlyLoading, 400);
      return;
    }
    throw new Error("Calendly widget unavailable");
  } catch {
    hideCalendlyLoading();
    window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
  }
}

document.querySelectorAll("[data-open-calendly]").forEach((button) => {
  // Warm the script on hover/focus so click feels instant
  const warm = () => {
    ensureCalendlyAssets().catch(() => {});
  };
  button.addEventListener("pointerenter", warm, { once: true });
  button.addEventListener("focus", warm, { once: true });
  button.addEventListener("click", (event) => {
    event.preventDefault();
    openCalendlyPopup();
  });
});

// Prefetch Calendly after first paint / idle so first click is faster
const scheduleCalendlyPrefetch = () => {
  const run = () => ensureCalendlyAssets().catch(() => {});
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    window.setTimeout(run, 2500);
  }
};
if (document.readyState === "complete") scheduleCalendlyPrefetch();
else window.addEventListener("load", scheduleCalendlyPrefetch, { once: true });

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


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

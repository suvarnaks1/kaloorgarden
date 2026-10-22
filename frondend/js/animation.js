/* ==========================================================
   Golden Aura — scroll reveal + micro-interactions
   Adds `.reveal` and `.reveal-stagger` markers to elements
   and toggles `.is-visible` when they enter the viewport.
========================================================== */

(function () {
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReduced) {
    document.documentElement.classList.add("reduced-motion");
    return;
  }

  /* Elements to auto-mark for reveal */
  const SINGLE_SELECTORS = [
    ".section-title",
    ".section-sub",
    ".page-banner h1",
    ".page-banner p",
    ".about",
    ".about img",
    ".stats",
    ".contact-info",
    ".tip",
    ".acc-item",
    ".detail-img",
    ".detail-info",
    ".cart-item"
  ];

  /* Groups whose children should stagger in */
  const GROUP_SELECTORS = [
    ".featured-grid",
    ".grid",
    ".carousel",
    ".tips"
  ];

  function mark() {
    SINGLE_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains("reveal")) {
          el.classList.add("reveal");
        }
      });
    });

    GROUP_SELECTORS.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        el.classList.add("reveal-stagger");
      });
    });
  }

  function observe() {
    const targets = document.querySelectorAll(
      ".reveal:not(.is-visible), .reveal-stagger:not(.is-visible)"
    );

    if (!("IntersectionObserver" in window)) {
      /* Fallback: show everything */
      targets.forEach(el => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px"
      }
    );

    targets.forEach(el => io.observe(el));
  }

  /* Run after main.js has rendered cards */
  function boot() {
    mark();
    observe();

    /* Re-mark and re-observe any elements added later
       (e.g. product cards rendered on filter change) */
    const mo = new MutationObserver(() => {
      mark();
      observe();
    });

    mo.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
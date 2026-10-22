/* ============ Golden Aura — shared script ============ */

/* ---------- products (Cart-innu vendi maathram ippol use cheyyunnu) ---------- */
const PRODUCTS = [
  {
    id: 1,
    name: "Monstera Albo Variegata",
    price: 25,
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=85",
    cat: "Exotic Rare",
    rare: true,
    isNew: false,
    desc: "Monstera Albo Variegata features striking split leaves and beautiful variegation, making every plant a statement piece.",
    light: "Bright indirect",
    water: "Every 7–10 days",
    pet: "Toxic to pets",
    size: '6" pot'
  },
  {
    id: 2,
    name: "Philodendron 'Pink Princess'",
    price: 29,
    img: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85",
    cat: "Exotic Rare",
    rare: true,
    isNew: true,
    desc: "A beautiful foliage plant with dramatic leaves. Its distinctive pink variegation makes it a collector favorite.",
    light: "Bright indirect",
    water: "Every 7 days",
    pet: "Toxic to pets",
    size: '5" pot'
  },
];

const CATS = [
  "All",
  "Exotic Rare",
  "Foliage",
  "Succulents",
  "Easy Care"
];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85";

const money = n =>
  "₹" + Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

const byId = id => PRODUCTS.find(p => p.id === Number(id));

/* ---------- image helpers ---------- */
function plantImage(url, name, className = "") {
  return `
    <img
      class="${className}"
      src="${url}"
      alt="${name}"
      loading="lazy"
      onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"
    >
  `;
}

/* ---------- cart: localStorage ---------- */
const Cart = {
  get() {
    try {
      const stored = JSON.parse(localStorage.getItem("ga_cart"));
      if (!Array.isArray(stored)) return [];

      return stored
        .filter(item => byId(item.id) && Number(item.qty) > 0)
        .map(item => ({
          id: Number(item.id),
          qty: Math.max(1, Math.floor(Number(item.qty)))
        }));
    } catch (e) {
      return [];
    }
  },

  save(cart) {
    try {
      localStorage.setItem("ga_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Unable to save cart to localStorage.", e);
    }
    this.badge();
  },

  add(id, qty = 1) {
    const product = byId(id);
    if (!product) return;

    const amount = Math.max(1, Math.floor(Number(qty) || 1));
    const cart = this.get();
    const item = cart.find(x => x.id === product.id);

    if (item) {
      item.qty += amount;
    } else {
      cart.push({ id: product.id, qty: amount });
    }

    this.save(cart);
  },

  set(id, qty) {
    const product = byId(id);
    if (!product) return;

    const amount = Math.max(1, Math.floor(Number(qty) || 1));
    const cart = this.get().map(item =>
      item.id === product.id
        ? { ...item, qty: amount }
        : item
    );

    this.save(cart);
  },

  remove(id) {
    this.save(this.get().filter(item => item.id !== Number(id)));
  },

  count() {
    return this.get().reduce((total, item) => total + item.qty, 0);
  },

  badge() {
    document.querySelectorAll(".cart-badge").forEach(badge => {
      badge.textContent = this.count();
    });
  }
};

/* ---------- toast notifications ---------- */
function toast(message) {
  let element = document.querySelector(".toast");

  if (!element) {
    element = document.createElement("div");
    element.className = "toast";
    document.body.appendChild(element);
  }

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(element._h);
  element._h = setTimeout(() => {
    element.classList.remove("show");
  }, 2000);
}

/* ---------- header / footer ---------- */
const NAV = [
  ["index.html", "Home"],
  ["shop.html", "Shop All"],
  ["exotic.html", "Exotic Rare"],
  ["care.html", "Care Tips"],
  ["about.html", "About"],
  ["contact.html", "Contact"]
];

function buildHeader() {
  const header = document.getElementById("site-header");
  if (!header) return;

  const currentPage =
    location.pathname.split("/").pop() || "index.html";

  const links = NAV.map(([href, title]) => `
    <a
      class="nav-link ${currentPage === href ? "active" : ""}"
      href="${href}"
    >${title}</a>
  `).join("");

  header.className = "site-header";

  header.innerHTML = `
    <div class="header-inner">
      <a class="logo" href="index.html">
        <img src="images/logo-leaf.svg" alt="">
        <span>Golden Aura</span>
      </a>

      <button class="menu-toggle" aria-label="Toggle navigation"
        aria-expanded="false">☰</button>

      <nav class="main-nav">
        ${links}
        <span class="nav-divider"></span>

        <a class="cart-link" href="cart.html" aria-label="Shopping cart">
          <svg viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="1.7"
            stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 3h3l2.6 12.2a2 2 0 0 0 2 1.6h8.1a2 2 0 0 0 2-1.5L21 7H6"/>
            <circle cx="10" cy="20.5" r="1.4"/>
            <circle cx="18" cy="20.5" r="1.4"/>
          </svg>
          <span class="cart-badge">0</span>
        </a>
      </nav>
    </div>
  `;

  const toggle = header.querySelector(".menu-toggle");
  const nav = header.querySelector(".main-nav");

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    })
  );
}

function buildFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const quickLinks = NAV.map(([href, title]) => `
    <li><a href="${href}">${title}</a></li>
  `).join("");

  footer.className = "site-footer";

  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-about">
        <a class="logo" href="index.html">
          <img src="images/logo-leaf.svg"
            alt="" style="filter:brightness(1.6)">
          <span>Golden Aura</span>
        </a>
        <p>
          Curating botanical magic for your home —
          rare, healthy plants delivered with care.
        </p>
      </div>

      <div>
        <h4>Quick Links</h4>
        <ul>${quickLinks}</ul>
      </div>

      <div class="news">
        <h4 class="gold">Stay Rooted in Style</h4>
        <p>
          Subscribe to get care tips and early access
          to new rare arrivals in our newsletter.
        </p>

        <form id="news-form" novalidate>
          <input type="email" id="news-email"
            placeholder="Email address"
            aria-label="Email address" required>
          <button type="submit">Subscribe</button>
        </form>

        <div class="social">
          <a href="#" aria-label="Facebook">
            <svg viewBox="0 0 24 24">
              <path d="M13.5 22v-8h2.7l.5-3.3h-3.2V8.6c0-.9.4-1.7 1.8-1.7h1.5V4.1c-.3 0-1.3-.1-2.4-.1-2.5 0-4.1 1.5-4.1 4.2v2.5H7.5V14h2.8v8z"/>
            </svg>
          </a>

          <a href="#" aria-label="X">
            <svg viewBox="0 0 24 24">
              <path d="M17.8 3h3l-6.6 7.5L22 21h-6.1l-4.8-6.2L5.5 21h-3l7-8L2 3h6.2l4.3 5.7zm-1 16.2h1.7L7.3 4.7H5.5z"/>
            </svg>
          </a>

          <a href="#" aria-label="Instagram">
            <svg viewBox="0 0 24 24">
              <path d="M12 7.3A4.7 4.7 0 1 0 12 16.7 4.7 4.7 0 0 0 12 7.3zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM17.2 5.6a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 3c-2.4 0-2.7 0-3.7.1C5.5 3.2 3.2 5.5 3.1 8.3 3 9.3 3 9.6 3 12s0 2.7.1 3.7c.1 2.8 2.4 5.1 5.2 5.2 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c2.8-.1 5.1-2.4 5.2-5.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c-.1-2.8-2.4-5.1-5.2-5.2C14.7 3 14.4 3 12 3zm0 1.6c2.4 0 2.7 0 3.6.1 1.9.1 3.4 1.6 3.5 3.5.1 1 .1 1.2.1 3.6s0 2.6-.1 3.6c-.1 1.9-1.6 3.4-3.5 3.5-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-1.9-.1-3.4-1.6-3.5-3.5-.1-1-.1-1.2-.1-3.6s0-2.6.1-3.6c.1-1.9 1.6-3.4 3.5-3.5 1-.1 1.2-.1 3.6-.1z"/>
            </svg>
          </a>

          <a href="#" aria-label="YouTube">
            <svg viewBox="0 0 24 24">
              <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="copyright">
      © ${new Date().getFullYear()} Golden Aura. All rights reserved.
    </div>

    <img class="footer-leaf" src="images/leaf-decor.svg" alt="">
  `;

  const form = document.getElementById("news-form");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("news-email");
    const email = input.value.trim();

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast("Thanks for subscribing! 🌿");
      input.value = "";
    } else {
      toast("Please enter a valid email address");
      input.focus();
    }
  });
}

/* ---------- product cards (UPDATED for Database) ---------- */
function cardHTML(product) {
  // Database-il ninnu varunna image name (e.g., "spider.jpg") use cheyyuka
  const imgSrc = `images/${product.image}`; 

  return `
    <article class="card">
      <a class="card-img-wrap"
        href="product.html?id=${product.id}">
        <div class="card-img">
          ${plantImage(imgSrc, product.name)}
        </div>
      </a>

      <h3>${product.name}</h3>
      <p class="desc">${product.description}</p>
      <div class="price">${money(product.price)}</div>

      <div class="card-actions">
        <button class="btn btn-fill" data-add="${product.id}">
          Add to Cart
        </button>
        <a class="btn btn-line"
          href="product.html?id=${product.id}">
          Learn More
        </a>
      </div>
    </article>
  `;
}

function renderCards(selector, products) {
  const element = document.querySelector(selector);
  if (!element) return;

  element.innerHTML = products.length
    ? products.map(cardHTML).join("")
    : '<p class="empty" style="grid-column:1/-1">No plants match your search.</p>';
}

/* ---------- add-to-cart buttons ---------- */
document.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (!button) return;

  const product = byId(button.dataset.add);
  if (!product) return;

  Cart.add(product.id);
  toast(`${product.name} added to cart`);
});

/* ---------- carousel ---------- */
function initCarousel() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const getStep = () => {
    const card = carousel.querySelector(".card");
    return card ? card.getBoundingClientRect().width + 20 : 300;
  };

  document.querySelector(".car-btn.prev")?.addEventListener("click", () => {
    carousel.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  document.querySelector(".car-btn.next")?.addEventListener("click", () => {
    carousel.scrollBy({ left: getStep(), behavior: "smooth" });
  });
}

/* ---------- accordion ---------- */
function initAccordion() {
  document.querySelectorAll(".acc-q").forEach(question => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const wasOpen = item.classList.contains("open");

      document.querySelectorAll(".acc-item").forEach(other => {
        other.classList.remove("open");
      });

      if (!wasOpen) item.classList.add("open");
    });
  });
}

/* ---------- shop / exotic listings (UPDATED for Database) ---------- */
function initListing() {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  const only = grid.dataset.only;
  let allProducts = []; // Database-il ninnu varunna products
  let category = "All";
  let term = "";
  let sort = "default";

  const chips = document.querySelector(".chips");

  // Chips (Category buttons) undakkuka
  if (chips) {
    chips.innerHTML = CATS.map(cat => `
      <button class="chip ${cat === "All" ? "active" : ""}"
        data-cat="${cat}">${cat}</button>
    `).join("");

    chips.addEventListener("click", event => {
      const button = event.target.closest(".chip");
      if (!button) return;

      chips.querySelectorAll(".chip").forEach(chip => {
        chip.classList.remove("active");
      });

      button.classList.add("active");
      category = button.dataset.cat;
      draw();
    });
  }

  // Database-il ninnu products fetch cheyyuka
  fetch('http://localhost/goldenaura2/backend/api/get_products.php')
    .then(response => response.json())
    .then(data => {
        allProducts = data;
        draw();
    })
    .catch(error => {
        console.error('Error fetching products:', error);
        grid.innerHTML = '<p class="empty" style="grid-column:1/-1">Failed to load plants. Please try again later.</p>';
    });

  // Filter & Sort cheythu kanikkunna function
  function draw() {
    let products = allProducts.filter(product =>
      (only !== "rare" || product.rare == 1) &&
      (category === "All" || product.category_id == category) &&
      product.name.toLowerCase().includes(term)
    );

    if (sort === "low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === "az") {
      products.sort((a, b) => a.name.localeCompare(b.name));
    }

    renderCards("#product-grid", products);
  }

  document.getElementById("search")?.addEventListener("input", event => {
    term = event.target.value.trim().toLowerCase();
    draw();
  });

  document.getElementById("sort")?.addEventListener("change", event => {
    sort = event.target.value;
    draw();
  });
}

/* ---------- product detail ---------- */
function initDetail() {
  const box = document.getElementById("detail");
  if (!box) return;

  const params = new URLSearchParams(location.search);
  const product = byId(params.get("id")) || PRODUCTS[0];

  document.title = `${product.name} | Golden Aura`;

  const breadcrumb = document.getElementById("crumb-name");
  if (breadcrumb) breadcrumb.textContent = product.name;

  box.innerHTML = `
    <div class="detail-img">
      ${plantImage(product.img, product.name)}
    </div>

    <div class="detail-info">
      <h1>${product.name}</h1>
      <div class="price">${money(product.price)}</div>
      <p>${product.desc}</p>

      <ul class="meta">
        <li><b>Category</b>${product.cat}</li>
        <li><b>Light</b>${product.light}</li>
        <li><b>Watering</b>${product.water}</li>
        <li><b>Pet safety</b>${product.pet}</li>
        <li><b>Size</b>${product.size}</li>
      </ul>

      <div class="qty">
        <button id="minus" aria-label="Decrease quantity">−</button>
        <input id="q" type="number" value="1" min="1" step="1">
        <button id="plus" aria-label="Increase quantity">+</button>
      </div>

      <button class="btn btn-fill" id="add-detail">
        Add to Cart
      </button>
    </div>
  `;

  const quantity = document.getElementById("q");

  document.getElementById("minus").addEventListener("click", () => {
    quantity.value = Math.max(1, (Number(quantity.value) || 1) - 1);
  });

  document.getElementById("plus").addEventListener("click", () => {
    quantity.value = Math.max(1, Number(quantity.value) || 1) + 1;
  });

  document.getElementById("add-detail").addEventListener("click", () => {
    const amount = Math.max(1, Math.floor(Number(quantity.value) || 1));

    Cart.add(product.id, amount);
    toast(`${product.name} added to cart`);
  });

  renderCards(
    "#related",
    PRODUCTS.filter(item =>
      item.id !== product.id && item.cat === product.cat
    ).slice(0, 4)
  );
}

/* ---------- cart page ---------- */
function initCartPage() {
  const list = document.getElementById("cart-list");
  if (!list) return;

  const summary = document.getElementById("summary");

  function draw() {
    const items = Cart.get()
      .map(item => ({
        ...byId(item.id),
        qty: item.qty
      }))
      .filter(item => item.id);

    if (!items.length) {
      list.innerHTML = `
        <div class="empty">
          <p style="font-size:18px;margin-bottom:14px">
            Your cart is empty 🌱
          </p>
          <a class="pill" href="shop.html">Start Shopping</a>
        </div>
      `;

      if (summary) summary.style.display = "none";
      return;
    }

    if (summary) summary.style.display = "";

    list.innerHTML = items.map(item => `
      <div class="cart-item">
        ${plantImage(item.img, item.name)}

        <div>
          <h3>${item.name}</h3>
          <div>${money(item.price)}</div>

          <div class="qty">
            <button data-m="${item.id}" aria-label="Decrease quantity">−</button>
            <input value="${item.qty}" data-i="${item.id}"
              type="number" min="1" step="1" aria-label="Quantity">
            <button data-p="${item.id}" aria-label="Increase quantity">+</button>
          </div>

          <button class="rm" data-r="${item.id}">Remove</button>
        </div>

        <div><b>${money(item.price * item.qty)}</b></div>
      </div>
    `).join("");

    const subtotal = items.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );

    const shipping = subtotal >= 50 ? 0 : 5.99;

    const subElement = document.getElementById("sub");
    const shipElement = document.getElementById("ship");
    const totalElement = document.getElementById("total");

    if (subElement) subElement.textContent = money(subtotal);
    if (shipElement) {
      shipElement.textContent = shipping ? money(shipping) : "Free";
    }
    if (totalElement) {
      totalElement.textContent = money(subtotal + shipping);
    }
  }

  list.addEventListener("click", event => {
    const target = event.target;

    if (target.dataset.m) {
      const item = Cart.get().find(
        entry => entry.id === Number(target.dataset.m)
      );
      if (item) Cart.set(item.id, item.qty - 1);
      draw();
    } else if (target.dataset.p) {
      const item = Cart.get().find(
        entry => entry.id === Number(target.dataset.p)
      );
      if (item) Cart.set(item.id, item.qty + 1);
      draw();
    } else if (target.dataset.r) {
      Cart.remove(Number(target.dataset.r));
      draw();
    }
  });

  list.addEventListener("change", event => {
    const input = event.target;
    if (!input.dataset.i) return;

    Cart.set(Number(input.dataset.i), Number(input.value) || 1);
    draw();
  });

  document.getElementById("checkout")?.addEventListener("click", () => {
    toast("Demo store — checkout is not connected 🌿");
  });

  draw();
}

/* ---------- contact form ---------- */
function initContact() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    let valid = true;

    const check = (id, test, message) => {
      const input = form.querySelector("#" + id);
      if (!input) return;

      const error = input.parentElement.querySelector(".err");

      if (!test(input.value.trim())) {
        if (error) error.textContent = message;
        valid = false;
      } else if (error) {
        error.textContent = "";
      }
    };

    check(
      "name",
      value => value.length > 1,
      "Please enter your name"
    );

    check(
      "email",
      value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Please enter a valid email"
    );

    check(
      "message",
      value => value.length >= 10,
      "Message should be at least 10 characters"
    );

    if (valid) {
      toast("Message validated! 🌿");
      form.reset();
    }
  });
}

/* ---------- initialize all pages ---------- */
document.addEventListener("DOMContentLoaded", () => {
  buildHeader();
  buildFooter();
  Cart.badge();

  renderCards(
    "#featured",
    PRODUCTS.filter(product => [1, 2, 3, 4].includes(product.id))
  );

  renderCards(
    "#arrivals",
    [2, 3, 4, 6, 5, 9].map(byId).filter(Boolean)
  );

  initCarousel();
  initAccordion();
  initListing();
 // initDetail();
  initCartPage();
  initContact();
});
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("detail");
    if (!box) return;

    // URL-il ninnu id edukkuka
    const params = new URLSearchParams(location.search);
    const productId = params.get("id");

    if (!productId) {
        box.innerHTML = "<p>Product not specified.</p>";
        return;
    }

    // Database-il ninnu aa specific product fetch cheyyuka
    fetch(`http://localhost/goldenaura2/backend/api/get_single_product.php?id=${productId}`)
        .then(response => response.json())
        .then(product => {
            if (product.message) {
                box.innerHTML = `<p>${product.message}</p>`;
                return;
            }

            // Page title update cheyyuka
            document.title = `${product.name} | Golden Aura`;
            const breadcrumb = document.getElementById("crumb-name");
            if (breadcrumb) breadcrumb.textContent = product.name;

            // Category name (Optional - ippol numeric aanu, but nammal later maattam)
            const categoryNames = {
                1: "Exotic Rare",
                2: "Foliage",
                3: "Succulents",
                4: "Easy Care"
            };
            const categoryName = categoryNames[product.category_id] || "General";

            // HTML inject cheyyuka
            box.innerHTML = `
                <div class="detail-img">
                    <img src="images/${product.image}" alt="${product.name}"
                         onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
                </div>

                <div class="detail-info">
                    <h1>${product.name}</h1>
                    <div class="price">${money(product.price)}</div>
                    <p>${product.description}</p>

                    <ul class="meta">
                        <li><b>Category</b>${categoryName}</li>
                        <li><b>Light</b>${product.light || '-'}</li>
                        <li><b>Watering</b>${product.watering || '-'}</li>
                        <li><b>Pet safety</b>${product.pet_safety || '-'}</li>
                        <li><b>Size</b>${product.size || '-'}</li>
                    </ul>

                    <div class="qty">
                        <button id="minus" aria-label="Decrease quantity">−</button>
                        <input id="q" type="number" value="1" min="1" step="1">
                        <button id="plus" aria-label="Increase quantity">+</button>
                    </div>

                    <button class="btn btn-fill" id="add-detail">Add to Cart</button>
                </div>
            `;

            // Quantity buttons
            const quantity = document.getElementById("q");

            document.getElementById("minus").addEventListener("click", () => {
                quantity.value = Math.max(1, (Number(quantity.value) || 1) - 1);
            });

            document.getElementById("plus").addEventListener("click", () => {
                quantity.value = Math.max(1, Number(quantity.value) || 1) + 1;
            });

            // Add to Cart (ippol Cart system database-il alla, localStorage-il aanu)
            document.getElementById("add-detail").addEventListener("click", () => {
                const amount = Math.max(1, Math.floor(Number(quantity.value) || 1));
                Cart.add(product.id, amount);
                toast(`${product.name} added to cart`);
            });

            // Related products (same category)
            fetch('http://localhost/goldenaura2/backend/api/get_products.php')
                .then(res => res.json())
                .then(all => {
                    const related = all.filter(p => p.id != product.id && p.category_id == product.category_id).slice(0, 4);
                    renderCards("#related", related);
                });
        })
        .catch(error => {
            console.error('Error:', error);
            box.innerHTML = "<p>Failed to load product details.</p>";
        });
});
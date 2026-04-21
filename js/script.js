/* ================= MENU (DESKTOP + MOBILE) ================= */
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const menu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

// abrir
openBtn.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("active");
});

// cerrar con X
closeBtn.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

// cerrar clic fuera
overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

/* ================= CARRITO ================= */
document.addEventListener("DOMContentLoaded", () => {

const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* abrir / cerrar */
openCart.addEventListener("click", () => {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
});

closeCart.addEventListener("click", closeCartFn);
cartOverlay.addEventListener("click", closeCartFn);

function closeCartFn() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}

/* render */
function renderCart() {
    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price.toFixed(2)} €</span>
            </div>
        `;
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = total.toFixed(2);

    localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();

/* FUNCIÓN para añadir productos */
window.addToCart = function(name, price) {
    cart.push({ name, price });
    renderCart();
};

});
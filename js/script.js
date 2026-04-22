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

    // 2. Lógica de Scroll Reveal (Se mantiene igual, está OK)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));


    /* ================= EFECTO ZOOM INICIAL ================= */
gsap.registerPlugin(ScrollTrigger);

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#inicio",
        start: "top top",
        end: "+=1800",      // Aumentamos un poco la duración para que se aprecie mejor
        scrub: true,
        pin: true,
        pinSpacing: true
    }
});

// 1. Zoom de la imagen de fondo
tl.to(".hero-img", {
    scale: 2.2,
    ease: "none"
}, 0);

// 2. La foto pequeña aparece y se hace grande
tl.to(".hero-secundaria", {
    opacity: 1,
    scale: 1,           /* Crece hasta su tamaño original (500px) */
    left: "30%",        /* Hace un pequeño movimiento lateral mientras crece */
    ease: "power2.inOut"
}, 0.5);                /* Empieza a mitad del scroll del zoom */


/* ================= CRYSTAL BALL PARALLAX ================= */
document.addEventListener("mousemove", (e) => {
    const ball = document.querySelector(".crystal-ball");
    if(!ball) return;

    const rect = ball.getBoundingClientRect();
    const ballX = rect.left + rect.width / 2;
    const ballY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - ballX) / rect.width;
    const deltaY = (e.clientY - ballY) / rect.height;

    const rotateX = deltaY * -12;
    const rotateY = deltaX * 12;

    ball.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
    `;
});

document.addEventListener("mouseleave", () => {
    const ball = document.querySelector(".crystal-ball");
    if(ball){
        ball.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
});


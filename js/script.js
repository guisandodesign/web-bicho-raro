/* ================= MENU (DESKTOP + MOBILE) ================= */
const openBtn = document.getElementById("openMenu");
const closeBtn = document.getElementById("closeMenu");
const menu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

openBtn?.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("active");
});

const closeMenuFn = () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
};

closeBtn?.addEventListener("click", closeMenuFn);
overlay?.addEventListener("click", closeMenuFn);

// Cerrar menú automáticamente al hacer clic en un enlace (para móviles)
document.querySelectorAll(".side-menu a").forEach(link => {
    link.addEventListener("click", () => {
        closeMenuFn();
    });
});

/* ================= CARRITO Y TIENDA (ACTUALIZADO CON IMÁGENES) ================= */
document.addEventListener("DOMContentLoaded", () => {
    const openCart = document.getElementById("openCart");
    const closeCart = document.getElementById("closeCart");
    const cartPanel = document.getElementById("cartPanel");
    const cartOverlay = document.getElementById("cartOverlay");
    const cartItems = document.getElementById("cartItems");
    const cartCount = document.getElementById("cartCount");
    const cartTotal = document.getElementById("cartTotal");
    const checkoutBtn = document.querySelector(".checkout-btn");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    /* Abrir / Cerrar Carrito */
    openCart?.addEventListener("click", () => {
        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");
    });

    const closeCartFn = () => {
        cartPanel.classList.remove("active");
        cartOverlay.classList.remove("active");
    };

    closeCart?.addEventListener("click", closeCartFn);
    cartOverlay?.addEventListener("click", closeCartFn);

    /* Renderizar Carrito */
    function renderCart() {
        if (!cartItems) return;
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            // Usamos item.image para la miniatura
            cartItems.innerHTML += `
                <div class="cart-item" style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px; position: relative;">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; background: #eee;">
                    <div style="flex: 1;">
                        <p style="margin:0; font-weight:bold; font-size: 14px; line-height: 1.2;">${item.name}</p>
                        <small style="color: #666;">${item.price.toFixed(2)} €</small>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${index})" style="background:none; border:none; color:#bbb; cursor:pointer; font-size: 20px;">✕</button>
                </div>
            `;
        });

        if (cartCount) cartCount.textContent = cart.length;
        if (cartTotal) cartTotal.textContent = total.toFixed(2);
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    /* Funciones Globales del Carrito */
    // Ahora recibe name, price e image
    window.addToCart = function(name, price, image) {
        const imgPath = image || 'media/img/logo.negro.png'; // Imagen por defecto
        cart.push({ name, price, image: imgPath });
        renderCart();
        cartPanel.classList.add("active");
        cartOverlay.classList.add("active");
    };

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        renderCart();
    };

    /* Función específica para camiseta con talla */
    window.agregarCamiseta = function() {
        const selector = document.getElementById("talla-camiseta");
        const talla = selector ? selector.value : "M";
        // Añadimos la imagen delantera de la camiseta
        window.addToCart(`Camiseta (Talla ${talla})`, 15.00, 'media/img/camiseta.trasera.png');
    };

    /* BOTÓN COMPRAR -> REDIRECCIÓN A CHECKOUT */
    checkoutBtn?.addEventListener("click", () => {
        if (cart.length > 0) {
            window.location.href = "checkout.html";
        } else {
            alert("Tu carrito está vacío.");
        }
    });

    renderCart();
});


/* ================= EFECTOS VISUALES (GSAP & REVEAL) ================= */
document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// 2. GSAP Hero Zoom (Solo si existe #inicio)
gsap.registerPlugin(ScrollTrigger);
if (document.querySelector("#inicio")) {
    // Detectamos si el ancho de pantalla es de móvil
    const isMobile = window.innerWidth < 768;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#inicio",
            start: "top top",
            // Si es móvil, el espacio del scroll es 800, si no, 1800
            end: isMobile ? "+=800" : "+=1800",
            scrub: true,
            pin: true,
            pinSpacing: true
        }
    });

    tl.to(".hero-img", { scale: 2.2, ease: "none" }, 0);
    
    // Ajuste de posición del isotipo en móvil
    tl.to(".hero-secundaria", { 
        opacity: 1, 
        scale: 1, 
        left: isMobile ? "50%" : "30%", // Centrado en móvil, lateral en PC
        ease: "power2.inOut" 
    }, 0.5);
}

});


/* ================= BICHILLO ================= */
window.onscroll = function() {
  var theta = document.documentElement.scrollTop / 10; // Ajusta el '/ 10' para más o menos velocidad de giro
  document.getElementById('imagen-rotar').style.transform = 'rotate(' + theta + 'deg)';
};


/* ================= CRYSTAL BALL PARALLAX ================= */
document.addEventListener("mousemove", (e) => {
    const ball = document.querySelector(".crystal-ball");
    if(!ball) return;

    const rect = ball.getBoundingClientRect();
    const ballX = rect.left + rect.width / 2;
    const ballY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - ballX) / rect.width;
    const deltaY = (e.clientY - ballY) / rect.height;

    ball.style.transform = `rotateX(${deltaY * -12}deg) rotateY(${deltaX * 12}deg)`;
});

document.addEventListener("mouseleave", () => {
    const ball = document.querySelector(".crystal-ball");
    if(ball) ball.style.transform = "rotateX(0deg) rotateY(0deg)";
});





/* ================= LÓGICA ESPECÍFICA PARA CHECKOUT.HTML ================= */
document.addEventListener("DOMContentLoaded", () => {
    const checkoutItemsContainer = document.getElementById("checkout-items");
    const subtotalEl = document.getElementById("checkout-subtotal");
    const totalEl = document.getElementById("checkout-total");
    const checkoutForm = document.getElementById("checkout-form");

    // Salir si no estamos en la página de checkout
    if (!checkoutItemsContainer) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function renderCheckoutPage() {
        if (cart.length === 0) {
            document.getElementById("checkout-empty").style.display = "block";
            document.querySelector(".checkout-grid").style.opacity = "0.5";
            document.querySelector(".place-order-btn").disabled = true;
            return;
        }

        checkoutItemsContainer.innerHTML = "";
        let subtotal = 0;

        cart.forEach((item) => {
            subtotal += item.price;
            
            // Intentamos obtener una imagen. Si no existe en el objeto item, ponemos una por defecto.
            const imgSrc = item.image || 'media/img/logo.negro.png';

            checkoutItemsContainer.innerHTML += `
                <div class="checkout-item">
                    <img src="${imgSrc}" class="checkout-thumb" alt="${item.name}">
                    <div class="checkout-info">
                        <span class="checkout-name">${item.name}</span>
                        <span class="checkout-meta">BICHO RARO COLLECTION</span>
                    </div>
                    <span class="checkout-price">${item.price.toFixed(2)}€</span>
                </div>
            `;
        });

        const envio = 5.00; 
        subtotalEl.textContent = `${subtotal.toFixed(2)}€`;
        document.getElementById("checkout-shipping").textContent = `${envio.toFixed(2)}€`;
        totalEl.textContent = `${(subtotal + envio).toFixed(2)}€`;
    }

    // Manejo del formulario de pago
    checkoutForm?.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Efecto visual de carga (opcional)
        const btn = document.getElementById("place-order");
        btn.textContent = "Procesando...";
        btn.style.opacity = "0.5";

        setTimeout(() => {
            alert("¡Pedido realizado con éxito! Gracias por confiar en BICHO RARO.");
            localStorage.removeItem("cart"); // Limpiar carrito
            window.location.href = "index.html"; // Volver al inicio
        }, 2000);
    });

    renderCheckoutPage();
});



  /* ==== CONFIRMACIÓN ==== */
function renderConfirmation() {
    if (!$("#order-summary").length) return;

let order = null;
try { order = JSON.parse(localStorage.getItem(LAST_ORDER_KEY)); } catch {}

    if (!order) {
        $("#order-id").text("No hay pedido guardado.");
    return;
    }

$("#order-id").text(`Pedido: ${order.id} · Total: ${money(order.total, order.currency)}`);

    const PRODUCTS = getProductsSafe() || {};

    const linesHtml = (order.items || []).map(it => {
    const p = PRODUCTS[it.sku];
    const img = (p && p.images && p.images[0]) ? p.images[0] : "img/placeholder.png";

    return `
        <div class="checkout-item">
            <img class="checkout-thumb" src="${img}" alt="${it.name}">
            <div class="checkout-info">
            <div class="checkout-name">${it.name}</div>
            <div class="checkout-meta">Talla: ${it.size || "—"} · Cantidad: ${it.qty}</div>
            </div>
            <div class="checkout-price">${money(it.lineTotal, order.currency)}</div>
        </div>
    `;
}).join("");

$("#order-summary").html(linesHtml);
}


/* ================= TOUCH SUPPORT (TAP VS HOVER) ================= */
document.addEventListener("DOMContentLoaded", () => {
    const touchItems = document.querySelectorAll('.galeria-item, .shop-item, .card-item, .loc-card, .carrusel-item');

    touchItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            // Quitamos la clase a otros elementos para que solo uno esté activo
            touchItems.forEach(el => el.classList.remove('touch-active'));
            this.classList.add('touch-active');
        }, {passive: true});
    });
});


/* Detectar toque en móvil para productos */
document.addEventListener("touchstart", (e) => {
    const item = e.target.closest('.shop-item');
    if (item) {
        item.classList.toggle('touch-active');
    } else {
        // Si toca fuera, quitamos el efecto a todos
        document.querySelectorAll('.shop-item').forEach(el => el.classList.remove('touch-active'));
    }
}, {passive: true});

/* Reset de la bola en dispositivos táctiles si se queda girada */
document.addEventListener("touchstart", () => {
    const ball = document.querySelector(".crystal-ball");
    if(ball) {
        // En móviles, si no hay ratón, mantenemos la bola centrada
        // o podrías vincularlo al scroll si quieres algo más pro
        ball.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
}, {passive: true});

/* Soporte para Tap en Localizaciones */
document.querySelectorAll('.editorial-block').forEach(block => {
    block.addEventListener('touchstart', function() {
        // Alterna la visibilidad al tocar
        this.classList.toggle('touch-active');
    }, {passive: true});
});


// Base de datos simulada de productos electrónicos
const products = [
    {
        id: 1,
        name: "Smartphone Pro X12",
        price: 699.99,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Auriculares Inalámbricos ANC",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Laptop Ultra Slim 15\"",
        price: 159.50,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Smartwatch Deportivo S3",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 5,
        name: "Cámara Mirrorless 4K",
        price: 250.00,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 6,
        name: "Consola de Videojuegos Pro",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 7,
        name: "Consola de Videojuegos Pro",
        price: 15.99,
        image: "ps2-venta.png"
    }
];

let cart = [];

// Elementos del DOM
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const closeCartBtn = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotalPrice = document.getElementById('cart-total-price');
const checkoutBtn = document.getElementById('checkout-btn');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    setupEventListeners();
});

// Renderizar productos en el catálogo
function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div>
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                </div>
                <button class="btn-add-cart" onclick="addToCart(${product.id})">Agregar al Carrito</button>
            </div>
        </div>
    `).join('');
}

// Configurar eventos de interacción
function setupEventListeners() {
    cartBtn.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }
        alert('¡Gracias por tu compra! Redirigiendo al sistema de pago...');
        cart = [];
        updateCart();
        toggleCart();
    });
}

// Abrir / Cerrar Carrito Lateral
function toggleCart() {
    cartDrawer.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Agregar producto al carrito
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
    // Abrir automáticamente el carrito al agregar un producto (opcional, da buen feedback)
    if (!cartDrawer.classList.contains('active')) {
        toggleCart();
    }
}

// Remover producto del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Actualizar la interfaz del carrito
function updateCart() {
    // Actualizar contador
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Actualizar listado visual de ítems
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p class="empty-cart-msg">El carrito está vacío</p>`;
        cartTotalPrice.textContent = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
    `).join('');

    // Actualizar precio total
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
}
// Finalizar compra y enviar a WhatsApp
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Tu carrito está vacío.');
            return;
        }

        // ⚠️ COLOCA AQUÍ TU NÚMERO DE WHATSAPP (Incluye código de país y área, sin el símbolo + ni espacios)
        // Ejemplo para Uruguay: 59899123456 o el país que corresponda
        const phoneNumber = "59892042700"; 

        // Construir el mensaje del pedido
        let message = "¡Hola! Me gustaría realizar el siguiente pedido:\n\n";

        cart.forEach(item => {
            message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
        });

        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        message += `\n*Total a pagar: $${totalPrice.toFixed(2)}*`;

        // Codificar el texto para que la URL de WhatsApp lo lea correctamente
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        // Abrir WhatsApp en una nueva pestaña
        window.open(whatsappUrl, '_blank');

        // Limpiar el carrito y cerrar el menú lateral
        cart = [];
        updateCart();
        toggleCart();
    });
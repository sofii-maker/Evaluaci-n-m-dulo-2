function ofertas() {
    const el3 = document.getElementById('p3');
    const el4 = document.getElementById('p4');
    const boton = document.getElementById('botonoferta');

    if (el3.classList.contains('oculto')) {
    
        el3.classList.remove('oculto');
        el4.classList.remove('oculto');
        boton.textContent = 'Sale%';
    } else {
    
        el3.classList.add('oculto');
        el4.classList.add('oculto');
        boton.textContent = 'Mostrar todos';
    }
}

function catalogo() {
    const catalog = document.getElementById("botonoferta");

    catalog.scrollIntoView({
        behavior: "smooth",
        block: "start",
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const likeButtons = document.querySelectorAll('.btn-like');

    likeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.producto');
            const productId = productElement.getAttribute('data-product-id');
            const countElement = productElement.querySelector('.count-like');

            handleLike(productId, countElement);
        });
    });
});

function handleLike(productId, countElement) {

    let currentLikes = parseInt(countElement.textContent);
    currentLikes++;
    countElement.textContent = currentLikes;

    
}

//--Carrito de compra--

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar el carrito (usando localStorage para persistencia básica)
    let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }

    // Función para añadir productos
    function addToCart(productId, name, price, image, currency) {
        const cartItem = cart.find(item => item.id == productId); // Usamos == porque data-id es string

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ id: productId, name: name, price: parseFloat(price), quantity: 1, image: image, currency: currency });
        }
        saveCart();
        updateCartCount();
    }

    

    // Función para actualizar el contador del carrito en el header
    function updateCartCount() {
        const cartCountEl = document.getElementById('contadorcarrito');
        if (cartCountEl) {
             const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
             cartCountEl.textContent = totalItems;
        }
    }

    // --- Lógica Específica para la Página Principal (index.html) ---

    // Buscamos todos los botones que tengan la clase 'add-to-cart-btn'
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    // Les añadimos un "escuchador de eventos" a cada uno
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        const name = e.target.dataset.name;
        const price = e.target.dataset.price;
        const image = e.target.dataset.image;
        const currency = e.target.dataset.currency;
        
        addToCart(productId, name, price, image, currency);
        alert(`"${name}" añadido al carrito.`);
    });
});

    // --- Lógica para la Página del Carrito (si decides usar cart.html) ---
    // (Pega aquí la función renderCartPage() y eventos de cart.html del ejemplo anterior si los usas)
    if (document.getElementById('cart-page-container')) {
        renderCartPage();
        document.getElementById('clear-cart').addEventListener('click', () => {
            cart = [];
            saveCart();
            renderCartPage(); // Volver a renderizar para mostrar vacío
            updateCartCount();
        });
    }

    
    function renderCartPage() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    cartItemsEl.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('cart-item');
        // Aquí añadimos la etiqueta <img>
        li.innerHTML = `
            <img src="../${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
            <span>${item.name} (x${item.quantity})</span>
            <span>${item.currency} ${(item.price * item.quantity).toFixed(2)}</span>
        `;
        cartItemsEl.appendChild(li);
        total += item.price * item.quantity;
    });

       cartTotalEl.textContent = `${cart[0]?.currency || 'CLP'} ${total.toFixed(2)}`;
}

    // Inicialización al cargar la página
    updateCartCount();
});

 //-- paágina detalles--

 document.addEventListener('DOMContentLoaded', () => {

    // 1. Datos de productos (Usamos rutas relativas desde la raíz, luego JS las ajustará si es necesario)
    const products = [
        { id: 1, name: 'Doraemon Volumen 1', price: 5000, image: '../assets/images/doraemon.jpeg', currency: 'CLP', description: 'Doraemon y Nobita se inscriben en un curso del SENCE.' },
        { id: 2, name: 'Jujutsu Kaisen Vol 19', price: 4500, image: '../assets/images/jujutdu.jpeg', currency: 'CLP', description: 'Luego de la muerte de Satoru Gojo, Itadori decide buscar trabajo como programador.' },
        { id: 3, name: 'Shingeki No Kyojin', price: 4500, image: '../assets/images/shinkeki.jpeg', currency: 'CLP', description: 'El Retumbar invoca titanes kawaii.' },
        { id: 4, name: 'Totoro Edición Deluxe', price: 5000, image: '../assets/images/totoro.jpeg', currency: 'CLP', description: 'Totoro aprende a usar Github.' },
        // Añade más productos aquí si es necesario
    ];

    // --- Lógica Específica para la Página de Detalle (detail.html) ---
    if (document.getElementById('product-detail-container')) {
        displayDetailPage();
    }

    function displayDetailPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products.find(p => p.id == productId);

        if (!product) {
            document.getElementById('detail-name').textContent = "Producto no encontrado.";
            return;
        }

        // Ajuste de ruta relativa para la imagen: 
        // Eliminamos el "./" inicial de la ruta guardada ("./img/...")
        // y añadimos "../" al principio para subir un nivel desde /pages/
        const imagePath = "../" + product.image.substring(2); 

        document.getElementById('detail-name').textContent = product.name;
        document.getElementById('detail-image').src = imagePath;
        document.getElementById('detail-description').textContent = product.description;
        document.getElementById('detail-price-display').textContent = `Precio: CLP ${product.price}`;
        document.getElementById('page-title').textContent = `Detalle ${product.name}`;

        const addToCartBtn = document.getElementById('detail-add-to-cart-btn');
        addToCartBtn.addEventListener('click', () => {
            addToCart(product.id, product.name, product.price, product.image, product.currency);
            alert(`"${product.name}" añadido al carrito.`);
        });
    }
});



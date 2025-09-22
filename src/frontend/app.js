// E-commerce Platform - Frontend Logic

class ECommercePlatform {
    constructor() {
        this.products = [
            { 
                id: 1, 
                name: "Laptop Gaming", 
                price: 1299.99, 
                image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Laptop+Gaming",
                description: "Laptop gaming de alta performance"
            },
            { 
                id: 2, 
                name: "Smartphone", 
                price: 699.99, 
                image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Smartphone",
                description: "Smartphone con cámara avanzada"
            },
            { 
                id: 3, 
                name: "Auriculares", 
                price: 199.99, 
                image: "https://via.placeholder.com/280x200/667eea/ffffff?text=Auriculares",
                description: "Auriculares con cancelación de ruido"
            },
            { 
                id: 4, 
                name: "Tablet", 
                price: 399.99, 
                image: "https://via.placeholder.com/280x200/764ba2/ffffff?text=Tablet",
                description: "Tablet para trabajo y entretenimiento"
            }
        ];
        this.cart = [];
        this.currentUser = null;
        this.init();
    }

    init() {
        this.renderProducts();
        this.setupEventListeners();
        this.updateCartDisplay();
        console.log('E-commerce Platform inicializada');
    }

    renderProducts() {
        const productList = document.getElementById('product-list');
        productList.innerHTML = this.products.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p style="font-size: 1.2rem; font-weight: bold; color: #667eea;">$${product.price}</p>
                <button class="btn" onclick="app.addToCart(${product.id})">
                    Agregar al Carrito
                </button>
            </div>
        `).join('');
    }

    login() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Usar las nuevas funciones de validación que ahora son métodos de la clase
        if (!this.validateEmail(email) || !this.validatePassword(password)) {
            alert('Credenciales inválidas. Email debe ser válido y la contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
            return;
        }
        
        // Simulación de autenticación
        this.currentUser = { email: email, name: email.split('@')[0] };
        alert(`Bienvenido ${this.currentUser.name}!`);
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }

    addToCart(productId) {
        if (!this.currentUser) {
            alert('Debes iniciar sesión para agregar productos al carrito');
            return;
        }
        
        const product = this.products.find(p => p.id === productId);
        if (product) {
            this.cart.push(product);
            this.updateCartDisplay();
            alert(`${product.name} agregado al carrito`);
        }
    }

    removeFromCart(productId) {
        const index = this.cart.findIndex(item => item.id === productId);
        if (index > -1) {
            this.cart.splice(index, 1);
            this.updateCartDisplay();
        }
    }

    updateCartDisplay() {
        const cartItems = document.getElementById('cart-items');
        if (this.cart.length === 0) {
            cartItems.innerHTML = '<p>El carrito está vacío</p>';
        } else {
            const total = this.cart.reduce((sum, item) => sum + item.price, 0);
            cartItems.innerHTML = `
                <div>
                    ${this.cart.map((item, index) => `
                        <div class="cart-item">
                            <span>${item.name}</span>
                            <span>$${item.price}</span>
                            <button class="btn" onclick="app.removeFromCart(${item.id})" style="background: #e74c3c;">
                                Eliminar
                            </button>
                        </div>
                    `).join('')}
                    <hr>
                    <div style="font-weight: bold; font-size: 1.2rem; text-align: right;">
                        Total: $${total.toFixed(2)}
                    </div>
                    <button class="btn" style="width: 100%; margin-top: 1rem;" onclick="app.checkout()">
                        Proceder al Checkout
                    </button>
                </div>
            `;
        }
    }

    checkout() {
        if (this.cart.length === 0) {
            alert('El carrito está vacío');
            return;
        }
        
        if (!this.currentUser) {
            alert('Debes iniciar sesión para realizar la compra');
            return;
        }
        
        const total = this.cart.reduce((sum, item) => sum + item.price, 0);
        alert(`Compra realizada por $${total.toFixed(2)}. ¡Gracias por tu compra ${this.currentUser.name}!`);
        this.cart = [];
        this.updateCartDisplay();
    }

    setupEventListeners() {
        // Setup para funcionalidad adicional
        window.login = () => this.login();
        
        // Detectar Enter en campos de login
        document.getElementById('email').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });
        
        document.getElementById('password').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.login();
        });
    }

    // Mejoras en validación de autenticación
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password) {
        return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
    }
    // Agregar función de filtrado
    filterProducts(category) {
        if (!category) return this.products;
        return this.products.filter(p => p.category === category);
    }
}

// Inicializar aplicación
const app = new ECommercePlatform();
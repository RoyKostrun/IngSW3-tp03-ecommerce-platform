const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Datos de ejemplo para el TP
const products = [
    { 
        id: 1, 
        name: "Laptop Gaming", 
        price: 1299.99, 
        category: "Electronics", 
        stock: 10,
        description: "Laptop gaming de alta performance con RTX 4060"
    },
    { 
        id: 2, 
        name: "Smartphone", 
        price: 699.99, 
        category: "Electronics", 
        stock: 25,
        description: "Smartphone con cámara de 108MP y 5G"
    },
    { 
        id: 3, 
        name: "Auriculares", 
        price: 199.99, 
        category: "Audio", 
        stock: 50,
        description: "Auriculares con cancelación activa de ruido"
    },
    { 
        id: 4, 
        name: "Tablet", 
        price: 399.99, 
        category: "Electronics", 
        stock: 15,
        description: "Tablet 10 pulgadas para trabajo y entretenimiento"
    }
];

const users = [];

// Routes

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'E-commerce API funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Products endpoints
app.get('/api/products', (req, res) => {
    const { category, search, minPrice, maxPrice } = req.query;
    let filteredProducts = [...products];
    
    if (category) {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    if (search) {
        filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
    }
    
    if (minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= parseFloat(minPrice));
    }
    
    if (maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= parseFloat(maxPrice));
    }
    
    res.json({
        products: filteredProducts,
        total: filteredProducts.length,
        filters: { category, search, minPrice, maxPrice }
    });
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
});

// Auth endpoints
app.post('/api/register', (req, res) => {
    const { email, password, name } = req.body;
    
    // Validaciones básicas
    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Faltan campos requeridos: email, password, name' });
    }
    
    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Formato de email inválido' });
    }
    
    if (password.length < 6) {
        return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }
    
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
    }
    
    const user = { 
        id: users.length + 1, 
        email, 
        name, 
        password,  // En producción se hashearía
        createdAt: new Date().toISOString()
    };
    users.push(user);
    
    res.status(201).json({ 
        message: 'Usuario creado exitosamente', 
        user: { id: user.id, email: user.email, name: user.name }
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    res.json({ 
        message: 'Login exitoso', 
        user: { id: user.id, email: user.email, name: user.name },
        timestamp: new Date().toISOString()
    });
});

// Cart endpoints (básicos)
app.post('/api/cart/add', (req, res) => {
    const { productId, quantity = 1 } = req.body;
    
    const product = products.find(p => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    res.json({ 
        message: 'Producto agregado al carrito',
        item: { ...product, quantity }
    });
});

// Servir frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor' });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📦 Products API: http://localhost:${PORT}/api/products`);
}); 
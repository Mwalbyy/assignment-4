const express = require('express');
const cors = require('cors');

const app = express(); 
const PORT = 3000;

app.use(cors()); 
app.use(express.json());

const products = [
    {
        id: 1,
        name: 'QC80 Keyboard',
        price: 399.99,
        description: 'Fully prebuilt mechanical keyboard',
        image: ''
    },
    {
        id: 2,
        name: 'Razer Mini Viper SE',
        price: 299.99,
        description: 'Razer\'s limited release magnesium alloy mouse',
        image: ''
    },
    {
        id: 3,
        name: 'Beyer Dynamic DT990 pro',
        price: 169.99,
        description: '250 open eared studio headphones',
        image: ''
    },
    {
        id: 4,
        name: 'Herman Miller Aeron',
        price: 599.99,
        description: 'Ergonomic chair with lumbar support',
        image: ''
    }
];

let selectedProduct = null;

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/select-product', (req, res) => {
    
    selectedProduct = req.body;
    
    console.log('User selected:', selectedProduct.name);
    
    res.json({ message: 'Product selected successfully' });
});

app.get('/api/selected-product', (req, res) => {
    if (selectedProduct) {
        res.json(selectedProduct);
    } else {
        res.status(404).json({ message: 'No product selected yet' });
    }
});

app.post('/api/submit-order', (req, res) => {
    console.log('Order received for:', req.body.name);
    
    res.json({ message: "Your item will be delivered soon." });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
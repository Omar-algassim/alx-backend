#!/usr/bin/node
import express from 'express';
import redis from 'redis';
import { promisify } from 'util';

const app = express();

const port = 1245;
const listProducts = [
    {
        id: 1,
        name: 'Suitcase 250',
        price: 50,
        stock: 4
    },
    {
        id: 2,
        name: 'Suitcase 450',
        price: 100,
        stock: 10
    },
    {
        id: 3,
        name: 'Suitcase 650',
        price: 350,
        stock: 2
    },
    {
        id: 4,
        name: 'Suitcase 1050',
        price: 550,
        stock: 5
    }
]

function getItemById(id) {
    return listProducts.find((product) => product.id === id);
}


const client = redis.createClient();

client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`);
});

client.on('connect', () => {
    console.log('Redis client connected to the server');
});

function reserveStockById(itemId, stock) {
    client.set(itemId, stock);
}

const get = promisify(client.get).bind(client);

async function getCurrentReservedStochById(itemId) {
    const item = await get(itemId);
    return item;
}

app.get('/list_products', (req, res) => {
    res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const item = await getCurrentReservedStochById(itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ "status": 'Product not found' });
    }
    res.send('hi')
});

app.get('/reserve_products/:itemId', (req, res) => {
   const itemId = parseInt(req.params.itemId);
   const item = getItemById(itemId);
   if (!item) {
       res.status(404).json({ "status": 'Product not found' });
   }
   if (item.stock <= 0) {
       res.status(403).json({ "status": 'Not enough stock available', "remaining": 0 });
   }
   if (item.stock > 0) {
       reserveStockById(itemId, item.stock - 1);
       res.json({ "status": 'Reservation confirmed', "itemId": itemId });
   }

});

app.listen(port, () =>
    console.log(`API available on localhost port ${port}`)
);
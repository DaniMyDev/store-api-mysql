const express = require('express');
const router = express.Router();


//MiddleWare Function (Authetications / Empty Fields and Email Type Value)
const checkAuth = require('../middleware/check-auth');


 //MySql connection to DataBase
const mysql = require('mysql');
const sqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "products_db"
});
sqlConnection.connect(function (err) {
    if (err) throw err;
});


//Models
const Order = require('../models/order');

//Routes
router.get('/', checkAuth, (req, res) => {
    sqlConnection.query('select * from order', (err, result) => {
        if (err) {
            res.send({message: 'error while getting orders'})
        } else {
            res.status(201).json({result: result});
        }
    });
});

router.post('/', (req, res) => {
    const order = new Order(req.body.productId, req.body.username, req.body.quantity);
    sqlConnection.query('call add_order(?, ?, ?, ?, ?)', [order.id, order.product_id, order.username, order.quantity, new Date()], (err, result) => {
        if (err) {
            res.status(500).json({message: 'error while adding an order'});
        } else {
            res.status(201).json({message: 'order created correctly', result: result});
        }
    });
});

module.exports = router;
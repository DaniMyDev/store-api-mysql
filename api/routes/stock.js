/**
 * Express Router
 */
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


//Routes
router.get('/', (req, res) => {
    sqlConnection.query('select * from stock', (err, result) => {
        if (err) {
            return res.send({message: 'error while adding a stock with id: ' + req.body.product_id});
        } else {
            return res.send({result: result});
        }
    });
});

router.post('/', checkAuth, (req, res) => {
    sqlConnection.query('call add_stock(?, ?)', [req.body.product_id, req.body.num], (err, result) => {
        if (err) {
            return res.send({message: 'error while adding a stock with id: ' + req.body.product_id});
        } else {
            return res.send({message: 'stock added'});
        }
    });
});

router.delete('/', checkAuth, (req, res) => {
    sqlConnection.query('call delete_stock(?)', [req.body.product_id], (err, result) => {
        if (err) {
            return res.send({message: 'error while deleting a stock with id: ' + req.body.product_id});
        } else {
            return res.send({message: 'stock deleted'});
        }
    });
});





module.exports = router;
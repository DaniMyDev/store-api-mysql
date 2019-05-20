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


//Uploading File
const multer = require('multer');//For parsing Files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({storage: storage});


//Models
const Product = require('../models/product');


//Routers requests
router.get('/', (req, res) => {
    sqlConnection.query('call get_all_products', (err, result) => {
        if (err) {
            return res.status(500).json({message: "error on getting products"});
        }else{
            return res.status(200).json({result:result[0]});
        }
    });
});

router.get('/:id', (req, res) => {
    sqlConnection.query('call get_product(?)', [req.body.id], (err, result) => {
        if (err) {
            return res.send(err);
        }else{
            return res.status(200).json({result: result[0]});
        }
    });
});

router.post('/', checkAuth, upload.single('productImg'), (req, res) => {
    const product = new Product(req.body.name, req.body.category, req.body.price, req.file.path);
    sqlConnection.query('call add_product(?, ?, ?, ?, ?, ?)', [product.id, product.name, product.category, product.price, new Date(), product.url], (err, result) => {
        if (err) {
            return res.send({message: "product was not added"});
        }else{
            return res.send({message: "product added"});
        }
    });
});

router.patch('/', checkAuth, (req, res) => {
    sqlConnection.query('call edit_product(?, ?, ?)', [req.body.id, req.body.price, new Date()], (err, result) => {
        if (err) {
            return res.send({message: "error on updating product information"});
        }else{
            return res.send({message: "product was updated"});
        }
    });
});

router.delete('/', checkAuth, (req, res) => {
    sqlConnection.query('call delete_product(?, ?)', [req.body.id, new Date()], (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({message: "product was deleted"});
        }
    });
});

//History of Product Transactions
router.get('/history/all', checkAuth, (req, res) => {
    sqlConnection.query('select * from history', (err, result) => {
        if (err) {
            res.send({message: "error on getting transactions history"});
        } else {
            res.send({result: result[0]});
        }
    });
});

router.get('/history/type/:type', checkAuth, (req, res) => {
    sqlConnection.query('call get_history(?)', [req.body.type], (err, result) => {
        if (err) {
            res.send({message: "error on getting transaction history"});
        } else {
            res.send({result: result[0]});
        }
    });
});




module.exports = router;
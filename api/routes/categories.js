/**
 * Express Router
 */
const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
    const name = req.body.name;
    const desc = req.body.desc;
    sqlConnection.query('add_category(?, ?)', [name, desc], (req, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send({ result: result });
        }
    });
});

router.delete('/', (req, res) => {
    const id = req.body.id;
    sqlConnection.query('delete_category(?)', [id], (err, result) => {
        if (err) {
            return res.send(err);
        } else {
            return res.send({ result: result });
        }
    });
});





module.exports = router;
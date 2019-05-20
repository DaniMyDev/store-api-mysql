//Server
const express = require('express');
const app = express();
app.listen(2000, function () {
    console.log('app started on port 2000...');
});


//Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Setting Routes
const productRoute = require('./api/routes/products');
const categoryRoute = require('./api/routes/categories');
const userRoute = require('./api/routes/users');
const stockRoute = require('./api/routes/stock');
const orderRoute = require('./api/routes/orders');
app.use('/products', productRoute);
app.use('/categories', categoryRoute);
app.use('/user', userRoute);
app.use('/stock', stockRoute);
app.use('/orders', orderRoute);


//CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Acces-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
		return res.status(200).json({});
	}
	next();
});


module.exports = app;
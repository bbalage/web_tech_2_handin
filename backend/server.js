const express = require('express');
const app = express();
const mongoUrl ="mongodb://localhost:27017/n5if3vdb";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

app.use(express.json());

mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', console.log.bind(console, "Database connected."));

const ProductSchema = new Schema({
    name: {type: String},
    amount: {type: Number}
});

var ProductModel = mongoose.model('products', ProductSchema);
console.log(ProductModel);

app.get('/hello', function (req, res) {
    res.send('Hello World!');
})

app.post('/add-product', function (req, res) {
    console.log("Request body: "+req.body.name);
    addedProduct = new ProductModel(req.body);
    addedProduct.save(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(data);
        }
    })
})

server = app.listen(4000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
})
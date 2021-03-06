const express = require('express');
const app = express();
const mongoUrl = "mongodb://localhost:27017/n5if3vdb";
const mongoose = require('mongoose');

const authorRouter = require('./routes/author.route');
const bookRouter = require('./routes/book.route');
const loginRouter = require('./routes/login.route');
const adminRouter = require('./routes/admin.route');
//IMPORTANT!!! Only for review and testing purpose!!!
const resetRouter = require('./routes/reset.route');

app.use(express.json());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', console.log.bind(console, "Database connected."));

app.use('/api/author', authorRouter);
app.use('/api/book', bookRouter);
app.use('/api/login', loginRouter);
app.use('/api/admin', adminRouter);
app.use('/api/reset', resetRouter);

server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
})
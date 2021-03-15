express = require('express');
app = express();

app.get('/hello', function (req, res) {
    res.send('Hello World!');
})

server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;

    console.log("Server listening at http://%s:%s", host, port);
})
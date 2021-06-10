function defaultErrorHandling(err, res) {
    console.log(err);
    res.status(500).send("Server error.");
}

errorHandling = {
    defaultErrorHandling: defaultErrorHandling
}

module.exports = errorHandling;
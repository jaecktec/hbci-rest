var restify = require('restify');
var bankenliste = require("./resources/banks.json");


var server = restify.createServer({
    name: 'hbci-rest',
    version: '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/bank/:blz', require("./routes/getBankByBlz"));
server.get('/account', require("./routes/getAccounts"));
server.get('/account/transactions', require("./routes/getTransactions"));
server.get('/echo', function(req, res, next){
    res.send(req.params);
    return next();
})
module.exports = server;
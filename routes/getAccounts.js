/**
 * Created by const on 07.04.2016.
 */
var bankenliste = require("../resources/banks.json");
var FinTSClient = require("open-fin-ts-js-client");

module.exports = function (req, res, next) {
    var blz = req.params.blz;
    var legId = req.params.legId;
    var pin = req.params.pin;
    if (undefined === bankenliste[blz]) {
        res.status(404);
        res.send({
            "status": 404,
            "msg": "blz: " + req.params.blz + " not found"
        });
    } else {
        var client = new FinTSClient(blz, legId, pin, bankenliste);
        client.EstablishConnection(function (error) {
            if (error) {
                res.status(400);
                res.send({
                    "status": 400,
                    "msg": "Pin/LegId combination not found"
                });
            } else {
                res.send(client.konten);
            }
        });
    }
    return next();
};
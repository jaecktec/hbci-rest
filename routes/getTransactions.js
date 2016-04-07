/**
 * Created by const on 07.04.2016.
 */
var bankenliste = require("../resources/banks.json");
var FinTSClient = require("open-fin-ts-js-client");
var async = require("async");

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

        var fromDate = req.params.fromDate !== undefined ? new Date(parseInt(req.params.fromDate)) : null;
        var toDate = req.params.toDate !== undefined ? new Date(parseInt(req.params.toDate)) : null;


        var accounts = req.params.account;
        if (!Array.isArray(accounts)) {
            accounts = [accounts];
        }


        var client = new FinTSClient(blz, legId, pin, bankenliste);
        client.EstablishConnection(function (error) {
            if (error) {
            } else {
                var sepa_accounts = [];
                accounts.forEach(function (elem_loc) {
                    client.konten.forEach(function (elem_sepa) {
                        if (elem_sepa.konto_nr == elem_loc) {
                            sepa_accounts.push(elem_sepa);
                        }
                    });
                });

                var async_calls = [];
                sepa_accounts.forEach(function (elem) {
                    async_calls.push(function (callback) {
                        client.MsgGetKontoUmsaetze(client.konten[0].sepa_data, fromDate, toDate, function (error2, rMsg, data) {
                            callback(null, {"konto_nr": elem.konto_nr, "transactions": data});
                        });
                    })
                });

                async.series(async_calls, function (err, results) {
                    res.send(results);
                });
            }
        });
    }
    return next();
};
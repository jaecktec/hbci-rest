/**
 * Created by const on 07.04.2016.
 */
var bankenliste = require("../resources/banks.json");

module.exports = function (req, res, next) {
    var result = bankenliste[req.params.blz];
    if (result === undefined) {
        res.status(404);
        res.send({
            "status": 404,
            "msg": req.params.blz + " not found"
        });
    } else {
        delete  result.url;
        res.send(result);
    }
    return next();
};
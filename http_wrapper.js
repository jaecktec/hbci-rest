var http = require("http"),
    zlib = require("zlib");

module.exports = {
    default: {
        /**
         *
         * @param postData = {url : String, json: Boolean, body = Object}
         * @param callback = function(error, response, body)
         */
        post: function (postData, callback) {
            "use strict";
            var url = postData.url;
            var json = postData.json;
            var body = postData.body;

            var a = document.createElement('a');
            a.href = url;
            http.request({
                host: a.hostname,
                port: a.port,
                path: a.pathname + a.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(body)
                }
            }, function (res) {
                var gunzip = zlib.createGunzip();
                res.pipe(gunzip);

                gunzip.on('data', function (data) {
                    // decompression chunk ready, add it to the buffer
                    buffer.push(data.toString())

                }).on("end", function () {
                    // response and decompression complete, join the buffer and return
                    callback(null, buffer.join(""));

                }).on("error", function (e) {
                    callback(e);
                })
            });
        }
    }
};
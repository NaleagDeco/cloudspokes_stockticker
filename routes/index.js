
/*
 * GET home page.
 */

exports.index = function(req, res) {
    var options = {
        hostname: 'download.finance.yahoo.com',
        path: '/d/quotes.csv?s=GOOG+NFLX+BCSI+EA+ZNGA&f=sl1'
    };

    require('http').get(options, function(response) {
        var body="";

        response.on('data', function(chunk) {
            body += chunk;
        });

        response.on('end', function() {
            var csv = require('csv');
            var stock_data = {};
            var payload = csv().from(body, { columns: false });

            payload.on('data', function(data, index) {
                stock_data[data[0]] = data[1];
            });

            payload.on('end', function() {
                res.render('index', {
                    layout: false,
                    payload: stock_data
                });
            });
        });
    });
};
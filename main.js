var express = require('express');
var mustacheExpress = require('mustache-express');
var request = require('request');
var app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname);

app.get('/', function (req, res2) {
    // Configure the request
    var options = {
        url: 'https://bingapis.azure-api.net/api/v5/news/',
        method: 'GET',
        headers: {
            "Ocp-Apim-Subscription-Key": "My-Subscription-Key"
        }
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            var news = JSON.parse(body);
            res2.render('template', news);
        }
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    console.log('http://localhost:3000/');
});
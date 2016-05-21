var request = require('request');
var express = require('express');
var path = require('path');
var mustacheExpress = require('mustache-express');

var app = express();

// Register '.mustache' extension with The Mustache Express
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, "views"));

app.get('/', function (req, res) {
    var options = {
        url: 'https://bingapis.azure-api.net/api/v5/news',
        headers: {
            'Ocp-Apim-Subscription-Key': '<My-Subscription-Key>'
        }
    };

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            //console.log(body) // Show the HTML for the Google homepage. 
            //res.send(body);
            var news = JSON.parse(body);
            res.render('template', news);
        }
    })

})

app.listen(8080);

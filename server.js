let express = require('express');
let app = express();

let ParserService = require('./parser-service');
let parserService = new ParserService();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/parse/:formattedString', function (req, res) {
    parserService.parseData(req.params.formattedString)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
});

app.listen(process.env.PORT);
console.log('------------------- Server Connected on port ' + process.env.PORT + ' -------------------');
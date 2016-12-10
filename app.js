var express = require('express')
var app = express();

var moment = require('moment');
moment().format();

app.get('/:inputTime', function (req, res) {
    var input = req.params.inputTime;

    if (isNaN(input)){
        //Should be Date stamp
        input = decodeURI(input);
        var unixStr = moment(input, "MMMM DD, YYYY").format('X');
        var natTime =  moment(input, "MMMM DD, YYYY").format('MMMM DD, YYYY');
        if (unixStr != 'Invalid date'){
            res.send({
                "natural time" : natTime,
                "unix time" : unixStr
            });
        } else {
            res.send({
                "error" : "You have provided an invalid date"
            });
        }
    } else {
        //Should be timestamp
        var dateStr = moment.unix(moment(Number(input))).format("MMMM DD, YYYY");
        if (dateStr != 'Invalid date'){
            res.send({
                "natural time" : dateStr,
                "unix time" : input
            });
        } else {
            res.send({
                "error" : "You have provided an invalid date"
            });
        }
    }



})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

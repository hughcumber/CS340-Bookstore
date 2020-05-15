var path = require('path');
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var fs = require('fs');


app.use(express.static('public'));


app.get('/index.html', function(req, res, next){
  console.log(req.url, 'success')

});


app.get("*", function (req, res) {
    console.log(req.url, "not found");
    res.status(404);
    res.render('404');
});



app.listen(port, function (err) {
  if (err) {
    throw err;
  }
  console.log("== Server listening on port", port);
});

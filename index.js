// ** LOAD NODE MODULES **
var app = require('express')();
var http = require('http').Server(app);
var express = require('express');



app.use(express.static(__dirname + '/', {
    maxage: process.env.IS_STAGING == 'true' ? '1m' : '1d'
}))
app.get('/', function(req, res){
  res.sendfile('index.html');
});
app.listen(port, function() {
    console.log('surv on port: ' + port)
});



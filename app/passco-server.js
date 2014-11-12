var express = require('express');
var app = express();
var mongoose = require('mongoose');
var gen = require('ical-generator'),
    http = require('http');
    
mongoose.connect('mongodb://127.0.0.1/passcoSchema');    
var cal1 = gen();

app.get('/addCal', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Methods", "GET, POST");
  
  console.log('uid:'+ req.param('uid'));
 console.log('stdate:'+ req.param('stdate').substring(4,6));
 console.log('edate:'+ new Date().getTime());
 console.log('summary:'+ req.param('summary'));
 console.log('description:'+ req.param('description'));
 console.log('location:'+ req.param('location'));
 console.log('url:'+ req.param('url'));

 cal1.setDomain('ashesi.edu.gh').setName('AshCal');

cal1.addEvent({
    uid:''+req.param('uid'),
    start: new Date(req.param('stdate')),
    end: new Date(req.param('edate')),
    summary: ''+req.param('summary'),
    description: ''+req.param('description'),
    location: ''+req.param('location'),
    url: ''+req.param('url')
});

});

mongoose.model('std', {name : String} );
app.get('/testdb', function(req, res){
  mongoose.model('std').find(function(err, std){
    res.send(std);
  })

});

app.get('/serveCal', function(req, res){
  cal1.serve(res);

});

app.get('/flushCal', function(req, res){
  cal1 = gen();

});



app.get('/ical', function(req, res){
  var cal = gen();

  res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Methods", "GET, POST");
  
  console.log('uid:'+ req.param('uid'));
 console.log('stdate:'+ req.param('stdate').substring(4,6));
 console.log('edate:'+ new Date().getTime());
 console.log('summary:'+ req.param('summary'));
 console.log('description:'+ req.param('description'));
 console.log('location:'+ req.param('location'));
 console.log('url:'+ req.param('url'));

 cal.setDomain('ashesi.edu.gh').setName('AshCal');

cal.addEvent({
    uid:''+req.param('uid'),
    start: new Date(req.param('stdate')),
    end: new Date(req.param('edate')),
    summary: ''+req.param('summary'),
    description: ''+req.param('description'),
    location: ''+req.param('location'),
    url: ''+req.param('url')
});

cal.serve(res);

});


app.get('/ical2', function(req, res){

  var ical = require('ical');
  ical.fromURL('http://ashesi.edu.gh/resources/events.html?task=ical.download&id=181', {}, function(err, data) {

      res.header("Access-Control-Allow-Origin", "*");
       res.header("Access-Control-Allow-Methods", "GET, POST");
      
      res.send(data);



    });

});
 

var server = app.listen(8000, function() {
    console.log('Listening on port %d', server.address().port);
});

// app.listen(process.env.PORT);
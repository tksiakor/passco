var express = require('express');
var app = express();
var mongoose = require('mongoose');
var gen = require('ical-generator'),
    http = require('http');
    
mongoose.connect('mongodb://127.0.0.1/passcoSchema'); 

app.set('port', process.env.PORT || 3000);

//Model registering



//passco Schema definition
var passcoSchema = new mongoose.Schema({
    year: [{year:Number, session: String}],
    subject: {type: String},
    topic: {type: String},
    question: {type: String},
    ans_a: {type: String},
    ans_b: {type: String},
    ans_c: {type: String},
    ans_d: {type: String},
    ans_e: {type: String},
    answer: {type: Number}

})

//Test model
var passco = mongoose.model('passco', passcoSchema, "passco" );


//Main Passco model
//var passco = mongoose.model('passco', passcoSchema);

//To retrieve all
app.get('/getall', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
  
	
	passco.find(function(err, passcos){
		res.send(passcos);
	})

})

//To insert
app.get('/insert', function(req, res){

	passco.create({
	    year: [{year:''+req.param("year"), session:''+req.param("month")}],
	    subject:''+req.param("subject"),
	    topic: ''+req.param("topic"),
	    question: ''+req.param("question"),
	    ans_a: ''+req.param("a1"),
	    ans_b:''+req.param("a2"),
	    ans_c:''+req.param("a3"),
	    ans_d:''+req.param("a4"),
	    ans_e: ''+req.param("a5"),
	    answer: req.param("ans")

	}, function (err, year, subject, topic, question, ans_a, ans_b, ans_c, ans_d, ans_e, answer) {
	  if(err){
	  	console.log(err);
	  	console.log("There's a problem somewhere... Find it!");
	  }
	  

})

})



http.createServer(app).listen(app.get('port'), function(){
	console.log('Port:' + app.get('port'))
});

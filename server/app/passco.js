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
    year: {type:Number},
    session:{type:String},
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

//Social Studies Topics schema definition
var ssSchema = new mongoose.Schema({
    code: {type:String},
    name: {type:String}

})

//Users schema definition
var userSchema = new mongoose.Schema({
	fname: {type:String},
	lname: {type:String},
	username: {type:String, unique:true},
	password: {type:String, encrypted:true},
	ssA: {type:Number},
	ssB: {type:Number},
	ssC: {type:Number}
})

//models
var passco = mongoose.model('passco', passcoSchema, "passco" );
var socialTopic = mongoose.model('socialTopic', ssSchema, "socialTopic");
var user = mongoose.model('user', userSchema, 'user');


//To retrieve all
app.get('/getall', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
  
	
	passco.find(function(err, passcos){
		res.send(passcos);
	})

})

//To retrieve Social Studies Subjects
app.get('/listss', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

	socialTopic.find(function(err, topics){
		console.log("Working..");
		res.send(topics);
	})

})

//To retrieve by year

//To retrieve by Topic
app.get('/gettopic', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

	passco.find({'topic': req.param("topic"), 'subject': req.param("subject")},function(err, passco1){
		console.log(req.param("topic")+ " " + req.param("subject") )
		res.send(passco1);
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

//USERS
//To add a user
app.get('/register', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

	user.create({
	    fname:''+req.param("fname"),
	    lname: ''+req.param("lname"),
	    username: ''+req.param("uname"),
	    password: ''+req.param("pwd"),
	   ssA: 0,
	   ssB: 0,
	   ssC: 0

	}, function (err, fname, lname) {

	  if(err){
	  	console.log(err);
	  	console.log("There's a problem with registering somewhere... Find it!");
	  }
	  console.log(fname + " " + lname + " has been added to the db");
	  

})

})

//To auth user



app.get('/auth', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
		//check if a user's password is valid like so:
		user.findOne({ username: ''+req.param("uname") }, function(err, user) {
		    if (user.password === (''+req.param("pwd"))) {
		        // ... user is legit
		        console.log("user found");
		        res.end("1");
		    }
		    else{
		    console.log("user not found");
		    res.end("0");
		}
		})
})



http.createServer(app).listen(app.get('port'), function(){
	console.log('Port:' + app.get('port'))
});

var express = require('express');
var app = express();
var mongoose = require('mongoose-q')(require('mongoose'));
// var mongooseq = require('mongoose-q');
var gen = require('ical-generator'),
    http = require('http');
var random = require('mongoose-simple-random');
app.use(require('express-promise')());

   

mongoose.connect('mongodb://127.0.0.1/passcoSchema'); 

app.set('port', process.env.PORT || 3001);

//Model registering

var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var userSchema_1 = new mongoose.Schema({
	fname: {type:String},
	lname: {type:String},
	username: {type:String, unique:true},
	password: {type:String, encrypted:true},
	s01score: Number,
	s01aprogress: {type:Array},
	s01bprogress: {type:Array},
	s01cprogress: {type:Array},
	s01ascore:Number,
	s01bscore:Number,
	s01cscore:Number,
	activated: {type:Array},
	pic: {type: String}
})



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
    answer: {type: Number},
    //Explanation column
    //explain: {type:String},
    pic:{type: String}

})


//Plugin for Randomization
passcoSchema.plugin(random); 

//Social Studies Topics schema definition
var s01schema = new mongoose.Schema({
    code: {type:String},
    name: {type:String}

})



//models
var passco = mongoose.model('passco', passcoSchema, "passco" );
var socialTopic = mongoose.model('socialTopic', s01schema, "socialTopic");
var user = mongoose.model('user', userSchema_1, 'user');



// USER METHODS

//To add a user (README)
app.get('/register', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

  	console.log("Adding user...");

	user.create({
	    fname:''+req.param("fname"),
	    lname: ''+req.param("lname"),
	    username: ''+req.param("uname"),
	    password: ''+req.param("pwd"),
	    s01score: 0,
	    s01ascore: 0,
	    s01bscore: 0,
	    s01cscore: 0,
	    s01aprogress: [],
	    s01bprogress: [],
	    s01cprogress: [],
	    pic: ''+req.param("pic")
	   	

	}, function (err, fname, lname) {

	  if(err){
	  	console.log(err);
	  	console.log("There's a problem with registering somewhere... Find it!");
	  	res.end("0");
	  }
	  else{
	  	console.log("OK");
	 	res.end("Registered");
		}	  
	})
})

//(Working)
app.get('/rankUsers', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
	
	if(req.param("subject")=="s01"){
		if (req.param("topic")=="A"){
		    user.find().sort({'s01ascore':-1}).exec(function(err, doc){
			 	//console.log(doc)
			    res.send(doc)
		    })
		}
		else if (req.param("topic")=="B"){
		    user.find().sort({'s01bscore':-1}).exec(function(err, doc){
			 	//console.log(doc)
			    res.send(doc)
		    })
		}
		else if (req.param("topic")=="C"){
		    user.find().sort({'s01cscore':-1}).exec(function(err, doc){
			 	//console.log(doc)
			    res.send(doc)
		    })
		}
		else if (req.param("topic")==undefined) {
			    user.find().sort({'s01score':-1}).exec(function(err, doc){
				 	//console.log(doc)
				res.send(doc)
		    })
		}
	}
   

})


//To retrieve all questions (README)
app.get('/getall', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
  
	
	passco.find(function(err, passcos){

		var ques = new Array();

		for (var i in passcos){
			//console.log("picking")
			ques[i] = JSON.parse('{"id":"' + passcos[i]._id + '", "session":"' + passcos[i].session +'", "topic":"'+passcos[i].topic+'", "question": "' + passcos[i].question.replace(","," ") + '", "choices":'+'["'+passcos[i].ans_a.replace("\"","").replace(","," ")+'","'+passcos[i].ans_b.replace("\"","").replace(","," ")+'","'+passcos[i].ans_c.replace("\"","").replace(","," ")+'","'+passcos[i].ans_d.replace("\"","").replace(","," ")+'","'+passcos[i].ans_e.replace("\"","").replace(","," ")+'"], "answer":"'+ passcos[i].answer+'", "year":"'+ passcos[i].year+'"}')

		}

		if (err) {
			console.log(err)
		} else {
	
			console.log("Picked all");
			res.send(ques);
		}
		
	})

})


//To retrieve five by topic
app.get('/getfive', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
  
	if(req.param("subject")=="s01"){
		passco.findRandom({topic:''+req.param("topic")},{},{limit:5},function(err, passcos){
			var ques = new Array(5);

			for (var i in passcos){

				ques[i] = JSON.parse('{"id":"' + passcos[i]._id + '", "session":"' + passcos[i].session +'", "topic":"'+passcos[i].topic+'", "question": "' + passcos[i].question.replace(","," ") + '", "choices":'+'["'+passcos[i].ans_a.replace("\"","").replace(","," ")+'","'+passcos[i].ans_b.replace("\"","").replace(","," ")+'","'+passcos[i].ans_c.replace("\"","").replace(","," ")+'","'+passcos[i].ans_d.replace("\"","").replace(","," ")+'","'+passcos[i].ans_e.replace("\"","").replace(","," ")+'"], "answer":"'+ passcos[i].answer+'", "year":"'+ passcos[i].year+'"}')

			}

			if (err) {
				console.log(err)
			} else {
				console.log("Picked five");
				//Send in this format:
				// id: id
				// choices:[ans_s,ans_b,ans_c,]
				res.send((ques));
			}
		})
	}
})



//To retrieve by year **to do

//To retrieve by Topic & Subject (NO README)
app.get('/gettopic', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

	passco.find({'topic': req.param("topic"), 'subject': req.param("subject")},function(err, passcos){
		var ques = new Array();

		for (var i in passcos){

			ques[i] = JSON.parse('{"id":"' + passcos[i]._id + '", "session":"' + passcos[i].session +'", "topic":"'+passcos[i].topic+'", "question": "' + passcos[i].question.replace(","," ") + '", "choices":'+'["'+passcos[i].ans_a.replace("\"","").replace(","," ")+'","'+passcos[i].ans_b.replace("\"","").replace(","," ")+'","'+passcos[i].ans_c.replace("\"","").replace(","," ")+'","'+passcos[i].ans_d.replace("\"","").replace(","," ")+'","'+passcos[i].ans_e.replace("\"","").replace(","," ")+'"], "answer":"'+ passcos[i].answer+'", "year":"'+ passcos[i].year+'"}')

		}

		console.log(req.param("topic")+ " " + req.param("subject") )
		
		res.send(ques);
	})
})

//To insert (README)
app.get('/insert', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST")

	passco.create({
	    year:''+req.param("year"), 
	    session:''+req.param("month"),
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
	  else{
	  		res.end("0")
		}
	})
})


//Find USER and array of answered answered question NB: Pass AN ARRAY (README)
app.get('/addArrayQ', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    var arr = req.param("question");

    if(req.param("subject")=="s01"){
    	if(req.param("topic")=="A"){
		    for (var i in arr){
			    user.findOneAndUpdate({username:req.param("user")}, {$addToSet:{"s01aprogress": req.param("question")[i]}}, {safe: true, upsert: true}, function(err, info){
			    	if(err){
			    		console.log(err);
			    		res.end("0")
			    	}
			    	else{
			    		res.end("1")
			    }
			    } )
			}
		}
		if(req.param("topic")=="B"){
		    for (var i in arr){
			    user.findOneAndUpdate({username:req.param("user")}, {$addToSet:{"s01bprogress": req.param("question")[i]}}, {safe: true, upsert: true}, function(err, info){
			    	if(err){
			    		console.log(err);
			    		res.end("0")
			    	}
			    	else{
			    		res.end("1")
			    }
			    } )
			}
		}
		if(req.param("topic")=="C"){
		    for (var i in arr){
			    user.findOneAndUpdate({username:req.param("user")}, {$addToSet:{"s01cprogress": req.param("question")[i]}}, {safe: true, upsert: true}, function(err, info){
			    	if(err){
			    		console.log(err);
			    		res.end("0")
			    	}
			    	else{
			    		res.end("1")
			    }
			    } )
			}
		}
	}
})


//To auth user (README)
app.get('/auth', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
		//check if a user's password is valid like so:
		user.findOne({ username: ''+req.param("uname") }, function(err, user) {
		    if (user.password === (''+req.param("pwd"))) {
		        // ... user is legit
		        if (err){
		        	res.end("0");
		        }
		        console.log("user found");
		        res.end("1");
		    }
		    else{
		    console.log("user not found");
		    res.end("0");
		}
	})
})


//Retrieve a user and his/her marks/info (README)
app.get('/getUser', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    user.findOne({ username: ''+req.param("uname") }, function(err, user) {
		    res.send(user);
		}
	)
})


//Update marks (README)
app.get('/savescore', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");


    if(req.param("subject")=="s01"){
	    	if(req.param("A") !==  undefined){
			    user.findOneAndUpdate({user:req.param("user")}, {s01ascore:req.param("A")}, function(err){
			    	if (err) {
			    		console.log(err);
			    		
			    	}
			    	else{
			    		console.log("A recorded")
			    	}
			    })
			}
			else{
				console.log("Category A not given")
			}

			if(req.param("B") !==  undefined){
			    user.findOneAndUpdate({buser:req.param("user")}, {s01bscore:req.param("B")}, function(err){
			    	if (err) {
			    		console.log(err);
			    		
			    	}
			    	else{
			    		console.log("B recorded")
			    	}
			    })
			}
			else{
				console.log("Category B not given")
			}

			if(req.param("C") !==  undefined){
			    user.findOneAndUpdate({buser:req.param("user")}, {s01cscore:req.param("C")}, function(err){
			    	if (err) {
			    		console.log(err);
			    		
			    	}
			    	else{
			    		console.log("C recorded")
			    	}
			    })
			}
			else{
				console.log("Category C not given")
			}
	}
	res.end("0")
})


//Update marks (README!!)
app.get('/savesubjectscore', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    if(req.param("subject")=="s01"){
		    user.findOneAndUpdate({username:req.param("user")}, {s01score:req.param("score")}, function(err){
		    	if (err) {
		    		console.log(err);
		    		res.send("0")
		    	}
		    	else{
		    		console.log(req.param("score"))
		    		res.send("1")
		    	}
		    })
	}
})

//Increase points by one (README)
app.get('/increasescore', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");

    user.findOneAndUpdate({buser:req.param("user")}, {$inc:{s01score:1}},function(err){
    	if(err){
    		console.log(err);
    		res.end("0")
    	}
    	else{
    		res.end("1")
    	}
	})
})


//(README)
app.get('/returnans', function(req,res){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
  
	passco.find(function(err, passcos){
		var array = new Array(50);
	
		for (var i in passcos){
			
			array[i] =  [passcos[i].ans_a, passcos[i].ans_b, passcos[i].ans_c, passcos[i].ans_d];	
		}

		res.send(array);
	})
})


//To calculate the user topic percentage complete **Incomplete** (README)
app.get('/topiccompletion',function(req, res){
	//Get count of total specific topic i.e. A
	
	var topicArr = ["A", "B", "C"];
	var arr = new Array(topicArr.length);
	var tcount = -1;
	var ucount = -1;
	var ans;
	

	//for (var i = 0; i < topicArr.length; i++){
		passco.findQ({topic:req.param("topic")}, function(err, pss){
			if(!err)
			{	
				var counts = 0;
				//Compare array values to pss model
				for (var i in pss){

				}
				console.log("Count from db: " + counts);
				tcount = counts;
			}
		}).then(

			user.findOne({ username: req.param("user") }, function(err, user) {
			   if(!err)
			   {
				   	ucount = user.s01course.length;
				    console.log(req.param("user") + "'s: "+ ucount);
				    ans = (((Number(ucount)/Number(tcount))*100).toFixed(2)).toString();
				    console.log(ans);
				    res.end(ans);
				    
				    //if(Number(i) === topicArr.length){res.end(''+arr)}
				}
			}
		)
	)
})


http.createServer(app).listen(app.get('port'), function(){
	console.log('Port:' + app.get('port'))
});

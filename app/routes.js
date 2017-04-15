// require express
var conn= require('../app/connection.js');
var express = require('express');
var path    = require('path');
var util = require('util');
var Student = require("../app/StudentSchema");
/*
var mongoURI = "mongodb://localhost:27017/UWIAlumni";
var MongoDB = mongoose.connect(mongoURI).connection;
*/
// create our router object
var router = express.Router();

// export our router
module.exports = router;

// route for our homepage
/*router.get('/', function(req, res) {
  res.render('pages/home');
});*/

//serperator
var app=router;


app.get('/',function(req,res){
	sess=req.session;
	console.log(sess.who);
	if(sess.who=="admin")
	{
		res.redirect('/admin');//redirect to starting admin home page
	}
	else if(sess.who=="grad"){
        res.redirect('/grad');//redirect to starting grad home page
  }else{
      res.render('index.html', {layout: false}); //render default page that is the login page
	}
});

app.post('/login',function(req,res){
	sess=req.session;
	sess.email=req.body.email;

    if(sess.email=="a@a.com" ||sess.email=="A@A.COM" ){
        sess.who="admin";
        res.end('admin');
    }else{
        sess.who="grad";
        res.end('grad');
    }
});


app.get('/grad',function(req,res){ // grad home page
	sess=req.session;
	if(sess.who=="grad")
	{
    res.render('pages/gradHome', {layout: 'layout'+sess.who+'.ejs'});
	}
	else
	{
		res.render('notAvailable.html', {layout: false});
	}

});

app.get('/admin',function(req,res){ // grad home page
	sess=req.session;
	if(sess.who=="admin")
	{
    res.render('pages/graphs', {layout: 'layout'+sess.who+'.ejs'});
	}
	else
	{
		res.render('notAvailable.html', {layout: false});
	}

});

app.get('/logout',function(req,res){

	req.session.destroy(function(err){
		if(err){
			console.log(err);
		}
		else
		{
			res.redirect('/');
		}
	});

});
//seperator

// route for our about page
router.get('/about', function(req, res) {
  var users = [
    { name: 'Holly', email: 'holly@scotch.io', avatar: 'http://placekitten.com/300/300'},
    { name: 'Chris', email: 'chris@scotch.io', avatar: 'http://placekitten.com/400/400'},
    { name: 'Ado', email: 'Ado@scotch.io', avatar: 'http://placekitten.com/500/500'},
    { name: 'Samantha', email: 'Samantha@scotch.io', avatar: 'http://placekitten.com/700/700'}
  ];

  res.render('pages/about', { users: users });
});

router.get('/contact', function(req, res) {
	sess=req.session;
  res.render('pages/contact', {layout: 'layout'+sess.who+'.ejs'});
});

router.post('/contact', function(req, res) {
  res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');
});

router.get('/editStudent', function(req, res) {
  res.render('pages/editStudent', {layout: 'layout'+sess.who+'.ejs'});
});

router.post('/editStudent', function(req, res) {
  res.send('Thanks for contacting us, ' + req.body.name + '! We will respond shortly!');

  console.log(req.body);

    //var student = new Student(req.body);
    var student = new Student({
      name: req.body.name,
      //age: req.body.age,
      gender: req.body.gender,
      email: req.body.email,
      occupationTitle: req.body.occupationTitle,
      //occupationStartDate: req.body.occupationStartDate,
      //occupationEndDate: req.body.occupationEndDate,
      companyName: req.body.companyName,
      companyBranchLocation: req.body.companyBranchLocation,
      furtherEducation: req.body.furtherEducation
    });

    //save this instance of the model to the database
    student.save().then(function(){//the .then property is because .save() is an asynchronous process that can take any amount of time to complete, because of this mongoose implements a promise feature for when it completes
      console.log("saved");
      done();
    });
});

router.get('/test', function(req, res) {
  //util.log(util.inspect(req))
  var temp;
	Student.find({}, function (err, user) {
        temp=user;
				console.log(user);
    });
		console.log("what");
});
/*
router.get('/query', function(req, res) {
  //util.log(util.inspect(req))
  var temp;

  var queryRequested=req.query;

  var query={};

  Student.find({count:1}).sort({viewCount: -1}).exec(
        function(err, result) {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          //res.end(JSON.stringify(result));
					res.end(JSON.stringify(result));

        }
    );

		// Student.aggregate([
		//     { $match: {  } } // Query can go here, if you want to filter results.
		//   , { $project: { tokens: 1 } } // select the tokens field as something we want to "send" to the next command in the chain
		//   , { $unwind: '$tokens' } // this converts arrays into unique documents for counting
		//   , { $group: { // execute 'grouping'
		//           _id: { token: '$tokens' } // using the 'token' value as the _id
		//         , count: { $sum: 1 } // create a sum value
		//       }
		//     }
		// ], function(err, topTopics) {
		//   console.log(topTopics);
		//   // [ foo: 4, bar: 2 baz: 2 ]
		// });




  // Student.find({projectName: '***'}, ["_id"]).sort({viewCount: -1}).limit(5).exec(
  //       function(err, projects) {
  //           ...
  //       }
  //   );
});
*/

router.get('/graphs', function(req, res) {
  res.render('pages/graphs', {layout: 'layout'+sess.who+'.ejs'});
});

router.get('/barGraph', function(req, res) {
  res.render('pages/barGraph', {layout: 'layout'+sess.who+'.ejs'});
});

router.get('/lineGraph', function(req, res) {
  res.render('pages/lineGraph', {layout: 'layout'+sess.who+'.ejs'});
});
router.get('/histogram', function(req, res) {
  res.render('pages/histogram', {layout: 'layout'+sess.who+'.ejs'});
});
router.get('/heatmap', function(req, res) {
  res.render('pages/heatmap', {layout: false});
});

router.get('/searchStudents', function(req, res) {
  res.render('pages/searchStudents', {layout: false});
});

router.get('/searchMap', function(req, res) {
  res.render('pages/searchMap', {layout: false});
});

app.get('/qwe',function(req,res){//should no correct route be entered, a page displays a notification
  res.render('doesNotExist.html', {layout: false});
});

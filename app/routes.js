// require express
var express = require('express');
var path    = require('path');
var util = require('util');
var Student = require("../app/StudentSchema");

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

app.get('/admin',function(req,res){ //admin home page
	sess=req.session;
	if(sess.who=="admin")
	{
    res.render('pages/adminHome', {layout: 'layout'+sess.who+'.ejs'});
	}
	else
	{
		res.render('notAvailable.html', {layout: false});
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
  util.log(util.inspect(req))
  var temp;
  Student.find({count:1}).then(function(result){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(result));
    done();
  });
});

router.get('/query', function(req, res) {
  //util.log(util.inspect(req))
  var temp;
  /*
  Student.find({count:1}).then(function(result){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(result));
    done();
  });
*/
  var queryRequested=req.query;

  var query={};
  console.log(queryRequested);
  try {
    //lte
    for (var key in queryRequested.where.lte) {
      query[key]={"$lte":queryRequested.where.lte[key]}; //some reason does not work with . so brackets was used
    }

    //gte
    for (var key in queryRequested.where.gte) {
      query[key]["$gte"]=queryRequested.where.gte[key]; //some reason does not work with . so brackets was used
    }

    //is
    for (var key in queryRequested.where.is) {
      if(key=="jobTitle"){
        query["occupations."+key]=queryRequested.where.is[key]; //some reason does not work with . so brackets was used
      }else if(key=="companyName"){
        query["occupations."+key]=queryRequested.where.is[key]; //some reason does not work with . so brackets was used
      }else{
        query[key]=queryRequested.where.is[key]; //some reason does not work with . so brackets was used
      }

    }
  }
  catch(err) {
      console.log( err.message);
  }

  console.log(query);

  Student.find(query).sort({viewCount: -1}).exec(
        function(err, result) {
          console.log(result);
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end(JSON.stringify(result));
        }
    );

/*
  Student.find({projectName: '***'}, ["_id"]).sort({viewCount: -1}).limit(5).exec(
        function(err, projects) {
            ...
        }
    );*/
});

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

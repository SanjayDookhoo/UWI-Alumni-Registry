var conn = require('../app/connection');
var Student = require("../app/StudentSchema");
var arr = require('./graduateStudent.json');




for (var i = 0; i < arr.length; i++){
    var obj = arr[i];
    //console.log(obj);
    var temp=new Student(obj);
    temp.save().then(function(){//the .then property is because .save() is an asynchronous process that can take any amount of time to complete, because of this mongoose implements a promise feature for when it completes
        console.log("saved");
    });
}

//conn.connection.close();
//mongoose.connection.close();

/*
  //save this instance of the model to the database
  temp.save().then(function(){//the .then property is because .save() is an asynchronous process that can take any amount of time to complete, because of this mongoose implements a promise feature for when it completes
    console.log("saved");
  });*/

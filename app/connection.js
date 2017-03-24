const mongoose = require("mongoose");

//ES6 Promises
mongoose.Promise = global.Promise;

// Connect to mongodb
mongoose.connect("mongodb://localhost/UWIAlumni");

mongoose.connection.once('open',function(){
  console.log('Connection has been made.');
  return mongoose;
}).on('error',function(error){
  console.log('Connection error:',error);
});

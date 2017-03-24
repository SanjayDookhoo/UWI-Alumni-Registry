const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and Model(It expects a name and weight, this does not mean a name and weight must be given, but if it is given, the type must be correct)
const StudentSchema = new Schema({
  email: String,
  firstName: String,
  lastName: String,
  gender: String,
  age: Number,
  count: Number,
  education: [
    {
      educationType: String,
      date: Date
    }
  ],

  address: String,
  occupations: [
    {
      jobTitle: String,
      companyName: String,
      occupationStart: Date,
      occupationEnd: Date,
      address: String
    }
  ]
});



//every new char (MarioChar) is created in this collection (mariochar) with this schema (MarioCharSchema)
const Student = mongoose.model("student", StudentSchema);

module.exports = Student;

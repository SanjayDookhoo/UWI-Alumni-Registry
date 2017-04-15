const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema and Model(It expects a name and weight, this does not mean a name and weight must be given, but if it is given, the type must be correct)
const AdminSchema = new Schema({
  email: String,
  password: String
});



//every new char (MarioChar) is created in this collection (mariochar) with this schema (MarioCharSchema)
const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;

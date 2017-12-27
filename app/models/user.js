const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  title: {type:String,required:true},
  email:{type:String,required:true},
  password:{type:String,required:true},
  created:{type:Date}
});

mongoose.model('User', UserSchema);
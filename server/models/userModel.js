const mongoose = require('mongoose');
const Schema = mongoose.Schema


const UserSchema = new Schema(
    
{
username: {
    type: String,
    required: true,
    unique:true,
    trim:true,
    minlength: 3
},
password:{
    type: String,
    required: true,
},
isAdmin:{
    type: Boolean,
},
accessToken:{
    type: String,
},
refreshToken:{
    type:String,
},
refreshTokens:{
    type: Array,
    default:[""]
}


},
{
    timestamps:true
}


);

const User = mongoose.model('User',UserSchema);

module.exports = User;

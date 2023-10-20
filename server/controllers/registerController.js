require('dotenv').config()
const json = require('json')
const _ = require('lodash')

const User = require('../models/userModel');


function Register(req,res){
    const {user, pass, isAdmin} = req.body


    User.create({
        username:user,
        password:pass,
        isAdmin: isAdmin,
        accessToken:"",
        refreshToken:""
    }).then(()=>{
            res.status(200).json({"message": "User created!"});
    })
}

module.exports = {Register};
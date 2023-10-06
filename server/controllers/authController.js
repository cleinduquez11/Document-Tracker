require('dotenv').config()
const json = require('json')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_ACCESS_TOKEN;
const User = require('../models/userModel');

function Authenticate(req, res) {
    const {user, pass } = req.body;
    User.where({username: user, password:pass}).then((u)=> {
  

            let uSer = _.find(u, (user)=>{
                if(user.username){
                  
                 return u
                }
              });
          

            if (uSer) {
                const accessToken =  jwt.sign({
                    username: u.username,
                    password: u.password
                },
                secret_key
                ,
                {expiresIn: '24h'}
            
                )

                User.findByIdAndUpdate(uSer._id, {accessToken: accessToken});
            
                 res.status(200).json({"message": "You are now Authenticated",u, "AccessToken" : accessToken});
            }
            else {
                res.status(401).json({"message":"You are not Authenticated"});
            }
       
           
             
         
     
    }).catch((e)=>{
        res.status(401).json("You are not Authenticated");
    })
   


}


module.exports = { Authenticate}
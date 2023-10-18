require('dotenv').config()
const json = require('json')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_ACCESS_TOKEN;
const refresh_secret_key = process.env.SECRET_ACCESS_TOKEN_REFRESH;
const User = require('../models/userModel');

function Authenticate(req, res) {
    const {user, pass } = req.body;
    User.where({"username": user, "password":pass}).then((u)=> {
  
           
            let uSer = _.find(u, (user)=>{
                if(user.username){
                  
                 return u
                }
              });
          
            //   console.log(uSer);
            if (uSer) {
                const accessToken =  jwt.sign({
                    username: uSer.username,
                },
                secret_key
                ,
                {expiresIn: '60s'}
            
                );

                const refreshToken =  jwt.sign({
                    username: uSer.username,
                },
                refresh_secret_key
                ,
                // {expiresIn: '24h'}
            
                );

                User.findByIdAndUpdate(uSer._id, {"refreshToken": refreshToken}).then(()=>{
                    res.status(200).json({"message": "You are now Authenticated","_id": uSer._id, "username":uSer.username, "isAdmin": uSer.isAdmin,"AccessToken" : accessToken, "RefreshToken":refreshToken});
                });
            
                
            }
            else {
                res.status(401).json({"message":"You are not Authenticated"});
            }
       
           
             
         
     
    }).catch((e)=>{
        res.status(401).json({"message": "You are not Authenticated", "error": e});
    })
   


}


function RefreshToken(req, res) {
    const {refreshtoken} = req.body;
    User.where({"refreshToken": refreshtoken}).then((u)=> {
  
           
        // console.log(u);
            let uSer = _.find(u, (user)=>{
                if(user.refreshToken){
                  
                 return u
                }
              });
          
            //   console.log(uSer);
            if (uSer) {
                const accessToken =  jwt.sign({
                    username: uSer.username,
                },
                secret_key
                ,
                {expiresIn: '60s'}
            
                );

                // const refreshToken =  jwt.sign({
                //     username: uSer.username,
                // },
                // refresh_secret_key
                // ,
                // // {expiresIn: '24h'}
            
                // );

        res.status(200).json({"message": "You are now Authenticated","_id": uSer._id, "username":uSer.username, "isAdmin": uSer.isAdmin,"AccessToken" : accessToken});
              
            
                
            }
            else {
                res.status(401).json({"message":"You are not Authenticated"});
            }
       
           
             
         
     
    }).catch((e)=>{
        res.status(401).json({"message": "You are not Authenticated", "error": e});
    })
   


}


function Logout(req, res){
    const {id } = req.query;
    // console.log(id)
    User.findByIdAndUpdate(id, {"refreshToken": null}).then(()=>{
 res.status(200).json({"message":"Successfully Logged Out"});
    });
   


}


module.exports = { Authenticate, RefreshToken, Logout}
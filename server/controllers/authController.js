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
                 {expiresIn: '24h'}
            
                );

                User.findByIdAndUpdate(uSer._id ,{$push:{"refreshTokens":  refreshToken }}).then(()=>{
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


async function RefreshToken(req, res) {
    const {refreshtoken} = req.body;

    try {
       const user = await User.where({"refreshTokens": refreshtoken});

       if(user){
        const accessToken =  jwt.sign({
            username: user.username,
        },
        secret_key
        ,
        {expiresIn: '60s'}
    
        );

    res.status(200).json({"message": "You are now Authenticated",
        "_id": user._id, 
        "username":user.username, 
        "isAdmin": user.isAdmin,
        "AccessToken" : accessToken});
       }
    } catch (error) {
        res.status(401).json({"message":"You are not Authenticated"});
    }

}


async function Logout(req, res){
    const {id, refreshtoken } = req.query;

    try {
        const logOutUser = await User.findByIdAndUpdate(id, {$pull:{"refreshTokens": refreshtoken}});
        if (logOutUser) {
            res.status(200).json({"message":"Successfully Logged Out"});
        }
    } catch (error) {
        res.status(404).json({"message":"Error"});
    }

   
}


module.exports = { Authenticate, RefreshToken, Logout}
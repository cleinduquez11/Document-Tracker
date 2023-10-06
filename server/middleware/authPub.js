require('dotenv').config()

const _ = require('lodash');
const User = require('../models/userModel');
const json = require('json')

const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_ACCESS_TOKEN;


function AuthStorage(req, res, next) {
    const {authToken } = req.query;
   


// User.where({accessToken: authToken}).then((u)=> {
//     let uSer = _.find(u, (user)=>{
//       if(authToken==user.token){
        
//        return u
//       }
//     });

//     if (!uSer) {

//         res.status(401).json("You are not Authenticated");
//     }
    // else {
    //    const accessToken =  jwt.sign({
    //         username: uSer.username,
    //         password: uSer.password
    //     },
    //     secret_key
    
    //     )

    // const token = authToken.split(" ")[1];
if (!authToken) {
    return res.status(403).json("You Are not Authenticated");
}
    jwt.verify(authToken, secret_key, (err,User)=>{
            if(err){
                return res.status(403).json("Token is not Valid");
            }
            else {
               
                req.User = User
                next();
            }
    })
            // next();
        //  res.status(200).json({"message": "You are now Authenticated",uSer, "Access Token" : accessToken});
        
    // }

    
// res.sendFile(path.join(__dirname+'/Public/upload.html'));
// })

}

module.exports = {AuthStorage}
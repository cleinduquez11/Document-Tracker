require('dotenv').config()
const json = require('json')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const secret_key = process.env.SECRET_ACCESS_TOKEN;

const Users = [
    {
        username: "Clein",
        password: "0427"
    },
    {
        username: "Winslee",
        password: "0427"
    },

]
function Authenticate(req, res) {
    const {user, pass } = req.body;
    let uSer = _.find(Users, (u)=>{
      if(u.username == user && u.password == pass){
        
       return u
      }
    });

    if (!uSer) {

        res.status(401).json("You are not Authenticated");
    }
    else {
       const accessToken =  jwt.sign({
            username: uSer.username,
            password: uSer.password
        },
        secret_key
    
        )

        res.status(200).json({"message": "You are now Authenticated",uSer, "Access Token" : accessToken});
    }

    
// res.sendFile(path.join(__dirname+'/Public/upload.html'));

}


module.exports = { Authenticate}
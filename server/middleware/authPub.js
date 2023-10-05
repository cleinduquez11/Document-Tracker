const _ = require('lodash')

function AuthStorage(req, res, next) {
    const {authToken } = req.query;
   
const Users = [
    {
        username: "Clein",
        password: "0427",
        token: "123"
    },
    {
        username: "Winslee",
        password: "0427",
        token: "123"
    },

]
    let uSer = _.find(Users, (u)=>{
      if(authToken===u.token){
        
       return u
      }
    });

    if (!uSer) {

        res.status(401).json("You are not Authenticated");
    }
    else {
    //    const accessToken =  jwt.sign({
    //         username: uSer.username,
    //         password: uSer.password
    //     },
    //     secret_key
    
    //     )
            next();
        //  res.status(200).json({"message": "You are now Authenticated",uSer, "Access Token" : accessToken});
        
    }

    
// res.sendFile(path.join(__dirname+'/Public/upload.html'));

}

module.exports = {AuthStorage}
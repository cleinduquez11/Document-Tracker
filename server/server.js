require("dotenv").config();
const express = require("express");
const cors  = require("cors");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
 const authRouter = require("./routes/authRouter");
 const docRouter = require("./routes/docRouter");
const path = require('path');
const corsOptions = require("./configs/corsOptions");
const Verify = require("./middleware/jwtVerify");
const { upload } = require("./middleware/upload");
const Validate = require("./middleware/validate");
const { Authenticate } = require("./controllers/authController");
const { AuthStorage } = require("./middleware/authPub");

const uri = process.env.ATLAS_URI;
const app = express();
const port = process.env.PORT || 5000;


app.use(cors(corsOptions));
app.use(express.json());


try {
    mongoose.connect(uri);
} catch (error) {
    console.log(error)
}

  
if (mongoose.ConnectionStates.connected) {
    console.log('MongoDB is Connected');
} else {
    try {
        mongoose.connect(uri);
    } catch (error) {
        console.log(error)
    }
    
    console.log('MongoDB is not Connected');
}

 app.use('/auth', authRouter);
 app.use('/docs' , Verify, docRouter);
 app.use( '/static', AuthStorage, express.static(__dirname + '/storage'));
// app.use('/api/users', Verify, usersRouter);

app.all('*',(req, res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,'Views','404.html'))
    }else if(req.accepts('json')){
        res.json({message:'404 Not Found'})
    }else{
        res.type('txt').send('404 Not Found')
    }
})


// console.log(path.join(__dirname, "storage", "1696229140310-Blue Minimalist Linktree Background (2).png" ));

app.listen(port,() => {
    console.log(`Server is Running on Port: ${port}`);
})
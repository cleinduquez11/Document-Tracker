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
const uri = process.env.ATLAS_URI;
const app = express();
const port = process.env.PORT || 5000;


app.use(cors(corsOptions));
app.use(express.json());


// try {
//     mongoose.connect(uri);
// } catch (error) {
//     console.log(error)
// }

  
// if (mongoose.ConnectionStates.connected) {
//     console.log('MongoDB is Connected');
// } else {
//     console.log('MongoDB is not Connected');
// }

 app.use('/auth', authRouter);
 app.use('/docs' , Verify,docRouter);

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


app.listen(port,() => {
    console.log(`Server is Running on Port: ${port}`);
})
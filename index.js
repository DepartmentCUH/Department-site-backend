const dotenv = require('dotenv').config();
const express = require('express');
const mongoose= require('mongoose');
var cors = require('cors')
const bodyParser= require('body-parser');
const morgan= require('morgan');
const AuthRoute = require('./backend/routes/auth')
const StudentRoute = require('./backend/routes/studentroutes');    
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.CONNECTION_KEY,{useNewUrlParser:true, useUnifiedTopology:true,useCreateIndex: true})
const db= mongoose.connection

db.on('error',(err)=>{

    console.log(err)
})
db.once('open', ()=>{
    console.log('Database Connection Established!')
})

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser()) 
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH,OPTIONS");
    next();
})
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/api', AuthRoute)
app.use('/api', StudentRoute)

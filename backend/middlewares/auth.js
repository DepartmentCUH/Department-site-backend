const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async(req,res,next)=>{
    try{
        const token= req.cookies.jwt;
        if(!token)
        return res.status(401).send("Access denied...No token provided...");
        const verifyUser= jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifyUser);
        next();
    }
    catch(error){
        res.status(401).send(error);
    }
}

module.exports= auth;
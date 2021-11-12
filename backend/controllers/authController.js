const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')


const register =async(req, res, next)=> {
   
    await User.findOne({email:req.body.email.toLowerCase()}).then(user => {
        if(user){
          return res.status(403).send({
              success:false,
             message:"User with this email already exists"
         })}}).catch(err => {res.status(500).send({
             success:false,
             message:"An Error Occured!"
         })})
    const {email, password, name, confirmPassword} = req.body;
    if(!email || !password || !name|| !confirmPassword){
     return res.status(403).send({
         success:false,
            message:"Please fill all the fields"})
    }
    
        
         if(req.body.password != req.body.confirmPassword){
            return res.status(400).send({
                success:false,
                message:"Passwords does not match"})
         }
        
   
       
 
     bcrypt.hash(req.body.password, 10, async function(err, hashedPass) {
     if(err){
         return res.status(500).send({
             error:err
         })
     }
    
     let user = new User ({
         name: req.body.name.toLowerCase(),
         email:req.body.email.toLowerCase(),
         password:hashedPass
     })
     const token = await user.generateAuthToken();
    
     res.cookie("jwt", token,{
         expires: new Date(Date.now()+1000000),
         httpOnly:true,
        //  secure:true
     });
      await user.save()
     .then(user => {
          res.status(201).send({
              token,
              success:true,
             message:'User Added Successfully'
         })
     })
     .catch(error => {
          res.status(500).send({
              status:false,
             message: 'An error Occcured!'
         })
     })
 })}
    


const login = async (req,res,next) => {
   

   await User.findOne({email:req.body.email.toLowerCase()})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.password, user.password , async function(err, result){

                if(err){
                   return res.staus(400).send({
                      
                       success:false,
                        error:err
                    })
                }
                if(result){
                    const token = await user.generateAuthToken();
                    console.log(`cookies from auth controller ${token}`);
                    res.cookie("jwt",token)
                    
                   
                   
                    return res.status(200).send({
                        token,
                        success:true,
                        message:"Login Successful"
                    })
                   
                }else{
                    return res.status(403).send({
                       
                        success:false,
                        message:"Password does not matched"
                    })
                }
            })
        }else{
            return res.status(404).send({
               
                success:false,
                message:"user not found"
            })
        }
    })
}

module.exports = {
    register,
    login
}
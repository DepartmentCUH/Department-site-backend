const mongoose = require('mongoose');
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken');
const userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
      
    },
    password:{
        type: String
    },
    confirmPassword:{
        type:String
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]


})

userSchema.methods.generateAuthToken = async function(){
    try{
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()},'verysecretvalue',{expiresIn: 50000});
        this.tokens = this.tokens.concat({token:token})
        console.log(token);
        await this.save();
        return token;
    }
    catch(error){
        res.send(error);
        console.log(error);
    }
}

const User= mongoose.model('User', userSchema)
module.exports = User
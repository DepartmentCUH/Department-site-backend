const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create student schema & model
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const StudentSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    rollno: {
        type: String,
        unique: true,
        required: [true, 'Roll No. is required']
    },
    // department:{
    //     type:String,
    //     required: [true, 'Department field is required']
    // },
    phone:{
        type:String,
        
    },
    
});


const Student = mongoose.model('student',StudentSchema);

module.exports = Student;
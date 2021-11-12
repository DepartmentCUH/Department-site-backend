const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.get('/students',function(req,res,next){
    Student.find({}).then(function(students){
        res.send(students);
    }).catch(next);
});

router.post('/students',function(req,res,next){
    Student.create(req.body).then(function(student){
        res.send(student);
    }).catch(next);
});
router.put('/students/:id',function(req,res,next){
    Student.findOneAndUpdate({_id: req.params.id},req.body).then(function(student){
        Student.findOne({_id: req.params.id}).then(function(student){
            res.send(student);
        });
    }).catch(next);
});

// delete a student in the database
router.delete('/students/:id',function(req,res,next){
    Student.findOneAndDelete({_id: req.params.id}).then(function(student){
        res.send(student);
    });
});

router.get('/students/:id',function(req,res,next){
    Student.findById({_id: req.params.id}).then(function(student){
        res.send(student);
    });
});
router.delete("/students", function(req, res) {
    Student.deleteMany({}, function(err) {
        if (err) {
            res.status(500).send({error: "Could not clead database..."});           
        } else {
            res.status(200).send({message: "All deleted succesfully..."});
        }
    });
});

module.exports = router;
const express = require('express');

const User = require('../../models/user/userAuth');
const adminAuth = require('../../middleware/adminAuth');
const router = new express.Router();

const { body, validationResult } = require('express-validator'); // It is middleware use to validate the date eg (email,mobile no. etc)


// retrive all users
router.get('/admin/users',adminAuth,async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users)
    }catch(e){
        res.status(500).send()
    }

});


// delete user
router.delete('/admin/user/:id',adminAuth,async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            res.status(404).send()
        }
        res.send({user});
    }catch(e){
        res.status(500).send()
    }

});

// delete ALL user
router.delete('/admin/allUser',async(req,res)=>{
    try{
        const user = await User.deleteMany();
        if (!user) {
            res.status(404).send()
        }
        res.send();
    }catch(e){
        res.status(500).send()
    }

});

//update user
router.patch('/admin/user/:id',[
    body('email').isEmail().withMessage('Invalid Email.'),
    body('mobileNumber').custom(value => {
      
        if (isNaN(value)) {
          throw new Error('Mobile number is not a number.')
        } else if (value.toString().length != 10) {
          throw new Error('Mobile number must be 10 digit.')
        } else {
          return true
        }
      })  
  ],adminAuth,async(req,res)=>{
    const errors = validationResult(req);
    try{

        if(req.body.username === ""){ // username is required
            return res.status(400).send();
        }

        const registeredEmail = await User.findOne({ email: req.body.email });
        const registeredUsername = await User.findOne({ username: req.body.username });

        if (registeredUsername) { // check username is avaiable or not
            if (registeredUsername._id.toString() !== req.params.id) {
                errors.errors.push({
                    value: req.body.username,
                    msg: `Username '${req.body.username}' is not available.`,
                    param: "username",
                    location:"body"
                });
            }
        }

        if (registeredEmail) { // check email exist or not
            if (registeredEmail._id.toString() !== req.params.id) {
                errors.errors.push({
                    value: req.body.email,
                    msg: "Email already in use!",
                    param: "email",
                    location:"body"
                });
            }
        }

        if(req.body.password !== "" && req.body.password?.length < 5){
            errors.errors.push({
                value: req.body.password,
                msg: "Password must be at least 5 chars long",
                param: "password",
                location:"body"
            });
        }

        if(!errors.isEmpty()){
            throw new Error();
        }

        const updates = Object.keys(req.body);
        const user = await User.findById(req.params.id);
    
        updates.forEach((value)=>{
            if(req.body[value] !== user[value]){
                user[value] = req.body[value];
            }
        })

        await user.save();
        res.send(user);
        
    }catch(e){
        res.status(400).send(errors);
    }
});


module.exports = router
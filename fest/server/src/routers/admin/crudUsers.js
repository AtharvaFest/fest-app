const express = require('express');

const User = require('../../models/user/userAuth');
const adminAuth = require('../../middleware/adminAuth');
const router = new express.Router();

// retrive all users
router.get('/users',async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users)
    }catch(e){
        res.status(500).send()
    }

});

// delete user
router.delete('/user/:id',async(req,res)=>{
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


module.exports = router
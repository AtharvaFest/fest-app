const express = require('express');

const User = require('../../models/user/userAuth');
const adminAuth = require('../../middleware/adminAuth');
const router = new express.Router();



router.post('/admin/login',async (req,res)=>{
    try{
        const user = await User.findByAdminCredentials(req.body.usernameOrEmail, req.body.password);
        const token = await user.generateAdminAuthToken();
    
        res.status(200).send({user,token});
    }catch(e){
        res.status(401).send({Error:"Unable to Login"});
    }

    
});


router.get('/admin/logout',adminAuth,async (req,res)=>{

    try{
        req.user.adminTokens = req.user.adminTokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
    
        res.send();
    } catch(e) {
        res.status(500).send()
    }
    
})



module.exports = router
const jwt = require('jsonwebtoken');
const User = require('../models/user/userAuth');


const adminAuth = async (req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded =  jwt.verify(token.toString(),process.env.TOKEN);
        const user =  await User.findOne({_id:decoded._id,'adminTokens.token':token});

        if(!user){
            throw new Error()
        }
    
        req.token = token
        req.user = user
    
        next();
    } catch(e) {
        res.status(401).send({error:'Please authenticate.'})
    }
   
}

module.exports = adminAuth

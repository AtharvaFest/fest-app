const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../../models/user/userAuth');
const auth = require('../../middleware/auth');
const sgMail = require('../../sendgrid/index')

const { body, validationResult } = require('express-validator'); // It is middleware use to validate the data eg (email,mobile no. etc)
const router = new express.Router();


router.post('/signup',[
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
  body('email').custom(value => {
    return User.findOne({ email: value }).then(user => {
      if (user) {
        return Promise.reject('E-mail already in use.')
      }
    })
  }),
  body('username').custom(value => {
      return User.findOne({ username: value }).then(user => {
        if (user) {
          return Promise.reject(`Username '${value}' is not available.`)
        }
      })
    }),
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

],async (req,res) => {
  const errors = validationResult(req);
  try{
      
      if(!errors.isEmpty()){
        throw new Error();
      }
      const {name,email,mobileNumber,username,password} = req.body;
      const token = jwt.sign({name,email,mobileNumber,username,password}, process.env.TOKEN,{expiresIn:'10m'});

      const msg = {
        to: req.body.email,
        from: process.env.FROM_EMAIL,
        subject: 'Account activation link',
        text: 'Click following link to get email account activation page',
        html: `<p>Click following link to get email account activation page</p>
               <p>This link will expire after 10 minutes and can be used only once</p>
                <br>
              <a href="http://127.0.0.1:3000/activate_email/${token}">click here</a>`,
      }
      sgMail.send(msg).then(()=>{
        res.status(201).send({msg:"The activation link has been sent successfully"});
      }).catch(()=>{
        res.status(400).send({msg:"Something went wrong! Retry after some time."});
      })
      
      
  } catch(e){
      res.status(400).send(errors);
  }

});

router.post('/activate_email',async (req,res) => {
    try{
        const {name,email,mobileNumber,username,password} =  jwt.verify(req.body.token.toString(),process.env.TOKEN);
        const user = await User({name,email,mobileNumber,username,password});
        await user.save();
        const token = await user.generateAuthToken();
        user.isAdmin = undefined;
        res.status(201).send({user,token});
    } catch(e){
        res.status(400).send({msg:"Something went wrong!"});
    }

});


router.post('/login' ,async (req,res) => {

    try{
        const user = await User.findByCredentials(req.body.usernameOrEmail, req.body.password);
        const token = await user.generateAuthToken()
        user.isAdmin = undefined;
        res.status(200).send({user,token})
    } catch(e){
        res.status(401).send({Error:"Unable to Login"});
    }

});


router.get('/logout',auth,async (req,res)=>{

    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch(e) {
        res.status(500).send()
    }
    
})


router.put('/forgot_password',async (req,res)=>{
  try{

    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).send({err:'This email does not exist.'});
    }
    const token = jwt.sign({_id:user._id}, process.env.TOKEN,{expiresIn:'10m'});
    const updateUser = await User.findByIdAndUpdate(user._id,{resetLink:token});
    if(!updateUser){
      return res.status(400).send({err:'Something went wrong'});
    }

    const msg = {
      to: req.body.email,
      from: process.env.FROM_EMAIL,
      subject: 'Reset Password',
      text: 'Click following link to reset password',
      html: `<p>Click following link to reset password</p>
            <p>This link will expire after 10 minutes and can be used only once</p>
              <br>
            <a href="http://127.0.0.1:3000/reset_password/${token}">click here</a>`,
    }

    sgMail.send(msg).then(()=>{
      res.status(201).send({msg:"Reset password link has been sent successfully"});
    }).catch(()=>{
      res.status(400).send({msg:"Something went wrong! Retry after some time."});
    })

  }catch(e){
    res.status(400).send()
  }
    
})

router.patch('/reset_password',[
    body('newPassword').isLength({ min: 5 }).withMessage('Password must be at least 5 chars long')
  ],async(req,res)=>{

  const errors = validationResult(req);
  try{
    
        if(!errors.isEmpty()){
          throw new Error();
        }
        
     jwt.verify(req.body.token.toString(),process.env.TOKEN, async function(error,decoded){
       if(error){
        return res.status(400).send({error:"expiredLink"});
       }

       const user = await User.findById(decoded._id);
       user.resetLink = "";
       user.password = req.body['newPassword'];
       
       await user.save();
 
       res.send({msg:"success"});
     })

     
  } catch(e){
      res.status(400).send(errors);
  }

})

module.exports = router
const express = require('express');

const User = require('../../models/user/userAuth');
const auth = require('../../middleware/auth');

const { body, validationResult } = require('express-validator'); // It is middleware use to validate the date eg (email,mobile no. etc)
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
      } else if (value.length != 10) {
        throw new Error('Mobile number must be 10 digit.')
      } else {
        return true
      }
    })
  
  ],async (req,res) => {
    const errors = validationResult(req);
    try{
        const user = new User(req.body);

        if(!errors.isEmpty()){
          throw new Error();
        }

        await user.save();
        const token = await user.generateAuthToken();
        user.isAdmin = undefined;
        res.status(201).send({user,token});
    } catch(e){
        res.status(400).send(errors);
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

// router.get('/test',auth,async (req,res)=> {
//     console.log(req.token,req.user.tokens);
//     res.send({});
// });

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

module.exports = router
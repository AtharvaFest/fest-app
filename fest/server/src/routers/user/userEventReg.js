const express = require('express');

const EventRegistration = require('../../models/admin/eventReg');
const Event = require('../../models/admin/event');
const auth = require('../../middleware/auth');
const sgMail = require('../../sendgrid/index');

const router = new express.Router();

router.post('/eventReg/register',auth,async (req,res) => {

    try{
        const events = req.body.events;
        
        const {name:user,username,email,mobileNumber} = req.user

        // Checking before register where registration is allowed or not
        // also check is user already register in event or not.
        for(let event of events){

            // is registration allowed check
            let eventExist = await Event.findOne({event:event});
            // console.log(typeof(event));
            console.log(!eventExist);
            const eventExistInRegistration = await EventRegistration.findOne({event});

            if(!eventExist) return res.status(400).send({error_message:'Something went wrong!'});

            if(eventExist.allowRegistration === false){
                return res.status(400).send({error_message:`Registration is full for ${event}. Try other events`})
            }

            const today = new Date().getTime();
            const eventDate = new Date(eventExist.date).getTime();
            
            if(today >= eventDate){
                eventExist.allowRegistration = false;
                await eventExist.save();
                return res.status(400).send({error_message:`Registration is full for the ${event}. Try other events`});
            }

            if(eventExistInRegistration) {
                // Is user registered check
                for(let existingUser of eventExistInRegistration.users){
                    if(existingUser.user.username === username){
                        return res.status(400).send({error_message:`You have already registered for the ${event} event.\n Retry registration with other events`});
                    }
                };
            }

        }

        
        // //Registration is done over here.
        console.log(events);
        for(let event of events){

            let eventExistInRegistration = await EventRegistration.findOne({event});
            let eventExist = await Event.findOne({event});
            let singleEventFee = ((eventExist.discount/100) * eventExist.fee);
            const discountedFee = eventExist.fee - singleEventFee;

            const userDetails = {
                user,
                username,
                email,
                mobileNumber,
                discountedFee
            }
        
            if(eventExistInRegistration){
                eventExistInRegistration.users.push({user:userDetails});
                await eventExistInRegistration.save();
            }else{
                const registerUser = await new EventRegistration({
                    event,
                    users:[{user:userDetails}]
                })
                await registerUser.save();
            }
        }

        const msg = {
            to: req.user.email,
            from: process.env.FROM_EMAIL,
            subject: 'Event Registration',
            html: `<p>You have successfully registered for all the following events</p>
                    <br/>
                    <strong> ${events} </strong>
                    `,
        }

        sgMail.send(msg).then(()=>{
            return res.status(201).send({info_message:"You have successfully registered"});
        }).catch((error)=>{
            console.log(error)
            return res.status(400).send({error_message:"Something went wrong! Retry after some time."});
        })
    }catch(e){
        return res.status(400).send({error_message:"Something went wrong! Retry after some time."});
    }
    
})

router.get('/eventReg/read',auth,async (req,res) => {
    try{
        let allEvent = await Event.find({});
        allEvent.forEach((event) => {
            event.image = undefined;
        })
        res.send(allEvent);
    }catch(e){
        res.status(500).send()
    }
    
});


module.exports = router;
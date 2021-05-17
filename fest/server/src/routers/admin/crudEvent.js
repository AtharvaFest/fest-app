const express = require('express');

const Event = require('../../models/admin/event');
const sharp = require('sharp')

const { body, validationResult } = require('express-validator'); // It is middleware use to validate the data eg (event,prize. etc)
const router = new express.Router();



router.post('/admin/event/create',[
    body('event').not().isEmpty(), // if it return true then values are valid. therefore we are inverting value. 
    body('date').not().isEmpty(),
    body('fee').not().isEmpty(),
    body('prize').not().isEmpty(),
    body('discount').not().isEmpty(),
    body('fee').custom(value => {
        if (isNaN(value)) {
          throw new Error('Value is must be number.')
        } else {
          return true
        }
    }),
    body('prize').custom(value => {
        if (isNaN(value)) {
          throw new Error('Value is must be number.')
        } else {
          return true
        }
    }),
    body('discount').custom(value => {
        if (isNaN(value)) {
          throw new Error('Value is must be number.')
        } else {
          return true
        }
    }),
],async (req,res) => {
    const errors = validationResult(req);
    try{
        if(!errors.isEmpty()){
            throw new Error();
        }
        base64arr = req.body.image.split(',')
        var b64string = base64arr[1]
        const buf = Buffer.from(b64string, 'base64')
        
        const addEvent = await Event({...req.body,image:buf});
        await addEvent.save();
        const allEvent = await Event.find({});
        res.send(allEvent)
    }catch(e){
        res.status(400).send(errors);
    }
    
});

router.get('/admin/event/read',async (req,res) => {
    try{
        const allEvent = await Event.find({});
        res.send(allEvent);
    }catch(e){
        res.status(500).send()
    }
    
});



router.patch('/admin/event/update/:id',async (req,res) => {
    try{
        const event = await Event.findByIdAndUpdate(req.params.id,req.body);
        event.save();
        res.send();
    }catch(e){
        res.status(500).send()
    }
    
});

router.delete('/admin/event/delete/:id',async (req,res) => {
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) {
            res.status(404).send()
        }
        res.send({event});
    }catch(e){
        res.status(500).send()
    }
    
});



module.exports = router;
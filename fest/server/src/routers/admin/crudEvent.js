const express = require('express');

const Event = require('../../models/admin/event');

const router = new express.Router();


router.post('/event/create',async (req,res) => {
    try{
        const event = await Event(req.body);
        event.save();
        res.send();
    }catch(e){
        res.status(500).send()
    }
    
});

router.get('/event/read',async (req,res) => {
    try{
        const event = await Event.find({});
        res.send(event);
    }catch(e){
        res.status(500).send()
    }
    
});


router.patch('/event/update/:id',async (req,res) => {
    try{
        const event = await Event.findByIdAndUpdate(req.params.id,req.body);
        console.log(event);
        event.save();
        res.send();
    }catch(e){
        res.status(500).send()
    }
    
});

router.delete('/event/delete/:id',async (req,res) => {
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
const express = require("express");

const Notice = require('../../models/admin/notice');

const router = new express.Router();

router.get('/admin/getNotice',async (req,res) => {
    try{
        const notices = await Notice.find();
        res.send(notices);
    }catch(e){
        res.send({msgErr:"something went wrong"})
    }
    
})

router.post('/admin/addNotice',async (req,res) => {
    try{
        const notice = await Notice(req.body);
        await notice.save();

        const notices = await Notice.find();
        res.send(notices);
    }catch(e){
        res.send({msgErr:"something went wrong"})
    }
    
})

router.delete('/admin/deleteNotice/:id',async (req,res) => {
    try{
        const notice = await Notice.findByIdAndDelete(req.params.id);
        if(!notice)
        {
            return res.send({msgErr:"something went wrong"})
        }
        const notices = await Notice.find();
        res.send(notices);
    }catch(e){
        res.send({msgErr:"something went wrong"})
    }
    
})



module.exports = router;
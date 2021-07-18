const express = require('express');

const EventRegistration = require('../../models/admin/eventReg');
const Event = require('../../models/admin/event');

const router = new express.Router();

router.get('/admin/eventReg/read',async (req,res) => {

    const eventRegData = await EventRegistration.find({});
    res.send(eventRegData);

})


module.exports = router;
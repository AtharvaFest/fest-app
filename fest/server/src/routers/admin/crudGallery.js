const express = require('express');
const sharp = require('sharp');

const Gallery = require('../../models/admin/gallery');
const adminAuth = require('../../middleware/adminAuth');


const router = new express.Router();

router.get('/admin/gallery/read',async (req,res) => {

    try {
        const photos = await Gallery.find();
        res.send(photos)
    } catch (error) {
        res.status(500).send()
    }

})


router.post('/admin/gallery/add',async (req,res) => {

    try {

        const buffer = await sharp(req.files.photo.data).png().toBuffer()
        const gallery = await Gallery();
        gallery.photo = buffer;

        await gallery.save();
        const photos = await Gallery.find();

        res.send(photos)

    } catch (error) {
        res.status(500).send()
    }

})


module.exports = router;
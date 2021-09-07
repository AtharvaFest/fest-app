const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const Gallery = require('../../models/admin/gallery');
const adminAuth = require('../../middleware/adminAuth');

const router = new express.Router();

const reqPath = path.join(__dirname, '../../../');
const DIR = reqPath + "public/photos/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      let today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
      const dateTime = date+'_'+time;
      cb(null, dateTime + '__' + fileName)
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2000000
  },
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
}).single('photo');

router.get('/admin/gallery/read',adminAuth,async (req,res) => {

    try {
        const photos = await Gallery.find();
        res.send(photos)
    } catch (error) {
        res.status(500).send()
    }

})



router.post('/admin/gallery/add',adminAuth,upload,async (req,res) => {

    try {
       
        const gallery = await Gallery({name:req.file.filename});
        await gallery.save();

        const photos = await Gallery.find();
        res.send(photos)
        

    } catch (error) {
        res.status(500).send()
    }

},(error, req, res, next) => {
  if (error.message === 'File too large') {
    res.status(400).send({error: 'File too large. The file must be below 2MB!'});
  }
  
  if (error.message === 'Only .png, .jpg and .jpeg format allowed!') {
    res.status(400).send({error: 'File not supported. Only .png, .jpg and .jpeg format allowed!'});
  }
}
);

router.delete('/admin/gallery/delete/:imagename',adminAuth,async (req,res) => {
  
  try{
    fs.unlinkSync(DIR+req.params.imagename);
    await Gallery.findOneAndDelete({name:req.params.imagename});
    const photos = await Gallery.find();
    res.send(photos)
  }catch(err){
    return res.status(400).send();
  }

})

module.exports = router;


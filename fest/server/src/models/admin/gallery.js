const mongoose = require('mongoose')


const gallerySchema = mongoose.Schema({
	name:{
		type:String
	},
	photo:{
		type:Buffer
	}
});


const gallery = mongoose.model('gallery', gallerySchema)


module.exports = gallery
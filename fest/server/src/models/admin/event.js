const mongoose = require('mongoose')


const eventSchema = mongoose.Schema({
	event: {
		type:String,
		required:true

	},
	date:{
		type: Date,
		ref:'DateEvent'
	},
	price: {
		type: Number,
		required:true
	},
	discount: {
		type: Number,
		default: 0
	}
});


const event = mongoose.model('event', eventSchema)


module.exports = event
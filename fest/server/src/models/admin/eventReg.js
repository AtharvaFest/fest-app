const mongoose = require('mongoose')

const eventRegisteredSchema = mongoose.Schema({
	event: {
		type:String,
		ref:'event'
	},
    users: {
        type:Array,
        default: []
	}
})

//Logic of this Schema
// --> we are creating single object for single event,
// and storing all the users registered in that event in that single object only


const eventRegistered = mongoose.model('eventRegistered',eventRegisteredSchema)


module.exports = eventRegistered
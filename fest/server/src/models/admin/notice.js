const mongoose = require('mongoose')


const noticeSchema = mongoose.Schema({
	heading:{
		type:String
	},
	description:{
		type:String
	}
});


const notice = mongoose.model('notice', noticeSchema)


module.exports = notice
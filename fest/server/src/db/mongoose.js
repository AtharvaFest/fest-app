const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_PATH,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});
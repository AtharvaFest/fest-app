const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    adminTokens:[{
        token:{
            type:String
        }
    }]

});

//Removing password and token from user data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.adminTokens;

    return userObject
}

//Creating token for maintaining user session
userSchema.methods.generateAdminAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, 'python');

    user.adminTokens = user.adminTokens.concat({ token });
    await user.save();

    return token;

}

//Creating token for maintaining user session
userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user._id.toString()}, 'python');

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;

}

//Checking credentials of admin before login
userSchema.statics.findByAdminCredentials = async (usernameOrEmail,password) => {
    let user;
    user = await User.findOne({email:usernameOrEmail});

    if(!user){
        user = await User.findOne({username:usernameOrEmail});
    }

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    const isAdmin = user.isAdmin;

    if(!isAdmin){
        throw new Error('Unable to login');
    }

    return user

}


//Checking credentials of user before login
userSchema.statics.findByCredentials = async (usernameOrEmail,password) => {
    let user;
    user = await User.findOne({email:usernameOrEmail});


    if(!user){
        user = await User.findOne({username:usernameOrEmail});
    }

    if(!user){
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error('Unable to login');
    }

    return user

}

// Plain password is hashed before saving
userSchema.pre('save',async function(next) {
    const user = this;

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }

    next()

});

const User = mongoose.model('User',userSchema);

module.exports = User
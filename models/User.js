const mongoose = require('mongoose');
const brcypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: [4, "Username length must be minimum of 4"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/, 
                "Please Enter Valid Email"]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Password length must be minimum of 6"],
        select: false
    },
    register_date: {
        type: Date,
        default: Date.now()
    },
    resetToken: String,
    resetExpire: Date
});

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        console.log(`PRESAVE, password isn't modified`);
        return next()
    }
    console.log(`PRESAVE, passsword is modified`);
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
    console.log('Password Hashed Successfully');
    next();
})

UserSchema.methods.generateToken = async function(){
    console.log('generating token');
    return jwt.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: 3600 }
    )
}

UserSchema.methods.comparePasswords = async function(password){
    return brcypt.compare(password, this.password)
}

UserSchema.methods.generateResetToken = function(){
    const resetToken = crypto.randomBytes(10).toString('hex');
    this.resetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetExpire = Date.now() + 10 * (60 * 1000);
    return resetToken
}

module.exports = User = mongoose.model('user', UserSchema);
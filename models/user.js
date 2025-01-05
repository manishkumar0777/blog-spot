const {Schema, model} = require('mongoose');
const {createHmac, randomBytes} = require("crypto")

const userSchema = new Schema({
    fullName : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
        unique : true,
    },
    salt : {
        type : String,
    },
    password : {
        type : String,
        require : true,
    },

    profileImage : {
        type : String,
        default : "../public/images/defaultprofile.png"
    },
    role : {
        type : String,
        enum : ["USER" , "ADMIN"],
        default : "USER",
    }

}, {timestamps : true});

//hashing the password before saving
userSchema.pre('save' , function(next){
    const user = this;
    if(!user.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256" , salt)
    .update(user.password)
    .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();
});

//mathching password for the login 
userSchema.static('matchPassword' , async function (email, password) {
    const user = await this.findOne({email});
    if(!user) return console.log("usernotfound");

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvidedHash = createHmac('sha256' , salt)
    .update(password)
    .digest("hex")

    if(hashedPassword !== userProvidedHash) return console.log("Incorrect Pass")

    return hashedPassword === userProvidedHash;
})

const User = model('user', userSchema);

module.exports = User;

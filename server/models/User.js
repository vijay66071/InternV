const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    dateOfBirth: {
        type: Date
    },
    pic: {
        public_id:{
            type: String,
        },
        url:{
            type: String,
        }
    }
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel
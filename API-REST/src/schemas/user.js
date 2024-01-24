const mongoose = require('mongoose')

let userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, //elimina espacio
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,

    },
    hash: {
        type: String
    }
}
    , {
        timestamps: true, //da formato fecha
        versionKey: false,
    })

const User = mongoose.model('User', userModel);

 module.exports = User;
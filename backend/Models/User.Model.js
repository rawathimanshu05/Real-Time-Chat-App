const mongoose = require('mongoose')

const userschema = new mongoose.Schema({
    username:{
        type: String,
        required : [true, 'Username is required'],
        unique : true,
    },
    status:{
        type : String,
        default : 'offline'
    }
}, {timestamps : true});

const user = mongoose.model('username_db',userschema)
module.exports = user
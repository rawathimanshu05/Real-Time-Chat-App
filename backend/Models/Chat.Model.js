const mongoose = require('mongoose')

const chatschema = new mongoose.Schema({
sender: {
    type: String,
    required: true
  },
  receiver: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

const chat = mongoose.model('chat_table',chatschema)
module.exports = chat


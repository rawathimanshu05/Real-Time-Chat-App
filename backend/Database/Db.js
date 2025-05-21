const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

mongoose.connection.on('connected',()=>{
    console.log('Database is connected')
})
mongoose.connection.on('error',()=>{
    console.log('Database is not connected')
})
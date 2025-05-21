const express = require('express')
const {userlogin} = require('../Controller/Chat.Controller')

const router = express.Router()

router.post('/login',userlogin)


module.exports = router 
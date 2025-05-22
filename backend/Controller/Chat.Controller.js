const express = require('express');

const usermodel = require('../Models/User.Model')

// const chatmodel = require('../Models/Chat.Model')

const userlogin = async(req,res) =>{
    try{
        const user = await usermodel.findOne({username : req.body.username})
        if(user){
            return res.status(400).send({success: false, message:'username already exits create new one'})
        }

        const data = new usermodel(req.body)
        await data.save()
        return res.status(200).send({success: true, message:'sucessfully login in chat app'})
    } catch(error){
        if(error.errors && error.errors.username)
            return res.status(500).send({success:false,message:error.errors.username.message})
        else 
        return res.status(500).send({success: false,message:'Internal server error'})
    }
}

// const userchat = async(req,res) =>{
//     try{
//        const { sender, receiver, content } = req.body;

//        if (!sender || !receiver || !content) {
//          return res.status(400).json({ msg: 'All fields are required' });
//       }

//       const message = await chatmodel.create({ sender, receiver, content });
//         res.status(200).json({ msg: 'Message saved', message });

//     } catch(error){
//        return res.status(500).send({success: false,message:'Internal server error'})
//     }
// }


module.exports = {
    userlogin
}

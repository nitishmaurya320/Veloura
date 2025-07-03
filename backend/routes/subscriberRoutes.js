const express = require('express');
const Subscriber = require('../models/subscriber');



const router = express.Router();

// @route POST /api/subscribe

router.post("/subscribe",async (req,res)=>{
    const {email}=req.body

    if(!email){
        return res.status(404).json({message:"no email found"})
    }
    try {
            //check if email is already subscribed

            let subscriber=await Subscriber.findOne({email})
            if(subscriber){
              return  res.status(400).json({message: "Email is already subscribed"})
            }
            //create a new subscirber

            subscriber=new Subscriber({email})
            await subscriber.save()
            res.status(201).json({message:"Successfuly subscribed to the news letter"})
        } catch (error) {
            console.log(error)
            res.status(500).json({message:"server error"})
            
        }
})

module.exports=router
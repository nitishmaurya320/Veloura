const express=require("express")
const Order=require("../models/order")
const {protect}=require("../middleware/authMiddleware")
const order = require("../models/order")

const router=express.Router()


//@route GET /api/orders/my-orders

router.get("/my-orders",protect,async (req,res)=>{
    try{
        //find orders for the authenticated user
        const orders=await Order.find({user:req.user._id}).sort({
            createdAt:-1,

        })
        res.json(orders)
    }
    catch(err){
        console.log(err)
            res.status(500).json({message:"Server error"})

    }
})

//@route GET /api/orders/:id


router.get("/:id",protect,async (req,res)=>{
    try {
        const order=await Order.findById(req.params.id).populate(
            "user",
            "name email"
        )

        if(!order){
            return res.status(404).json({message:"Order not found"})
        }

        //return full order details

        res.json(order)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
        
    }
}  )

module.exports=router
const express=require("express")
const Product=require("../models/product")
const {protect,admin} =require("../middleware/authMiddleware")

const router=express.Router()

//@route GET api/admin/products
//Get all products

router.get("/",protect,admin,async (req,res)=>{
    try {
        const products=await Product.find({});
        if(!products){
            return res.status(404).json({message:"Products not found"})
        }
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server error"})
        
    }

})

module.exports=router

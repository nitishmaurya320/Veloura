const express=require("express")
const User=require("../models/user")
const {protect,admin}=require("../middleware/authMiddleware")
const { findById, findOne } = require("../models/product")
const router=express.Router()

//@route GET /api/admin/users

router.get("/",protect,admin,async (req,res)=>{
    try {
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

//@route POST /api/admin/users 

router.post("/",protect,admin,async (req,res)=>{
    const {name,email,password,role}=req.body

    try {
        let user=await User.findOne({email})
        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        user=new User({
            name,
            email,
            password,
            role:role?.toLowerCase()||"customer"
            })
            await user.save()
            res.status(201).json({message:"User created successfully",user})
    } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
    }

})

//@route PUT /api/admin/users/:id

router.put("/:id",protect,admin,async (req,res)=>{
    const {name,email,role}=req.body

    try {
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        user.name=name||user.name
        user.email=email||user.email
        user.role=role||user.role

        await user.save()
        res.json({message:"User updated successfully",user})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
})

//@route DELETE /api/admin/users/:id

router.delete("/:id",protect,admin,async (req,res)=>{
    

    try {
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        await user.deleteOne()
        res.json("User deleted successfully")
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Server error"})
        
    }
})

module.exports=router

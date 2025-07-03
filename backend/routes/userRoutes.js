const express=require("express")
const User=require("../models/user")
const jwt= require("jsonwebtoken")
const {protect}=require("../middleware/authMiddleware")

const router=express.Router()

//register a new user
//access public

router.post("/register",async (req,res)=>{
    const {name,email,password}=req.body
    try{
        //registration logic

        let user=await User.findOne({email})
        if(user) return res.status(400).json({message:"user Already exists"})
        
        
            user=new User({name,email,password})
            await user.save();
            res.json({user})

            res.send("user created successfuly")
            
          
                
        
    }
    catch(error)
    {
        console.log(error)
    }
})


//@route api/users/login
//access public

router.post("/login",async (req,res)=>{
    const {email,password}=req.body
    try{
        
        let user=await User.findOne({email})
        if(!user) return res.send("user not exist")
        const ismatch=await user.matchPassword(password)    
        if(!ismatch)
            return res.status(400).json({message:"invalid credentials"})
          //jwebtoken payload
            const payload ={user: {id:user._id,role:user.role}}  
           
            jwt.sign(payload,
                process.env.JWT_SECRET,
                {expiresIn:"40h"},
                (err,token)=>{
                    if(err) throw err;      
                    res.status(201).json({user,
                        token
                    })
                })

            
    }
    catch(err){
        console.log(err)
        res.status(500).send("server error")
        

    }
})


//@route GET api/users/profile

router.get("/profile",protect, async (req,res)=>{
        res.json(req.user) ;
})

module.exports=router
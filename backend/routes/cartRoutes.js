const express=require("express")
const Cart=require("../models/cart")
const Product=require("../models/product")
const {protect}=require("../middleware/authMiddleware")
const user = require("../models/user")

const router=express.Router()

//@route POST api/cart

const getCart= async (userId,guestId)=>{
    if(userId){
        return await Cart.findOne({user:userId})
    }
    else if(guestId){
        return await Cart.findOne({guestId})
    }
    return null;
}

router.post("/",async (req,res)=>{
    let {productId,quantity,size,color,guestId,userId}=req.body 
    quantity=Number(quantity)
    try{
        const product=await Product.findById(productId)
        if(!product) return res.send(404).json({message: "Product not found"})

            //determine if user is  logged in or guest
            let cart= await getCart(userId,guestId)

            //if cart exist update it

            if(cart){
               const productIndex = cart.products.findIndex((p) => {
                        return (
                            p.productId.toString() === productId &&
                            p.size === size &&
                            p.color === color
                        );
                    })
                if(productIndex>-1){
                    //if products already exists update the quanity

                    cart.products[productIndex].quantity+=quantity

                }
                else{
                    cart.products.push({
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        size,
                        brand:product.brand,
                        color,
                        quantity,

                    })
                }
                //recalculate total price
                cart.totalPrice = cart.products.reduce((acc, item) => {
                    return acc + item.price * item.quantity;
                }, 0)
             await cart.save()
             return res.status(200).json(cart)
            }
            else{
                //create a new cart for guest user
                const newCart=await Cart.create({
                    user:userId?userId:undefined,
                    guestId:guestId?guestId:"guest_"+new Date().getTime(),
                    products:[{
                        productId,
                        name:product.name,
                        image:product.images[0].url,
                        price:product.price,
                        size,
                        brand:product.brand,
                        color,
                        quantity,




                    }],
                    totalPrice:product.price*quantity,

                })
                return res.status(201).json(newCart)
            }

            
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"server error"})
    }
})

//@routes 

router.put("/",async (req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body
    try{
        let cart=await getCart(userId,guestId)
        if(!cart) return res.status(404).json({message: "Cart not found"})

            const productIndex=cart.products.findIndex(
                (p)=> p.productId.toString()===productId&&p.size===size&&p.color===color
            )

            if(productIndex>-1){
                //update quantity
                if(quantity>0){
                    cart.products[productIndex].quantity=quantity
                }
                else{
                    cart.products.splice(productIndex,1)//removes product if quinaity is 0
                }
                cart.totalPrice=cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0)   
                await cart.save();
                return res.status(200).json(cart)
            }
            else{
                res.status(404).json({message:"product not found in cart    "})
            }
    }
    catch(err){
            console.log(err)
            res.status(500).json({message:"Server error"})
    }

        
})

//@route    DELETE/api/cart

router.delete("/",async (req,res)=>{
        const {productId,size,color,guestId,userId}=req.body
        try{
            let cart=await getCart(userId,guestId)
            if(!cart) return res.status(404).json({message:"cart not found"})

             const productIndex=cart.products.findIndex(
                (p)=> p.productId.toString()===productId&&p.size===size&&p.color===color
            )   

            if(productIndex>-1){
                cart.products.splice(productIndex,1)

                cart.totalPrice=cart.products.reduce((acc,item)=> acc+item.price*item.quantity,0)
                await cart.save()
                res.status(200).json(cart)

            }
            else{
                return res.status(404).json({message:"product not found in cart"})
            }
        }
        catch(err){
            console.log(err)
            res.status(500).json({message:"server error"})
        }
})
//@routes GET /api/cart

 router.get("/",async (req,res)=>{
    const {userId,guestId}=req.query

    try{
        const cart=await getCart(userId,guestId);
        if(cart){
            res.json(cart)

        }
        else{
            res.status(404).json({message:"Cart not found"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"server error"})
        

    }
 })

 //@route POST /api/cart/merge

 router.post("/merge",protect,async (req,res)=>{
        const{guestId}=req.body
        try{
            //find guest cart and user cart
            const guestCart=await Cart.findOne({guestId});
            const userCart=await Cart.findOne({user: req.user._id})

            if(guestCart){
                    if(guestCart.products.length===0){
                        return res.status(400).json({message:"guest cart is empty"})
                    }
            

                if(userCart){
                    guestCart.products.forEach((guestItem)=>{
                        const productIndex=userCart.products.findIndex((item=>item.productId.toString()===guestItem.productId.toString()&&
                        item.size==guestItem.size&&
                        item.color===guestItem.color))
                        

                    if(productIndex>-1){
                        userCart.products[productIndex].quantity+=guestItem.quantity;


                    }else{
                        userCart.products.push(guestItem);
                        
                    }
                    })
                
                        userCart.totalPrice=userCart.products.reduce((acc,item) => acc+item.price*item.quantity,0)
                        await userCart.save();

                        //remove guest cart aftere merging

                        try{
                            await Cart.findOneAndDelete({guestId});

                        }
                        catch(err){
                            console.err(err)
                        

                        }
                        res.status(200).json(userCart)
                }
                else{
                //if user has no existing cart ,assign the guest cart to user
                guestCart.user=req.user._id;
                guestCart.guestId=undefined;
                await guestCart.save()
                res.status(200).json(guestCart)
            }
        }else{
            if(userCart){
                return res.status(200).json(userCart)
            }   
            res.status(404).json({message:"Guest cart not found"})
        }
    }
        catch(err){
            console.log(err)
            res.status(500).json({message:"server error"})

        }
 })


module.exports=router
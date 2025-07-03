const mongoose=require("mongoose");
const connectDB=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Mongodb connected successfuly")
    }
    catch(err){
        console.log("Mongodb connection failed",err)
    }
}

module.exports=connectDB;
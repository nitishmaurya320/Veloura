const express=require("express")
const multer=require("multer")
const cloudinary=require("cloudinary").v2
const streamifier=require("streamifier")


require("dotenv").config()
const router=express.Router()

//cloudinary configuration

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

//MULTER SETUP
const storage=multer.memoryStorage()
const upload=multer({storage})

router.post("/",upload.single("image"),async (req,res)=>{
    try {


        if(!req.file){
           console.log("❌ No file found in request");
            return res.status(400).json({message:"No file uploaded"})
        }
         console.log("📦 File received:", req.file.originalname);

        //function to upload file to cloudinary

        const streamUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream( { resource_type: "auto" },(error, result) => {
      if (error) {
        console.error("Cloudinary Upload Error:", error);
        reject(error);
      } else {
        console.log("Cloudinary Upload Success:", result.secure_url);
        resolve(result);
      }
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


        //call the stream upload funtion
        const result=await streamUpload(req.file.buffer)

            //respond with the upload image url
            res.json({imageUrl:result.secure_url})
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
     return res.status(500).json({ message: "server error", error: error.message });
        
    }
})

module.exports=router

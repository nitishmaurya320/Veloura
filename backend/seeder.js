const mongoose=require("mongoose")
const dotenv=require("dotenv")
const Product=require("./models/product")
const User=require("./models/user")
const products =require("./data/products")

dotenv.config()

//connect to mongodb

mongoose.connect(process.env.MONGO_URI)

//function to seed data

const seedData=async ()=>{
    try{
        await Product.deleteMany();
        await User.deleteMany()


        const createdUser=await User.create({
            name:"Admin user",
            email:"admin@example.com",
            password:"123456",
            role:"admin"
        })
        const userID=createdUser._id
        const sampleProducts=products.map((product)=>{
            return {...product,user:userID}
        })

        await Product.insertMany(sampleProducts)
        console.log("product data seeded successfully")
        process.exit()

    }
    catch(err){
        console.log("error seeding the data ",err)
        process.exit(1)
    }
}

seedData()
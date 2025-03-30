import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected',()=>{
        console.log("✅ Database Connected Successfully");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/BgXtract`)
}

export default connectDB
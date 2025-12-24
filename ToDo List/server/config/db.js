import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

// Configuration database
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        } catch (err) {
            console.error(err);
        }
}

export default connectDB
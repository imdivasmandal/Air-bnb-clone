import mongoose from "mongoose";

const connectDB = async() => {
    try {
        const instance = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        console.log(`Mongo connected to DB host ${instance.connection.host}`);
    } catch (error) {
        console.log("mongo connection failed", error);
        process.exit(1);
    }
}

export default connectDB;
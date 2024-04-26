import mongoose from "mongoose";

const database = async() => {
    try {
        const connect = await mongoose.connect(process.env.mongo_url);
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(`Error in mongodb conn ${error.message}`)
    }
}

export default database;

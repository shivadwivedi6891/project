import mongoose from "mongoose";
import { DB } from "../constants.js";

const connectDB = async () =>{
    try{
const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB}`)


console.log(`MONGODB connected ${connectionInstance.connection.host}`);

    }
    catch(error){
        console.log("error",error);
        throw error
        process.exit(1)
    }
}

export default connectDB;


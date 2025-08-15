import mongoose from "mongoose";
// CORRECT
import { dbname } from "../constant.js";

const mongoconnect = async()=>{
try {
   const mongooseinstance =  await mongoose.connect(`${process.env.MONGODB}/${dbname}`)
    console.log("connected",mongooseinstance.connection.host);
    
} catch (error) {
    console.error("not connected",error);
    process.exit(1);
    
}
}

export default mongoconnect;
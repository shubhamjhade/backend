import dotenv from "dotenv";
import mongoconnect from "./src/db/index.js";
import express from "express";

const app = express();


// Load env variables
dotenv.config({
    path: "./.env",
});

// Connect to DB
mongoconnect()
.then(()=>{
app.listen(process.env.PORT || 8000,()=>{
    console.log("server running");
    
})
})
.catch((error)=>{
    console.log(error);  
})

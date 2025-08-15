import dotenv from "dotenv";
import mongoconnect from "./src/db/index.js";

// Load env variables
dotenv.config({
    path: "./.env",
});

// Connect to DB
mongoconnect();

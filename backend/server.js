import express from 'express';
import authRoutes from "./routes/auth.route.js"
import dotenv from "dotenv";
import { ENV_VAR } from './config/envVars.js';
import { connectDB } from './config/db.js';

const app = express();
const port = ENV_VAR.PORT;

app.use(express.json());
app.use("/api/v1/auth", authRoutes)

app.listen(port, () => {
    console.log("server started at " + port);  
    connectDB();
})

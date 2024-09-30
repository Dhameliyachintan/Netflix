// const express = require('express');
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"

dotenv.config();

const app = express();

console.log("mongo_URI:", process.env.MONGO_urI);

app.use("/api/v1/auth", authRoutes)


app.listen(5001, () => {
    console.log("server started at http://localhost:5001");
    
});

const express = require("express");
const cors= require("cors");
const dotenv=require("dotenv");

dotenv.config();
require("./config/db");

const app=express();

app.use(cors());
app.use(express.json());

const authRoutes=require("./routes/authroutes");
const userRoutes=require("./routes/userroutes");
const adminRoutes=require("./routes/adminroutes");
const ownerRoutes=require("./routes/ownerroutes");
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/owner",ownerRoutes);

app.get("/",(req,res)=>{res.send("Store Rating API Running....");
    });

    //Read port from .env
const PORT = process.env.PORT || 5000;

//start server
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
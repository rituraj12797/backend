const express=require('express');
const index=express();

// require('dotenv').config();
// const PORT=process.env.PORT ||3000;

index.use(express.json());

const blogRoute=require('./routes/blogRoute');

index.use("/api/v1",blogRoute);

index.listen(3000,()=>{
    console.log(`server started at ${PORT} successfully`)
});

// const dbConnect=require('./configuration/database');
// dbConnect();

index.get("/",(req,res)=>{
    res.send(`<h1>Blog page</h1>`)
})

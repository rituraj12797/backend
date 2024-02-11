const express = require('express');
const router = express.Router();
const {
    login ,
    signup} = require('../controllers/auth')

const {
    isStudent ,
    isAdmin ,
    auth} = require('../middlewares/auth')

router.post('/login',login)
router.post('/signup',signup)

 

// making protected routes

router.get("/test",auth,(req,res)=>{
    res.json({
        message:"welcome to test route",
        success:true
    })
})

router.get("/student",auth,isStudent,(req,res)=>{  // path , midlewares, handler    // if the user is authenticated and is student then only he can access this route  // flow is from 
    // request arrives at /student then gets checked by auth middleware then isStudent middleware and then the handler is executed
  res.json({
    message:"welcome student",
    success:true
  })
})  

router.get("/admin",auth,isAdmin,(req,res)=>{  // path , midlewares, handler    // if the user is authenticated and is admin then only he can access this route
  res.json({
    message:"welcome admin",
    success:true
  })
})

module.exports = router;

// "name":"ritu",
//     "email":"alch@gmial.com",
//     "password":"this110",
//     "role":"student"

// {
//     "name":"babbar",
//     "email":"alch@course.com",
//     "password":"this110",
//     "role":"admin"
// }
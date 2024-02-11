// this is a middleware to check if the user is authenticated or not

// this middleware will be used in the routes where we want to check if the user is authenticated or not and if the user is student or Admin or visitor

// auth ,isStudent ,isAdmin ,isVisitor

const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.auth = (req, res, next) => {    // this is a middleware function here next is a function which will be called when the middleware is done to pass the control to the next middleware or the handler
    try {
      // extract jwt token from request header
      // we have 3 ways of getting token from body, from header, from cookie                                                 

      // this means when weare using token only we need to explicitly pass it in the request body 

      // if we are using cookie then we need to set the cookie in the response header and then the browser
      //    will automatically send the cookie in the request header we can use the cookie-parser to parse the 
             //    cookie from the request header and then extract the token from the cookie and then verify the token 

        console.log(req.cookies,req.body.token,req.header("Authorization"))
        // extraction token from header is the most secure way of getting the token 
       const token = req.body.token ||
       req.header("Authorization").replace("Bearer ",""); // this will extract the token from request header
        // req.cookies.token ||
       if(!token){
        return res.status(401).json({
            message:"token missing",
            success:false
        })
       }
         // verify the token
         try {
            const decoded = jwt.verify(token, JWT_SECRET);   // this will extract the payload from the token and verify the token using the secret key 
            console.log(decoded);
            req.user = decoded; // this will add the payload to the request object so that the next middleware or the handler can use it

            // if the token is verified then the control will be passed to the next middleware or the handler
         } catch (error) {
            res.status(401).json({
                message:"token is invalid  error",
                success:false
            })
         }
         next();   // this will call the next middleware or the handler

         // we need not to add the response for th success as the control will be passed to the next middleware or the handler and when all the middle ware executes then the handler will send the  success response
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "something went wrong while verifying the token",
            success: false
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
         if(req.user.role !== "student"){
            return res.status(403).json({
                message:"you are not authorized to access this student route",
                success:false
            })
         }
         next();
    } catch (error) {
        res.status(500).json({
            message:"something went wrong while checking the Usre role",
            success:false
        })
    }
}

exports.isAdmin = (req,res,next)=>{
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({
                message:"you are not authorized to access this admin route",
                success:false
            })
        }
        next();
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"something went wrong while checking the admin role",
            success:false
        })
    }
}
const bcrypt = require("bcrypt")
const User = require('../models/user')
const jwt = require('jsonwebtoken')

//signup route handler

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        //strategy 1:  check if user already exists in DB or not ? is alerady exist then catch error
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return (
                res.status(400).json({
                    message: "user already exists in DB",
                    success: false
                })
            )
        }

        //secure password
        let hashedPassword;
        try {
            // we want to hash the password in 10 number of rounds 
            hashedPassword = await bcrypt.hash(password,10)
        } catch (error) {
            //  strategy 2:  return if the password is not hashed 
            return res.status(500).json({
                message: "error in hashing password",
                success: false
            });
        }

        //creating entry for user 
        const user = await User.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            message: "user signed up succesfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Sign-up failed due to an unexpected error please try again",
            success: false
        })
    }
}

exports.login = async (req,res)=>{
    try {
        // exract data from request body 

        const {email,password} = req.body;

        // strategy 1: to  warn if  input is not given correctly 
        if(!email || !password){
            return res.status(400).json({
                message:"please enter all the fieds",
                success:false
            })
        }

        //strategy 2 : check if user exists in DB or not 
        let user = await User.findOne({email})

        //  if user not exits in DB
        if(!user){
            return res.status(401).json({
                message:"pleae signup first before loging in",
                succcess:false
            })
        }
        else{
            // Strategy 3: now if user exits check and verify the password 
           if( await bcrypt.compare(password,user.password)){
             const payload = {
                email:user.email,
                role:user.role,
                 id:user._id
             }
              // create token for user 
              // 1st arg is payload , 2nd arg is secret key , 3rd arg is options and header is automatically added by jwt using default values by sign method
              let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"7d"
              }) 

              user = user.toObject();
              user.token = token;
              user.password = undefined;
              console.log(typeof(user))
              //In most cases, it's a good practice to explicitly set sensitive properties like passwords to undefined when you want to remove their values. This helps ensure that the password is not accidentally accessed or used later in the code.
              // since 


                // 1st arg is name of the cookie , 2nd arg is token , 3rd arg is options

                const options = {                               
                    expires:new Date(
                        // 7 days from now 
                        Date.now() + 7*24*60*60*1000
                    ),
                    httpOnly:true,  // cookie can not be accessed by javascript
                    sameSite:"none", //  cookie can be accessed by any domain
                    secure:true // cookie can only be accessed by https
                }
             return res.cookie("token",token,options).status(200).json({
                    message:"login successful",
                    success:true,
                    token,
                    user
             })

        //     return res.status(200).json({
        //         message:"login successful",
        //         success:true,
        //         token,
        //         user
        //  })
           }
           // same site none 
           else{
            return res.status(401).json({
                message:"incorrect password entered",
                success:false
            })
           }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"an unexpected error occured please try again",
            success:false
            
        })
    }
}
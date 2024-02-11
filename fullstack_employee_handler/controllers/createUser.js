const User = require('../models/user');

const createUser = async (req,res)=>{
    try {
        const {name,email,title,department,role} = req.body;
        if( !(name && email && title && department && role )){ 
            
            return(
                res.status(400),json({  
                    message:"please fill all fields",
                    succes:false,
                    data:null
                })
            )
        }
        const user = await User.create({
            name,
            email,
            title,
            department,
            role,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
        })
        return (
            res.status(201).json({
                message: "Data saved and stored successfully",
                success:true,
                data:user
            })
        )
    } catch (error) {
        console.error(error);
        return(
            res.status(500).json({
                message:"An error occured while trying to save data",
                success:false,
                data:null
            })
        )
    }
}
module.exports = createUser;
const User = require('../models/user');

const getUser = async (req,res)=>{
    try {
        const userData = await User.find({});

            res.status(200).json({
                message:" data fetched successfully",
                succes:true,
                data:userData
            })

    } catch (error) {
            res.status(500).json({
                message:"AN error occued while fetchgin the data from the DB",
                success:false,
                data:null
            })
        
    }
}

module.exports = getUser;
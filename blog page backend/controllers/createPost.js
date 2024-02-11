const Post=require('../models/postSchema');

exports.createPost=async(req,res)=>{
    try {
        const{name,user_name,posts}=req.body;
        const response= await Post.create({name,user_name,posts});

        res.status(200).json({
            success:true,
            data:response,
            message:"Post created successfully",

        })
    } catch (error) {
        console.error(error);
        console.log(error.message);
        res.status(500).json(
            {
                success:false,
                data:error,
                message:error.message,
            }
        )
    }
}

exports.getallPost=async(req,res)=>{
    try {
        
        const result=await Post.find().populate("likes").populate("comments").exec();

        res.status(200).json({
            success:true,
            data:result,
            message:"Post fetched successfully",

        })
    } catch (error) {
        console.error(error);
        console.log(error.message);
        res.status(500).json(
            {
                success:false,
                data:error,
                message:error.message,
            }
        )
    }
}
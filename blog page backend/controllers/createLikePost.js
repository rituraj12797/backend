const Like=require('../models/likeSchema');
const Post=require("../models/postSchema");

exports.likePost=async(req,res)=>{
    try {
        const{user_name,post}=req.body;

        // const likes= await Like.create(
        //     {user_name,like,post}
        // )

        const like=new Like({
            user_name,post
        });
        const savedLike=await like.save();

        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
                        .populate("likes").exec();

        res.status(200).json({
            success:true,
            data:updatedPost,
            message:"Liked successfully",

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


exports.unlikePost=async(req,res)=>{
    try {
        const{like,post}=req.body;

        const deletedLike=await Like.findOneAndDelete({post:post,_id:like});

        const updatedPost=await Post.findByIdAndUpdate(post,{$pull:{likes:deletedLike._id}},{new:true})
                        .populate("likes").exec();

        res.status(200).json({
            success:true,
            data:updatedPost,
            message:"Liked successfully",

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
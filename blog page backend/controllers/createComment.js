const Comment=require('../models/commentSchema');
const Post=require('../models/postSchema')

exports.createComment=async(req,res)=>{
    try {
        const{user_name,post,comment}=req.body;
        const savedComment=new Comment({
            user_name,post,comment
        })
       
        const insertedComment=await savedComment.save();

        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{comments:insertedComment._id}},{new:true})
                            .populate("comments").exec();
        
        
        res.status(200).json({
            success:true,
            data:updatedPost,
            message:"commented successfully",

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
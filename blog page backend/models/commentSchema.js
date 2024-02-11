const mongoose=require('mongoose');


const commentSchema= new mongoose.Schema({
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post",
    },
    user_name:{
        type:String,
        required:true,
        maxLength:15,
    },
    comment:{
        type:String,
        required:false,
        maxLength:100,
    }
});
module.exports= mongoose.model("Comment",commentSchema);


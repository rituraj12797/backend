const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
    },
    user_name:{
        type:String,
        required:true,
        maxLength:15,
    },
    posts:{
        type:String,
        required:true,
        maxLength:50,
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now(),
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Like"
    }]
});

module.exports= mongoose.model("Post",postSchema);






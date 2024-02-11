const mongoose=require('mongoose');
const likeSchema= new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        maxLength:15,
    },

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Post"
    }
});
module.exports= mongoose.model("Like",likeSchema);
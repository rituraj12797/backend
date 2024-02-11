const mongoose=require('mongoose');

require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.db_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log("DB connection successful"))
    .catch((error)=>{
        console.error(error);
        console.log(error.message);
        process.exit(1);
    })
}

module.exports=dbConnect;
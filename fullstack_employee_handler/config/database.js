const mongoose = require('mongoose');

const dbconnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        
        console.log("ocnnected to dta base successfuly");
    })
    .catch(error=>{
        console.log("error occured while connecting to the database",error);
        process.exit(1)
    })
}

module.exports = dbconnect;
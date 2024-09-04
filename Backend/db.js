const mongoose=require("mongoose")
const dotenv = require('dotenv')

// dot env config
dotenv.config()
const mongoURL=process.env.MONGO_URL_LOCAL    //local databases
// const mongoURL=process.env.MONGO_URL             //mongodb atlas

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db=mongoose.connection;

db.on('connected', () => console.log('connected'));
db.on('disconnected', () => console.log('disconnected'));

//export module
module.exports=db;



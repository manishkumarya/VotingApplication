const mongoose=require('mongoose')
const bcrypt = require('bcrypt')
const CandidateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    party:{
        type:String,
        required:true
    },
    votes:[{
          user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
          },
          votedat:{
           type:Date,
           default:Date.now()
          }
    }],
    voteCount:{
        type:Number,
        default:0
    }
    
})

const candidate=mongoose.model('candiadte',CandidateSchema)
module.exports=candidate

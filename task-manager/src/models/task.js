const mongoose=require('mongoose')
const {default:validator}=require('validator')
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:false
    },
    completed:{
        type:Boolean,
        default:false
    },
    author:{
        type:mongoose.ObjectId,
        required:true,
        ref:"User"
    }
},{
    timestamps:true
})
const tasks=mongoose.model('tasks',taskSchema)
module.exports=tasks
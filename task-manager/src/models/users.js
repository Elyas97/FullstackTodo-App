const mongoose=require('mongoose')
const {default:validator}=require('validator')
const bcrypt=require('bcrypt')
const dotenv=require('dotenv').config()
const jwt = require('jsonwebtoken');
const task=require('./task')
// mongoose supports middle ware
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<7){
                throw new Error('Password length must be greater than 6')
            } else if(validator.contains(value.toLowerCase(),"password")){
                throw new Error('Password contains password change it')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'tasks',
    localField:'_id',
    foreignField:'author'
})
userSchema.methods.toJSON=function (){
    const user=this;
    const userObj=user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
}
userSchema.methods.generateAuthToken=async function(){
    const user = this
    const token= await jwt.sign({_id:user._id.toString()},process.env.JWT_PASS,{
        expiresIn:process.env.JWT_DURATION
    })    
    user.tokens.push({token})
    await user.save();
    return token

}
userSchema.statics.findByCredentials=async (email,password)=>{
const user=await User.findOne({email})
if(!user){
    throw new Error('unable to login')
}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    throw new Error('unable to login')
}
return user;
}
userSchema.pre('save',async function(next){
const user=this;
if(user.isModified('password')){
    user.password=await bcrypt.hash(user.password,8)
}

next()
})
//delete user and tasks
userSchema.pre('remove',async function(next){
const user =this;
await task.deleteMany({author:user._id})
next()
})
const User=mongoose.model('User',userSchema)
User.createIndexes();
module.exports=User
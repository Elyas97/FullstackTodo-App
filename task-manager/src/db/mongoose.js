const mongoose=require('mongoose')
const {default:validator}=require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api')



/* taskOne.save().then((res)=>{
console.log(res)
}).catch((e)=>{
console.log(e)
}) */
const express=require('express');
require('./db/mongoose')
const dotenv=require('dotenv').config()
const jwt = require('jsonwebtoken');
const cors=require('cors');

const app=express();
const port=process.env.PORT || 3000
app.use(express.json())
app.use(cors())
const userRouters=require('./routers/users')
const taskRouters=require('./routers/tasks')
app.use(userRouters,taskRouters)

    

app.listen(port,()=>{
    console.log("Server is running at port " +port)
})
const Task=require('./models/task')
const User=require('./models/users')
const main =async ()=>{
  /*   const task=await Task.findById('621a386331072b314664ed5f')
    await task.populate('author')
    console.log(task) */

    const user=await User.findById('621a37284b9f45d9471623ea')
    await user.populate('tasks')
    console.log(user.tasks)
}



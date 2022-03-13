const tasks=require('../models/task');
const express=require('express')
const router=new express.Router();
const auth=require('../middleware/auth')


router.get('/tasks', auth,async(req,res)=>{
    let _id=req.user._id   
    try{
        if(req.query.completed){
            completed=req.query.completed ==='true'
            const data=await tasks.find({author:_id,completed})
            res.send(data)

        }else{
            const data=await tasks.find({author:_id})
            res.send(data)

        }
           
    
    }catch(e){
     res.status(400).send(e)
    } 
 })
 
 router.get('/tasks/:id',auth,async(req,res)=>{
     try{
         const _id=req.params.id
         const data=await tasks.findOne({_id ,author:req.user._id})
         if(!data){
             return  res.status(400).send()
           }
           res.send(data)
 
     }catch(e){
         res.status(400).send(e)
     }
     })
     router.post('/tasks',auth,async(req,res)=>{
  
        const newTask=new tasks({
            ...req.body,
            author:req.user._id
        })
            try{
             await newTask.save()
             res.send(newTask)
            }catch(e){
                res.status(400).send(e)
            }
        
        })
 router.patch('/tasks/:id',auth,async (req,res)=>{
     const updates=Object.keys(req.body)
     console.log(updates)
     const allow=['title','description','completed',]
     const valid=updates.every((keys)=>{
         return allow.includes(keys)
     })
     if(!valid){
         return res.status(400).send({error:"invalid updates"})
     }
     try{
         console.log("tuli")
        const _id=req.params.id
        console.log(_id)
         const task=await tasks.findOne({_id ,author:req.user._id});
         console.log(task)
         if(!task){
            return res.status(404).send()
        }
         updates.forEach((data)=>{
            task[data]=req.body[data]
         })
         await task.save()
       
         res.send(task)
     }catch(e){
         res.status(400).send(e)
     }
 })
 router.delete('/tasks/:id',auth,async(req,res)=>{
     try{
         const tasks1=await tasks.findOneAndDelete({_id:req.params.id,author:req.user._id})
         if(!tasks1){
             return res.status(404).send()
         }
         res.send(tasks1)
     }catch(e){
         res.status(500).send()
     }
 })
 
 module.exports=router
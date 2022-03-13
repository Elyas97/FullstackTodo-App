const jwt=require('jsonwebtoken')
const User=require('../models/users')
const env=require('dotenv').config()
const auth=async (req,res,next)=>{
try{
   const bearerHeader=req.header('Authorization');  
   if (typeof bearerHeader!=='undefined'){
       const bearer=bearerHeader.split(' ');
       const beartoken1=bearer[1]
       const beartoken=beartoken1.replaceAll('"','')
      const decoded=jwt.verify(beartoken,process.env.JWT_PASS)
      const user=await User.findOne({_id:decoded._id,'tokens.token':beartoken})
       if(!user){
          throw new Error()
       }
       req.token=beartoken
       req.user=user
       next();
       }else{
           return res.sendStatus(404);
       }

}catch(e){
return res.status(401).send({error:"please Authenticate"})
}
}
module.exports=auth;
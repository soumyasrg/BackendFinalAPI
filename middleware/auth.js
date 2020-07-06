const jwt=require('jsonwebtoken')
const Register=require('../models/Register')

const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer','')
        const decoded=jwt.verify(token,'illuminatiwillrevive')
        const user=await Register.findOne({_id:decoded._id,'tokens.token':token})
      
        if(!user)
        {
            throw "Authentication Error"
        }
        req.user=user
        req.token=token
        next()
    }catch(e){
        res.status(401).send({error:'Authentication Error'})
    }
        
}

module.exports=auth

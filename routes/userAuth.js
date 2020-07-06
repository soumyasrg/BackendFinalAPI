const express=require('express')
const router=express.Router()
const Register=require('../models/Register')
const Login=require('../models/login')
const bcrypt=require('bcryptjs')
const logger = require('morgan')
const auth=require('../middleware/auth')

router.get('/fetch/all/users',async(req,res)=>{
    try{
        const users=await Register.find({});
        res.json({message:"Successfully fetched all users",users});
    }catch(e){
        res.json({message: "Error occurred.",error:e});
    }
})

router.get('/fetch/all/loginUsers',async(req,res)=>{
    try{
        const users=await Login.find({});
        res.json({message:"Successfully fetched all users",users});
    }catch(e){
        res.json({message: "Error occurred.",error:e});
    }
})

router.get('/delete/all/users',async(req,res)=>{
    try{
        const users=await Register.remove({});
        res.json({message:'Successfully deleted all the users'})
    }catch(e){
        res.json({message:'Error occured',error:e})
    }
})

router.get('/delete/all/loginUsers',async(req,res)=>{
    try{
        const users=await Login.remove({});
        res.json({message:'Successfully deleted all the users'})
    }catch(e){
        res.json({message:'Error occured',error:e})
    }
})

router.post('/uidcheck', async(req, res) => {
    try {
        const exists = await Register.findOne({ aadhaar : req.body.aadhaar})
        if(exists == null){
            res.statusCode = 200;
            res.setHeader('Content-type', 'application/json');
            res.json({success: true, status: 'You are allowed to register'});
        }else{
            res.statusCode=200;
            res.setHeader('Content-type', 'application/json');
            res.json({status: 'User already exists'});
        }
    }catch(error) {
        res.status(500).send({message: "Error checking"});
    }
})


router.post('/register',async (req,res)=>{
    const user=new Register(req.body)

    try{
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }

})

router.post('/setPassword/:id',auth,async (req,res)=>{
    try{
        req.body.aadhaar=req.params.id
        const login=new Login(req.body);
        
        await login.save()
        res.status(200).send("Password set")
    }catch(e){
        res.status(500).send()
    }
})

//login route
router.post('/users/login',async (req,res)=>{
    try{
       const user=await Register.findByCredentials(req.body.aadhaar,req.body.password)
       const token=await user.generateAuthToken()
        req.user=user;
        res.status(200).send({user,token})
        }catch(e){
        res.status(400).send(e)
    }
}) 

router.post('/users/logout', auth, async (req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })

        await req.user.save()
        res.status(200).send("Successfully Logged out")
    } catch(e) {
        req.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req,res)=>{
    try{
        req.user.tokens=[]

        await req.user.save()

        res.status(200).send("Logged out of all sessions")
    }catch(e){
        res.status(500).send(e)
    }
})

//From here, it is for testing purpose.

/*router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
})

router.get('/users/:id',auth,async (req,res)=>{
    
    try{
        const _id=req.params.id
        const user=await Register.findById(_id)
        if(!user)
            return res.status(404).send()
        res.status(200).send(user)
    }catch(e){
        res.status(500).send()
    }   
})

router.patch('/users/:id',async (req,res)=>{
    const allowedUpdates=['name','email','password','age']
    const updates=Object.keys(req.body)
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        res.status(400).send({error:'Invalid operation'})
    }
    try{
        const user=await Register.findById(req.params.id)
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    }catch(e){
            res.status(400).send(e)
    }
})

router.delete('/users/:id',async (req,res)=>{
    const _id=req.params.id
    try{
        const user=await Register.findByIdAndDelete(_id)
        if(!user){
            res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e){
        res.status(500).send(e)
    }
})*/

module.exports=router

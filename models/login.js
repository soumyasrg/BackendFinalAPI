const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


const loginSchema=mongoose.Schema({
    aadhaar:{
        type:Number,
        unique:true,
        required:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Cannot contain Password")
            }
        }

    }
})

loginSchema.pre('save',async function(next){
    const user=this
    if(user.isModified('password')){
        user.password=await bcrypt.hash(user.password,8)
    }
    next()
})

const Login = mongoose.model('Login',loginSchema)

module.exports = Login
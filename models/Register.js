const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Login = require('../models/login')
const Schema = mongoose.Schema;
const registerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        //required: true,
        enum: ['male', 'female', 'other']
    },
    aadhaar: {
        type: Number,
        required: [true, 'Aadhaar number is required']
    },
    birth: {
        type: Date,
        //required: true
    },
    contact: {
        type: Number,
        required: true
    },
    marital: {
        type: String,
        default: 'unmarried',
        enum: ['unmarried', 'married', 'divorced']
    },
    occupation: {
        type: String,
        // required: true
    },
    address: {
        type: String,
        //required: true
    },
    place: {
        type: String,
        //required: true
    },
    district: {
        type: String,
        //required: true
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    nuclearFamilyID: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: null
    },
    ownFamilyID: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: null
    },
    inLawsFamilyID: {
        type: Schema.Types.ObjectId,
        ref: 'Family',
        default: null
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


registerSchema.statics.findByCredentials = async (aadhaar, password) => {
    const user = await Login.findOne({ aadhaar })

    if (!user) {
        throw "Unable to login"
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw 'Unable to Login'
    }
    const userProfile = await Register.findOne({ aadhaar })
    return userProfile
}

registerSchema.methods.generateAuthToken = async function () {

    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'illuminatiwillrevive')

    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

const Register = mongoose.model('registers', registerSchema)

module.exports = Register


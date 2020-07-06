const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const familySchema=mongoose.Schema({
    father:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    mother:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    },
    sons:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    }],
    daughters:[{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:null
    }]
},{timestamps:true})

module.exports = mongoose.model('Family', familySchema);
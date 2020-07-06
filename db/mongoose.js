const mongoose=require('mongoose')

mongoose.connect('mongodb+srv://sudhi:sudhi@cluster0-ucpxg.mongodb.net/test?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to DB")
}).catch((err)=>{
    console.log('Error')
})

//Arya :- mongodb+srv://arya:123@districtportal-majju.mongodb.net/test2?authSource=admin&replicaSet=DistrictPortal-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true
//Sudhi :- mongodb+srv://sudhi:sudhi@cluster0-ucpxg.mongodb.net/test?retryWrites=true&w=majority


//mongodb+srv://arya:ArYa5333@districtportal-majju.mongodb.net/test?retryWrites=true&w=majority

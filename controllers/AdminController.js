const IndividualUser=require('../models/Register');

exports.searchUser=(req,res,next)=>{
    let searchedUserName=req.body.search;
    let theSearchExpression=".*"+searchedUserName+".*";
    IndividualUser.find({"name": { "$regex": new RegExp(theSearchExpression, "i")}})
    .exec((err,users)=>{
        if(err){
            //mongodb error
            res.json({error:true,errorMsg:err,message:'MongoDB error while finding. Please try after sometime.'})
        }else{
            if(users.length){
                //non empty array of users
                res.json({error:false,message:'Fetched all the users containing this name',users:users})
            }else{
                //empty array of users
                res.json({error:true,message:'There is no such user with this name'});
            }
        }
    })
}

exports.makeAdmin=(req,res,next)=>{
    let aadhaarId=req.body.aadhaar;
    IndividualUser.find({aadhaar:aadhaarId})
    .exec((err,users)=>{
        if(err){
            //mongodb error
            res.json({error:true,errorMsg:err,message:'MongoDB error while finding. Please try after sometime.'})
        }else{
            if(!users.length){
                //empty array of users
                res.json({error:true,message:'No such user with the given aadharId exists'});
            }else{
                //non empty array of users
                let userInfo= users[0];
                let mongoIdOfUser=userInfo._id;
                userInfo['role']='admin';
                IndividualUser.findByIdAndUpdate(mongoIdOfUser,userInfo,(terr,succ)=>{
                    if(terr){
                        //mongodb error while updating
                        res.json({error:true,errorMsg:terr,message:'MongoDB error while updating. Please try again after sometime.'})
                    }else{
                        //successful admin creation
                        res.json({error:false,message:'Successfully made the user an admin',userInfo})
                    }
                })
            }
        }
    })
}

exports.assginDeptAndRoles=(req,res,next)=>{
    let aadhaarId=req.body.aadhar;
    let role=req.body.role;
    let dept=req.body.department;
    IndividualUser.find({aadhaar:aadhaarId})
    .exec((err,users)=>{
        if(err){
            //mongodb error while finding the user
            res.json({error:true,errorMsg:err,message:'MongoDB error while finding. Please try after sometime.'});
        }else{
            if(!users.length){
                //empty array of users
                res.json({error:true,message:'No such user with the given aadharId exists'});
            }else{
                //non empty array of users
                let userInfo=users[0];
                let mongoIdOfUser=userInfo._id;
                userInfo['role']=role;
                userInfo['department']=dept;
                IndividualUser.findByIdAndUpdate(mongoIdOfUser,userInfo,(terr,succ)=>{
                    if(terr){
                        //mongodb error while updating
                        res.json({error:true,errorMsg:terr,message:'MongoDB error while updating. Please try again after sometime.'})
                    }else{
                        //successful admin creation
                        res.json({error:false,message:'Successfully made the user an admin',userInfo})
                    }
                })
            }
        }
    })
}

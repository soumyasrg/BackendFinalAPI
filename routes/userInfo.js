const router=require('express').Router();
const auth=require('../middleware/auth')
const NewController=require('../controllers/NewController');

//get individual user
//router.get('/get/user',auth,NewController.getIndividualUser);


//get user profile details
router.get('/get/user/profile/:aadhaar',auth,NewController.getProfiledetails);

//update user profile details
router.put('/update/user/profile/:aadhaar',auth,NewController.updateUserProfile);

//get all users
router.get('/get/user/all',auth,NewController.getAllUsers);

//delete individual user
router.get('/delete/user/:userId',auth,NewController.deleteIndividualUser);

//delete all users
router.get('/delete/user/all',auth,NewController.deleteAllUsers);


//get individual family
router.get('/get/family/:familyId',auth,NewController.getIndividualFamily);

//get all families
router.get('/get/family/all',auth,NewController.getAllFamilies);

//delete individual family
router.get('/delete/family/:familyId',auth,NewController.deleteIndividualFamily);

//delete all families
router.get('/delete/family/all',auth,NewController.deleteAllFamilies);

//create a user
router.post('/create',auth,NewController.createIndividualUser);

//add parent
router.post('/addParent/:myId/:parentGender',auth,NewController.addParent);

//change status to getting married
router.get('/changeStatus/:myId/:status',auth,NewController.changeMarriageStatus);

//add partner
router.post('/addPartner/:myId/:partnerGender',auth,NewController.addPartner);

//add child
router.post('/addChild/:myId/:childGender',auth,NewController.addChild);

//add sibling
router.post('/addSibling/:myId/:siblingGender',auth,NewController.addSibling);


module.exports=router;


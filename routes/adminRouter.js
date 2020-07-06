const router=require('express').Router();
const auth=require('../middleware/auth');
const AdminController=require('../controllers/AdminController');

//this will let the admin to find any user by entering any part of the name
//it will return all the users which contain the entered string as a part of their name
router.post('/users/search/name',auth,AdminController.searchUser);

//search by aadhar number and make admin
router.post('/users/search',auth,AdminController.makeAdmin);

//search by aadhar number and assign role
router.post('/user/search/assignOther',auth,AdminController.assginDeptAndRoles);

module.exports=router;

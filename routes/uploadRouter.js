const express = require('express');
const bodyParser = require('body-parser');
const auth = require('../middleware/auth');
const multer = require('multer');

//multer provides diskStorage function to store images
//in particular destination (src/public/images)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/images/grievance');
    },
    //storing uploaded image as its original filename
    filename: (req, file, cb) => {
        cb(null, file.originalname)         
    } 
});

//multer config which restricts user to upload 
//only particular format images
const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/grievance/imageupload')
.get(auth, (req, res) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /grievance/imageupload');
})
.post(auth, upload.single('imageFile'), (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put(auth, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /grievance/imageupload');
})
.delete(auth, (req, res) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /grievance/imageupload');
});

module.exports = uploadRouter;
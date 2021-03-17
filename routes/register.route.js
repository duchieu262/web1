var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({dest: './public/uploads/'});

var router = express.Router();

router.get('/', controller.create);
router.post('/', 
	upload.single('avatar'),
	validate.postCreate, 
	controller.postCreate
);


module.exports = router;

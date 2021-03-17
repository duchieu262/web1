var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({dest: './public/uploads/'});

var router = express.Router();


router.get('/create', controller.create);



router.post('/create', 
	upload.single('avatar'),
	validate.postCreate, 
	controller.postCreate
 );

router.get('/edit', controller.edit);

router.post('/edit',
	upload.single('avatar'),
	validate.postEdit,
	controller.postEdit);


module.exports = router;
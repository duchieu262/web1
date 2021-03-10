var express = require('express');
var multer = require('multer');

var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({dest: './public/uploads/'});

var router = express.Router();

router.get('/', controller.index);
router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/edit', controller.edit);

router.get('/:id', controller.get);

router.post('/create', 
	upload.single('avatar'),
	validate.postCreate, 
	controller.postCreate
 );

router.post('/edit',
	upload.single('avatar'),
	validate.postEdit,
	controller.postEdit);


module.exports = router;
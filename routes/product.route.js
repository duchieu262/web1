var express = require('express');

var controller = require('../controllers/product.controller');
var router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/:id', controller.get);

router.post('/comment/:id', controller.postComment)


module.exports = router;

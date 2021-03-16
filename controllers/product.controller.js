var db = require('../db');
var login = require('../validate/function.js')
var Product = require('../models/product.model')
var User = require('../models/user.model')


module.exports.index = async function(req, res){
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1) * perPage;
	var end = page * perPage;
	user = await login.login(req);
	products = await Product.find()
	res.render('products/index', {
	products: products.slice(start, end),
	currentPage: page,
	user: user
	});
};

module.exports.search = async function(req, res){	
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1) * perPage;
	var end = page * perPage;
	var q = req.query.q
	
	if (q) {
		var matchedProducts = await Product.findOne({ name: "Quail - Eggs, Fresh"})
		console.log(typeof(matchedProducts))
		size = 1
		user = await login.login(req);
		res.render('products/index', {
			query: q,
			products: matchedProducts,
			user: user,
			currentPage: page,
			size: size
		});
	}
	else{
		res.redirect('/products')
	}
	
}


module.exports.get = async function(req, res){
	var id = req.params.id;
	var product = await Product.findById(id)
	user = await login.login(req);
	res.render('products/view', {
	product: product,
	user: user
	});

};

module.exports.postComment = async function(req, res) {	
	var id = req.params.id;
	var body = req.body.comment;
	var user = await login.login(req);
	if(user){
		avatar = user.avatar;
		name = user.displayName;
	}

	product = await Product.findById(id)
	product.comments.push({name, avatar, body})
	await product.save()

	console.log(product.comments)
	res.redirect('/products/'+id);
}
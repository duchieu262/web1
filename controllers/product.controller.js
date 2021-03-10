var db = require('../db');
var login = require('../validate/function.js')

module.exports.index = function(req, res){
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1) * perPage;
	var end = page * perPage;
	user = login.login(req);
	var user= login.login(req);
	res.render('products/index', {
	products: db.get('products').value().slice(start, end),
	currentPage: page,
	user: user
	});
};

module.exports.search = function(req, res){	
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var start = (page - 1) * perPage;
	var end = page * perPage;
	var q = req.query.q
	
	if (q) {
		var matchedProducts = db.get('products').value().filter(function(product){
			return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
		size = db.get('products').filter(function(product){
			return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		}).size().value();
		user = login.login(req);
		res.render('products/index', {
			query: q,
			products: matchedProducts.slice(start, end),
			user: user,
			currentPage: page,
			size: size
		});
	}
	else{
		res.redirect('/products')
	}
	
}


module.exports.get = function(req, res){
	var id = req.params.id;
	var product = db.get('products').find({ id: id}).value();
	user = login.login(req);
	var user= db.get('users')
			.find({id: req.signedCookies.userId}).value();
	res.render('products/view', {
	product: product,
	user: user
	});

};

module.exports.postComment = function(req, res) {	
	var id = req.params.id;
	var comment = {body: req.body.comment};
	var user = login.login(req);
	if(user){
		comment.avatar = user.avatar;
		comment.name = user.displayName;
	}


	comments = db
		.get('products')
		.find({ id: id})
		.get('comments')
		.value();
	if (!comments) {
		db.get('products')
			.find({ id: id})
			.set('comments', [])
			.get('comments')
			.push(comment)
			.write()
	}
	else{
		db.get('products')
			.find({ id: id})
			.get('comments')
			.push(comment)
			.write()
	}
	var product = db.get('products').find({ id: id}).value();
	res.redirect('/products/'+id);
}
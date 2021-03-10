var md5 = require('md5');
var db = require('../db');

module.exports.login = function(req, res){
	if(req.signedCookies.userId){
		res.redirect('/')
	}
	res.render('auth/login');
};

module.exports.postLogin = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var hashedPassword = md5(password);

	var user = db.get('users').find({username: username}).value();
	if(!user){
		res.render('auth/login', {
			errors: [
				'User does not exist.'
			],
			values: req.body
		});
		return;
	}


	if(user.password == hashedPassword) {
		res.cookie('userId', user.id, {
			signed: true
		});
		res.redirect('/products');
		return;
	}

	res.render('auth/login',{
		errors: [
			'Wrong password.'
		],
		values: req.body
	});

};


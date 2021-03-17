var md5 = require('md5');
var User = require('../models/user.model')

module.exports.login = function(req, res){
	if(req.signedCookies.userId){
		res.redirect('/')
	}
	res.render('auth/login', { user: null});
};

module.exports.postLogin = async function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var hashedPassword = md5(password);

	var user = await User.findOne({username: username})
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
		res.cookie('userId', user._id.toString(), {
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


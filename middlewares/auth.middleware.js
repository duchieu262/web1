var db = require('../db');

module.exports.requireAuth = function(req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	var user = db.get('users').find(
		{id: req.signedCookies.userId}).value();

	if(user){
		res.locals.user = user;		
		next();
		return;
	}
	res.redirect('auth/login');

};


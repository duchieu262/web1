var User = require('../models/user.model')

module.exports.requireAuth = async function(req, res, next){
	if(!req.signedCookies.userId){
		res.redirect('/auth/login');
		return;
	}
	var user = await User.findById(req.signedCookies.userId)

	if(user){
		res.locals.user = user;		
		next();
		return;
	}
	 res.redirect('/auth/login');

};


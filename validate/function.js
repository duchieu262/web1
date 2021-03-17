var User = require('../models/user.model')

async function login(req) {
	if(!req.signedCookies.userId){
		return ;
	}
	else{
		var user= await User.findById(req.signedCookies.userId);
		return user;
	}
}
module.exports = { login };

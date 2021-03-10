var db = require('../db');

function login(req) {
	if(!req.signedCookies.userId){
		return ;
	}
	else{
		var user= db.get('users')
				.find({id: req.signedCookies.userId}).value();
		return user;
	}
}
module.exports = { login };

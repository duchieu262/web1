var login = require('./function')
var User = require('../models/user.model')

module.exports.postCreate = async function(req, res, next) {
	var errors = [];
	if( await User.findOne({username: req.body.username})) {
		errors.push('Username already exists')
	}
	if (!req.body.username){
		errors.push('Username is required.');
	}
	if (!req.body.password){
		errors.push('Password is required.');
	}
	if (!req.body.phone){
		errors.push('Phone is required.');
	}
	if (!req.body.displayName){
		errors.push('Display name is required.')
	}
	if(errors.length){
		res.render('users/create',{
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}

module.exports.postEdit = async function(req, res, next) {
	var errors = [];
	user = await login(req)
	if(req.body.username !== user.username){
		if( await User.findOne({username: req.body.username})) {
		errors.push('Username already exists')
		}
	}
	if (!req.body.username){
		errors.push('Username is required.');
	}
	if (!req.body.phone){
		errors.push('Phone is required.');
	}
	if (!req.body.displayName){
		errors.push('Display name is required.')
	}
	if(errors.length){
		res.render('users/edit',{
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}

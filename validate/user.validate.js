var db = require('../db');
var login = require('./function')

module.exports.postCreate = function(req, res, next) {
	var errors = [];
	if(db.get('users')
		.find({ username: req.body.username})
		.value()) {
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
		console.log(req.body)
		res.render('users/create',{
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}

module.exports.postEdit = function(req, res, next) {
	var errors = [];
	if(req.body.username !== login.login(req).username)
		if(db.get('users')
			.find({ username: req.body.username})
			.value()) {
			errors.push('Username already exists')
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
		console.log(req.body)
		res.render('users/edit',{
			errors: errors,
			values: req.body
		});
		return;
	}
	next();
}

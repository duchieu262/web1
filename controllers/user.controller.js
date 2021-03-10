var db = require('../db');
var shortid = require('shortid');
var md5 = require('md5');


module.exports.index = function(req, res){
	res.render('users/index', {
		users: db.get('users').value()
	});
};

module.exports.search = function(req, res){
	var q = req.query.q
	var matchedUsers = db.get('users').value().filter(function(user){
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		query: q,
		users: matchedUsers
	});
};

module.exports.create = function(req, res){
	res.render('users/create')
};

module.exports.get = function(req, res){
	var id = req.params.id;
	var user = db.get('users').find({ id: id}).value();
	res.render('users/view', {
		user: user
	});
};

module.exports.postCreate = function(req, res){
	req.body.id = shortid.generate();
	password = req.body.password;
	hashedPassword = md5(password);	
	req.body.password = hashedPassword;
	try {
	req.body.avatar = ('/'+req.file.path.split('/').slice(1).join('/'));
	}
	catch(err) {

	}
	db.get('users').push(req.body).write();
	res.redirect('/users');		
	
};

module.exports.edit = function(req, res){
	var id = req.signedCookies.userId;
	var user = db.get('users').find({ id: id}).value();

	res.render('users/edit', {
		user: user
	});
};

module.exports.postEdit = function(req, res){
	var username = req.body.username;
	if (req.body.password){
		var password = req.body.password;
		var hashedPassword = md5(password);	
		db.get('users')
		.find({id: req.signedCookies.userId})
		.assign({password: hashedPassword}				
				)
		.write()
	}
	var displayName = req.body.displayName;
	var phone = req.body.phone;

	try{
		var avatar = '/'+ req.file.path.split('/').slice(1).join('/');
		db.get('users')
		.find({id: req.signedCookies.userId})
		.assign({displayName: displayName},
				{phone: phone},
				{avatar: avatar},				
				)
		.write()
	}
	catch(err)
	{
		db.get('users')
		.find({id: req.signedCookies.userId})
		.assign({displayName: displayName},
				{phone: phone},				
				)
		.write()

	}
	res.redirect('/');
}


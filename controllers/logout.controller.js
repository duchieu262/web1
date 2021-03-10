module.exports.index = function(req,res){
	res.clearCookie('userId');
	res.redirect('/auth/login');
};
 var express = require('express');
 var re;
 module.exports = function(router,app,passport){
router.use(function(req, res, next){
	re = req;
		if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/auth');
});

router.get('/dash', function(req, res){
	//app.use('/dash', express.static(__dirname + '/views'));
	res.render('dash.ejs');
});

router.get('/profile', function(req, res){
	console.log(req.session);
	//app.use('/profile', express.static(__dirname + '/views'));
	res.render('profile.ejs',{user: req.user});
});
router.get('/403', function(req, res){
	console.log(req.session);
	//app.use('/403', express.static(__dirname + '/views'));
	res.render('na.ejs');
});


	 router.get('/logout', function(req, res){
req.logout();
res.redirect('/');
	 });




 };
var fs = require('fs');
var User            = require('../app/models/user').User;
//fs.appendFile('logs.txt', req.path + "Token" + req.query.access_token + "\n"), function(err){
//}
var jwt = require('jsonwebtoken');
var c = 0;

var datalist = {
	temp: 'nan',
	hum:  'nan',
	pot: 'nan'
};
module.exports = function(router,passport){
	router.use(function(req, res, next){
req.logout();
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token){
		jwt.verify(token, "ahhdebussy", function(err, decoded){
			if(err){
				return res.send("InvalidToken");
			}
			else{
				req.decoded = decoded;
				next();
			}
		});
	} else{
		return res.status(403).send("NoToken");
	}
	
});
	var d="";
var checkst = setInterval(function(){
	if(d==c){
		datalist.temp="nan";
		datalist.hum="nan";
		datalist.pot="nan";
	}
d=c;
},6000);

router.post('/err/:t/:i', function(req, res){
var err = req.params.t;
var id = req.params.i;
if(err == "sf" ){
	console.log("Sensor Failure From: "+id);
}
else{
console.log("Unknown Error From "+id);
}
});

router.get('/node/:d/:t/:h/:k', function(req, res){
	res.send("LOL");
	var pot = req.params.d;
	var temp = req.params.t;
	var h = req.params.h;
	var iden = req.params.k;
	datalist.temp = temp;
	datalist.hum = h;
	datalist.pot = pot;
	c=c+1;
	console.log("From: "+iden+" Temp: "+temp+" Hum: "+h+" Pot-> "+pot+" Req Count: "+c);
});
router.get('/angData', function(req, res){
	res.json(datalist);
});
var fg=0;
router.get('/androData', function(req, res){
	fg=fg+1;
	//res.send("C,"+fg);
	res.send(datalist.pot+","+datalist.temp+","+datalist.hum);
});
router.get('/kasim', function(req, res){
res.send("Hello");
});
router.get('/Ureq/:name/', function(req, res){
res.json(datalist);
});
router.get('/st',function(req, res){
	res.send("aha");
	console.log("im alive");
});
router.get('/androAccount/:user', function(req, res){
var us = req.params.user;
  User.findOne({ 'local.username' :  us }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                throw err;

            // if no user is found, return the message
            if (!user)
                res.send('User Not Registered!');

            // if the user is found but the password is wrong
          if(user){
          	res.send(user._id+","+user.local.password+","+user.local.token);
       
          }

            // all is well, return successful user
        });


});
router.get('/test', function(req, res){
	res.send("VOILA!");
});
};
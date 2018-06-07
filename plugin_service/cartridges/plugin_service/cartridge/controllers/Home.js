var home = require('app_storefront_base/cartridge/controllers/Home');
var server = require('server');

server.extend(home);

server.append('Show',function(req,res,next){
//	res.render('/service/servicePanel');
	session.custom.name = "Saurabh";
	next();
});

module.exports = server.exports();
'use strict';

var server = require('server');

/**
 * 
 */
server.get('Start', function (req, res, next) {
    res.render('/service/servicePanel');
    next();
});


/**
 * Used to execute web api service call
 */
server.post('Execute', function (req, res, next) {
	
	var serviceCallResult = require('~/cartridge/scripts/service').executeServiceCall(req.form);
	
	res.json({
	    response: {data : serviceCallResult},
	});

	next();
});

module.exports = server.exports();
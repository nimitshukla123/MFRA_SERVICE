'use strict';

var server = require('server');

/**
 * function Start
 * This function is used to render the servicePanel configuration page.
 */
server.get('Start', function (req, res, next) {
	
    res.render('/service/servicePanel');
    next();
});


/**
 * function Execute
 * This function is used to trigger web service call using input provided by user on servicepanel.
 * It uses service.js to trigger the HttpClient and return the response.
 */
server.post('Execute', function (req, res, next) {
	
	var serviceCallResult = require('~/cartridge/scripts/service').executeServiceCall(req.form);
	
	res.json({
	    response: {data : serviceCallResult},
	});

	next();
});

module.exports = server.exports();
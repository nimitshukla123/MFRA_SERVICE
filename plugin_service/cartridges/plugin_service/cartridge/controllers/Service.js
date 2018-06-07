'use strict';

var server = require('server');

server.get('Start', function (req, res, next) {
    res.render('/service/servicePanel');
    next();
});

module.exports = server.exports();

'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Start', cache.demo, function (req, res, next) {
    res.render('/service/servicePanel');
    next();
});

module.exports = server.exports();

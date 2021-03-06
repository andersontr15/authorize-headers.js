var jwt = require('jsonwebtoken');
var authorizeHeaders = function(request, response, next) {
	if(request.headers.authorization) {
		var token = request.headers.authorization.split(' ')[1];
		jwt.verify(token, process.env.secret, function(err, decoded) {
			if(err) {
				return response.status(400).send('Not authorized');
			}
			next();
		});
	}
	else {
		return response.status(400).send('No token provided!');
	}
};

module.exports = authorizeHeaders;
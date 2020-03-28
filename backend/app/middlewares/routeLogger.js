//mandatory middleware

let requestIpLogger = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		console.log('!OPTIONS');
		var headers = {};

		headers['Access-Control-Allow-Origin'] = req.headers.origin;
		headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
		headers['Access-Control-Allow-Credentials'] = true;
		headers['Access-Control-Max-Age'] = '86400'
		headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept';
		res.writeHead(200, headers);
		res.end();
	} else {
		res.header('Access-Control-Allow-Origin', req.headers.origin);
		res.header('Access-Control-Allow-Credentials',true);
		res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type,Accept');
		next();
	}
}

module.exports = {
	logIp: requestIpLogger
}
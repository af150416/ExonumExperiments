var Exonum = require('exonum-client');
Exonum.hash([ 0, 255, 16, 8 ]);

var pair = Exonum.keyPair();


var CreateWalet = Exonum.newType({
	size : 40,
	network_id : 0,
	protocol_version : 0,
	service_id : 1,
	message_id : 1,
	signature : pair.secretKey,
	fields : {
		pub_key : {
			type : Exonum.String,
			size : 32,
			from : 0,
			to : 32
		},
		name : {
			type : Exonum.Int8,
			size : 8,
			from : 32,
			to : 40
		}
	}
});

var data = {
		pub_key: pair.publicKey,
		name: 'John Doe',
	};

var buffer = Exonum.serialize(data, CreateWalet);

var signature = Exonum.sign(data, CreateWalet);

var hash = Exonum.hash(data, CreateWalet);

var http = require('http');

var port = (process.env.PORT || process.env.VCAP_APP_PORT || 8888);

http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type' : 'text/plain'
	});
	res.end('We Are Happy!\n Operation hash: ' + hash);
}).listen(port);

console.log('Server running at http://127.0.0.1:' + port);


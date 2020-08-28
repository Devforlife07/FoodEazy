const http = require('http');
const https = require('https');
const qs = require('querystring');
const port = 8080;
const checksum_lib = require('./checksum.js');

var PaytmConfig = {
	mid: "XXXXXXXXXXXXXXXXXXXX",
	key: "XXXXXXXXXXXXXXXX",
	website: "XXXXXXXXXX"
}


http.createServer(function (req, res) {

	switch(req.url){
		case "/":
			var params 						= {};
			params['MID'] 					= PaytmConfig.mid;
			params['WEBSITE']				= PaytmConfig.website;
			params['CHANNEL_ID']			= 'WEB';
			params['INDUSTRY_TYPE_ID']	= 'Retail';
			params['ORDER_ID']			= 'TEST_'  + new Date().getTime();
			params['CUST_ID'] 			= 'Customer001';
			params['TXN_AMOUNT']			= '1.00';
			params['CALLBACK_URL']		= 'http://localhost:'+port+'/callback';
			params['EMAIL']				= 'abc@mailinator.com';
			params['MOBILE_NO']			= '7777777777';

			checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

				var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
				// var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production
				
				var form_fields = "";
				for(var x in params){
					form_fields += "<input type='hidden' name='"+x+"' value='"+params[x]+"' >";
				}
				form_fields += "<input type='hidden' name='CHECKSUMHASH' value='"+checksum+"' >";

				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="'+txn_url+'" name="f1">'+form_fields+'</form><script type="text/javascript">document.f1.submit();</script></body></html>');
				res.end();
			});
		break;
	
		case "/callback":

			var body = '';
	        
	        req.on('data', function (data) {
	            body += data;
	        });

	        req.on('end', function () {
				var html = "";
				var post_data = qs.parse(body);


				// received params in callback
				console.log('Callback Response: ', post_data, "\n");
				html += "<b>Callback Response</b><br>";
				for(var x in post_data){
					html += x + " => " + post_data[x] + "<br/>";
				}
				html += "<br/><br/>";


				// verify the checksum
				var checksumhash = post_data.CHECKSUMHASH;
				// delete post_data.CHECKSUMHASH;
				var result = checksum_lib.verifychecksum(post_data, PaytmConfig.key, checksumhash);
				console.log("Checksum Result => ", result, "\n");
				html += "<b>Checksum Result</b> => " + (result? "True" : "False");
				html += "<br/><br/>";



				// Send Server-to-Server request to verify Order Status
				var params = {"MID": PaytmConfig.mid, "ORDERID": post_data.ORDERID};

				checksum_lib.genchecksum(params, PaytmConfig.key, function (err, checksum) {

					params.CHECKSUMHASH = checksum;
					post_data = 'JsonData='+JSON.stringify(params);

					var options = {
						hostname: 'securegw-stage.paytm.in', // for staging
						// hostname: 'securegw.paytm.in', // for production
						port: 443,
						path: '/merchant-status/getTxnStatus',
						method: 'POST',
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Content-Length': post_data.length
						}
					};


					// Set up the request
					var response = "";
					var post_req = https.request(options, function(post_res) {
						post_res.on('data', function (chunk) {
							response += chunk;
						});

						post_res.on('end', function(){
							console.log('S2S Response: ', response, "\n");

							var _result = JSON.parse(response);
							html += "<b>Status Check Response</b><br>";
							for(var x in _result){
								html += x + " => " + _result[x] + "<br/>";
							}

							res.writeHead(200, {'Content-Type': 'text/html'});
							res.write(html);
							res.end();
						});
					});

					// post the data
					post_req.write(post_data);
					post_req.end();
				});
	        });
			
		break;
	}
	

}).listen(port);

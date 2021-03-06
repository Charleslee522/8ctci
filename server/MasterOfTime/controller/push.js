var request = require('request');

module.exports.send = function(channelAccessToken, to_, messages_) {
	var headers = {
		'Content-type':'application/json',
		'Authorization':'Bearer ' + channelAccessToken
	};

	var options = {
		url: 'https://api.line.me/v2/bot/message/push',
		method: 'POST',
		headers: headers,
		json: {
			//to : to_,
			to : to_,
			messages : messages_
		}
	};

	request(options, function(error, response, body) {
		console.log('error:', error); // Print the error if one occurred 
		console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        console.log('body:', body); // Print the HTML for the Google homepage. 
		console.log('response', response.statusCode);
	});
};

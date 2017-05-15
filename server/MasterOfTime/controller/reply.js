var request = require('request');

module.exports.send = function(channelAccessToken, replyToken_, messages_) {
	var headers = {
		'Content-type':'application/json',
		'Authorization':'Bearer ' + channelAccessToken
	};

	var options = {
		url: 'https://api.line.me/v2/bot/message/reply',
		method: 'POST',
		headers: headers,
		json: {
			replyToken : replyToken_,
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

module.exports.sendMessage = function(channelAccessToken, replyToken_, string_) {
	var message = [{"type": "text", "text" : string_}];
	this.send(channelAccessToken, replyToken_, message);
}
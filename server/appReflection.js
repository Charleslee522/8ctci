var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var request = require('request');

function send(channelAccessToken, replyToken_, messages_) {
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

app.set('port', process.env.PORT || 8000);

var https_server = app.listen(app.get('port'), function() {
	console.log('Express https server listening on port ' + https_server.address().port);
});

app.get('/', (req, res) => {
	console.log('[GET]/');
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end('<h1><a href="http://8ctci.weebly.com">Hello, I\'m the Master of Time!</a><h1>');
});

const CHANNEL_ACCESS_TOKEN="";

app.post('/hook', (req, res) => {
	var eventObj = req.body.events[0];
	var source = eventObj.source;
	var message = eventObj.message;
	console.log('======================', new Date() ,'======================');
	console.log('[request]', req.body);
	console.log('[request source] ', source);
	console.log('[request message]', message);
	console.log('[request text]', message.text);
	if(message.type == "text") {
		var message = [{"type": "text", "text" : message.text}];
		send(CHANNEL_ACCESS_TOKEN, eventObj.replyToken, message);
	}
	res.sendStatus(200);
});

module.exports = app;

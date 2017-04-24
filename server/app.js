var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var AlarmManager = require('./MasterOfTime/controller/AlarmManager');
const Runner = require('./MasterOfTime/controller/AlarmRunner');

var alarmManager = new AlarmManager();

const requestSender = require('request');
const push = require('./MasterOfTime/controller/push')
const reply = require('./MasterOfTime/controller/reply');
const LINE_CONSTS = require('./MasterOfTime/model/line');

app.set('port', process.env.PORT || 8000);

var https_server = app.listen(app.get('port'), function() {
	console.log('Express https server listening on port ' + https_server.address().port);
});

app.get('/', (req, res) => {
	console.log('[GET]/');
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end('<h1><a href="http://8ctci.weebly.com">Hello, I\'m the Master of Time!</a><h1>');
});

app.get('/hook', (req, res) => {
	console.log('[GET]hook!');
	res.writeHead(200, {'Content-Type' : 'text/html'});
	res.end('<h1><a href="http://8ctci.weebly.com">Hello, I\'m the Master of Time!</a><h1>');
});

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
		var runner = Runner.getRunner(message.text);
		if(runner) {
			runner.setId(eventObj.replyToken);
			runner.setChannelAccessToken(LINE_CONSTS.CHANNEL_ACCESS_TOKEN);
			runner.run();
		}
		else {	// if runner is null or undefined
			var message = [{"type": "text", "text" : "요청 메시지가 잘못 되었습니다 :)"}];
			reply.send(LINE_CONSTS.CHANNEL_ACCESS_TOKEN, eventObj.id, message);
		}
	}
	res.sendStatus(200);
});

app.get('/log', function(req, res){
	fs.readFile('server.log','utf8',function(err, data){
		if(err){
			console.log(err);
			res.status(500).send('Internal Sever Error');
		}
		data = data.replace(/(?:\r\n|\r|\n)/g,'<br/>');
		res.send(data);
	});
});

app.get('/remove', function(req, res){  
  alarmManager.run('remove');
  res.send('remove');
});

// app.get('/on', function(req, res){
//   alarmManager.run('on');
//   res.send('on');
// });

// app.get('/off', function(req, res){
//   alarmManager.run('off');
//   res.send('off');
// });

// app.get('/list', function(req, res){
//   alarmManager.run('list');
//   res.send('list');
// });

app.post('/alarm', function(req, res){
  var desc = req.body.desc;
  var id = req.body.id;
  var message = [{"type": "text", "text" : req.body.alarmName}];
  push.send(LINE_CONSTS.CHANNEL_ACCESS_TOKEN, eventObj.id, message);
  console.log(alarmManager.getAlarmDesc(alarmName));
});

// app.post('/list', function(req, res){
//   var list = req.body.list;
//   res.send("<h1>"+list+"</h1>");
//   console.log(list);
// });

app.get('/clear', function(req, res){
  alarmManager.run('clear');
  res.send('clear');
});

// app.listen(8000, function(){
//   console.log('Connected 8000 port!');
// });

module.exports = app;
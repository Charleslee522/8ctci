var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var AlarmManager = require('./MasterOfTime/controller/AlarmManager');
var Manager = require('./MasterOfTime/controller/Manager');

var alarmManager = new AlarmManager();

const requestSender = require('request');
const reply = require('./MasterOfTime/controller/reply.js');
const LINE_CONSTS = require('./MasterOfTime/model/line.js');

app.set('port', process.env.PORT || 3000);

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
		var manager = Manager.createManager(message.text);
		manager.setId(eventObj.replyToken);
		manager.setChannelAccessToken(LINE_CONSTS.CHANNEL_ACCESS_TOKEN);
		manager.run();
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

// app.get('/create', function(req, res){
//   alarmManager.run('create');
//   res.send('create');
// });

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

// app.post('/alarm', function(req, res){
//   var desc = req.body.desc;
//   var alarmName = req.body.alarmName;
//   res.send("<h1>"+desc+"</h1>");
//   console.log(alarmManager.getAlarmDesc(alarmName));
// });

// app.post('/list', function(req, res){
//   var list = req.body.list;
//   res.send("<h1>"+list+"</h1>");
//   console.log(list);
// });

// app.listen(3000, function(){
//   console.log('Connected 3000 port!');
// });

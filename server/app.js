var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var Alarm = require('./model/Alarm');
var AlarmManager = require('./controller/AlarmManager');

var alarmManager = new AlarmManager();

app.get('/',function(req, res){
  res.send('<h1>Hello World !!</h1><br> <h1>My name is "Master of Time"</h1>');
});

app.get('/create', function(res, req){
  alarmManager.create(res,req);
});

app.get('/remove', alarmManager.remove);

app.post('/alarm', function(req, res){
  var desc = req.body.desc;
  var alarmName = req.body.alarmName;
  res.send("<h1>"+desc+"</h1>");
  console.log(alarmManager.getAlarmDesc(alarmName));
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});

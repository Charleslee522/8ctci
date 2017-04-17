var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
var Alarm = require('./MasterOfTime/model/Alarm');
var AlarmManager = require('./MasterOfTime/controller/AlarmManager');

var alarmManager = new AlarmManager();

app.get('/remove', function(req, res){  
  alarmManager.run('remove');
  res.send('remove');
});

app.get('/create', function(req, res){
  alarmManager.run('create');
  res.send('create');
});

app.get('/on', function(req, res){
  alarmManager.run('on');
  res.send('on');
});

app.get('/off', function(req, res){
  alarmManager.run('off');
  res.send('off');
});

app.get('/list', function(req, res){
  alarmManager.run('list');
  res.send('list');
});

app.post('/alarm', function(req, res){
  var desc = req.body.desc;
  var alarmName = req.body.alarmName;
  res.send("<h1>"+desc+"</h1>");
  console.log(alarmManager.getAlarmDesc(alarmName));
});

app.post('/list', function(req, res){
  var list = req.body.list;
  res.send("<h1>"+list+"</h1>");
  console.log(list);
});

app.listen(3000, function(){
  console.log('Connected 3000 port!');
});

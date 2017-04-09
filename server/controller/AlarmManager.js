var schedule = require('node-schedule');
var request = require('request');
var Alarm = require('../model/Alarm');
//var alarm_list = [];
function AlarmManager(){
  var alarms=[];

  this.create = function(req, res) {
    var creator_ = 'creator';
    var time_ = "20 * * * * *";
    var alarmName_ = "my_alarm";
    var desc_ = "Alarm!! 삐용~~ 삐용~~";
    var room_ = "cs room";
    //create alarm
    var alarm = new Alarm(creator_, time_, alarmName_, desc_, room_);
    if(alarms[alarmName_]!==undefined){
      res.send("aleady exist alarm name : "+alarm_name_);
      return;
    }
    //create job
    alarm.job = schedule.scheduleJob(time_, function() {
        request.post({
                url: 'http://localhost:3000/alarm',
                body: {
                    desc: desc_,
                    alarmName: alarmName_
                },
                json: true
            },
            function(err, httpResponse, body) {}
        );
    });
    //insert alarms
    alarms[alarmName_] = alarm;
    res.send(alarm.print());
  };

  this.getAlarmDesc = function(alarmName){
    if(alarms[alarmName]===undefined){
      return "not found alarm : "+alarmName;
    }
    return alarms[alarmName].print();
  };

  this.remove = function(req, res){
    var alarmName = req.query.alarmName;
    if(alarms[alarmName]!==undefined){
      alarms[alarmName].cancel();
      delete alarms[alarmName];
      res.send("canceled "+alarmName);
    }else{
      res.send("not found "+alarmName);
    }
  };
}

module.exports = AlarmManager;

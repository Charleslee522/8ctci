var schedule = require('node-schedule');
var request = require('request');
var Alarm = require('../model/Alarm');
//var alarm_list = [];
function AlarmManager(){
  var alarms=[];

  this.run = function(argStr){
    //call arg parser
    var creator_ = 'creator';
    var time_ = "20 * * * * *";
    var alarmName_ = "my_alarm";
    var desc_ = "Alarm!! 삐용~~ 삐용~~";
    var room_ = "cs room";

    var action = argStr;

    switch (action){
      case 'create':create(creator_, time_, alarmName_, desc_, room_);break;
      case 'remove':remove(alarmName_);break;
      case 'on':on(alarmName_);break;
      case 'off':off(alarmName_);break;
      case 'list':showList();break;
      default:break;
    }

  };

  var create = function(creator_, time_, alarmName_, desc_, room_) {

    //create alarm
    var alarm = new Alarm(creator_, time_, alarmName_, desc_, room_);
    if(alarms[alarmName_]!==undefined){
      console.log("aleady exist alarm name : "+alarmName_);
      return;
    }

    alarms[alarmName_] = alarm;
    on(alarmName_);
    console.log(alarm.print());
  };

  var enable = function(alarmName, enable){
    if(alarms[alarmName]===undefined){
      return "not found alarm : "+alarmName;
    }
    if(enable_){
      on(alarmName);
    }else{
      off(alarmName);
    }
  };

  var on = function(alarmName_){
    if(alarms[alarmName_]===undefined){
      console.log("not found alarm : "+alarmName_);
      return;
    }
    alarms[alarmName_].job = schedule.scheduleJob(alarms[alarmName_].time, function() {
        request.post({
                url: 'http://localhost:3000/alarm',
                body: {
                    desc: alarms[alarmName_].desc,
                    alarmName: alarmName_
                },
                json: true
            },
            function(err, httpResponse, body) {
              if(err)console.log(err);
            }
        );
    });
  };

  var off = function(alarmName_){
    if(alarms[alarmName_]===undefined){
      console.log("not found alarm : "+alarmName_);
      return;
    }
    alarms[alarmName_].job.cancel();
  };

  this.getAlarmDesc = function(alarmName){
    if(alarms[alarmName]===undefined){
      return "not found alarm : "+alarmName;
    }
    return alarms[alarmName].desc;
  };

  var remove = function(alarmName){
    if(alarms[alarmName]!==undefined){
      alarms[alarmName].job.cancel();
      delete alarms[alarmName];
      console.log("canceled "+alarmName);
    }else{
      console.log("not found "+alarmName);
    }
  };

  var showList = function(){
    var list_="";
    for(var i in alarms) {
      list_+=alarms[i].print()+'\r\n';
    }
    request.post({
            url: 'http://localhost:3000/list',
            body: {
                list:list_
            },
            json: true
        },
        function(err, httpResponse, body) {
          if(err)console.log(err);
        }
    );
  };
}



module.exports = AlarmManager;

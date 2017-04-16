var schedule = require('node-schedule');
var request = require('request');
var Alarm = require('../model/Alarm');
var ResultMessage = require('./ResultMessage');

function AlarmManager(){
  var alarms=[];
  var resultMessage = new ResultMessage();

  this.run = function(argStr){
    //call arg parser
    var creator_ = 'creator';
    var time_ = "20 * * * * *";
    var alarmName_ = "my_alarm";
    var desc_ = "Alarm!! 삐용~~ 삐용~~";
    var room_ = "cs room";

    var action = argStr;    

    switch (action){
      case 'create':
      create(creator_, time_, alarmName_, desc_, room_);break;
      case 'remove':
      remove(alarmName_);break;
      case 'on':
      on(alarmName_);break;
      case 'off':
      off(alarmName_);break;
      case 'list':
      showList();break;
      case 'clear':
      clearAlarms();break;
      default:
      console.log('\''+action+'\' 등록되지 않은 명령어 입니다.');break;
    }
    return resultMessage;
  };

  var create = function(creator_, time_, alarmName_, desc_, room_) {

    //create alarm
    var alarm = new Alarm(creator_, time_, alarmName_, desc_, room_);
    if(hasAlarm(alarmName_)){
      resultMessage.result = false;
      resultMessage.message = '\"'+alarmName_+'\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.';
      resultMessage.obj = null;
      return;
    }

    alarms[alarmName_] = alarm;
    on(alarmName_);
    resultMessage.result = true;
    resultMessage.message = "알람 생성 완료!!";
    resultMessage.obj = alarm;
  };

  var on = function(alarmName_){
    if(!hasAlarm(alarmName_)){
      resultMessage.result = false;
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

  var off = function(alarmName){
    if(!hasAlarm(alarmName)){
      resultMessage.result = false;
      return;
    }
    alarms[alarmName].job.cancel();
  };

  var remove = function(alarmName){
    if(!hasAlarm(alarmName)){
      resultMessage.result = false;
      return;
    }
    
    off(alarmName);
    delete alarms[alarmName];
    resultMessage.result = true;
    resultMessage.message = '\"'+alarmName+'\" 알람을 제거하였습니다.';
  };

  var showList = function(){
    var list_="";
    for(var i in alarms) {
      list_+=alarms[i].print()+'\r\n';
    }
    resultMessage.message = list_;
    resultMessage.reslut = true;

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

  var hasAlarm = function(alarmName){
    if(alarms[alarmName]===undefined){
      resultMessage.message = '\"'+alarmName+'\" 으로 등록된 알람이 없습니다.';
      return false;
    }
    return true;
  };

  this.getAlarmDesc = function(alarmName){
    if(!hasAlarm(alarmName)){
      resultMessage.result = false;
      return;
    }
    return alarms[alarmName].desc;
  };

  var clearAlarms = function(){
    console.log("clear start : "+alarms.length);
    for(var i in this.alarms) {
      remove(alarms[i].alarmName);
    }
    if(alarms.length===0){
      resultMessage.message = "모든 알람 제거 완료.";
      resultMessage.result = true;
      console.log("clear end : "+alarms.length);
    }else{
      resultMessage.message = "모든 알람 제거 실패.";
      resultMessage.result = false;
    }
    return resultMessage;
  };
}



module.exports = AlarmManager;

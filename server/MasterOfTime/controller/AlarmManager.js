var schedule = require('node-schedule');
var request = require('request');
var Alarm = require('../model/Alarm');
var Manager = require('../controller/Manager');
var ResultMessage = require('./ResultMessage');
var logger = require('logger').createLogger('server.log');

function AlarmManager() {
  var alarms = [];
  var resultMessage = new ResultMessage();

  this.run = function (args) {
    //call arg parser
    var creator = 'malshan';
    var time = args.getTime();
    var alarmName = args.getName();
    var desc = "Alarm!! 삐용~~ 삐용~~";
    var room = "cs room";
    var action = args.getQuery();
    
    logger.info(action);
    switch (action) {
      case 'create':
        create(creator, time, alarmName, desc, room); break;
      case 'remove':
        remove(alarmName); break;
      case 'on':
        on(alarmName); break;
      case 'off':
        off(alarmName); break;
      case 'list':
        showList(); break;
      default:
        logger.info('\'' + action + '\' 등록되지 않은 명령어 입니다.');
        console.log('\'' + action + '\' 등록되지 않은 명령어 입니다.'); break;
    }
    logger.info(resultMessage.message);
    //console.log(resultMessage.message);
    return resultMessage;
  };
  /**
   * 알람을 생성합니다.
   * @param {알람을 생성한 사람} creator 
   * @param {알람 시간} time 
   * @param {알람 이름} alarmName 
   * @param {알람 설명} desc 
   * @param {알람을 생성한 방 이름} room 
   */
  var create = function (creator, time, alarmName, desc, room) {

    //create alarm
    var alarm = new Alarm(creator, time, alarmName, desc, room);
    if (hasAlarm(alarmName)) {
      resultMessage.result = false;
      resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.';
      return;
    }

    alarms[alarmName] = alarm;

    createJob(alarmName);
    alarm.active = true;
    resultMessage.result = true;
    resultMessage.message = "알람 생성 완료!!";
  };

  /**
   * 알람을 작동 시킵니다.
   * @param {알람 이름} alarmName
   */
  var on = function (alarmName) {
    if (!hasAlarm(alarmName)) {
      resultMessage.result = false;
      return;
    }
    if (alarms[alarmName].active) {
      resultMessage.message = "이미 켜져있는 알람입니다."
      resultMessage.result = false;
      return;
    }

    createJob(alarmName);

    alarms[alarmName].active = true;
    resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 시작 되었습니다.';
  };

  /**
   * 알람을 중지 시킵니다.
   * @param {알람 이름} alarmName 
   */
  var off = function (alarmName) {
    if (!hasAlarm(alarmName)) {
      resultMessage.result = false;
      return;
    }
    if (!alarms[alarmName].active) {
      resultMessage.message = '이미 꺼져있는 알람 입니다.';
      resultMessage.result = false;
      return;
    }

    cancelJob(alarmName);

    alarms[alarmName].active = false;
    resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 중지 되었습니다.'
    resultMessage.result = true;

  };

  /**
   * 알람을 제거 합니다.
   * @param {알람 이름} alarmName 
   */
  var remove = function (alarmName) {
    if (!hasAlarm(alarmName)) {
      resultMessage.result = false;
      return;
    }

    cancelJob(alarmName);
    delete alarms[alarmName];
    resultMessage.result = true;
    resultMessage.message = '\"' + alarmName + '\" 알람을 제거하였습니다.';
  };

  /**
   * 등록된 알람의 목록을 반환합니다.
   */
  var showList = function () {
    var list_ = "";
    for (var i in alarms) {
      list_ += alarms[i].print() + '\r\n';
    }
    resultMessage.message = list_;
    resultMessage.reslut = true;

    request.post({
      url: 'http://localhost:8000/list',
      body: {
        list: list_
      },
      json: true
    },
      function (err, httpResponse, body) {
        if (err) {
          logger.error(err);
        }
      }
    );
  };

  /**
   * 알람 목록에 해당 알람이 있는지 여부를 반환 합니다.
   * @param {알람 이름} alarmName 
   */
  var hasAlarm = function (alarmName) {
    if (alarms[alarmName] === undefined) {
      resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 없습니다.';
      return false;
    }
    return true;
  };

  /**
   * 알람의 설명을 반환 합니다.
   * @param {알람 이름} alarmName
   */
  this.getAlarmDesc = function (alarmName) {
    if (!hasAlarm(alarmName)) {
      resultMessage.result = false;
      return;
    }
    return alarms[alarmName].desc;
  };

  /**
   * 알람의 job을 생성합니다.
   * @param {알람 이름} alarmName 
   */
  var createJob = function (alarmName) {
    alarms[alarmName].job = schedule.scheduleJob(alarms[alarmName].time, function () {
      request.post({
        url: 'http://localhost:3000/alarm',
        body: {
          desc: alarms[alarmName].desc,
          alarmName: alarmName
        },
        json: true
      },
        function (err, httpResponse, body) {
          if (err) {
            logger.error(err);
          }
        }
      );
    });
  }

  /**
   * 알람의 job을 중지(제거) 합니다.
   * @param {알람 이름} alarmName 
   */
  var cancelJob = function (alarmName) {
    if (alarms[alarmName].job === undefined) {
      logger.info('job 을 찾을 수 없습니다. (\"' + alarmName + '\")');
      return;
    }
    alarms[alarmName].job.cancel();
  }

/**
* 모든 알람을 제거 합니다.
*/
  this.clearAlarms = function () {
    for (var i in alarms) {
      remove(alarms[i].alarmName);
    }

    resultMessage.message = "모든 알람 제거 완료.";
    resultMessage.result = true;

    return resultMessage;
  };
}



module.exports = AlarmManager;

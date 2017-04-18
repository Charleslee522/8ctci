var schedule = require('node-schedule');
var request = require('request');
var Alarm = require('../model/Alarm');
var ResultMessage = require('./ResultMessage');
var logger = require('logger').createLogger('server.log');

function AlarmManager() {
  var alarms = [];
  var resultMessage = new ResultMessage();

  this.run = function (argStr) {
    //call arg parser
    var creator_ = 'creator';
    var time_ = "20 * * * * *";
    var alarmName_ = "my_alarm";
    var desc_ = "Alarm!! 삐용~~ 삐용~~";
    var room_ = "cs room";

    var action = argStr;
    logger.info(action);
    switch (action) {
      case 'create':
        create(creator_, time_, alarmName_, desc_, room_); break;
      case 'remove':
        remove(alarmName_); break;
      case 'on':
        on(alarmName_); break;
      case 'off':
        off(alarmName_); break;
      case 'list':
        showList(); break;
      default:
        logger.info('\'' + action + '\' 등록되지 않은 명령어 입니다.');
        console.log('\'' + action + '\' 등록되지 않은 명령어 입니다.'); break;
    }
    logger.info(resultMessage.message);
    console.log(resultMessage.message);
    return resultMessage;
  };
  /**
   * 알람을 생성합니다.
   * @param {알람을 생성한 사람} creator_ 
   * @param {알람 시간} time_ 
   * @param {알람 이름} alarmName_ 
   * @param {알람 설명} desc_ 
   * @param {알람을 생성한 방 이름} room_ 
   */
  var create = function (creator_, time_, alarmName_, desc_, room_) {

    //create alarm
    var alarm = new Alarm(creator_, time_, alarmName_, desc_, room_);
    if (hasAlarm(alarmName_)) {
      resultMessage.result = false;
      resultMessage.message = '\"' + alarmName_ + '\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.';
      return;
    }

    alarms[alarmName_] = alarm;

    createJob(alarmName_);
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
          console.log(err);
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
  var createJob = function (alarmName_) {
    alarms[alarmName_].job = schedule.scheduleJob(alarms[alarmName_].time, function () {
      request.post({
        url: 'http://localhost:8000/alarm',
        body: {
          desc: alarms[alarmName_].desc,
          alarmName: alarmName_
        },
        json: true
      },
        function (err, httpResponse, body) {
          if (err) {
            console.log(err);
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
      consol.log('job 을 찾을 수 없습니다. (\"' + alarmName + '\")');
      return;
    }
    alarms[alarmName].job.cancel();
  }

/**
* 모든 알람을 제거 합니다.
*/
  this.clearAlarms = function () {
    for (var i in alarms) {
      console.log(alarms[i].alarmName);
      remove(alarms[i].alarmName);
    }

    resultMessage.message = "모든 알람 제거 완료.";
    resultMessage.result = true;

    return resultMessage;
  };
}



module.exports = AlarmManager;

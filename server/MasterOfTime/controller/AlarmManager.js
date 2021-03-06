var schedule = require('node-schedule');
var request = require('request');
var Alarm = require('../model/Alarm');
var ResultMessage = require('./ResultMessage');
var logger = require('logger').createLogger('server.log');
var MongoHelper = require('../../db/mongodb-helper');


var alarmManager = null;


function AlarmManager() {
  var alarms = [];
  /**
   * DB에 있는 알람을 읽어와 등록합니다.
  */
  this.initAlarm = function () {
    var initFunc = function (alarmModels) {
      logger.info("init 중입니다!");
      console.log("init 중입니다!");
      alarmModels.forEach(function (model) {
        alarmModel = model._doc;
        var alarmName = alarmModel.alarmName;
        var id = alarmModel.id;
        var alarm = new Alarm("", alarmModel.time, alarmName, alarmModel.desc, "", alarmModel.id);
        alarms[alarmName + id] = alarm;
        if (alarmModel.active === true) {
          createJob(alarmName, id);
        }
      });
    };
    var dbInstance = new MongoHelper();
    dbInstance.allFind(initFunc);
    return;
  };

  this.run = function (alarmRunner) {
    //call arg parser
    var creator = 'malshan';
    var time = alarmRunner.getTime();
    var name = alarmRunner.getName();
    var desc = alarmRunner.getDesc();
    var room = "<none>";
    var action = alarmRunner.getQuery();
    var id = alarmRunner.getId();

    logger.info(action);
    switch (action) {
      case 'create':
        resultMessage = create(creator, time, name, desc, room, id); break;
      case 'remove':
        resultMessage = remove(name, id); break;
      case 'on':
        resultMessage = on(name, id); break;
      case 'off':
        resultMessage = off(name, id); break;
      case 'mute':
        resultMessage = mute(id); break;
      case 'wake':
        resultMessage = wake(id); break;
      case 'list':
        resultMessage = showList(id); break;
      default:
        logger.info('\'' + action + '\' 등록되지 않은 명령어 입니다.');
        console.log('\'' + action + '\' 등록되지 않은 명령어 입니다.'); break;
    }
    logger.info(resultMessage.message);
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
  var create = function (creator, time, alarmName, desc, room, id) {

    var resultMessage = new ResultMessage();
    if (hasAlarm(alarmName, id)) {
      resultMessage.result = false;
      resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.';
      return resultMessage;
    }

    //create alarm
    var alarm = new Alarm(creator, time, alarmName, desc, room, id);

    alarms[alarmName + id] = alarm;
    createJob(alarmName, id);
    alarm.active = true;

    var dbInstance = new MongoHelper(changeJson(alarm));
    dbInstance.save();

    resultMessage.result = true;
    resultMessage.message = "알람 생성 완료!!";
    return resultMessage;
  };

  /**
   * 알람을 작동 시킵니다.
   * @param {알람 이름} alarmName
   */
  var on = function (alarmName, id) {
    var resultMessage = new ResultMessage();
    if (!hasAlarm(alarmName, id)) {
      resultMessage.result = false;
      return resultMaessage;
    }
    if (alarms[alarmName + id].active) {
      resultMessage.message = "이미 켜져있는 알람입니다.";
      resultMessage.result = false;
      return resultMessage;
    }

    createJob(alarmName, id);

    alarms[alarmName + id].active = true;

    var dbInstance = new MongoHelper({ "alarmName": alarmName, "id": id }, changeJson(alarms[alarmName + id]));
    dbInstance.findOneAndUpdate();

    resultMessage.result = true;
    resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 시작 되었습니다.';
    return resultMessage;
  };

  /**
   * 알람을 중지 시킵니다.
   * @param {알람 이름} alarmName 
   */
  var off = function (alarmName, id) {
    var resultMessage = new ResultMessage();

    if (!hasAlarm(alarmName, id)) {
      resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 없습니다.';
      resultMessage.result = false;
      return resultMessage;
    }
    if (!alarms[alarmName + id].active) {
      resultMessage.message = '이미 꺼져있는 알람 입니다.';
      resultMessage.result = false;
      return resultMessage;
    }

    cancelJob(alarmName, id);

    alarms[alarmName + id].active = false;
    resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 중지 되었습니다.';

    var dbInstance = new MongoHelper({ "alarmName": alarmName, "id": id }, changeJson(alarms[alarmName + id]));
    dbInstance.findOneAndUpdate();

    resultMessage.result = true;
    return resultMessage;
  };
  /**
   * 모든 알람을 중지 시킵니다.
   * @param {알람 이름} alarmName 
   */
  var mute = function (id) {
    var resultMessage = new ResultMessage();
    for(var key in alarms) {
      if(key.endsWith(id)) {
        alarms[key].active = false;
        var alarmName = alarms[key].alarmName;

        cancelJob(alarmName, id);

        var dbInstance = new MongoHelper({ "alarmName": alarmName, "id": id }, changeJson(alarms[alarmName + id]));
        dbInstance.findOneAndUpdate();
      }
    }
    
    resultMessage.message = '모든 알람이 중지 되었습니다.';
    resultMessage.result = true;
    return resultMessage;
  };

  /**
   * 모든 알람을 시작 시킵니다.
   * @param {알람 이름} alarmName 
   */
  var wake = function (id) {
    var resultMessage = new ResultMessage();
    for(var key in alarms) {
      if(key.endsWith(id)) {
        alarms[key].active = true;
        var alarmName = alarms[key].alarmName;

        createJob(alarmName, id);

        var dbInstance = new MongoHelper({ "alarmName": alarmName, "id": id }, changeJson(alarms[alarmName + id]));
        dbInstance.findOneAndUpdate();
      }
    }    
    resultMessage.message = '모든 알람이 시작 되었습니다.';
    resultMessage.result = true;
    return resultMessage;
  };

  /**
   * 알람을 제거 합니다.
   * @param {알람 이름} alarmName 
   */
  var remove = function (alarmName, id) {
    var resultMessage = new ResultMessage();

    if (!hasAlarm(alarmName, id)) {
      resultMessage.result = false;
      resultMessage.message = '\"' + alarmName + '\" 으로 등록된 알람이 없습니다.';
      return resultMessage;
    }

    var dbInstance = new MongoHelper(changeJson(alarms[alarmName + id]));
    dbInstance.remove();

    cancelJob(alarmName, id);
    delete alarms[alarmName + id];

    resultMessage.result = true;
    resultMessage.message = '\"' + alarmName + '\" 알람을 제거하였습니다.';

    return resultMessage;
  };

  /**
   * 등록된 알람의 목록을 반환합니다.
   */
  var showList = function (id) {

    var resultMessage = new ResultMessage();
    var list_ = "";
    for (var i in alarms) {
      if (id === undefined || id == alarms[i].id) {
        list_ += alarms[i].print() + '\r\n';
      }
    }
    if (list_.length === 0) {
      list_ = '등록된 알람이 없습니다!';
    }
    resultMessage.message = list_;
    resultMessage.result = true;

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
    return resultMessage;
  };

  /**
   * 알람 목록에 해당 알람이 있는지 여부를 반환 합니다.
   * @param {알람 이름} alarmName 
   */
  var hasAlarm = function (alarmName, id) {
    if (alarms[alarmName + id] === undefined) {
      return false;
    }
    return true;
  };

  var changeJson = function (alarm) {
    var jsonModel = {
      alarmName: alarm.alarmName,
      creator: alarm.creatro,
      time: alarm.time,
      active: alarm.active,
      id: alarm.id,
      room: alarm.romm,
      desc: alarm.desc
    };

    return jsonModel;
  };

  /**
   * 알람의 job을 생성합니다.
   * @param {알람 이름} alarmName 
   */
  var createJob = function (alarmName, id) {
    alarms[alarmName + id].job = schedule.scheduleJob(alarms[alarmName + id].time, function () {
      request.post({
        url: 'http://localhost:8000/alarm',
        body: {
          desc: alarms[alarmName + id].desc,
          alarmName: alarmName,
          id: alarms[alarmName + id].id
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
  };

  /**
   * 알람의 job을 중지(제거) 합니다.
   * @param {알람 이름} alarmName 
   */
  var cancelJob = function (alarmName, id) {
    if (alarms[alarmName + id].job === undefined) {
      logger.info('job 을 찾을 수 없습니다. (\"' + alarmName + '\")');
      return;
    }
    alarms[alarmName + id].job.cancel();
  };

  /**
  * 모든 알람을 제거 합니다.
  */
  this.clearAlarms = function () {
    for (var i in alarms) {
      remove(alarms[i].alarmName, alarms[i].id);
    }

    resultMessage.message = "모든 알람 제거 완료.";
    resultMessage.result = true;

    return resultMessage;
  };


}

function getAlarmManager() {
  if (!alarmManager) {
    alarmManager = new AlarmManager();
    alarmManager.initAlarm();
  }
  return alarmManager;
}


module.exports = getAlarmManager;

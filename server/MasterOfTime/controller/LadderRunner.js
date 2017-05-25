// Author: Charles

var ResultMessage = require('./ResultMessage');
var Ladder = require('./Ladder');
var RandomUtil = require('./RandomUtil');
var util = require('util');
var ladderTime = require('../model/LadderTime.json');
var schedule = require('node-schedule');

var ladderManager = null;

function LadderManager() {
  var games = {};

  this.getRandomTime = function(time) {
    var randomDay = RandomUtil.randomFromRange(time.dayofweek);
    var hour = RandomUtil.randomFromRange(time.hour);
    var minute = RandomUtil.randomFromRange(time.minute);

    return util.format('%s %s * * %s', minute, hour, randomDay);
  }

  this.run = function(ladderRunner) {

    var resultMessage = new ResultMessage();

    resultMessage.message = '랜덤 사다리 알람 설정 완료!!';
    resultMessage.result = true;

    var jobs = {};
    for(var key in ladderTime) {
        var timeStr = this.getRandomTime(ladderTime[key]);
        console.log(key + ': ' + timeStr);
        schedule.scheduleJob(key, this.getRandomTime(ladderTime[key]), function () {
            pushMessage();
        });
    }


    var weeklyTime = util.format('0 0 * * 0');
    var weeklyLadderManageJob = schedule.scheduleJob(weeklyTime, function () {
        schedule.rescheduleJob(ladderJob, this.getRandomTime());
    });
    
    return resultMessage;
  }
}

function getLadderManager() {
    if(!ladderManager) {
      ladderManager = new LadderManager();
    }
    return ladderManager;
}

function LadderRunner() {
	this.ladderManager = getLadderManager();
}

LadderRunner.prototype.run = function() {
	return this.ladderManager.run(this);
}

LadderRunner.prototype.setChannelAccessToken = function(_token) {
    this.token = _token;
}

LadderRunner.prototype.getChannelAccessToken = function() {
    return this.token;
}

LadderRunner.prototype.setId = function(_id) {
    this.id = _id;
}

LadderRunner.prototype.getId = function() {
    return this.id;
}

LadderRunner.prototype.getQuery = function() {
    return this.query;
}

LadderRunner.prototype.getResult = function() {
    return this.result;
}

module.exports = LadderRunner;
// Author: Charles
var getAlarmManager = require('./AlarmManager');

var getArgsParser = require('./ArgsParser');
var BaseballRunner = require('./BaseballRunner');

var runner = null;

function AlarmRunner(cmd) {
	try {
		this.argsParser = getArgsParser();
		this.args = this.argsParser.parse(cmd);
		this.alarmManager = getAlarmManager();
	} catch (e) {
		var message = null;
		if(e.message.startsWith('\r\nExample:')) {
			message = e.message;
		} else {
			message = '잘못된 명령어가 입력되었습니다.';
		}
		throw Error(message);
	}
}

AlarmRunner.prototype.run = function() {
	return this.alarmManager.run(this);
}

AlarmRunner.prototype.getTime = function() {
	return this.args.getTime();
}

AlarmRunner.prototype.getQuery = function() {
	return this.args.getQuery();
}

AlarmRunner.prototype.getName = function() {
	return this.args.getName();
}

AlarmRunner.prototype.getDesc = function() {
	return this.args.getDesc();
}

AlarmRunner.prototype.setChannelAccessToken = function(_token) {
    this.token = _token;
}

AlarmRunner.prototype.getChannelAccessToken = function() {
    return this.token;
}

AlarmRunner.prototype.setId = function(_id) {
    this.id = _id;
}

AlarmRunner.prototype.getId = function() {
    return this.id;
}

function getRunner(cmd) {
	if(cmd.startsWith("@alarm ")) {
		runner = new AlarmRunner(cmd.substr("@alarm ".length));
	} else if(cmd.startsWith("@알람 ")) {
		runner = new AlarmRunner(cmd.substr("@알람 ".length));
	} else if(cmd.startsWith("@baseball ")) {
		runner = new BaseballRunner(cmd.substr("@baseball ".length));
	} else if(cmd.startsWith("@야구 ")) {
		runner = new BaseballRunner(cmd.substr("@야구 ".length));
	} else {
		runner = null;
	}
	return runner;
}

module.exports = 
{
    getRunner
}
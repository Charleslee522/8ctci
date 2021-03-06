// Author: Charles
var getAlarmManager = require('./AlarmManager');
var getArgsParser = require('./ArgsParser');

function AlarmRunner(cmd) {
	try {
		this.argsParser = getArgsParser();
		this.args = this.argsParser.parse(cmd);
		this.alarmManager = getAlarmManager();
	} catch (e) {
		var message = null;
		if(e.message.startsWith('Example:')) {
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

module.exports = AlarmRunner
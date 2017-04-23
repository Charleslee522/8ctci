// Author: Charles
var getAlarmManager = require('./AlarmManager');

var getArgsParser = require('./ArgsParser');
var runner = null;

function AlarmRunner(cmd) {
	this.argsParser = getArgsParser();
	this.args = this.argsParser.parse(cmd);
    //this.alarmManager = new AlarmManager();
	this.alarmManager = getAlarmManager();
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
		//if(!runner) {
			runner = new AlarmRunner(cmd.substr(7));
		//}
		return runner;
	} else {
		return null;
	}
}

//module.exports(ArgParser);
module.exports = 
{
    getRunner
}
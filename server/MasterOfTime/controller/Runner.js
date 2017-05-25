var AlarmRunner = require('./AlarmRunner');
var BaseballRunner = require('./BaseballRunner');
var LadderRunner = require('./LadderRunner');

var runner = null;

function getRunner(cmd) {
	if(cmd.startsWith("@alarm ")) {
		runner = new AlarmRunner(cmd.substr("@alarm ".length));
	} else if(cmd.startsWith("@알람 ")) {
		runner = new AlarmRunner(cmd.substr("@알람 ".length));
	} else if(cmd.startsWith("@baseball ")) {
		runner = new BaseballRunner(cmd.substr("@baseball ".length));
	} else if(cmd.startsWith("@야구 ")) {
		runner = new BaseballRunner(cmd.substr("@야구 ".length));
	} else if(cmd.startsWith("@ladder")) {
		runner = new LadderRunner();
	} else if(cmd.startsWith("@사다리")) {
		runner = new LadderRunner();
	} else {
		runner = null;
	}
	return runner;
}

module.exports = 
{
    getRunner
}
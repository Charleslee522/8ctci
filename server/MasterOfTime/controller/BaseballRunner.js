// Author: Charles

var ResultMessage = require('./ResultMessage');
var Baseball = require('./Baseball');
var baseballManager = null;

function BaseballManager() {
  var games = {};
  

  this.run = function(baseballRunner) {
    var resultMessage = new ResultMessage();
    var query = baseballRunner.query;
    switch(query) {
    case 'create':
        resultMessage.message = '야구 게임을 새로 생성했습니다!';
        resultMessage.result = true;
        baseball = new Baseball();
        baseball.setRandom();
        games[baseballRunner.getId()] = baseball;
        break;
    case 'run':
        resultMessage.result = true;
        resultMessage.message = games[baseballRunner.getId()].swing(baseballRunner.input);
        break;
    default:
        break;
    }
    return resultMessage;
  }
}
function getBaseballManager() {
    if(!baseballManager) {
      baseballManager = new BaseballManager();
    }
    return baseballManager;
}

function BaseballRunner(cmd) {
	this.baseballManager = getBaseballManager();
    if(cmd.trim() == '시작') {
        this.query = "create";
    } else if (cmd.match('\\d \\d \\d')) {
        this.query = "run";
        this.input = cmd.split(' ');
    } else {
        this.query = "error";
    }
}

BaseballRunner.prototype.run = function() {
	return this.baseballManager.run(this);
}

BaseballRunner.prototype.setChannelAccessToken = function(_token) {
    this.token = _token;
}

BaseballRunner.prototype.getChannelAccessToken = function() {
    return this.token;
}

BaseballRunner.prototype.setId = function(_id) {
    this.id = _id;
}

BaseballRunner.prototype.getId = function() {
    return this.id;
}

BaseballRunner.prototype.getQuery = function() {
    return this.query;
}

BaseballRunner.prototype.getResult = function() {
    return this.result;
}

module.exports = BaseballRunner;
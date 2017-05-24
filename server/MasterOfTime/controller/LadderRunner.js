// Author: Charles

var ResultMessage = require('./ResultMessage');
var Ladder = require('./Ladder');
var ladderManager = null;

function LadderManager() {
  var games = {};
  

  this.run = function(ladderRunner) {
    var resultMessage = new ResultMessage();
    var query = ladderRunner.query;
    switch(query) {
    case 'create':
        resultMessage.message = '야구 게임을 새로 생성했습니다!';
        resultMessage.result = true;
        ladder = new Ladder();
        ladder.setRandom();
        games[ladderRunner.getId()] = ladder;
        break;
    case 'run':
        resultMessage.result = true;
        resultMessage.message = games[ladderRunner.getId()].swing(ladderRunner.input);
        break;
    default:
        break;
    }
    return resultMessage;
  }
}
function getLadderManager() {
    if(!ladderManager) {
      ladderManager = new LadderManager();
    }
    return ladderManager;
}

function LadderRunner(cmd) {
	this.ladderManager = getLadderManager();
    if(cmd.trim() == '시작') {
        this.query = "create";
    } else {
        var re = cmd.match('(\\d)[ .,;:_-]+(\\d)[ .,;:_-]+(\\d)');
        if(re && re[0].length == cmd.length) {
            this.query = "run";
            this.input = [];
            this.input.push(re[1]);
            this.input.push(re[2]);
            this.input.push(re[3]);
        } else {
            throw Error(e);
        }
    }
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
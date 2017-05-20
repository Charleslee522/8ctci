var chai = require('chai');
var ResultMessage = require('../MasterOfTime/controller/ResultMessage');
var Runner = require('../MasterOfTime/controller/AlarmRunner');

var should = chai.should();

describe('Baseball Manager', function () {
    it('create', function() {
        var runner = Runner.getRunner('@야구 시작');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('야구 게임을 새로 생성했습니다!');

        runner = Runner.getRunner('@야구 1 2 3');
        runner.setId(1);
        resultMessage = runner.run();
        
        resultMessage.result.should.equal(true);
        
        runner = Runner.getRunner('@야구 0 9 4');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(true);
    });

});

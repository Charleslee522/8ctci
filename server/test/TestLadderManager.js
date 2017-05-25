var chai = require('chai');
var should = chai.should();

var LadderRunner = require('../MasterOfTime/controller/AlarmManager');
var Runner = require('../MasterOfTime/controller/Runner');

describe('사다리', function() {
    it('설정', function() {
        var runner = Runner.getRunner('@사다리');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('랜덤 사다리 알람 설정 완료!!');

    });
});
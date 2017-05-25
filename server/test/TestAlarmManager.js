var chai = require('chai');
var getAlarmManager = require('../MasterOfTime/controller/AlarmManager');
var ResultMessage = require('../MasterOfTime/controller/ResultMessage');
var Runner = require('../MasterOfTime/controller/Runner');
var ArgsParser = require('../MasterOfTime/controller/ArgsParser');

var should = chai.should();

describe('AlarmManager', function () {
    it('create', function() {
        var runner = Runner.getRunner('@alarm -c -t "* * 5 * *" -n my_alarm');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');
    });

    it('create use exist name', function(){
        var runner = Runner.getRunner('@알람 -c -t "* * 5 * *" -n my_alarm');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(false);
        resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.');
    });

    it('create use new name', function(){
        var runner = Runner.getRunner('@alarm -c -t "* * 5 * *" -n your_alarm');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');
    });

    it('off alarm', function(){
        var runner = Runner.getRunner('@alarm -off your_alarm');
        runner.setId(1);
        resultMessage = runner.run();

        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('"your_alarm" 으로 등록된 알람이 중지 되었습니다.');
    });

    it('show alarm list', function(){
        var runner = Runner.getRunner('@alarm -ls');
        runner.setId(1);
        resultMessage = runner.run();
        resultMessage.result.should.equal(true);        
        var list = '이름: my_alarm\r\n시간: * * 5 * *\r\n설명: \r\n상태: 켜짐\r\n\r\n';
        list+='이름: your_alarm\r\n시간: * * 5 * *\r\n설명: \r\n상태: 꺼짐\r\n\r\n';
        resultMessage.message.should.equal(list);
    });
    
    it('alarm off', function(){
        var runner = Runner.getRunner('@alarm -off my_alarm');
        runner.setId(1);
        resultMessage = runner.run();
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('"my_alarm" 으로 등록된 알람이 중지 되었습니다.');
    });

    it('alarm on', function(){
        var runner = Runner.getRunner('@alarm -on my_alarm');
        runner.setId(1);
        resultMessage = runner.run();
        resultMessage.result.should.equal(true);
        console.log(resultMessage.message);
        resultMessage.message.should.equal('"my_alarm" 으로 등록된 알람이 시작 되었습니다.');
    });

    it('remove alarm', function(){
        var runner = Runner.getRunner('@alarm -rm my_alarm');
        runner.setId(1);
        resultMessage = runner.run();
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('\"my_alarm\" 알람을 제거하였습니다.');
    });

    it('remove again', function(){
        var runner = Runner.getRunner('@alarm -rm my_alarm');
        runner.setId(1);
        resultMessage = runner.run();
        resultMessage.result.should.equal(false);
        resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 없습니다.');
    });

    it('clear alarm manager', function () {
        var runner = Runner.getRunner('@alarm -c -t "* * * 5 * *" -n my_alarm');
        runner.setId(1);
        resultMessage = runner.run();
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');

        var alarmManager = getAlarmManager();
        resultMessage = alarmManager.clearAlarms();
        resultMessage.message.should.equal('모든 알람 제거 완료.');
        resultMessage.result.should.equal(true);

        var runner2 = Runner.getRunner('@alarm -ls');
        runner2.setId(1);
        resultMessage = runner2.run();
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('등록된 알람이 없습니다!');
    });

});

describe('Alarm Runner', function() {

    it('Alarm create', () => {
        var runner = Runner.getRunner('@alarm -c -t "* * * 5 * *" -n jw');
        runner.setChannelAccessToken('token');
        runner.setId('ID');

        runner.token.should.equal('token');
        runner.id.should.equal('ID');
        runner.getName().should.equal('jw');
        runner.getTime().should.equal('* * * 5 * *');
    });
    
    it('Wrong cmd', () => {
        var runner = Runner.getRunner('@alam -c -t "* * * 5 * *" -n jw');
        should.equal(runner, null);
    });
    
    it('Wrong cmd2', () => {
        try{
            var runner = Runner.getRunner('@알람 -ㅣㄴ');
        } catch (e) {
            should.equal(runner, undefined);
        }
    });

});

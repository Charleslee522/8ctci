var chai = require('chai');
var AlarmManager = require('../MasterOfTime/controller/AlarmManager');
var ResultMessage = require('../MasterOfTime/controller/ResultMessage');
var Manager = require('../MasterOfTime/controller/Manager');


var should = chai.should();

describe('AlarmManager', function () {
    var alarmManager = new AlarmManager();
    var resultMessage = new ResultMessage();
    //var argParser = new AlarmArgParser();
    var args;

    it('create', function () {
        args = new Manager.AlarmArgParser('-c -t "* * * 5 * *" -n my_alarm');

        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');
    });

    it('create use exist name', function(){
        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(false);
        resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.');
    });

    it('create use new name', function(){
        args = new Manager.AlarmArgParser('-c -t "* * * 5 * *" -n your_alarm');

        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');
    });

    it('show alarm list', function(){
        args = new Manager.AlarmArgParser('-ls your_alarm');

        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(true);        
        var list = 'creator : malshan, time : * * * 5 * *, alarm name : my_alarm, description : Alarm!! 삐용~~ 삐용~~, room : cs room\r\n';
        list+='creator : malshan, time : * * * 5 * *, alarm name : your_alarm, description : Alarm!! 삐용~~ 삐용~~, room : cs room\r\n';
        resultMessage.message.should.equal(list);
    });

    it('remeve alarm', function(){
        args = new Manager.AlarmArgParser('-rm my_alarm');
        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('\"my_alarm\" 알람을 제거하였습니다.');
    });

    it('remove again', function(){
        args = new Manager.AlarmArgParser('-rm my_alarm');
        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(false);
        resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 없습니다.');
    });

    it('clear alarm manager', function () {

        args = new Manager.AlarmArgParser('-c -t "* * * 5 * *" -n my_alarm');
        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');

        resultMessage = alarmManager.clearAlarms();
        resultMessage.message.should.equal('모든 알람 제거 완료.');
        resultMessage.result.should.equal(true);

        args = new Manager.AlarmArgParser('-ls your_alarm');
        resultMessage = alarmManager.run(args);
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('');
    });

});

describe('Alarm', function(){
    it('Alarm Object Create', function(){
        var alarm = Manager.createManager('@alarm -c -t "* * * 5 * *" -n jw');
        alarm.query.should.equal('create');
    });
});

describe('Alarm', function() {
    it('Alarm set function', () => {
        var alarm = Manager.createManager('@alarm -c -t "* * * 5 * *" -n jw');
        alarm.setChannelAccessToken('token');
        alarm.setId('ID');

        alarm.token.should.equal('token');
        alarm.id.should.equal('ID');
        
    });
});

describe('Alarm', function() {
    it('Alarm create', () => {
        var alarm = Manager.createManager('@alarm -c -t "* * * 5 * *" -n jw');
        alarm.setChannelAccessToken('token');
        alarm.setId('ID');

        alarm.token.should.equal('token');
        alarm.id.should.equal('ID');
        alarm.name.should.equal('jw');
        alarm.time.should.equal('* * * 5 * *');
    });
    
});
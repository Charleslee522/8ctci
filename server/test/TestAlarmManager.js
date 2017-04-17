var chai = require('chai');
var AlarmManager = require('../controller/AlarmManager');
var ResultMessage = require('../controller/ResultMessage');

var should = chai.should();

describe('AlarmManager', function(){
    var alarmManager = new AlarmManager();
    var resultMessage = new ResultMessage();
    it('create and remove', function(){        
        resultMessage = alarmManager.run('create');
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');

        resultMessage = alarmManager.run('create');
        resultMessage.result.should.equal(false);
        resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 이미 있습니다. 다른 이름으로 등록해주세요.');

        resultMessage = alarmManager.run('remove');
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('\"my_alarm\" 알람을 제거하였습니다.');

        resultMessage = alarmManager.run('remove');
        resultMessage.result.should.equal(false);
        resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 없습니다.');

        resultMessage = alarmManager.run('create');
        resultMessage.result.should.equal(true);
        resultMessage.message.should.equal('알람 생성 완료!!');
    });

    // it('clear alarm manager', function(){
    //     resultMessage = alarmManager.run('list');
    //     console.log('show '+resultMessage.message);
        
    //     resultMessage = alarmManager.run('clear');
    //     //resultMessage = alarmManager.clearAlarms();
    //     resultMessage.message.should.equal('모든 알람 제거 완료.');
    //     resultMessage.result.should.equal(true);

    //     resultMessage = alarmManager.run('list');
    //     console.log('show '+resultMessage.message);

    //     resultMessage = alarmManager.run('remove');
    //     resultMessage = alarmManager.run('remove');
    //     resultMessage.result.should.equal(false);
    //     resultMessage.message.should.equal('\"my_alarm\" 으로 등록된 알람이 없습니다.');
    // });

});
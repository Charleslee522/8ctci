var schedule = require('node-schedule');
var request = require('request');

function Alarm(creator, time, alarmName, desc, room, id) {
    this.creator = creator;
    this.time = time;
    this.alarmName = alarmName;
    this.desc = desc;
    this.room = room;
    this.active = true;
    this.id = id;
}

Alarm.prototype.print = function() {
    return  "알람 이름: " + this.alarmName +
            ", 설정 시간: " + this.time +       
            ", 설명: " + this.desc;
};

module.exports = Alarm;

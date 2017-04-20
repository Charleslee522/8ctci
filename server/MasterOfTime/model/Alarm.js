var schedule = require('node-schedule');
var request = require('request');

function Alarm(creator, time, alarmName, desc, room) {
    this.creator = creator;
    this.time = time;
    this.alarmName = alarmName;
    this.desc = desc;
    this.room = room;
    this.active = true;
}

Alarm.prototype.print = function() {
    return "creator : " + this.creator +
        ", time : " + this.time +
        ", alarm name : " + this.alarmName +
        ", description : " + this.desc +
        ", room : "+ this.room;
};

module.exports = Alarm;

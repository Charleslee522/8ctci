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
    return "creator : " + this.creator +
        ", time : " + this.time +
        ", alarm name : " + this.alarmName +
        ", description : " + this.desc +
        ", room : "+ this.room;
};

module.exports = Alarm;

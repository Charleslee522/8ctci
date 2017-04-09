var schedule = require('node-schedule');
var request = require('request');

function Alarm(creator, time, alarm_name, desc, room) {
    this.creator = creator;
    this.time = time;
    this.alarm_name = alarm_name;
    this.desc = desc;
    this.room = room;
}

Alarm.prototype.print = function() {
    return "creator : " + this.creator +
        ", time : " + this.time +
        ", alarm name : " + this.alarm_name +
        ", description : " + this.desc +
        ", room : "+ this.room;
};

Alarm.prototype.cancel = function() {
    this.job.cancel();
    console.log("cancel : " + this.alarm_name);
};

module.exports = Alarm;

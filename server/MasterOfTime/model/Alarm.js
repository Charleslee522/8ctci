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
    return  "alarm name : " + this.alarmName +
            ", time : " + this.time +       
            ", description : " + this.desc;
};

module.exports = Alarm;

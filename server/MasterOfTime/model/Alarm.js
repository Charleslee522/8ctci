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
    var desc;
    if(this.desc === null){
        desc="";
    }else{
        desc = this.desc;
    }

    var status;
    if(this.active){
        status = "켜짐";
    }else{
        status = "꺼짐";
    }
    return  "이름: " + this.alarmName +
            "\r\n시간: " + this.time +       
            "\r\n설명: " + desc +
            "\r\n상태: "+ status +
            "\r\n";
};

module.exports = Alarm;

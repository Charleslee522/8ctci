const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const alarmSchema = new Schema({
    alarmName: String,
    creator: String,
    active:{type:Boolean,default:true},
    time:String,
    desc:{type:String,default:"null"},
    id:String,
    room:String
});

module.exports = mongoose.model('alarm', alarmSchema);

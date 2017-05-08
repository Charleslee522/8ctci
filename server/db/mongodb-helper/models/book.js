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

alarmSchema.index({alarmName:1,creator:1,time:1,id:1,room:1},{unique:true});

module.exports = mongoose.model('alarm', alarmSchema);

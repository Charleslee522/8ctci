// Author: Charles

var ArgsParser = require('./ArgsParser');

function AlarmArgParser(cmd) {
        var argsParser = new ArgsParser();
		var args = argsParser.parse(cmd);
		this.query = args.getQuery();
		this.time = args.getTime();
		this.name = args.getName();
}

AlarmArgParser.prototype.run = function() {
		var replyMessage = [{"type": "text", "text" : message.text}];
		reply.send(LINE_CONSTS.CHANNEL_ACCESS_TOKEN, eventObj.replyToken, replyMessage);
}

AlarmArgParser.prototype.setChannelAccessToken = function(token) {
    this.token = token;
}

AlarmArgParser.prototype.setId = function(id) {
    this.id = id;
}

function createManager(cmd) {
	if(cmd.startsWith("@alarm ")) {
		return new AlarmArgParser(cmd.substr(7));
	} else {
		return new AlarmArgParser();
	}
}

//module.exports(ArgParser);
module.exports = 
{
    createManager,
	AlarmArgParser
}
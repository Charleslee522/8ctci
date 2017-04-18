
class ArgParser {
    constructor() {

    }
}

class AlarmArgParser extends ArgParser {
	constructor(cmd) {
		super();
        this.cmd = cmd;
        
	}
}


function createArgParser(cmd) {
	if(str.startswith("@alarm")) {
		return new AlarmArgParser(cmd);
	} else {
		return new ArgParser();
	}
}

// module.exports(ArgParser);
// module.exports(AlarmArgParser);'
module.exports = {
    createArgParser: function(cmd) {
        if(cmd.startsWith("@alarm")) {
            return new AlarmArgParser(cmd);
        } else {
            return new ArgParser();
        }
    }
}

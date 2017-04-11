var ArgumentParser = require('argparse').ArgumentParser;

var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});

parser.addArgument(
  [ '-a', '--Alarm' ],
  {
    help:'use Master of time!!',
    nargs: 0
  }
);
parser.addArgument(
  [ '-c', '-mk' ],
  {
    help: '*    *    *    *    *    *',
    nargs: 5
  }
);
parser.addArgument(
  '--baz',
  {
    help: 'baz bar'
  }
);
var args = parser.parseArgs('-a -c 42 * * * *'.split(' '));
console.log(args);
parser.printHelp();
// var optiondefinitions = [
//   { name: 'Alarm', alias: 'a', type: String},
//   { name: 'mk', alias: 'c', type: String},
//   { name: 'desc', alias: 'd', type: String},
//   { name: 'list', alias: 'ls', type: String},
//   { name: 'on', alias: 'on', type: String},
//   { name: 'remove', alias:'rm', type: String}
// ];
//
// var options = commandLineArgs(optiondefinitions);

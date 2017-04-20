 // Author: racerKim
 
 var ArgsParser = function() {
   var ArgumentParser = require('argparse').ArgumentParser;

   var parser = new ArgumentParser({
     version: '0.0.1',
     addHelp: true,
     description: 'Alarm bot Argrment Parser'
   });
   parser.addArgument(
     ['-c', '-mk', ], {
       help: 'create alarm',
       nargs: 0
     }
   );
   parser.addArgument(
     ['-t', '-time', ], {
       help: 'alarm time',
       nargs: 6
     }
   );
   parser.addArgument(
     ['-n', '-name', ], {
       help: 'alarm name',
       nargs: 1
     }
   );
  /* parser.addArgument(
     ['-d', '-description', ], {
       help: 'alarm description',
       nargs: 1
     }
   );*/
   parser.addArgument(
     ['-ls', '-list'], {
       help: 'alram list',
       nargs: 1
     }
   );
   parser.addArgument(
     '-on', {
       help: 'activate alram',
       nargs: 1
     }
   );
   parser.addArgument(
     '-off', {
       help: 'deactivate alram',
       nargs: 1
     }
   );
   parser.addArgument(
     '-rm', {
       help: 'remove alram',
       nargs: 1
     }
   );

   function isUndefined(str) {
     return !str;
   }

   ArgsParser.prototype.parse = function(commands) {
     var args = parser.parseArgs(commands.split(' '));
     //var args = parser.parseArgs(commands);

     var ParsedCommands = require('../model/ParsedCommands');
     var result = new ParsedCommands();

     var argName = ['c', 'n', 't', 'on', 'off', 'rm', 'ls'];
     argName.forEach(function(element) {
       var command = args.get(element);
       if (! isUndefined(command)) {
         switch (element) {
           case 'c':
             result.setQuery('create');
             break;
           case 'n':
             result.setName(command[0]);
             break;
           case 't':
             result.setTime(command[0], command[1], command[2], command[3], command[4], command[5]);
             break;
           case 'on':
             result.setQuery('on');
             result.setOn(command[0]);
             break;
           case 'off':
             result.setQuery('off');
             result.setOff(command[0]);
             break;
           case 'rm':
             result.setQuery('remove');
             result.setRemove(command[0]);
             break;
           case 'ls':
             result.setQuery('list');
             result.setList(command[0]);
             break;
           default:
             break;
         }
       }
     });
     return result;
   }

 }

 module.exports = ArgsParser;

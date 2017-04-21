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
       nargs: 1
     }
   );
   parser.addArgument(
     ['-n', '-name', ], {
       help: 'alarm name',
       nargs: 1
     }
   );
   parser.addArgument(
     ['-d', '-description', ], {
       help: 'alarm description',
       nargs: 1
     }
   );
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
     ['-rm', '-remove'], {
       help: 'remove alram',
       nargs: 1
     }
   );

   function isUndefined(str) {
     return !str;
   }

   const wsReplacerRegex = /#_#/g; // wsReplacer를 찾는 정규표현식
   const wsReplacer = '#_#'; // white space 치환 문자
   function mergeQuotedStr(strArr) {
     var mergedArr = new Array();
     for (var i = 0; i < strArr.length; i++) {
       var str = strArr[i];
       if (strArr[i].match(/^"/)) {
         var strQuoted = "";
         for (var j = i; j < strArr.length; j++) {
           if (!strArr[j].match(/"$/)) {
             strQuoted += strArr[j] + wsReplacer;
           } else {
             strQuoted += strArr[j];
             i = j;
             break;
           }
         }
         mergedArr.push(strQuoted.replace(/"/g, ''));
       } else {
         mergedArr.push(str);
       }
     }
     return mergedArr;
   }

   ArgsParser.prototype.parse = function(commands) {
     var args = mergeQuotedStr(commands.split(' '));
     args = parser.parseArgs(args);

     var ParsedCommands = require('../model/ParsedCommands');
     var result = new ParsedCommands();

     var argName = ['c', 'mk', 'n', 'name','d', 'description', 't', 'time','on', 'off', 'rm', 'remove', 'ls', 'list'];
     argName.forEach(function(element) {
       var command = args.get(element);
       if (!isUndefined(command)) {
         switch (element) {
           case 'c':
           case 'mk':
             result.setQuery('create');
             break;
           case 'n':
           case 'name':
             result.setName(command[0].replace(wsReplacerRegex, ' '));
             break;
           case 'd':
           case 'description':
             result.setDesc(command[0].replace(wsReplacerRegex, ' '));
             break;
           case 't':
           case 'time':
             result.setTime(command[0].replace(wsReplacerRegex, ' '));
             break;
           case 'on':
             result.setQuery('on');
             result.setOn(command[0].replace(wsReplacerRegex, ' '));
             break;
           case 'off':
             result.setQuery('off');
             result.setOff(command[0].replace(wsReplacerRegex, ' '));
             break;
           case 'rm':
           case 'remove':
             result.setQuery('remove');
             result.setName(command[0].replace(wsReplacerRegex, ' '));
             break;
           case 'ls':
             result.setQuery('list');
             result.setList(command[0].replace(wsReplacerRegex, ' '));
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

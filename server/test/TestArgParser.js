// Author: Charles

var chai = require('chai');
var ArgsParser = require('../MasterOfTime/controller/ArgsParser');

var should = chai.should();

describe('ArgsParser', function () {
    it('parsing command good', function () {
        var argsParser = new ArgsParser();
        var result = argsParser.parse('-c -t * * * 5 * * -n jw');
        result.getQuery().should.equal('create');
        result.getTime().should.equal('* * * 5 * *');
        result.getName().should.equal('jw');
    });

    it('parsing command @alarm', function () {
        var argsParser = new ArgsParser();
        var result = argsParser.parse('-c -t * * * 5 * * -n jw');
        result.getQuery().should.equal('create');
        result.getTime().should.equal('* * * 5 * *');
        result.getName().should.equal('jw');
    });

    it('parsing command @alarm rm', function () {
        var argsParser = new ArgsParser();
        var result = argsParser.parse('-rm jw');
        result.getQuery().should.equal('remove');
        result.getName().should.equal('jw');
    });

});

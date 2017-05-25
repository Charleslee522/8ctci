var Util = require('./Util');

function Ladder(){
    this.arr = [];

    Ladder.prototype.setRandom = function(){
        this.arr.push(Util.randomDigit())
        this.arr.push(Util.randomDigit());
        this.arr.push(Util.randomDigit());
        while(this.arr[0] == this.arr[1]) {
            this.arr[1] = Util.randomDigit();
        }

        while(this.arr[2] == this.arr[0] || this.arr[2] == this.arr[1]) {
            this.arr[2] = Util.randomDigit();
        }
        return true;
    }

    Ladder.prototype.reset = function() {
        this.arr = [];
    }

    Ladder.prototype.answer = function() {
        return this.arr;
    }

}

module.exports = Ladder

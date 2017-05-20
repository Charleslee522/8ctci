function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}
function randomDigit() {
    return randomInt(0, 10);
}

function Baseball(){
        this.arr = [];

    Baseball.prototype.setRandom = function(){
        this.arr.push(randomDigit())
        this.arr.push(randomDigit());
        this.arr.push(randomDigit());
        while(this.arr[0] == this.arr[1]) {
            this.arr[1] = randomDigit();
        }

        while(this.arr[2] == this.arr[0] || this.arr[2] == this.arr[1]) {
            this.arr[2] = randomDigit();
        }
        return true;
    }

    Baseball.prototype.reset = function() {
        this.arr = [];
    }

    Baseball.prototype.answer = function() {
        return this.arr;
    }

    Baseball.prototype.printResult = function(strike, ball){
        if(strike == 3) {
            return '3 strike!! Success!!';
        }
        
        if(strike == 0 && ball == 0) {
            return 'out!!';
        }
        
        message = ''
        if(strike > 0) {
            message += strike.toString() + ' Strike! ';
        }
        if(ball > 0) {
            message += ball.toString() + ' Ball! ';
        }
        return message;
    }

    Baseball.prototype.swing = function(iarr){
        ball = 0
        strike = 0
        if (this.arr[0] == iarr[0]) {
            strike += 1
        }
        else if(this.arr[0] == iarr[1] || this.arr[0] == iarr[2]){
            ball += 1
        }
        else {
            //ball #do nothing
        }

        if(this.arr[1] == iarr[1]) {
            strike += 1
        }
        else if(this.arr[1] == iarr[0] || this.arr[1] == iarr[2]) {
            ball += 1
        }
        else {
            //ball #do nothing
        }

        if(this.arr[2] == iarr[2]) {
            strike += 1;
        }
        else if(this.arr[2] == iarr[0] || this.arr[2] == iarr[1]) {
            ball += 1;
        }
        else {
            //ball #do nothing
        }

        return this.printResult(strike, ball);
    }
}

module.exports = Baseball

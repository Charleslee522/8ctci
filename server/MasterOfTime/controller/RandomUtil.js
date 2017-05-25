var randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}

var randomDigit = function() {
    return randomInt(0, 10);
}

var randomFromRange = function(str) {
    var result = 0;
    var splitted = str.split('-');
    if(splitted.length === 1){
        result = splitted[0];
    } else if(splitted.length === 2) {
        result = randomInt(+splitted[0], +splitted[1]);
    } else {
        result = 0;
    }
    return result;
}

module.exports = {
    randomInt,
    randomDigit,
    randomFromRange
}
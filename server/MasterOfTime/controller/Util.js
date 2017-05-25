var randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low)) + low;
}
var randomDigit = function() {
    return randomInt(0, 10);
}

module.exports = {
    randomInt,
    randomDigit
}
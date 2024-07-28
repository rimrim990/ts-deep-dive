/**
 * CommonJS Module syntax
 */

const class = require('./class')

function absolute(num: number) {
    if (num < 0) return num * -1
    return num;
}

module.exports = {
    pi: 3.14,
    absolute,
}
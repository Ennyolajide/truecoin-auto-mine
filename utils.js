function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function interval(env) {
    return getRandom(parseInt(env.MIN_INTERVAL), parseInt(env.MAX_INTERVAL));
}


module.exports = { interval }
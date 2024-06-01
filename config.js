require('dotenv').config();

const env = process.env;
const baseUrl = 'https://bot.true.world';

const urls = {
    auth: `${baseUrl}/auth/signIn`,
    spin: `${baseUrl}/game/spin`,
}

function setToken(token) {
    return `Bearer ${token}`;
}

function getHeaders(headers = {}) {
    return {
        ...headers,
        'Accept': 'application/json, text/plain, */*',
        'sendtime': new Date(Date.now()).toISOString(),
        'Sec-Fetch-Site': 'same-origin',
        'Accept-Language': 'en-GB,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Fetch-Mode': 'cors',
        'Content-Type': 'application/json',
        'Origin': 'https://bot.true.world',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148',
        'Referer': 'https://bot.true.world/',
        'Connection': 'keep-alive',
        'Sec-Fetch-Dest': 'empty',
    };
}

module.exports = { urls, setToken, getHeaders }

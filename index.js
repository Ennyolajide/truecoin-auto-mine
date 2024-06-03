require('dotenv').config();
const axios = require('axios');
const { interval } = require('./utils');
const { urls, getHeaders } = require('./config');
const { spin, logInfo, exitProcess } = require('./requests');

const env = process.env;
const telegramId = env.TELEGRAM_ID;

async function main() {
    try {
        const data = { userId: telegramId };
        axios.post(urls.auth, data, { headers: getHeaders() })
            .then((res) => {
                const { token, user } = res.data;
                token ? logInfo(user) : false;

                // Function to execute
                function handleCoinCollection() {
                    token ? spin(token) : exitProcess();
                }

                handleCoinCollection();

                setInterval(handleCoinCollection, (interval(env) * 1000));
            })
            .catch(error => {
                console.log(error);
                exitProcess();
            });
    } catch (error) {
        console.log(error);
    }
}


main();

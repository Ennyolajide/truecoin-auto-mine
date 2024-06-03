const chalk = require('chalk');
const axios = require('axios');
const { urls, setToken, getHeaders } = require('./config');

async function spin(token) {
    const headers = getHeaders({ 'Authorization': setToken(token) });
    return await axios.get(urls.spin, { headers: headers }).then((res) => {
        const { result, user } = res.data;
        result ? logSpin(result, user) : false;
        (user?.currentSpins > 0) ? false : exitProcess(); 
    }).catch((error) => {
        logError(error);
        exitProcess();
    });
}

function logInfo(obj) {
    console.log(
        'Username:', chalk.blue(obj?. username),
        '| Status:', chalk.green(obj?.status),
        '| Coins:', chalk.yellow(obj?.coins),
        '| Spins:', chalk.cyan(obj?.currentSpins),
        '| Max Spins:', chalk.magenta(obj?.maxSpins),
    );
}

function logSpin(result, user) {
    console.log(
        'Spining ---', chalk.yellow('-->'),
        '| Slots:', chalk.blue(result?.slots),
        '| Result:', `${result?.winType == 'coins' ? chalk.green('\u2714') : chalk.red('\u2716')}`,
        '| Coins:', chalk.yellow(user?.coins),
        '| Spins:', chalk.cyan(user?.currentSpins),
        '| Max Spins:', chalk.magenta(user?.maxSpins),
    );
}


function logError(error) {
    console.log(error.response ? error.response.data : error.request ? error.request : 'Error', error.message);
}

function exitProcess() {
    console.log(chalk.red('Error collecting coin - Exiting...'));
    process.exit();
}

module.exports = { spin, logInfo, logError, exitProcess }

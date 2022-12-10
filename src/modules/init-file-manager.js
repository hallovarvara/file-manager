import readline from 'readline';
import { executeCommandStream } from './execute-command-stream.js';
import { welcomeUser } from './welcome-user.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { exit } from './exit.js';
import { write } from '../lib/utils/write.js';
import { throwError } from '../lib/utils/throw-error.js';
import { STOP_COMMAND } from '../lib/constants/index.js';

export const initFileManager = async () => {
    const readingLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    welcomeUser();

    write(`If you would like to exit, press "Ctrl + C" or type "${STOP_COMMAND}" on a new line and press Enter
Type "help" or ".help" to get commands list`);

    showCurrentPath();

    readingLine
        .on('line', async (line) => {
            const command = line.toString().trim();
            // const [command, ...args] = lineToString.split(' ');
            await executeCommandStream(command);
        })
        .on('error', (error) => {
            throwError({ error, showCurrentPath: true });
        })
        .on('end', () => {
            exit();
        });

    process.stdin.on('keypress', (chunk, key) => {
        if (key && key.name === 'c' && key.ctrl) {
            exit();
        }
    });
};

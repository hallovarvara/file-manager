import readline from 'readline';
import { executeCommandStream } from './execute-command-stream.js';
import { welcomeUser } from './welcome-user.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { exit } from './exit.js';
import { write } from '../lib/utils/write.js';
import { throwError } from '../lib/utils/throw-error.js';
import { HELP_COMMAND_MESSAGE } from '../lib/constants/index.js';
import { COMMAND_EXIT } from '../lib/constants/commands.js';

export const initFileManager = async () => {
    const readingLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    welcomeUser();

    write(`If you would like to exit, press "Ctrl + C" or type "${COMMAND_EXIT}" on a new line and press Enter
${HELP_COMMAND_MESSAGE}`);

    showCurrentPath();

    readingLine
        .on('line', async (line) => {
            await executeCommandStream(line.toString().trim());
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

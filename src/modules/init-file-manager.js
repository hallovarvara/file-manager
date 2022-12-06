import { pipeline } from 'stream';
import { executeCommandStream } from './execute-command-stream.js';
import { welcomeUser } from './welcome-user.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { exit } from './exit.js';
import { write } from '../lib/utils/write.js';
import { throwError } from '../lib/utils/throw-error.js';
import { STOP_COMMAND, HOME_DIRECTORY } from '../lib/constants/index.js';

export const initFileManager = async () => {
    const readable = process.stdin;
    const writable = process.stdin;

    welcomeUser();

    showCurrentPath(HOME_DIRECTORY);

    write(`If you would like to exit, press "Ctrl + C" or type "${STOP_COMMAND}" on a new line and press Enter
Type "help" or ".help" to get commands list
    `);

    pipeline(readable, executeCommandStream, writable, (error) => {
        throwError({ error });
    });

    process.on('SIGINT', () => {
        exit();
    });
};

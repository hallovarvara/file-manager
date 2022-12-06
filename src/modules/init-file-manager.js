import { pipeline } from 'stream';
import { executeCommandStream } from './execute-command-stream.js';
import { welcomeUser } from './welcome-user.js';
import { exit } from './exit.js';
import { write } from '../lib/utils/write.js';
import { throwError } from '../lib/utils/throw-error.js';
import { STOP_COMMAND, HOME_DIRECTORY } from '../lib/constants';

export const initFileManager = async () => {
    const readable = process.stdin;
    const writable = process.stdin;

    welcomeUser();

    write(`
Just type any command in console, press Enter, and operation would be completed
Your current path is "${HOME_DIRECTORY}"
If you would like to exit, press "Ctrl/Cmd + C" or type "${STOP_COMMAND}" on a new line and press Enter
    `);

    pipeline(readable, executeCommandStream, writable, (error) => {
        throwError({ error });
    });

    process.on('SIGINT', () => {
        exit();
    });
};

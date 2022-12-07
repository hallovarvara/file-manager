import { Transform } from 'stream';
import { exit } from './exit.js';
import { help } from './help.js';
import { throwError } from '../lib/utils/throw-error.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { goUpAndGetPath } from './go-up-and-get-path.js';
import { getDirectoryContentList } from './get-directory-content-list.js';
import { STOP_COMMAND, HOME_DIRECTORY } from '../lib/constants/index.js';

let currentPath = HOME_DIRECTORY;

export const executeCommandStream = new Transform({
    async transform(chunk, encoding, callback) {
        const command = chunk.toString().trim();

        if (command === STOP_COMMAND) {
            exit();
        } else if (command === 'help' || command === '.help') {
            help();
            showCurrentPath(currentPath);
        } else if (command === 'up') {
            currentPath = goUpAndGetPath(currentPath);
        } else if (command === 'ls') {
            await getDirectoryContentList(currentPath);
        } else {
            throwError({ isInputInvalid: true });
            showCurrentPath(currentPath);
        }

        callback();
    },
});

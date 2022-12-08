import { Transform } from 'stream';
import { exit } from './exit.js';
import { help } from './help.js';
import { goUpAndGetPath } from './go-up-and-get-path.js';
import { getDirectoryContentList } from './get-directory-content-list.js';
import { goToPath } from './go-to-path.js';
import { throwError } from '../lib/utils/throw-error.js';
import { showCurrentPath } from '../lib/utils/show-current-path.js';
import { read } from './files/read.js';
import { add } from './files/add.js';
import { rename } from './files/rename.js';
import { copy } from './files/copy.js';
import { move } from './files/move.js';
import { remove } from './files/remove.js';
import { hash } from './files/hash.js';
import { compress } from './files/compress.js';
import { decompress } from './files/decompress.js';
import { executeOsFunctionByArgument } from './execute-os-function-by-argument.js';
import { STOP_COMMAND, HOME_DIRECTORY } from '../lib/constants/index.js';

let currentPath = HOME_DIRECTORY;

export const executeCommandStream = new Transform({
    async transform(chunk, encoding, callback) {
        const command = chunk.toString().trim();

        if (command === STOP_COMMAND) {
            exit();
        } else if (command === 'help' || command === '.help') {
            help(currentPath);
        } else if (command === 'up') {
            currentPath = goUpAndGetPath(currentPath);
        } else if (command === 'ls') {
            await getDirectoryContentList(currentPath);
        } else if (command.startsWith('cd')) {
            currentPath = goToPath({ command, currentPath });
        } else if (command.startsWith('cat')) {
            await read(command, currentPath);
        } else if (command.startsWith('add')) {
            await add(command, currentPath);
        } else if (command.startsWith('rn')) {
            await rename(command, currentPath);
        } else if (command.startsWith('cp')) {
            await copy(command, currentPath);
        } else if (command.startsWith('mv')) {
            await move(command, currentPath);
        } else if (command.startsWith('rm')) {
            await remove(command, currentPath);
        } else if (command.startsWith('os')) {
            await executeOsFunctionByArgument(command, currentPath);
        } else if (command.startsWith('hash')) {
            await hash(command, currentPath);
        } else if (command.startsWith('compress')) {
            await compress(command, currentPath);
        } else if (command.startsWith('decompress')) {
            await decompress(command, currentPath);
        } else {
            throwError({ isInputInvalid: true });
            showCurrentPath(currentPath);
        }

        callback();
    },
});

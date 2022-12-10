import { Transform } from 'stream';
import { exit } from './exit.js';
import { help } from './help.js';
import { executeUp } from './execute-up.js';
import { getDirectoryContentList } from './get-directory-content-list.js';
import { executeCd } from './execute-cd.js';
import { throwError } from '../lib/utils/throw-error.js';
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
import { STOP_COMMAND } from '../lib/constants/index.js';

export const executeCommandStream = new Transform({
    async transform(chunk, encoding, callback) {
        const command = chunk.toString().trim();

        if (command === STOP_COMMAND) {
            exit();
        } else if (command === 'help' || command === '.help') {
            help();
        } else if (command === 'up') {
            executeUp();
        } else if (command === 'ls') {
            await getDirectoryContentList();
        } else if (command.startsWith('cd')) {
            executeCd(command);
        } else if (command.startsWith('cat')) {
            await read(command);
        } else if (command.startsWith('add')) {
            await add(command);
        } else if (command.startsWith('rn')) {
            await rename(command);
        } else if (command.startsWith('cp')) {
            await copy(command);
        } else if (command.startsWith('mv')) {
            await move(command);
        } else if (command.startsWith('rm')) {
            await remove(command);
        } else if (command.startsWith('os')) {
            await executeOsFunctionByArgument(command);
        } else if (command.startsWith('hash')) {
            await hash(command);
        } else if (command.startsWith('compress')) {
            await compress(command);
        } else if (command.startsWith('decompress')) {
            await decompress(command);
        } else {
            throwError({ isInputInvalid: true, showCurrentPath: true });
        }

        callback();
    },
});

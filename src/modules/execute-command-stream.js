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
import { parseCommand } from '../lib/utils/parse-command.js';

import {
    COMMAND_ADD,
    COMMAND_CAT,
    COMMAND_CD,
    COMMAND_COMPRESS,
    COMMAND_CP,
    COMMAND_DECOMPRESS,
    COMMAND_EXIT,
    COMMAND_HASH,
    COMMAND_HELP,
    COMMAND_LS,
    COMMAND_MV,
    COMMAND_OS,
    COMMAND_RM,
    COMMAND_RN,
    COMMAND_UP,
} from '../lib/constants/commands.js';

export const executeCommandStream = async (userInput) => {
    const [command, ...args] = parseCommand(userInput);

    switch (command) {
        case COMMAND_EXIT:
            exit();
            break;
        case COMMAND_HELP:
        case `.${COMMAND_HELP}`:
            help();
            break;
        case COMMAND_UP:
            executeUp(args);
            break;
        case COMMAND_CD:
            executeCd(args);
            break;
        case COMMAND_LS:
            getDirectoryContentList();
            break;
        case COMMAND_CAT:
            await read(args);
            break;
        case COMMAND_ADD:
            await add(userInput);
            break;
        case COMMAND_RN:
            await rename(args);
            break;
        case COMMAND_CP:
            await copy(args);
            break;
        case COMMAND_MV:
            await move(args);
            break;
        case COMMAND_RM:
            await remove(args);
            break;
        case COMMAND_OS:
            await executeOsFunctionByArgument(args);
            break;
        case COMMAND_HASH:
            await hash(args);
            break;
        case COMMAND_COMPRESS:
            await compress(args);
            break;
        case COMMAND_DECOMPRESS:
            await decompress(args);
            break;
        default:
            throwError({ isInputInvalid: true, showCurrentPath: true });
            break;
    }
};
